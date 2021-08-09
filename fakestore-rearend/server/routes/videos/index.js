const express = require('express');
const multer = require('multer');
const fs = require('fs');
const url = require('url');
//const { URLSearchParams } = require('url');
const querystring = require('querystring');
const router = express.Router();
const playlist_json = require('../../media_library/videos/video_data/video_playlist.json');
const { mongoClient, MongoClient } = require('mongodb');
const middlewares = require('../middlewares');
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
const { request } = require('http');
//configuring multer for uploads.
// unsure if i should put this in rout or not. 
const filepath = "/home/vincentclark/FakeStore/fakestore-rearend/server/media_library/videos/video_upload/"
const filedest = "/home/vincentclark/FakeStore/fakestore-rearend/server/media_library/videos/videos_images/"
const upload = multer({
    dest: filepath,
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, filepath);
        }
    }),

});
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
            console.log("ERROR Connecting to DB, it might be down, putting falling back to json file")
            // res.status(500).json({ message: "oops something went wrong", err });
            const contentList = playlist_json
            console.log("CONTENTLIST", contentList);
            return res.json(contentList);
        }
    });

    router.post('/videoupload', cors(), upload.single('video'), async (req, res) => {
        console.log("/videoupload");
        try {
            console.log("top of try");
            const file = req.file;
            console.log("file");
            const fileName = file.originalname;
            const filePath = filepath + fileName;

            const fileStream = fs.createWriteStream(filePath, { flags: 'w' },);
            console.log("fileName", fileName);
            console.log("filePath", filePath);

            req.pipe(fileStream);
            //console.log(fileStream);
            const fileSize = file.size;
            console.log("fileSize", fileSize);
            const fileType = file.mimetype;
            console.log("fileType", fileType);
            const fileExt = file.extension;
            console.log("fileExt", fileExt);
            const fileNameNoExt = fileName.substr(0, fileName.indexOf('.'));
            console.log("fileNameNoExt", fileNameNoExt);
            const fileNameNoExtNoDot = fileNameNoExt.substr(0, fileNameNoExt.indexOf('.'));
            console.log("fileNameNoExtNoDot", fileNameNoExtNoDot);

            // fileStream.rename(filePath, filepath + fileNameNoExtNoDot + ".mp4", (err) => {
            //     if (err) {
            //         console.log("ERROR", err);
            //         return res.status(500).json({ message: "oops something went wrong", err });
            //     }
            //     console.log("rename successful");
            // });
            //console.log("GET SIZE", upload.getSize(req));
            console.log("REQ FILE NAME", req.file.filename);
            console.log("REQ FILE PATH", req.file.path);
            console.log("REQ FILE SIZE", req.file.size);
            console.log("REQ ", req.file.originalname);




            //fileStream.close();




            req.on('end', () => {
                console.log("file.on('end')");
                //const video = await videos.uploadVideo(fileName, filePath);
                //const videoStub = await videos.createVideoStub(video);

                fileStream.close();
                //res.json({ message: "Getting somewhere" });
                console.log("HERE");
            });


            console.log("body", "req.body.video_title");
            let target_file = req.file.path;
            console.log(target_file);

            fs.rename(target_file, `${filedest}${file.originalname}`, (err) => {
                if (err) {
                    console.log("ERROR", err);
                    //return res.status(500).json({ message: "oops something went wrong with removing", err });
                }
                console.log("rename successful");
            });
            res.send("done");
            //console.log(path.join(__dirname) + "/../../media_library/videos/video_upload/")

            console.log(req.file.originalname);

        }
        catch (err) {
            res.status(500).json({ message: "routes/index:  something went wrong", err });

        }
    })

    // 




    return router;

}