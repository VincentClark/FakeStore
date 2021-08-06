/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import { useState, useEffect } from "react";
import HTML5Video from "../Parts/HTML5Video";


const FS5VideoPlayer = () => {
  //Generate the playList
  const [isLoaded, SetIsLoaded] = useState(false);
  const [error, SetError] = useState(null);
  const [items, SetItems] = useState([]);
  const [nowPlaying, SetNowPlaying] = useState("");


  // Needs to work on variable declaration and not hardcoded
  // This should come from the app.js through prop.
  //for release I need to change this. 
  const currenthost = window.location.host;
  const currentport = window.location.port;
  const currentprotocal = window.location.protocol;
  const path = () => {
    if (currentprotocal === "http:") {
      return 'http://localhost:8080/videos'
    } else {
      return `${currentprotocal}//${currenthost}${currentport}/videos/`;
    }
  };


  const urli = () => {
    if (currentport === "3000") {
      return 'http://localhost:8080/videos/videostub'
    } else {
      return (`${currentprotocal}//${currenthost}/videos/videostub`);
    }
  };

  //const url = 'http://localhost:8080/videos/videostub'
  console.log(urli());
  useEffect(() => {
    fetch(urli())
      .then(response => response.json())
      .then(json => {
        SetItems(json.videos);
        SetIsLoaded(true);
      })
      .catch(error => {
        SetError(error);
        SetIsLoaded(true);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (error) {
    return <div>{error}</div>;
  }
  else if (!isLoaded) {
    return <div>Loading...</div>;
  }
  else {
    console.log(items.src);
    //console.log("loading-nowPlaying", nowPlaying);
    if (nowPlaying === "") {
      SetNowPlaying(items[0]);
      console.log("Initial Loadd")
    }
    else {
      // console.log("all good")

    }
  }

  function playVideo(videoObj) {
    //  console.log("videoObj", videoObj);
    SetNowPlaying(items[videoObj]);

    //  console.log("Now Playing", nowPlaying);

  }
  return (
    <>
      <div>
        <a href="/videoplayer/VideoUploader">Upload Video</a>
      </div>
      <div className="">
        <HTML5Video
          videoInfo={nowPlaying}
        />
        <div className="grid-container_vc">
          {
            // Map Video List 
            //

            items.map((videos, index) => {
              return (
                <div key={videos.id} className="grid_item">
                  <a href={`#${index}`} onClick={() => playVideo(index)}>
                    <img src={`${path()}/videoimage/${videos.src}_icon.png`} alt={videos.title} className="video_icon" />
                  </a>
                </div>
              )
            }
            )}


        </div>
      </div>
    </>
  );
};


export default FS5VideoPlayer;
