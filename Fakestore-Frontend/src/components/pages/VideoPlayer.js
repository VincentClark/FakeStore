import React, { useState } from 'react';
import { Player} from "reactjs-media";

const VideoPlayer = () => {
  const sources = {
    ScrubJs: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
    bunnyTrailer: 'http://media.w3.org/2010/05/bunny/trailer.mp4',
    bunnyMovie: 'http://media.w3.org/2010/05/bunny/movie.mp4',
    test: 'http://media.w3.org/2010/05/video/movie_300.webm'
  };

  //const [src, setSource] = useState(src);

  return (
    <div>
      <Player src = "http://media.w3.org/2010/05/sintel/trailer.mp4" />
    </div>
  );
};

VideoPlayer.defaultProps = {
  url: "http://media.w3.org/2010/05/sintel/trailer.mp4",
};

export default VideoPlayer;
