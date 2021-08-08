
const Video_Uploader = () => {
    //Will Reformat all of this - Goal to get it work and add new files to the server. 
    // currently no validation on the form.
    const posturl = () => {
        if (window.location.port === '3000') {
            console.log("On Development");
            return 'http://localhost:8080/videos/videoupload'
        }
        else {
            console.log("On Production");
            return (`${window.location.protocol}//${window.location.host}:${window.location.port}/videos/videoupload`)
        }
    }
    return (
        <div>
            <form encType="multipart/form-data" method="post" action={posturl()}>
                <div className="form-group">
                    <div>
                        <label>Video Title: </label>
                        <input name="video_title" />
                    </div>
                    <div>
                        <label>Video Description: </label>
                        <input name="video_description" />

                    </div>
                    <div>
                        <label>Upload Video File: </label>
                        <input type="file" name="video" />
                    </div>


                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
}


export default Video_Uploader
