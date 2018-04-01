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
  
  app.get("/get-animals", async function (req, res) {
    const docs = await getAnimals(dbURL, req.query);
    console.log("DOCS", docs);
    res.send(docs);
  });

  app.all("*", function (req, res) {
    res.sendFile(path.resolve(PUBLIC_PATH, 'index.html'));
  });

  async function getAnimals(dbUrl, query) {
    try {
      const connection = await connect(dbUrl);
      const docs = await find(connection, query);
      connection.close();
      return docs;
    } catch (err) {
      console.log("Error while fetching animals from database", err);
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

  function find(connection, query) {
    return new Promise((resolve, reject) => {
      const db = connection.db(dbName);
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

