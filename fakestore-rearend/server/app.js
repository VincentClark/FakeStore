const express = require('express');
const path = require('path');
const createError = require('http-errors');
const routes = require('./routes');
const cors = require('cors');
const VideoService = require('./service/VideoService')
const BuildService = require('./service/BuildService')
const bodyParser = require('body-parser');
const multer = require('multer');

//place config in module export
module.exports = (config) => {
  const app = express();
  //need to add in a better config
  // trace up
  //route management
  const videos = new VideoService();
  const builder = new BuildService();
  app.locals.title = "FakeSore [v.0.1]";

  app.use("/", express.static(path.join(__dirname, '/build')));
  app.use("/videoplayer", express.static(path.join(__dirname, '/build_video')));
  //app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.urlencoded({ extended: true }));
  //service linkage
  app.use('/', routes({ videos }, { builder }))
  // cors directives
  //app.use(cors());

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(createError(404));
  });

  if (app.get('env') === 'development') {
    app.locals.pretty = true;
  }

  // error handler
  // possible eslint issues
  app.use((err, req, res, next) => {
    res.locals.message = err.message;
    //const status = err.status || 500; // If no status is provided, let's assume it's a 500
    //res.locals.status = status;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    //res.status(status);
    res.status(500).json({ message: "oops Something went wrong on app.use(..) [app.js]", err });
    res.send('error at app.js level', err);
  });
  return app
}