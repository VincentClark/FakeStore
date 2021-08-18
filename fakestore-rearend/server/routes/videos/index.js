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
const filedest_video = filedest_base + "video_video_temp/"
const filedest_images = filedest_base + "video_image_temp/"
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
    router.post('/videoupload', cors(), upload, async (req, res) => {
        let default_icon = false;
        let default_poster = false;
        //this can be handled better. 
        try {
            // get the base name of video_file
            // let icon_fileName = "default_icon.png";
            // let poster_fileName = "default_poster.png";
            // get the extension of poster_file
            // get the base name of icon_file
            // } else {
            //     default_icon = true;
            //     const icon_file = "defacult_icon.png"
            //     let icon_fileName = "default_icon.png";
            //     console.log("PROBLEM");
            // }
            // const icon_file = req.files.icon[0];
            // if (req.files.poster[0]) {
            //need to handle if there is no file designated. 
            // } else {
            //     default_poster = true;
            //     const poster_file = "default_poster.png"
            //     const poster_fileName = "default_poster.png";
            // }
            req.on('end', () => {
                fileStream.close();
                console.log("PANIC FILE STREAM CLOSED");
                //needed logic to get the file name
            });
            //make this into a function when on service layer
            //ONLY SHOULD BE AVIALBLE IF UPLOADS ARE COMPLETE
            //video upload start
            const video_file = req.files.video[0];
            const video_fileName = video_file.originalname;
            //used for the icon and poster files
            const file_name_base = video_file.originalname.split('.')[0];
            const video_filePath = filepath_base + video_fileName;
            const fileStream = fs.createWriteStream(video_filePath, { flags: 'w' },);
            // should this be in a buffr? 
            req.pipe(fileStream);
            let target_video_file = video_file.path;
            // console.log("target_video_file", target_video_file);
            fs.rename(target_video_file, `${filedest_video}${video_fileName}`, (err) => {
                if (err) {
                    console.log("ERROR", err);
                    console.log("video_filePath", video_filePath);
                } else {
                    console.log("rename successful {0}");
                }
            });
            //video upload end
            //icon upload start
            let icon_file = req.files.icon[0];
            const icon_extension = icon_file.originalname.split('.')[1];
            let icon_fileName = file_name_base + "_icon" + "." + icon_extension;
            const icon_filePath = filepath_base + icon_fileName;
            const iconStream = fs.createWriteStream(icon_filePath, { flags: 'w' },);
            req.pipe(iconStream);
            let target_icon_file = icon_file.path;
            const rename = fs.rename(target_icon_file, `${filedest_images}${icon_fileName}`, (err) => {
                if (err) {
                    console.log("ERROR", err);
                    console.log("video_filePath", icon_fileName);
                } else {
                    console.log("rename successful {1}");
                }
            });
            console.log("end icon upload");
            //icon upload end
            //poster upload start
            //poster upload

            const poster_file = req.files.poster[0];


            // const poster_filePath = filepath_base + poster_fileName;
            //const final_poster_path = `${filedest_images}${poster_fileName}`
            console.log("CREATING POSTER FILE");
            //NEEDS TO BE ASNCH?
            const createPosterFile = (reqPosterFile) => {
                console.log("createPosterFile");
                if (reqPosterFile) {
                    const poster_extension = poster_file.originalname.split('.')[1];
                    const poster_fileName = file_name_base + "_poster" + "." + poster_extension;
                    console.log("if statemen in createPoserFile");
                    //const poster_file = reqPosterFile;
                    console.log("reqPosterFile", reqPosterFile);


                    try {
                        const stream = fs.createWriteStream(reqPosterFile.path, { flags: 'w' },)
                        console.log("posterStream", path)
                        req.pipe(stream);
                        const final_poster_path = `${filedest_images}${poster_fileName}`
                        let target_poster_file = poster_file.path;
                        fs.rename(target_poster_file, final_poster_path, (err) => {
                            if (err) {
                                console.log("ERROR", err);
                                console.log("video_filePath", poster_filePath);

                                return "default_poster.png"
                            } else {
                                console.log("rename successful {2}");
                                console.log(poster_fileName);
                                return poster_fileName;
                            }
                        });

                    } catch (err) {
                        console.log("ERROR WRITING STREAM FOR POSTER", err);
                    }

                    // console.log("posterStream", posterStream);
                    // const postercreate = posterStream(reqPosterFile.path);
                    // let poster_fileName = `${file_name_base}_poster.${poster_extension}`;
                    // const target_poster_file = reqPosterFile.path;
                    // const final_poster_path = `${filedest_images}${poster_fileName}`
                    // try {

                    //     // fs.rename(target_poster_file, final_poster_path, (err) => {
                    //     //     if (err) {
                    //     //         console.log("ERROR", err);
                    //     //         console.log("video_filePath", poster_filePath);;
                    //     //         return "default_poster.png"
                    //     //     } else {
                    //     //         console.log("rename successful {2}");
                    //     //         console.log(poster_fileName);
                    //     //         return poster_fileName;
                    //     //     }
                    //     // })


                    // }
                    // catch (err) {
                    //     console.log("ERROR Poster File", err);
                    //     return ("default_poster.png");
                    // }


                }
                else {
                    console.log("else statement in createPosterFile");
                    return ("default_poster.png");
                }

            }
            console.log("Step 1");
            const posterFileName = createPosterFile(req.files.poster[0])

            console.log("posterFileName", posterFileName);
            //end poser upload





            //create a stub for the video
            //copiolet the file name to the stub
            // this is what goes into the DB, but the structure isn't right.
            // will need to readjust this once working.
            console.log("Working on DB portion");
            // try {
            //     console.log("Started DB portion");
            //     let creator = "vincent"
            //     const stub = new stubModel({
            //         "title": video_fileName,
            //         "video_id": video_fileName + creator,
            //         "icon": icon_fileName,
            //         "src": file_name_base,
            //         "poster": poster_fileName,
            //         "creator": "Vincent NEED TO FIX",
            //         "description": "Haven't gotten that far dude",
            //         "defaultControls": true,
            //         "url": "",
            //         "service": "local",
            //         upvotes: 0,
            //         tags: ['cool', 'funny', 'awesome'],
            //         "views": 0,
            //         "comments": [],
            //     }
            //     );
            //     // stub.save((err) => {
            //     //     if (err) {
            //     //         console.log("ERROR", err);
            //     //     } else {
            //     //         console.log("Stub saved");
            //     //     }
            //     // }
            //     // );
            // } catch (err) {
            //     console.log("ERROR IN 2nd TRY / routes/video/index")
            //     console.log("remove video", "or should it be vice versa");
            // }

            res.status(200).json({ message: "video uploaded successfully" });

        }
        catch (err) {
            console.log('TRY: route/index', err);
            res.status(500).json({ message: "routes/index:  something went wrong", err });
        }
    })
    return router;
}

router.post('/stubcreate', cors(), async (req, res) => {
    try {

        // const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
        // const db = client.db('fs-videodev');
        // const collection = db.collection('videostub');
        // const stub = new stubModel({
        //     "id": 21001,
        //     "title": "Testtwo"
        // });
        // const saveStub = await stub.save();
        // console.log("saveStub", saveStub);
        //res.status(200).json({ message: "connected to stub route" });
        res.status(200).json({ message: "stub created successfully" });


    }
    catch (err) {
        console.log('DB: route/index', err);
        res.status(500).json({ message: "routes/index:  something went wrong", err });
    }
    return router;
});
