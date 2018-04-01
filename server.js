import express from 'express';
import path from 'path';
import { MongoClient } from 'mongodb';

const PORT = 7700;
const PUBLIC_PATH = __dirname + '/public';
const dbURL = 'mongodb://localhost:27017';
const dbName = 'pets';
const collectionName = 'pets';

const app = express();

const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment) {
    const webpack = require('webpack');
    const webpackConfig = require('./webpack.config.babel').default;
    const compiler = webpack(webpackConfig);
    app.use(require('webpack-dev-middleware')(compiler, {
      hot: true,
      stats: {
        colors: true
      }
    }));
    app.use(require('webpack-hot-middleware')(compiler));
  } else {
    app.use(express.static(PUBLIC_PATH));
  }

  app.get("/get-data", async function (req, res) {
    const docs = await getInitialData(dbURL);
    res.send(docs);
  });
  
  app.get("/get-animals", async function (req, res) {
    const docs = await getAnimals(dbURL, req.query);
    res.send(docs);
  });

  app.all("*", function (req, res) {
    res.sendFile(path.resolve(PUBLIC_PATH, 'index.html'));
  });

  async function getAnimals(dbUrl, query) {
    try {
      const connection = await connect(dbUrl);
      console.log('QUERY', query);
      const dbQuery = {};
      if (query.animalName) {       
        dbQuery.animalName = query.animalName;
      }
      if (query.showDeadAnimals !== 'true') {
        dbQuery.isDead = "FALSE";
      }
      for (const filterName of ['animalBreed', 'animalColor', 'animalType', 'animalGender']) {
        // console.log(filterName, query[filterName]); 
        if (query[filterName]) {
          dbQuery[filterName] = {$in: query[filterName]};
        }
      }
      const docs = await find(connection, dbQuery);
      connection.close();
      return docs;
    } catch (err) {
      console.log("Error while fetching animals from database", err);
    }
  }

  async function getInitialData(dbUrl) {
    try {
      const connection = await connect(dbUrl);
      const names = await findByField(connection, 'animalName');
      const types = await findByField(connection, 'animalType');
      const genders = await findByField(connection, 'animalGender');
      const breeds = new Map();
      const colors = new Map();
      for (let type of types) {
        const breedsByType = await findByFieldAndOption(connection, 'animalBreed', {'animalType': type});
        breeds.set(type, breedsByType);
        const colorsByType = await findByFieldAndOption(connection, 'animalColor', {'animalType': type});
        colors.set(type, colorsByType);
      }
      connection.close();
      return { names, types, genders, breeds, colors };
    } catch (err) {
      console.log("Error while fetching initial data from database", err);
    }
  }
  
  function connect(dbUrl) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(dbUrl, (err, db) => {
            if (err) {
                reject("Cannot connect to database", err);
            } else {
                resolve(db);
            }
        });
    });
  }

  function findByField(connection, field) {
    return new Promise((resolve, reject) => {
      const db = connection.db(dbName);
      db.collection(collectionName).distinct(field, (err, docs) => {
        if (err) {
          reject("Unable to find document", err);
        } else {
          resolve(docs);
        }
      })
    });
  }

  function findByFieldAndOption(connection, field, option) {
    return new Promise((resolve, reject) => {
      const db = connection.db(dbName);
      db.collection(collectionName).distinct(field, option, (err, docs) => {
        if (err) {
          reject("Unable to find document", err);
        } else {
          resolve(docs);
        }
      })
    });
  }

  function find(connection, query) {
    return new Promise((resolve, reject) => {
      const db = connection.db(dbName);
      console.log("QUERY ON SERVER", query);
      db.collection(collectionName).find(query).toArray((err, docs) => {
        if (err) {
          reject("Unable to find document", err);
        } else {
          resolve(docs);
        }
      })
    });
  }
  
  app.listen(PORT, () => {
    console.log('Listening on port ' + PORT + '...');
  });

