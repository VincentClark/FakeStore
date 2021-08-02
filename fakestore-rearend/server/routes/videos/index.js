const express = require('express');
const fs = require('fs');
const url = require('url');
//const { URLSearchParams } = require('url');
const querystring = require('querystring');
const router = express.Router();
cors = require('cors');

/**
 * ENABLING CORS FOR THIS SECTION
 * DELETE IF NOT WORKING
 */


//VIDEO SERVICE
const {
    stat,
    createReadStream,
    createWriteStream

} = require('fs');
//routes to service
module.exports = (params) => {
    const {videos} = params;
//cors options
const corsOptions = {
    origin: 'localhost:3000',
    optionsSuccessStatus:200
  }
    console.log("PARAMS PARAMS params",params)
    router.get('/',async (req,res,next) =>{
        try{
            //const videolist = await videos.getList();
            //removed videolist which will be placed back in. MVP
            return res.send('videos', {
                page: 'Videos',
                success: req.query.success,
            })
        }catch(err){
            return next(err)
        }
    });

    router.get('/dir', async (req,res) =>{
        try{
            const directoryCheck = await videos.directoryCheck()
          return res.send(directoryCheck);  
        }catch(err){
            console.log("ERROR", err)
            return res.send("POO")
        }

    });
    router.get('/videolist', cors(), async (req,res) =>{
        const contentList = await videos.contentList();
        console.log("CONTENTLIST",contentList);
        //SECURITY HOLD REFINE WHEN LAUNCH
        //res.setHeader('Access-Control-Allow-Origin', '*');
        return res.json(contentList);
    })

    router.get("/filelist", async (req,res) =>{

    })

    router.get('/videofiles_old', async (req,res) =>{
        const qs = req.query.videosrc;
        console.log("QS: "+qs)
        const video_simple = videos.respondWithVideo(req,res)
        console.log("video files")
        return true;

    });
    router.get('/videofiles', async (req,res) =>{
        const qs = req.query.videosrc;
        const videoResponse= await videos.returnWithVideo(qs);
        console.log("VIDEO RESPONSE",videoResponse.size)
        const range = req.headers.range;
        if (range) {
            let [start, end] = range.replace(/bytes=/, '').split('-');
            start = parseInt(start, 10);
            end = end ? parseInt(end, 10) : videoResponse.size - 1;
            res.writeHead(206, {
                'Content-Range': `bytes ${start}-${end}/${videoResponse.size}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': (end - start) + 1,
                'Content-Type': 'video/mp4'
            })
            createReadStream(videoResponse.fileName, { start, end }).pipe(res);
        } else {
            res.writeHead(200, {
                'Content-Length': videoResponse.size,

                'Content-Type': 'video/mp4'
            });
            try{
                createReadStream(videoResponse.fileName).pipe(res)
            }catch(e){
                console.log("Create ReadStream ERROR",e)
            }
        }
        console.log("video files")
        return true;

    })

    return router;

}