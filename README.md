# Fake$tore Front & Video Player & Rear End

## Goals of Project

- To create an easily templatized Express server with service oriented structuer
- Create multiple react projects using a single server
- Create a Video Player service and front end that can be used interchangably with minimal effort.
- Test / Develop Video Players

## Current Version 1.09

Updated: 8/2/2021

### Version 1.0

- Migrated from GitLab. Unable to bring history.

### Verision 1.09

- Created a JSON to drive the files through a video route 'fakestore-rearend/server/media-library/videos/video_data/video_playlist.json' (this is a temp solution before putting into DB)
- Access the video_playlist.json through localhost:8080/videos/videolist
- This is currently set on the route portion, plan to move into the video service when migrating to a DB solution.
- video-player Comonents/Pages/FS5VideoPlayer imports JSON from video server.
- Adjusted to update on src change ~/Components/Parts/HTML5Video.js

### Version 1.10
- Added Mongo DB to project. See "Notes.txt" for how to connect a mongo DB and provide it with the proper information. 
- the ~/videolist route is still enabled. If you do not wish to set up mongo DB you can change FS5VideoPlayer.js line 17 replace videostub with videolist
- In Mongo DB I added hook for future enhancements which allows commenting on the video. 

### Version 1.10.1
- Fixed Video Players NAV Style
- Some adjustments to the icon service. (renamed)
- Fixed CSS issue. 

### Version 1.2
- Newest stable version. Close to an MVP. 


Updated: 8/31/2021

## Branches
8/31/2021 puting eveything back to main.

# To Do
1. clean up the ReadMe files so each README will pertain just to that folder. 
1. Document recent changes
    - Added Upload Support
    - Added MongoDB Local
- Move to cload MongDB. 

## To Build Front End

1. Navigate to fakestore_frontend
1. npm install
1. npm run build
1. delete fakestore_rearend/server/build
1. copy folder build fakestore_frontend/ to fakestore_rearend/build
1. NOTE - There is a current build existing in both the Front End and Video portions

I am going to keep the style design in this version, which diverts from the videoplayer's nav.
### Setting up the Nav
In App.js (frontend and video player)
add or subtract contents in const navConfig
``` javascript
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

```


## To Build Video-Player
- navigate to fakestore-videoplayer
- npm run build
- copy the files from the build folder to fakestore-rearend/video_build

### Now requires mongodb
video db: fs-videodb
collection: video_stubs
see - fakestore-rearend/notes.txt on how to work with the mongodb collection


## To Enter Project
Once it is set up, go to "Video 'Shorts'" > FSPlayer Everything else is under construction. 
#### **NOTE** there are no enviornment dependincies as of 5/24/2021
1. navigate to fakestore_rearend
1. npm start
1. If the current videoplayer build is in the video_build directory everything you need is present. 

## Testing Video Service

1. start rearend server
1. In your web browser navigate to (http://localhost:8080/videos/videofiles?videosrc=testvideo1)
1. To change video to second test replace the value in videosrc to ScrubJay_20210511.mp4
1. If you would like to add a video ensue that it is .mp4 and place it in fakestore_rearend/server/media_library/videos_available
1. ENSUER THAT YOU ADD ANY TEST VIDEOS TO .gitignore

- Check to see if it is working */videos/dir 
    - expected result: directroy listing 
- */videos/videolist
    - expected result: static json list
- */videos/videofiles?videosrc=srubjay
    - expected result: video of scrubjay
- */vieos/video_stub
    - expected result: mongodb of listed video stubs to power /video/fFS5VideoPlayer
- */videos/videouploader

## Adding Videos

Due to limitation test videos could not be a part of the build. For security reasons, you must place your own videos to test.
_Version 1.0x_
Place the videos in fakestore-rearend/server/media*library/videos_available/
Use the url: localhost:8080/videos/videofiles?videosrc=\_your video*
