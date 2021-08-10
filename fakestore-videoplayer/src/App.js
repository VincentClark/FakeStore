import Header from "./Components/Header";
import HomePage from "./Components/Pages/HomePage";
import NavBar from "./Components/NavBar"
import ReactPlayer from "./Components/Pages/ReactPlayer"
import VideoReact from "./Components/Pages/VideoReact"
import NotFound from "./Components/Pages/NotFound"
import PlyrReact from "./Components/Pages/PlyrReact";
import Footer from "./Components/Parts/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import FS5VideoPlayer from "./Components/Pages/FS5VideoPlayer";
import Video_Uploader from "./Components/Pages/VideoUploader";
import VideoUploaderConfirmation from "./Components/Pages/VideoUploaderConfirmation";
import Video_Uploaderog from "./Components/Pages/VideoUploader_og";


function App() {
  const navConfig = [
    {
      id: 1,
      title: "Home",
      ref: "/videoplayer",
      component: HomePage,
    },
    {
      id: 2,
      title: "Video-React",
      ref: "/videoplayer/videoreact",
      component: VideoReact,
    },
    {
      id: 3,
      title: "React-Player",
      ref: "/videoplayer/reactplayer",
      component: ReactPlayer
    },
    {
      id: 4,
      title: "PlyrReact",
      ref: "/videoplayer/plyrreact",
      component: PlyrReact,
    }, {
      id: 5,
      title: "FSVideoPlayer",
      ref: "/videoplayer/fsvideoplayer",
      component: FS5VideoPlayer,
    },
    {
      id: 6,
      title: "Video Uploader",
      ref: "/videoplayer/videouploader",
      component: Video_Uploader,
    },
    {
      id: 7,
      title: "VideoUploaderOG",
      ref: "/videoplayer/videouploaderog",
      component: Video_Uploaderog,
    },


  ];
  //      <Route path="/reactvideoplayer" component = {ReactVideoPlayer} />
  // <Route path="/reactmediaplayer" component = {ReactMediaPlayer} />
  return (

    <Router>
      <div className="container_vc">

        <NavBar navConfig={navConfig} />
        <div className="container_xc">
          <Header title={"React VideoPlayer Evaluation"} />
          <Switch>
            {
              navConfig.map((element) => (
                <Route key={element.id} path={element.ref} component={element.component} exact />
              ))
            }
            <Route path="/videoplayer/videouploader" component={Video_Uploader} exact />
            <Route path="/videoplayer/videouploaderconfirmation" component={VideoUploaderConfirmation} exact />
            <Route path="*" component={NotFound} />

          </Switch>
        </div>
        <Footer />

      </div>
    </Router>

  );
}

export default App;
