const fs = require('fs');
const { promisify } = require('util');
const url = require('url')
const path = require('path');
const http = require("http");
const querystring = require('querystring');
const multer = require('multer');
const sharp = require('sharp');
const stubModel = require('../models/stubModel');
const { mongoClient, MongoClient } = require('mongodb');

/**
 * VIDEO SERVICE
 * fs and util are for testing purposes. Do not leave in if still needed. 
 * This is based on the Feedback service
 */
const {
    stat,
    createReadStream,
    createWriteStream

} = require('fs');
const { EWOULDBLOCK } = require('constants');

class VideoService {

    constructor(datafile = "dummy") {
        this.datafile = datafile;
        this.file = '/testvideo1.mp4'
        this.readdir = promisify(fs.readdir);
        this.fileInfo = promisify(stat);
        this.filepath = path.join(__dirname, "../", "media_library/videos/")
        this.filetemp_path = this.filepath + this.file;
        console.log("filetemp_path", this.filetemp_path);

    }

    async simple() {
        console.log("SIMPLE CHECKED!")
        return "simple:true";
    }

    async directoryCheck(dir) {

        const filedest_base = path.join(__dirname, "../", "/media_library/videos/", dir);
        const currentDirectory = this.readdir(filedest_base);
        const sendDirectory = currentDirectory.toString().split(",");
        const combineDirectory = [];
        sendDirectory.forEach(element => {
            console.log(element)
            combineDirectory.push(`${filedest_base}${dir}/${element}`)
        })
        return (combineDirectory);
    }
    async adminDelete() {
        return { message: true }
    }

    async adminAddDelete() {
        console.log("ADMIN DELETE CHECKED!")
        const combineDirectories = () => {
            const filedest_base = path.join(__dirname, "../", "/media_library/videos/");
            const available_videos = this.readdir(filedest_base + "/videos_available");
            const available_videosAr = available_videos.toString().split(",");
            const delList = [];
            available_videosAr.forEach(element => {
                delList.push(`${filedest_base}/videos_available/${element}`)
            })

            return (available_videosAr);
            // const filedest_base = () => path.join(__dirname, "../", "/media_library/videos/").
            //     then((filedest_base) => {
            //         console.log("step1", filedest_base)
            //     })
            //     .then((filedest_base) => {
            //         console.log("step2", filedest_base)
            //         const available_videos = this.readdir(`${filedest_base}videos_available/`)
            //     })
            //     .then((available_videos) => {
            //         console.log("step3", available_videos)
            //         const combineDirectory = [];
            //         available_videos.forEach(element => {
            //             console.log(element)
            //             combineDirectory.push(`${filedest_base}videos_available/${element}`)
            //         })
            //     })
            //     .then((combineDirectory) => {
            //         console.log("step4", combineDirectory)
            //         const available_videosAr = available_videos.toString().split(",");
            //     })
            //     .then((available_videosAr) => {
            //         console.log("step5", available_videosAr)
            //         const combineDirectory = [];
            //         available_videosAr.forEach(element => {
            //             console.log(element)
            //             combineDirectory.push(`${filedest_base}videos_available/${element}`)
            //         })
            //             .then((combineDirectory) => {
            //                 console.log("step6", combineDirectory)
            //                 const videos_images = this.readdir(`${filedest_base}videos_images/`);
            //             })
            //             .then((videos_images) => {
            //                 console.log("step7", videos_images)
            //                 const videos_imagesAr = videos_images.toString().split(",");
            //                 const combineDirectory = [...available_videosAr, ...videos_imagesAr];
            //             })
            //             .then((combineDirectory) => {
            //                 console.log("step8", combineDirectory)
            //                 return combineDirectory;
            //             })
            //             .catch(err => {
            //                 console.log("END OF THEN", err)
            //             }
            //             )
            //     })

        }
        const returnCombineDirectories = combineDirectories()
        console.log("returnCombineDirectories", returnCombineDirectories);
    }
    //return "combineDirectories";
    // const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
    // const db = client.db('fsvideodatabase');

