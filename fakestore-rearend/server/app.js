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


  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(createError(404));
  });

  if (app.get('env') === 'development') {
    app.locals.pretty = true;
  }

  // error handler
  // possible eslint issues
  // app.use(function (req, res, next) {
  //   let origin = req.headers.origin;
  //   if (allowedOrigins.includes(origin)) {
  //     res.header("Access-Control-Allow-Origin", origin); // restrict it to the required domain
  //   }

  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "Origin, X-Requested-With, Content-Type, Accept"
  //   );
  //   next();
  // });
  app.use((err, req, res, next) => {
    res.locals.message = err.message;
    //const status = err.status || 500; // If no status is provided, let's assume it's a 500
    //res.locals.status = status;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    //res.status(status);
    //console.log(res.status());
    console.log(JSON.stringify(req.headers));
    const reqHeaders = JSON.stringify(req.headers);
    if (reqHeaders.indexOf("boundary") > -1) {
      console.log("boundary");
    } else {
      console.log("no boundry");
    }

    console.log('error', err);
    res.status(500).json({ message: "oops Something went wrong on app.use(..) [app.js]", err });
    //  res.send('error at app.js level', err);
  });
  return app
}