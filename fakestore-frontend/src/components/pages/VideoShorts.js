import ReactPlayer from 'react-player';
const VideoShorts = () => {
    return (
        <div className="container-fluid">
            <ReactPlayer 
            url = "http://media.w3.org/2010/05/sintel/trailer.mp4" controls={true} 
            
            />
        </div>
    );
};

export default VideoShorts;
