const { verify } = require('crypto');
const express = require('express');
const router = express.Router();
const { promisify } = require('util');
const path = require('path');
const cors = require('cors');
//Required indexes
const videosRoute = require('./videos');
const buildRoute = require('./build')



module.exports = (params) => {
    const { videos } = params;
    const {build} = params;
    const buildpath = path.join(__dirname,"..","..","/server/build/index.html");
    console.log("BUILD PATH",buildpath)
    //console.log(videos);
    // router.get('/', async (req, res) => {
    //     //return res.render('index', {page: 'Home', videotest});
    //     res.sendFile(path.join(__dirname + '/build/index.html'));
    // });
    // router.get('*', (req, res) => {
    //     res.sendFile("../build");
    // });
    const videoplayer_path = path.join(__dirname,"../","../","server/build_video/index.html")
    console.log("videoplayer_path",videoplayer_path)
    router.get("/videoplayer/*", async(req,res) =>{
        return res.sendFile(videoplayer_path)
    })

    router.use('/videos', videosRoute(params));
    router.use('/', buildRoute(params));
    // router.get('/test', (res,req) =>{
    //     // //res.sendFile = buildpath;
    //     console.log("Hit");
    //     // res.send = "Message to your master"
    // })
    //return router

    return router
}