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

### To Build Front End

1. Navigate to fakestore_frontend
1. npm install
1. npm run build
1. delete fakestore_rearend/server/build
1. copy folder build fakestore_frontend/ to fakestore_rearend/build
1. NOTE - There is a current build existing in both the Front End and Video portions

### To Build Video-Player

### To start dev server

#### **NOTE** there are no enviornment dependincies as of 5/24/2021

1. navigate to fakestore_rearend
1. npm start

### Testing Video Service

1. start rearend server
1. In your web browser navigate to (http://localhost:3000/videos/videofiles?videosrc=testvideo1)
1. To change video to second test replace the value in videosrc to ScrubJay_20210511.mp4
1. If you would like to add a video ensue that it is .mp4 and place it in fakestore_rearend/server/media_library/videos_available
1. ENSUER THAT YOU ADD ANY TEST VIDEOS TO .gitignore

## Adding Videos

Due to limitation test videos could not be a part of the build. For security reasons, you must place your own videos to test.
_Version 1.0x_
Place the videos in fakestore-rearend/server/media*library/videos_available/
Use the url: localhost:8080/videos/videofiles?videosrc=\_your video*
This will change in Version 1.1

# Updates

## Version 1.0

Transfered this project from GitLab. The video files had to be removed from the project. See _how to add Videos_ to ensure a proper test.
