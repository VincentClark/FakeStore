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
    }

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
            <Route path="*" component={NotFound} />

          </Switch>
        </div>
        <Footer />

      </div>
    </Router>

  );
}

export default App;
