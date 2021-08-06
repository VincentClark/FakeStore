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
  const videoRef = useRef(url);

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
    <div className="container">

      <h2>HTMLFiveVideo</h2>
      <video width="720" controls={videoInfo.defaultControls} ref={videoRef}>
        <source src={url} type="video/mp4" />

      </video>


    </div>
  );
};

export default HTML5Video;
