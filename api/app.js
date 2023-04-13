var createError = require('http-errors');
var express = require('express');
var path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

mongoose.connect(process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to mongo');
})

var recipeRouter = require('./routes/recipe-router');
var app = express();

// view engine setup
app.use(logger('dev'));
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

recipeRouter.Create(app);
recipeRouter.ReadAll(app);
recipeRouter.ReadAllByIngredient(app);
recipeRouter.ReadOneByName(app);
recipeRouter.ReadOneByID(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
