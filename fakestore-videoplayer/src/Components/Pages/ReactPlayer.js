/* eslint-disable jsx-a11y/anchor-is-valid */
import ReactPlayer from 'react-player';



const sources = {
    ScrubJs: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
    bunnyTrailer: 'http://media.w3.org/2010/05/bunny/trailer.mp4',
    bunnyMovie: 'http://media.w3.org/2010/05/bunny/movie.mp4',
    test: 'http://media.w3.org/2010/05/video/movie_300.webm'
  };
//<Player src = "http://media.w3.org/2010/05/sintel/trailer.mp4" />
const ReactMediaPlayer = ({url}) => {

  return (
    <>
    <div className="container-fluid">
    <h3>React Player</h3>
    <ul>
      <li>More documentation</li>
      <li>Easy to install</li>
      <li>No Poster Option (yet)</li>
    </ul>
    <sub>https://www.npmjs.com/package/react-player</sub>
    <div>
      <ReactPlayer 
      url="http://localhost:8080/videos/videofiles?videosrc=testvideo" 
      controls={true}
      />
    </div>
    <div>
        <a href="#">Change</a>
    </div>
    </div>
    </>
  );
};

ReactMediaPlayer.defaultProps = {
  url: sources.ScrubJs,
};

export default ReactMediaPlayer;
