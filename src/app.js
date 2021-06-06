const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/src/', (req, res) => { // `/src` is just a workaround for now
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
  });
});

app.use('/src/api/v1', api); // `/src` is just a workaround for now

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
