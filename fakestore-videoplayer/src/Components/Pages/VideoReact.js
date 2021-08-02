import { Player } from "video-react";

const ReactVideoPlayer = ({ url }) => {
  // const sources = {
  //     ScrubJs: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
  //     bunnyTrailer: 'http://media.w3.org/2010/05/bunny/trailer.mp4',
  //     bunnyMovie: 'http://media.w3.org/2010/05/bunny/movie.mp4',
  //     test: 'http://media.w3.org/2010/05/video/movie_300.webm'
  //   };
  return (
    <div className="container-fluid">
      <h2>video-react player</h2>
      <ul>
        <li>
        It has been a struggle to get this working. A lot of dependencie issues.
        </li>
        <li>Unable to get the CSS to work right.</li>
        <li>Will finetune controls to auto start.</li>
      </ul>

      <Player
        playsInline
        poster="/assets/poster.png"
        src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
        width = {720}
        height = {480}
      />
    </div>
  );
};

ReactVideoPlayer.defaultProps = {
  url: "http://media.w3.org/2010/05/sintel/trailer.mp4",
};
export default ReactVideoPlayer;
