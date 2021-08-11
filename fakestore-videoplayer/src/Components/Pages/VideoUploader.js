import { useState } from 'react'
const axios = require('axios');
// set up state rules

const VideoUploader = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectIconFile, setSelectIconFile] = useState(null);
    const [selectPosterFile, setSelectPosterFile] = useState(null);
    const [isSelected, setIsSelected] = useState(false);
    const [isIconSelected, setIsIconSelected] = useState(false);
    const [isPosterSelected, setIsPosterSelected] = useState(false);

    // const [videoDescription, setVideoDescription] = useState(null);
    // const [videoTitle, setVideoTitle] = useState(null);
    //const [videoTags, setVideoTags] = useState(null);
    //const [videoCategory, setVideoCategory] = useState(null);
    // const [videoAuthor, setVideoAuthor] = useState(null);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
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
        console.log("selectedFile", selectedFile);

        //    const config = {headers: { 'Content-Type': 'multipart/form-data'}};
        const formData = new FormData();
        formData.append("video", selectedFile);
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

                }
            }
        ).then((response) => {
            console.log(response);
            //  console.log(response.data);
            //  console.log(response.data.videoId);
        }).catch((error) => {
            console.log(error);
        });


        //delete formData.headers['Content-Type'];
        // fetch('http://localhost:8080/videos/videoupload',
        //     {
        //         method: 'POST',
        //         body: formData,
        //         'Content-Type': 'multipart/form-data',
        //         ...formData.getHeaders()

        //     })
        //     .then(response => response.json())
        //     .then((result) => {
        //         console.log('Success:', result);
        //     })
        //     .catch((error) => {
        //         console.log('Error', error);
        //     });
    };




    // const formData = new FormData();
    // formData.append("file", selectedFile);
    // formData.append("videoDescription", videoDescription);



    return (
        <div>
            <h2>Video Uploader</h2>
            <label>Video</label><input type="file" id="video" name="video" onChange={changeHandler} />
            <label>Icon</label><input type="file" id="icon" name="icon" onChange={iconHandler} />
            <label>Poster</label><input type="file" id="poster" name="poster" onChange={posterHandler} />
            {isSelected ? (
                <div>
                    <p>Filename: {selectIconFile.name}</p>

                </div>
            ) : (
                <p>Select a file to show details</p>
            )}
            <div>
                <button onClick={handleSubmission}>Submit</button>
            </div>
        </div>
    )

}

export default VideoUploader
