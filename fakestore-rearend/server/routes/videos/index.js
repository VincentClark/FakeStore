const express = require('express');
const fs = require('fs');
const url = require('url');
//const { URLSearchParams } = require('url');
const querystring = require('querystring');
const router = express.Router();
const playlist_json = require('../../media_library/videos/video_data/video_playlist.json');
const { mongoClient, MongoClient } = require('mongodb');
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
    const { videos } = params;
    //cors options
    const corsOptions = {
        origin: 'localhost:3000',
        optionsSuccessStatus: 200
    }
    console.log("PARAMS PARAMS params", params)
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
            const directoryCheck = await videos.directoryCheck()
            return res.send(directoryCheck);
        } catch (err) {
            console.log("ERROR", err)
            return res.send("POO")
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
    router.get('/videostub', cors(), async (req, res) => {
        try {
            const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
            const db = client.db('fs-videodb');
            const videoStubs = await db.collection('video_stubs').find({}).toArray();
            const videoStubsObj = {
                "id": "Test DB",
                "path": "NA",
                "videos": videoStubs,
            }
            res.json(videoStubsObj);
            client.close();
        } catch (err) {
            console.log("ERROR", err)
            res.status(500).json({ message: "oops something went wrong", err });
        }
    });




    return router;

}