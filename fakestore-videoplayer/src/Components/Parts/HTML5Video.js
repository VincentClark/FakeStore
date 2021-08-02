const HTML5Video = ({videoInfo }) => {
const urlPath = () =>{
  const hostname = window.location.hostname;
  const port = window.location.port;
  const myDocker = `http://${hostname}:${port}`
  const myDev = "http://localhost:8080";
  if(port === "3000"){
    return myDev;
  }else{
    return myDocker;
  }
}
/**
 * Adding logic for chromecast button
 * Currently throwing a lot of erros. Revisit
 * https://stackoverflow.com/questions/44999267/how-to-chromecast-enable-a-website/49089116
 */


  return (
    <div>
      
      <h2>HTMLFiveVideo</h2>
      <video width="720" controls={videoInfo.defaultControls}>
            <source src={`${urlPath()}/videos/videofiles?videosrc=${videoInfo.src}`} /> 
           {console.log(urlPath())}
      </video>

     
    </div>
  );
};

export default HTML5Video;
