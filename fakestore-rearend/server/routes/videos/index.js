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
    // will adjust to admin functionality. 
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
        // const success = await videos.uploadVideo(req, res);
        //console.log("SUCCESS", success);
        try {
            const fileNameBase = (imgName, imgFun) => {
                return (`${imgName}_${imgFun}`)
            }
            const createVideoFile = (videoFile) => {
                const videoObject = videoFile;
                const video_fileName = videoFile.originalname;
                const file_name_base = videoFile.originalname.split('.')[0];
                const video_filePath = filepath_base + video_fileName;
                const target_video_file = videoFile.path;
                fs.rename(target_video_file, `${filedest_video}${video_fileName}`, (err) => {
                    if (err) {
                        console.log("ERROR", err);
                        console.log("video_filePath", video_filePath);
                    } else {
                        console.log("rename successful {0}");
                    }
                });
                return file_name_base;
            };
            console.log("YOU ARE HERE")
            const imageDesignator = (imgObj = false, imgBase, imgFun) => {
                console.log("NEXT");
                if (imgObj) {
                    console.log("IMG OBJ", imgObj);
                    const imageObject = imgObj;
                    const imageExtension = imageObject.originalname.split('.').pop();
                    let imageName = `${fileNameBase(imgBase, imgFun)}.${imageExtension}`
                    const imagePath = `${filedest_images}${imageName}`
                    const imageFile = imageObject.path;

                    fs.rename(imageFile, imagePath, (err) => {
                        if (err) {
                            console.log("ERROR ERROR", err)
                            //   return (`default_${imgFun}.png`)
                            imageName = `default_${imgFun}.png`

                        } else {
                            console.log("imageName", imageName)
                            //   return (imageName)
                        }
                    })
                    return imageName;
                } else {
                    return (`default_${imgFun}.png`)
                }

            }
            const checkForImage = (imgObj) => {
                try {
                    if (imgObj) {
                        return imgObj;
                    } else {
                        return false
                    }
                } catch (err) {
                    return false
                }
            }
            const pofile = checkForImage(req.files.poster);
            const icfile = checkForImage(req.files.icon);

            // const pofile = (req.files.icon[0]) ? req.files.poster[0] : false;
            // const icfile = (req.files.icon[0]) ? req.files.icon[0] : false;
            const videoFile = createVideoFile(req.files.video[0]);
            const posterFile = imageDesignator(pofile[0], videoFile, 'poster');
            const iconFile = imageDesignator(icfile[0], videoFile, 'icon');
            //request digestion
            const reqbody = (bodyItem = "default", defaultDescription) => {
                if (bodyItem === "default") {
                    return defaultDescription;
                } else {
                    return bodyItem;
                }
            }
            const title = reqbody(req.body.title, "default");
            const description = reqbody(req.body.description, "default");
            const tags = reqbody(req.body.tags, "default");
            const category = reqbody(req.body.category, "default");
            const creator = reqbody(req.body.creator, "Anonymous");
            //need to fix this low priority
            const defaultControls = true;

            const url = reqbody(req.body.url, "default");
            const service = reqbody(req.body.service, "local");
            const video_id = reqbody(req.body.video_id, "default id");
            const src = videoFile;
            const icon = iconFile;
            const poster = posterFile;
            const autoStart = reqbody(Boolean(req.body.autoStart), false);


            //DB Entry

            const dbInsert = (
                title,
                video_id,
                src,
                poster,
                icon,
                description,
                defaultControls,
                creator,
                url,
                service,
                tags
            ) => {
                return (
                    {
                        "title": title,
                        "video_id": video_id,
                        "src": src,
                        "poster": poster,
                        "icon": icon,
                        "description": description,
                        "defaultControls": defaultControls,
                        "creator": creator,
                        "url": url,
                        "service": service,
                        "url": url,
                        "upvotes": 0,
                        "views": 0,
                        "tags": tags,
                        "comments": [],
                        "autoStart": autoStart,

                    })
            }
            const dbInsertObj = dbInsert(
                title,
                video_id,
                src,
                poster,
                icon,
                description,
                defaultControls,
                creator,
                url,
                service,
                tags
            );

            console.log("dbInsert", dbInsertObj);
            const stub = new stubModel({ ...dbInsertObj });
            stub.save((err) => {
                if (err) {
                    console.log("ERROR", err);
                } else {
                    console.log("Stub saved");
                }
            });
            res.status(200).json({
                message: "success",
            });
        } catch (err) {
            console.log("ERROR || ERROR", err)
            res.status(500).json({ message: "oops poop something went wrong on route /simpupload", status: "false", err });
        }
    })

    router.post('/videoupload_old', cors(), upload, async (req, res) => {
        //this can be handled better. 
        //does this still need to be in try catch?
        try {
            req.on('end', () => {
                fileStream.close();
                console.log("PANIC FILE STREAM CLOSED");
                //needed logic to get the file name
            });
            const fileNameBase = (videoFile) => {
                const fileName = videoFile.originalname;
                const fileNameBase = fileName.substr(0, fileName.lastIndexOf('.'));
                return fileNameBase;
            }

            const fileName = fileNameBase(req.files.video[0]);
            console.log("FFILLLEEENAME", fileName);
            const createVideoFile = (videoFile) => {
                const video_fileName = videoFile.originalname;
                const file_name_base = videoFile.originalname.split('.')[0];
                const video_filePath = filepath_base + video_fileName;
                const fileStream = fs.createWriteStream(video_filePath, { flags: 'w' },);
                req.pipe(fileStream);
                let target_video_file = videoFile.path;
                fs.rename(target_video_file, `${filedest_video}${video_fileName}`, (err) => {
                    if (err) {
                        console.log("ERROR", err);
                        console.log("video_filePath", video_filePath);
                    } else {
                        console.log("rename successful {0}");
                    }

                });

                return file_name_base;
            }
            const createIconFile = (reqIconFile, base) => {
                if (reqIconFile) {
                    const icon_fileName = reqIconFile.originalname;
                    console.log("ICON FILE NAME", icon_fileName);
                    console.log("base", base);
                    //const file_name_base = reqIconFile.originalname.split('.')[0];
                    const icon_filePath = filepath_base + icon_fileName;
                    const iconFileName = `${base}_icon.${reqIconFile.originalname.split('.')[1]}`
                    const fileStream = fs.createWriteStream(icon_filePath, { flags: 'w' },);
                    // should this be in a buffr?
                    const target_icon_file = reqIconFile.path;
                    req.pipe(fileStream)
                        .on('finish', () => {
                            fs.rename(target_icon_file, `${filedest_images}${iconFileName}`, (err) => {
                                if (err) {
                                    console.log("ERROR", err);
                                    console.log("icon_filePath", icon_filePath);
                                } else {
                                    console.log("rename successful {1}");
                                    return icon_fileName;
                                }
                            });
                        });
                } else {
                    console.log("no icon file");
                    return "default_icon.png";
                }


            };
            const createPosterFile = (reqPosterFile, base) => {
                if (reqPosterFile) {
                    console.log(reqPosterFile);
                    const poster_fileName = reqPosterFile.originalname;
                    console.log("POSTER FILE NAME:", poster_fileName);
                    console.log("base", base);
                    const file_name_base = reqPosterFile.originalname.split('.')[0];
                    const poster_filePath = filepath_base + poster_fileName;
                    const posterFileName = `${base}_poster.${reqPosterFile.originalname.split('.')[1]}`
                    const fileStream = fs.createWriteStream(poster_filePath, { flags: 'w' },);

                    // // should this be in a buffr?
                    // console.log("fileStream::", poster_filePath);
                    const target_poster_file = reqPosterFile.path;
                    // console.log("target_poster_file", target_poster_file);
                    // console.log("DEST:", `${filedest_images}${posterFileName}`);
                    req.pipe(fileStream)
                        .on('finish', () => {
                            console.log("TPF", target_poster_file);
                            fs.rename(target_poster_file, `${filedest_images}${posterFileName}`, (err) => {
                                if (err) {
                                    console.log("ERROR", err);
                                    console.log("Poster_filePath", poster_filePath);
                                } else {
                                    console.log("rename successful {1}");
                                    return poster_fileName;
                                }
                            });
                        });
                } else {
                    console.log("no poster file");
                    return "default_poster.png";
                }
            };

            console.log("FILENAME", fileName);
            // const file_name_base = createVideoFile(req.files.video[0])
            // const icon_fileName = createIconFile(req.files.icon[0], fileName)
            const poster_fileName = createPosterFile(req.files.poster[0], fileName)

            const video_file = req.files.video[0];
            console.log("Step 1");
            const file_name_base = createVideoFile(video_file);
            console.log("Step 1 Completed", file_name_base);

            console.log("Step 2");
            //const icon_fileName = createIconFile(req.files.icon[0], fileName);
            //console.log("Step 2 Completed", icon_fileName);
            console.log("Step 3");
            const posterFileName = createPosterFile(req.files.poster[0])
            // console.log("Step 3 Completed", posterFileName);

            console.log(file_name_base);




            // console.log("icon_fileName", icon_fileName);
            // console.log("posterFileName", posterFileName);
            // console.log("Working on DB portion");
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
            // stub.save((err) => {
            //     if (err) {
            //         console.log("ERROR", err);
            //     } else {
            //         console.log("Stub saved");
            //     }
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
