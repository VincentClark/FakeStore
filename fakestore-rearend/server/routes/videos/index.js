const express = require('express');
const multer = require('multer');
const fs = require('fs');
const url = require('url');
const path = require('path');
//const { URLSearchParams } = require('url');
const querystring = require('querystring');
const router = express.Router();
const playlist_json = require('../../media_library/videos/video_data/video_playlist.json');
const { mongoClient, MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const middlewares = require('../middlewares');
const stubModel = require('../../models/stubModel');
cors = require('cors');

const dbase = mongoose.connection;




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
const { request } = require('http');
const { db } = require('../../models/stubModel');
//configuring multer for uploads.
// unsure if i should put this in rout or not. 

const filepath_base = path.join(__dirname, "../", "../", "/media_library/videos/video_upload/")
console.log("FILE PATH!!!", filepath_base);
const filedest_base = path.join(__dirname, "../", "../", "/media_library/videos/");
const filedest_video = filedest_base + "videos_available/"
const filedest_images = filedest_base + "videos_images/"
console.log("FILE_DEST VIDEOS", filedest_video);
//this should be on middlewares but it does not work correctly. 
const upload = multer({
    dest: filepath_base,
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, filepath_base);
        }
    }),

}).fields([
    { name: 'video', maxCount: 1 },
    { name: 'icon', maxCount: 1 },
    { name: 'poster', maxCount: 1 }
]);
//const upload = multer();
//routes to service
module.exports = (params) => {
    const { videos } = params;
    //cors options
    const corsOptions = {
        origin: 'localhost:3000',
        optionsSuccessStatus: 200
    }
    router.get('/', async (req, res, next) => {
        try {
            //const videolist = await videos.getList();
            //removed videolist which will be placed back in. MVP
            return res.send('videos', {
                page: 'Videos',
                success: req.query.success,
            })
        } catch (err) {
            return next(err)
        }
    });
    //used for testing
    router.get('/dir', async (req, res) => {
        try {
            //const allFiles = [];
            const directoryCheck = await videos.directoryCheck('/videos_available');
            const imageCheck = await videos.directoryCheck('/videos_images');
            allFiles = directoryCheck.concat(imageCheck);
            // const arDcheck = directoryCheck.split(',');
            // const arIcheck = imageCheck.split(',');
            // //combine both arrays
            // const allFiles = arDcheck.concat(arIcheck);

            //allFiles.push(directoryCheck);
            //allFiles.push(imageCheck);
            return res.send(allFiles)
        } catch (err) {
            console.log("ERROR", err);
            return res.send("POO");
        }

    });

    router.get('/videolist', cors(), async (req, res) => {
        const contentList = playlist_json
        console.log("CONTENTLIST", contentList);
        return res.json(contentList);
    })


    router.get("/filelist", async (req, res) => {

    })

    router.get('/videofiles_old', async (req, res) => {
        const qs = req.query.videosrc;
        console.log("QS: " + qs)
        const video_simple = videos.respondWithVideo(req, res)
        console.log("video files")
        return true;

    });
    router.get('/videofiles', async (req, res) => {
        const qs = req.query.videosrc;
        const videoResponse = await videos.returnWithVideo(qs);
        console.log("VIDEO RESPONSE", videoResponse.size)
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
            try {
                createReadStream(videoResponse.fileName).pipe(res)
            } catch (e) {
                console.log("Create ReadStream ERROR", e)
            }
        }
        console.log("video files")
        return true;

    })
    //plan to move this into the video service
    router.get('/videoimage/:name', async (req, res) => {
        //respond with id
        const qs = req.params.name;
        const imageType = qs.substr(qs.indexOf('.') + 1);
        const imagePath = await videos.returnWithImage(qs);
        console.log(imagePath)
        res.writeHead(200, {
            'Content-Type': `image/${imageType}`
        });
        try {
            createReadStream(imagePath).pipe(res);
        } catch (e) {
            console.log("ERROR", e)
        }
        return true;

        //I don't think this is correct, but it is functional. 
        // Refactor this later
    })


    //DB Connection Route
    // will adjust to admin functionality. 
    router.get('/admindelete', async (req, res) => {
        try {
            deleteList = videos.deleteVideoFiles();
            console.log("DELETE LIST", deleteList);
            return res.send(deleteList);

        } catch (err) {
            console.log("ERROR", err)
            return res.send("POO")
        }

    })
    router.get('/videostub', cors(), async (req, res) => {
        try {
            const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
            const db = client.db('fsvideodatabase');

            const videoStubs = await db.collection('fsvideodev').find({}).toArray();
            const videoStubsObj = {
                "id": "Test DB",
                "path": "NA",
                "videos": videoStubs,
            }
            res.json(videoStubsObj);
            client.close();
        } catch (err) {
            console.log("ERROR Connecting to DB, it might be down, putting falling back to json file")
            // res.status(500).json({ message: "oops something went wrong", err });
            const contentList = playlist_json
            console.log("CONTENTLIST", contentList);
            return res.json(contentList);
        }
    });
    //new upload route
    router.post('/videoupload', cors(), upload, async (req, res, next) => {
        const success = await videos.respondToUpload(req, res);
        console.log("SUCCESS", success);
        if (success) {
            res.status(200).json({ message: "success" });
        }
        else {
            res.status(500).json({ message: "oops poop something went wrong on route /cos of video service", status: "false", err });
        }
    })


    return router;
}