    // const videoStubs = await db.collection('fsvideodev').find({}).toArray();
    async adminCleanUp() {
        try {
            console.log("ADMIN CLEANUP CHECKED!")
            const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
            const db = client.db('fsvideodatabase');
            console.log(db);
            const filedest_base = path.join(__dirname, "../", "/media_library/videos/");
            const video_images = path.join(__dirname, "../", "/media_library/videos/videos_images");
            const video_available = path.join(__dirname, "../", "/media_library/videos/videos_available");
            const imagesDirectory = await this.readdir(video_images);
            const availableDirectory = await this.readdir(video_available);
            const correctImageDirectory = [];
            const correctAvailableDirectory = [];
            imagesDirectory.forEach(element => {
                correctImageDirectory.push(`${video_images}/${element}`)
            })
            availableDirectory.forEach(element => {
                correctAvailableDirectory.push(`${video_available}/${element}`)
            })
            const combineDirectories = [...correctImageDirectory, ...correctAvailableDirectory];
            //console.log("imagesDirectory", combineDirectories);
            //delete all files in combineDirectories
            combineDirectories.forEach(element => {
                fs.unlink(element, (err) => {
                    if (err) throw err;
                    console.log('successfully deleted ' + element);
                });
            })
            //delete refference in mongo
            const videoStubs = await db.collection('fsvideodev').deleteMany({});
        } catch (err) {
            console.log("error", err)
            return { message: err };
        }
        return { message: "videos delete and db cleared" }

    }




    async deleteVideoFiles() {
        const video_images = this.directoryCheck('/videos_images')
            .then(() => {
                //console.log("video_images", video_images);
                const videos_available = this.directoryCheck('/videos_available');
            })
            .then(() => {
                const video_imagesAr = video_images
                const videos_availableAr = videos_available
                const deleteVideos = video_imagesAr.concat(videos_availableAr);
                // console.log("deleteVideos", deleteVideos);
                return deleteVideos;
            })
            .catch(err => {
                console.log("ERROR IN SERVICE deletVideoFiles", err);
            })

    }

