import Plyr from "plyr-react";
import "plyr-react/dist/plyr.css";

const videoSrc = {
    type:"video",
    sources: [
        {
            src: "http://media.w3.org/2010/05/sintel/trailer.mp4",
        }
    ]
}
const PlyrReact = () => {
  return (
    <div className="container-fluid">
        <ul>
            <li>Documentation is lacking. Took a while to troublshoot the sources.</li>
            <li>Cannont control size very well.</li>
        </ul>
        <Plyr source={videoSrc} controls={true} 
        width={720}
        height="480px"
        />
    
    </div>
  );
};

export default PlyrReact;
