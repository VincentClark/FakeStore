# ffmepg commands

## create image

ffmpeg -ss 00:00:00 -i VIDEOFILE -vframes 1 -q:v 2 THUMBNAILNAME.jpg

## Basic Transcodeing

ffmpeg -i INPUT OUTPUT

## draw text

ffmpeg -i input.jpg -vf "drawtext=text='Test Text':fontcolor=white:fontsize=75:x=1002:y=100:" output.jpg
