
const Video_Uploader = () => {
    //Will Reformat all of this - Goal to get it work and add new files to the server. 
    // currently no validation on the form.
    return (
        <div>
            <form>
                <div className="form-group">
                    <div>
                        <lable>Video Title: </lable>
                        <input name="video_title" />
                    </div>
                    <div>
                        <lable>Video Description: </lable>
                        <input name="video_description" />

                    </div>
                    <div>
                        <label>Upload Video File: </label>
                        <input type="file" name="file" />
                    </div>
                    <div>
                        <lable>Upload Video Poster: </lable>
                        <input type="file" name="poster" />
                    </div>
                    <div>
                        <lable>Upload Video Icon: </lable>
                        <input type="file" name="icon" />
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
