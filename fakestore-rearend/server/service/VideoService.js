const fs = require('fs');
const { promisify } = require('util');
const url = require('url')
const path = require('path');
const http = require("http");
const querystring = require('querystring');
const multer = require('multer');
const sharp = require('sharp');
const stubModel = require('../models/stubModel');
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

    async deleteVideoFiles() {
        const video_images = await this.directoryCheck('/videos_images')
            .then(() => {
                const videos_available = this.directoryCheck('/videos_available');
            })
            .then(() => {
                const video_imagesAr = video_images.toString().split(",");
                const videos_availableAr = videos_available.toString().split(",");
                const deleteVideos = video_imagesAr.concat(videos_availableAr);
                console.log("deleteVideos", deleteVideos);
            })
            .catch(err => {
                console.log("ERROR IN SERVICE deletVideoFiles", err);
            })
        return deleteVideos;
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
        console.log(videoId)
        // const pathP = new url.URLSearchParams("videosrc")
        // const pathP = req.query.videosrc;
        const fileName = this.filepath + "/videos_available/" + videoId + ".mp4"
        const { size } = await this.fileInfo(fileName);
        console.log("SERVICE SIZE", size);
        //const range = req.headers.range;
        let videoObject = { "size": size, "fileName": fileName }
        return (videoObject)
    }
    //I shouldn't use .pn or figure out a way around this. 
    // pn will send through a weird problem, and try to download a file if the server is not responding correctly. 
    async returnWithImage(qs) {
        console.log("imagepath", qs)
        const fileName = this.filepath + "videos_images/" + qs
        try {
            const { size } = await this.fileInfo(fileName);
            console.log("SERVICE SIZE", size);
            return fileName;
        } catch (err) {
            console.log("ERROR")
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
            console.log("YOU ARE HERE")
            //should be moved above the try block
            const imageDesignator = (imgObj = false, imgBase, imgFun, imageSize = []) => {
                console.log("NEXT");
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


                    //inserting file resize here

                    //console.log("imageResize", imageResize);
                    //end of file resize
                    //change this to delete if this works.
                    // fs.rename(imageFile, imagePath, (err) => {
                    //     if (err) {
                    //         console.log("ERROR ERROR", err)
                    //         //   return (`default_${imgFun}.png`)
                    //         imageName = `default_${imgFun}.png`

                    //     } else {
                    //         console.log("imageName", imageName)
                    //         //   return (imageName)
                    //     }
                    // })
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
            const posterFile = imageDesignator(pofile[0], videoFile, 'poster', [720, 480]);
            const iconFile = imageDesignator(icfile[0], videoFile, 'icon', [127, 127]);
            const fullPosterFile = `${filedest_images}${posterFile}`
            console.log("fullPosterFile", fullPosterFile);

            // const resizeFile = (fullImageFile, imageFile) => {

            //     const imageResize = sharp(fullImageFile)
            //         .resize(720, 480)
            //         .toFile(`${filedest_base}/videos_images/rs${imageFile}`, (err, info) => {
            //             if (err) {
            //                 console.log("ERROR RESIZING", err);
            //                 return false;
            //             } else {
            //                 console.log("image resize successful {0}");
            //                 return true;
            //             }
            //         });
            // }
            // if (pofile) {
            //     // const resizePosterFile = resizeFile(fullPosterFile, posterFile);

            // }

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

            //res.status(500).json({ message: "oops BAD poop something went wrong on route /simpupload", status: "false", err });
        }
    }

}


module.exports = VideoService;