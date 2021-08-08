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


}


module.exports = VideoService;