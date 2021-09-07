import { useEffect, useRef } from "react";


const HTML5Video = ({ videoInfo }) => {
  const urlPath = () => {
    const hostname = window.location.hostname;
    const port = window.location.port;
    const myDocker = `http://${hostname}:${port}`
    const myDev = "http://localhost:8080";
    if (port === "3000") {
      return myDev;
    } else {
      return myDocker;
    }
  }
  let url = `${urlPath()}/videos/videofiles?videosrc=${videoInfo.src}`
  let poster = `${urlPath()}/videos/videoimage/${videoInfo.poster}`
  const videoRef = useRef(url);
  console.log("poster", poster);
  const previousUrl = useRef(url);
  useEffect(() => {
    if (previousUrl.current === url) {
      console.log("current", previousUrl.current);
      console.log("videoref", videoRef.current);
      console.log("DAMN", videoInfo)
      return;
    }
    if (videoRef.current) {
      console.log(".load()");
      videoRef.current.load();
    }
    previousUrl.current = url;
  }, [url, videoInfo]);


  /**
   * Adding logic for chromecast button
   * Currently throwing a lot of erros. Revisit
   * https://stackoverflow.com/questions/44999267/how-to-chromecast-enable-a-website/49089116
   */

  //`${urlPath()}/videos/videofiles?videosrc=${videoInfo.src}}
  return (
    <div className="container-5video">
      <div className="container-video-title">{videoInfo.title}</div>
      <video width="720" className="display-video" controls={videoInfo.defaultControls} poster={poster} ref={videoRef}>
        <source src={url} type="video/mp4" />
      </video>
      <div className="container-video-description">
        {videoInfo.description}
      </div>
      <div className="container-upvotes">
        Up Votes: {videoInfo.upvotes}
      </div>
    </div>
  );
};

export default HTML5Video;
