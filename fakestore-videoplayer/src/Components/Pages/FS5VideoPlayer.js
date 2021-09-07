/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import { useState, useEffect } from "react";
import HTML5Video from "../Parts/HTML5Video";
import { urlPath } from '../../Functions/BaseFunctions'


const FS5VideoPlayer = () => {
  //Generate the playList
  const [isLoaded, SetIsLoaded] = useState(false);
  const [error, SetError] = useState(null);
  const [items, SetItems] = useState([]);
  const [nowPlaying, SetNowPlaying] = useState("");

  const isNowPlaying = (nplaying) => {
    console.log("nplaying", nplaying.length);
    if (nplaying.length < 1) {
      return (<div>Please Select a Video</div>)
    } else {

      return (<HTML5Video
        videoInfo={nowPlaying}
      />
      )
    }
  };



  // const urli = () => {
  //   if (currentport === "3000") {
  //     return 'http://localhost:8080/videos/videostub'
  //   } else {
  //     return (`${currentprotocal}//${currenthost}/videos/videostub`);
  //   }
  // };

  //const url = 'http://localhost:8080/videos/videostub'
  console.log(urlPath('videostub'))
  useEffect(() => {
    fetch(urlPath('videostub'))
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

  }

  function playVideo(videoObj) {
    //  console.log("videoObj", videoObj);
    SetNowPlaying(items[videoObj]);

    //  console.log("Now Playing", nowPlaying);

  }
  return (
    <div className="container">
      <div>
        <a href="/videoplayer/VideoUploader">Upload Video</a>
      </div>
      <div className="container-video">
        {isNowPlaying(nowPlaying)}
        <div className="container-thumbnails">
          {
            // Map Video List 
            //

            items.map((videos, index) => {
              return (
                <div key={videos.title} className="thumb-item">

                  <a href="#" onClick={() => playVideo(index)}>
                    <img src={`${urlPath('videoimage/')}${videos.src}_icon.png`} alt={videos.title} className="thumb-image" />
                  </a>
                </div>
              )
            }
            )}


        </div>
      </div>
    </div>
  );
};


export default FS5VideoPlayer;
