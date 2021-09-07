/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from 'react'
import { urlPath } from '../../Functions/BaseFunctions'
//import uploadicon from '../../../public/assets/images/uploadicon.png';
//import uploadposter from '../../../public/assets/images/uploadpster.png';

const axios = require('axios');
// set up state rules

const VideoUploader = () => {
    const [selectedVideoFile, setSelectedVideoFile] = useState(null);
    const [selectIconFile, setSelectIconFile] = useState(null);
    const [selectPosterFile, setSelectPosterFile] = useState(null);
    const [isIconSelected, setIsIconSelected] = useState(false);
    const [isPosterSelected, setIsPosterSelected] = useState(false);
    const [hasBeenUploaded, setHasBeenUploaded] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);



    // const [videoDescription, setVideoDescription] = useState(null);
    // const [videoTitle, setVideoTitle] = useState(null);
    //const [videoTags, setVideoTags] = useState(null);
    //const [videoCategory, setVideoCategory] = useState(null);
    // const [videoAuthor, setVideoAuthor] = useState(null);
    console.log(isIconSelected, isPosterSelected)
    const changeHandler = (event) => {
        setSelectedVideoFile(event.target.files[0]);
        preview_video(event);
    };

    const iconHandler = (event) => {
        setIsIconSelected(true);
        setSelectIconFile(event.target.files[0]);
        preview_image(event);
    };
    const posterHandler = (event) => {
        setIsPosterSelected(true);
        setSelectPosterFile(event.target.files[0]);
        preview_poster(event);
    };
    const titleHandler = (event) => {
        setTitle(event.target.value);
    };



    const handleSubmission = () => {
        console.log("selectedFile", selectedVideoFile);

        //    const config = {headers: { 'Content-Type': 'multipart/form-data'}};
        const formData = new FormData();

        formData.append("video", selectedVideoFile);
        formData.append("icon", selectIconFile);
        formData.append("poster", selectPosterFile);
        formData.append("title", title);
        console.log(formData.headers);
        //  console.log(formData);
        //  axios.post('http://localhost:8080/videos/videoupload', formData, config)
        console.log(axios.defaults.headers);
        //need to refine BaseFunctions to handle this better.
        axios(
            {
                method: "post",
                url: urlPath('/videoupload'),
                data: formData,
                headers: {
                    "content-type": "multipart/form-data"
                }
            }
        ).then((response) => {
            console.log(response);
            setHasBeenUploaded(true);
            //  console.log(response.data);
            //  console.log(response.data.videoId);
        }).catch((error) => {
            console.log(error);
        });
    };
    useEffect(() => {
        console.log("useEffect");

    }, [hasBeenUploaded]);
    function preview_image(event) {
        let reader = new FileReader();
        reader.onload = function () {
            let output = document.getElementById('output_image_icon');
            output.src = reader.result;
        }
        reader.readAsDataURL(event.target.files[0]);
        console.log(event.target.files[0]);
    }
    function preview_poster(event) {
        let reader = new FileReader();
        reader.onload = function () {
            let output = document.getElementById('output_image_poster');
            output.src = reader.result;
        }
        reader.readAsDataURL(event.target.files[0]);
        console.log(event.target.files[0]);
    }

    function preview_video(event) {
        let reader = new FileReader();
        // let poster = new FileReader();
        reader.onload = function () {
            let output = document.getElementById('output_video');
            output.src = reader.result;
            output.poster = "";
            //output.poster = poster.result;
        }


        reader.readAsDataURL(event.target.files[0]);
        console.log(event.target.files[0]);
    }




    // const formData = new FormData();
    // formData.append("file", selectedFile);
    // formData.append("videoDescription", videoDescription);



    return (
        <div>
            <h2>Video Uploader</h2>
            <div><label>Video Title: </label><input className="video-input" autoComplete="off" type="text" id="title" name="title" onChange={(event) => titleHandler(event)} /></div>
            <div><label>Video Description: </label><textarea className="video-input" autoComplete="off" type="text" id="description" name="description"></textarea></div>
            <div><label>Video Category: </label><input className="video-input" autoComplete="off" type="text" id="video_category" name="category" /></div>
            <div><label>Video Author: </label><input className="video-input" autoComplete="off" type="text" id="creator" name="creator" /></div>
            <div><label>Video Tags: </label><textarea id="tags" name="tags" rows="4" cols="50" disabled value="Not currently in use"></textarea></div>
            <div className="media-flex-container">
                <div className="image-uploader">
                    <video src="" width="160px" height="90px" id="output_video" poster="assets/images/uploadvideo.png"></video>
                    <input className="video-input" type="file" id="video" name="video" accept="video/mp4" onChange={(event) => changeHandler(event)} />
                </div>
                <div className="image-uploader" id="icon">
                    <img src="assets/images/uploadicon.png" className="img-upload" id="output_image_icon" width="90" height="90" />
                    <input
                        className="video-input"
                        type="file" id="icon"
                        name="icon" accept="image/*"

                        onChange={(event) => iconHandler(event)} />

                </div>
                <div className="image-uploader">
                    <img src="assets/images/uploadposter.png" className="img-upload" id="output_image_poster"
                        width="160px"
                        height="90px"
                    />
                    <input className="video-input" type="file" id="poster" name="poster" accept="image/*" onChange={(event) => posterHandler(event)} /></div>

            </div>
            <div>
                <label>Default Controls</label><input type="checkbox" id="default_controls" name="default_controls" checked={true} onChange={() => 'true'} />
            </div>

            <button onClick={handleSubmission}>Submit</button>
        </div>

    )

}

export default VideoUploader