    async respondWithVideo(req, res) {
        //need to update
        //fileName = this.file;
        //const videoId = url.parse(req.url,true).query;
        const videoId = querystring.parse(url.URL);
        // const pathP = new url.URLSearchParams("videosrc")
        const pathP = req.query.videosrc;
        const fileName = this.filepath + "/" + pathP + ".mp4"


        console.log("videoID", fileName);
        const { size } = await this.fileInfo(fileName);
        const range = req.headers.range;
        if (range) {
            let [start, end] = range.replace(/bytes=/, '').split('-');
            start = parseInt(start, 10);
            end = end ? parseInt(end, 10) : size - 1;
            res.writeHead(206, {
                'Content-Range': `bytes ${start}-${end}/${size}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': (end - start) + 1,
                'Content-Type': 'video/mp4'
            })
            createReadStream(fileName, { start, end }).pipe(res);
        } else {
            res.writeHead(200, {
                'Content-Length': size,

                'Content-Type': 'video/mp4'
            });
            createReadStream(fileName).pipe(res);
        }
    }
    async contentList() {
        return {
            "video1": "ScrubJay_20210511",
            "video2": "testvideo1",
        }
    }
    async returnWithVideo(qs) {

        const videoId = qs
        //console.log(videoId)
        // const pathP = new url.URLSearchParams("videosrc")
        // const pathP = req.query.videosrc;
        const fileName = this.filepath + "/videos_available/" + videoId + ".mp4"
        const { size } = await this.fileInfo(fileName);
        //console.log("SERVICE SIZE", size);
        //const range = req.headers.range;
        let videoObject = { "size": size, "fileName": fileName }
        return (videoObject)
    }
    //I shouldn't use .pn or figure out a way around this. 
    // pn will send through a weird problem, and try to download a file if the server is not responding correctly. 
    async returnWithImage(qs) {
        //console.log("imagepath", qs)
        const fileName = this.filepath + "videos_images/" + qs
        try {
            const { size } = await this.fileInfo(fileName);
            //    console.log("SERVICE SIZE", size);
            return fileName;
        } catch (err) {
            // console.log("ERROR")
            return (this.filepath + "videos_images/scrubjay_icon.png")
        }




        //return (fileName)





        //return (fileName);
        // I will revisit this issue later. 
        // here are some notes
        /*
         try {
             const { size } = await this.fileInfo(fileName);
             console.log("SERVICE SIZE", size);
         } catch (err) {
             console.log("ERROR", err);
             throw err;
         }
         */

        /*
        try {
            fs.stat(fileName, (err, stats) => {
                if (err || !stats.isFile()) {
                    console.log("file does not exist")
                    //will make a default file name
                    return (this.filepath + "videos_images/scrubjay_icon.png");
                } else {
                    console.log("file exists")
                    return (fileName);
                }
            })
        } catch (e) {
            console.log("file does not exist")
            //will make a default file name
            return (this.filepath + "videos_images/scrubjay_icon.png");
        }
        }
        */

    }
    async respondToUpload(req, res) {

        // const upload = multer({
        //     dest: filepath_base,
        //     storage: multer.diskStorage({
        //         destination: function (req, file, cb) {
        //             cb(null, filepath_base);
        //         }
        //     }),

        // }).fields([
        //     { name: 'video', maxCount: 1 },
        //     { name: 'icon', maxCount: 1 },
        //     { name: 'poster', maxCount: 1 }
        // ]);

        //should be linked to through the routes

        const filedest_base = path.join(__dirname, "../", "/media_library/videos/");
        const filedest_video = filedest_base + "videos_available/"
        const filedest_images = filedest_base + "videos_images/"
        try {

            const fileNameBase = (imgName, imgFun) => {
                return (`${imgName}_${imgFun}`)
            }
            const createVideoFile = (videoFile) => {
                const videoObject = videoFile;
                const video_fileName = videoFile.originalname;
                const file_name_base = videoFile.originalname.split('.')[0];
                const video_filePath = this.filepath_base + video_fileName;
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
            // console.log("YOU ARE HERE")
            //should be moved above the try block
            const imageDesignator = (imgObj = false, imgBase, imgFun, imageSize = []) => {
                //  console.log("NEXT");
                if (imgObj) {
                    console.log("IMG OBJ", imgObj);
                    const imageObject = imgObj;
                    const imageExtension = imageObject.originalname.split('.').pop();
                    let imageName = `${fileNameBase(imgBase, imgFun)}.${imageExtension}`
                    const imagePath = `${filedest_images}${imageName}`
                    const imageFile = imageObject.path;

                    const imageResize = sharp(imageFile)
                        .resize(imageSize[0], imageSize[1])
                        .toFile(imagePath, (err, info) => {
                            if (err) {
                                console.log("ERROR RESIZING", err);
                                return false;
                            } else {
                                console.log("image resize successful {0}");
                                console.log(imageSize);
                                fs.unlinkSync(imageFile);
                                return true;
                            }
                        });

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
            const videoFile = createVideoFile(req.files.video[0]);
            const posterFile = imageDesignator(pofile[0], videoFile, 'poster', [720, 480]);
            const iconFile = imageDesignator(icfile[0], videoFile, 'icon', [127, 127]);
            const fullPosterFile = `${filedest_images}${posterFile}`
            console.log("fullPosterFile", fullPosterFile);
            const reqbody = (bodyItem = "default", defaultDescription) => {
                if (bodyItem === "default") {
                    return defaultDescription;
                } else {
                    return bodyItem;
                }
            }
            const reqControls = (controlItem = "checked", defaultControls) => {
                if (controlItem === "checked") {
                    return true;
                }
                else {
                    return false;
                }
            }

            const title = reqbody(req.body.title, "default");
            const description = reqbody(req.body.description, "default");
            const tags = reqbody(req.body.tags, "default");
            const category = reqbody(req.body.category, "default");
            const creator = reqbody(req.body.creator, "Anonymous");
            //need to fix this low priority
            const defaultControls = reqControls(req.body.controls);

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
            return (true);

        } catch (err) {
            console.log("ERROR || ERRORService no response", err)
            return (`ERROR ${err}`)
        }
    }

}


module.exports = VideoService;