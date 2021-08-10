import { useState } from 'react'
const axios = require('axios');
// set up state rules

const VideoUploader = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isSelected, setIsSelected] = useState(false);

    // const [videoDescription, setVideoDescription] = useState(null);
    // const [videoTitle, setVideoTitle] = useState(null);
    //const [videoTags, setVideoTags] = useState(null);
    //const [videoCategory, setVideoCategory] = useState(null);
    // const [videoAuthor, setVideoAuthor] = useState(null);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        console.log("before", isSelected);
        setIsSelected(true);
        console.log("after", isSelected);
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
        )

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
            <input type="file" id="video" name="video" onChange={changeHandler} />
            {isSelected ? (
                <div>
                    <p>Filename: {selectedFile.name}</p>
                    <p>Filetype: {selectedFile.type}</p>
                    <p>Size in bytes: {selectedFile.size}</p>
                    <p>
                        lastModifiedDate:{' '}
                        {selectedFile.lastModifiedDate.toLocaleDateString()}
                    </p>
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
