# ffmepg commands

## create image

ffmpeg -ss 00:00:00 -i VIDEOFILE -vframes 1 -q:v 2 THUMBNAILNAME.jpg

## Basic Transcodeing

ffmpeg -i INPUT OUTPUT
