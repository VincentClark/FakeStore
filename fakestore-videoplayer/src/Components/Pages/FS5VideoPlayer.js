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
  const url = 'http://localhost:8080/videos/videolist'


  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(json => {
        SetItems(json.videos);
        SetIsLoaded(true);
      })
      .catch(error => {
        SetError(error);
        SetIsLoaded(true);
      });

  }, []);
  if (error) {
    return <div>{error}</div>;
  }
  else if (!isLoaded) {
    return <div>Loading...</div>;
  }
  else {
    //console.log(items[0].src);
    //console.log("loading-nowPlaying", nowPlaying);
    if (nowPlaying === "") {
      SetNowPlaying(items[0]);
      // console.log("Initial Load")
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
      <div className="container-fluid temp-container">
        <HTML5Video
          videoInfo={nowPlaying}
        />
        <div>
          {
            // Map Video List 
            //

            items.map((videos, index) => {
              return (
                <div key={videos.id}>
                  <a href={`#${index}`} onClick={() => playVideo(index)}>
                    {videos.title}
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
