/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import { useState } from "react";
import HTML5Video from "../Parts/HTML5Video";

const FS5VideoPlayer = () => {
  const playList = [
    {
      id: 1,
      title: "Test Video 1",
      src: "testvideo",
      description: "This is a simple test Video coming from the player",
      type: "video/mp4",
      defaultControls: true,
    },
    {
      id: 2,
      title: "Scrub Jay",
      src: "scrubjay",
      description: "My little Blue Friend",
      type: "video/mp4",
      defaultControls: true,
    },
  ];
//   const [sources, SetSources] = useState(
//  [   {
//       id: 1,
//       title: "Test Video 1",
//       src: "testvideo",
//       description: "This is a simple test Video coming from the player",
//       type: "video/mp4",
//       defaultControls: true,
//     },
//     {
//       id: 2,
//       title: "Scrub Jay",
//       src: "scrubjay",
//       description: "My little Blue Friend",
//       type: "video/mp4",
//       defaultControls: true,
//     },]
//   );
  const [nowPlaying,SetNowPlaying] = useState(1);
  // const [playclip, SetPlayClip] = useState(
  //   playclip = sources[0]
  // )

  const setClip = (id) => {
    //Need to map and find what the clip id will be faking it for now. 
    //SetSource(playList[1]);
    // SetSource(playList.map((
    //   clip => clip.id === id
    //   )))
    console.log("id",id)
    //SetNowPlaying(id);
    //SetNowPlaying(sources[1]);
    //<button onClick={SetNowPlaying(1)}>Test Clip</button>
  };
  //bulk of our video. 
  return (
    <div className="container-fluid">
      <HTML5Video
        videoInfo = {playList[nowPlaying]}
      />
      <div>
      <a href="#" onClick={setClip(1)}>Test Clip</a>
      </div>
    </div>
  );
};

export default FS5VideoPlayer;
