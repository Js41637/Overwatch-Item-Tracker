# ffmpeg presets for encoding videos

These presets assume a 1920x1080 video.  
The conversion will not work correctly if the resolution isn't exactly 1920x1080.

## Video Recording
Videos are recorded using Shadowplay with manual start and stop. 1080p 50Mbps @ 60fps.
All the settings in the game are also at max.  

Emotes need to start being recorded just before the start of the emote (idle) and end just after he is back to idle position.
Highlight intros require a lot of trial and error, you have to start as soon as it resets and end just as it finishes. You can usually tell if you have missed the start time but you will notice in the video if you missed it.

## Standard
### Emotes
`ffmpeg -i INPUT_FILE.mp4 -c:v libvpx-vp9 -crf 58 -b:v 0 -vf "crop=1080:x=420" -r 40 -an -preset veryslow output.webm`
### Highlight Intros
`ffmpeg -i INPUT_FILE.mp4 -c:v libvpx-vp9 -crf 58 -b:v 0 -vf "scale=1280:720" -r 40 -ac 1 -preset veryslow output.webm`

## HD
### Emotes
`ffmpeg -i INPUT_FILE.mp4 ' -c:v libvpx-vp9 -crf 34 -b:v 0 -vf "crop=1080:x=420" -r 50 -ac 1 -preset veryslow ouput-hd.webm`
### Highlight Intros
`ffmpeg -i INPUT_FILE.mp4 -c:v libvpx-vp9 -crf 37 -b:v 0 -r 50 -ac 1 -preset veryslow ouput-hd.webm`


## Batch Converting Files
You can enter this script into a .bat file and run it in the directory containing the videos that you recorded. It converts them all into a SD and a HD version into a `converted` folder. You might need to make the folder before you begin.

You must also seperate the emotes and highlight intro videos into seperate folders as they have unique settings and this script will convert all video files in the directory. Technically it will *attempt* to convert any file in the directory so make sure you only have the videos you cant to convert.

### Emotes
```
for %%a in ("*.*") do (
	ffmpeg -i "%%a" -c:v libvpx-vp9 -crf 58 -b:v 0 -vf "crop=1080:x=420" -r 40 -an -preset veryslow "converted\%%~na.webm"
	ffmpeg -i "%%a" -c:v libvpx-vp9 -crf 34 -b:v 0 -vf "crop=1080:x=420" -r 50 -ac 1 -preset veryslow "converted\%%~na-hd.webm"
)
pause
```

### Highlight Intros
```
for %%a in ("*.*") do (
	ffmpeg -i "%%a" -c:v libvpx-vp9 -crf 58 -b:v 0 -vf "scale=1280:720" -r 40 -ac 1 -preset veryslow "converted\%%~na.webm"
	ffmpeg -i "%%a" -c:v libvpx-vp9 -crf 37 -b:v 0 -r 50 -ac 1 -preset veryslow "converted\%%~na-hd.webm"
)
pause
```
