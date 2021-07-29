# Fake$tore Front & Rear End
Adding this back to branch cos I will be working on it. 

### To Build Front End
1. Navigate to fakestore_frontend
1. npm run build
1. delete fakestore_rearend/server/build
1. copy folder build fakestore_frontend/ to fakestore_rearend/build

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
