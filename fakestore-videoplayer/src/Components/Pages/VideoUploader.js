import { useState } from 'react'
const axios = require('axios');
// set up state rules

const VideoUploader = () => {
    const [selectedVideoFile, setSelectedVideoFile] = useState(null);
    const [selectIconFile, setSelectIconFile] = useState(null);
    const [selectPosterFile, setSelectPosterFile] = useState(null);
    const [isVideoSelected, setIsVideoSelected] = useState(false);
    const [isIconSelected, setIsIconSelected] = useState(false);
    const [isPosterSelected, setIsPosterSelected] = useState(false);

    // const [videoDescription, setVideoDescription] = useState(null);
    // const [videoTitle, setVideoTitle] = useState(null);
    //const [videoTags, setVideoTags] = useState(null);
    //const [videoCategory, setVideoCategory] = useState(null);
    // const [videoAuthor, setVideoAuthor] = useState(null);

    const changeHandler = (event) => {
        setSelectedVideoFile(event.target.files[0]);
        setIsVideoSelected(true);
    };

    const iconHandler = (event) => {
        setIsIconSelected(true);
        setSelectIconFile(event.target.files[0]);
    };
    const posterHandler = (event) => {
        setIsPosterSelected(true);
        setSelectPosterFile(event.target.files[0]);
    };



    const handleSubmission = () => {
        console.log("selectedFile", selectedVideoFile);

        //    const config = {headers: { 'Content-Type': 'multipart/form-data'}};
        const formData = new FormData();
        formData.append("video", selectedVideoFile);
        formData.append("icon", selectIconFile);
        formData.append("poster", selectPosterFile);
        console.log(formData.headers);
        //  console.log(formData);
        //  axios.post('http://localhost:8080/videos/videoupload', formData, config)
        console.log(axios.defaults.headers);

        axios(
            {
                method: "post",
                url: 'http://localhost:8080/videos/videoupload',
                data: formData,
                headers: {
                    "content-type": "multipart/form-data"
                }
            }
        ).then((response) => {
            console.log(response);
            //  console.log(response.data);
            //  console.log(response.data.videoId);
        }).catch((error) => {
            console.log(error);
        });
    };




    // const formData = new FormData();
    // formData.append("file", selectedFile);
    // formData.append("videoDescription", videoDescription);



    return (
        <div>
            <h2>Video Uploader</h2>
            <div><label>Video Title: </label><input className="video-input" autocomplete="off" type="text" id="video_title" /></div>
            <div><label>Video Description: </label><input className="video-input" autocomplete="off" type="text" id="video_description" /></div>
            <div><label>Video Category: </label><input className="video-input" autocomplete="off" type="text" id="video_category" /></div>
            <div><label>Video Author: </label><input className="video-input" autocomplete="off" type="text" id="video_author" /></div>
            <div><label>Video Tags: </label><textarea id="tags" name="tags" rows="4" cols="50" disabled value="Not currently in use"></textarea></div>
            <div><label>Video: </label><input className="video-input" type="file" id="video" name="video" accept="video/mp4" onChange={changeHandler} /></div>
            <div><label>Icon: </label><input className="video-input" type="file" id="icon" name="icon" accept="image/*" onChange={iconHandler} /></div>
            <div><label>Poster: </label><input className="video-input" type="file" id="poster" name="poster" accept="image/*" onChange={posterHandler} /></div>
            {isVideoSelected ? (
                <div>
                    <div>Filename: {selectedVideoFile.type}</div>

                </div>
            ) : (
                <div>Select a file to show details</div>
            )
            }
            {isIconSelected ? (
                <div>
                    <div>Filename: {selectIconFile.name}</div>
                </div>

            ) : (
                <div>Select an icon to show details</div>
            )
            }
            <div>
                {isPosterSelected ? (
                    <div>Filename: {selectPosterFile.name}</div>

                ) : (
                    <div>Select a poster to show details</div>
                )
                }
            </div>

            <button onClick={handleSubmission}>Submit</button>
        </div>

    )

}

export default VideoUploader
