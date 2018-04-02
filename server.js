import express from 'express';
import path from 'path';
import { MongoClient } from 'mongodb';

const PORT = 80;
const PUBLIC_PATH = __dirname + '/public';
const STATIC_PATH = __dirname + '/static';
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
app.use(express.static(STATIC_PATH));

app.get("/get-data", async function (req, res) {
  const docs = await getInitialData(dbURL);
  res.send(docs);
});

app.get("/get-animals", async function (req, res) {
  const docs = await getAnimals(dbURL, req.query);
  res.send(docs);
});

async function getAnimals(dbUrl, query) {
  const connection = await MongoClient.connect(dbUrl);
  const dbQuery = {};
  if (query.animalName) {
    dbQuery.animalName = query.animalName;
  }
  if (query.showDeadAnimals !== 'true') {
    dbQuery.isDead = "FALSE";
  }
  for (const value of ['animalBreed', 'animalColor', 'animalType', 'animalGender']) {
    if (query[value]) {
      dbQuery[value] = { $in: query[value] };
    }
  }
  const db = connection.db(dbName);
  const docs = await db.collection(collectionName).find(dbQuery).toArray();
  connection.close();
  return docs;
}

async function getInitialData(dbUrl) {
  const connection = await MongoClient.connect(dbUrl);
  const db = connection.db(dbName);
  const names = await db.collection(collectionName).distinct('animalName');
  const types = await db.collection(collectionName).distinct('animalType');
  const genders = await db.collection(collectionName).distinct('animalGender');

  const breeds = new Map();
  const colors = new Map();
  for (let type of types) {
    const breedsByType = await db.collection(collectionName).distinct('animalBreed', { 'animalType': type });
    breeds.set(type, breedsByType);
    const colorsByType = await db.collection(collectionName).distinct('animalColor', { 'animalType': type });
    colors.set(type, colorsByType);
  }
  connection.close();
  return { names, types, genders, breeds, colors };
}

app.listen(PORT, () => {
  console.log('Listening on port ' + PORT + '...');
});

