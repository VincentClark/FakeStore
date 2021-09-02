const fs = require('fs');
const { promisify } = require('util');
const url = require('url')
const path = require('path');
const http = require("http");
const querystring = require('querystring');

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

    async directoryCheck() {
        const currentDirectory = await this.readdir(this.filepath)
        return (currentDirectory);
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
        //should be linked to through the routes
        const filedest_base = path.join(__dirname, "../", "../", "/media_library/videos/");
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
    }

}


module.exports = VideoService;