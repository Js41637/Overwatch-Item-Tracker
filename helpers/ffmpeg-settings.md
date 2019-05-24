# ffmpeg presets for encoding videos

A guide on how I record the emote and highlight intro videos and the quality settings I use.

## Video Recording Info
 * These presets are designed to work at 1920x1080, they will not work correctly if the resolution isn't exact
 * Videos are recorded using NVIDIA's Shadowplay with manual start and stop. 1080p 50Mbps @ 60fps.
 * Game settings are all at max
 * Ensure game audio is all turned up and that music volume is turn off
 * Emotes need to start being recorded just before the start of the emote (idle) and end just after he is back to idle position.
 * Highlight intros require a lot of trial and error, you have to start as soon as it resets and end just as it finishes. You can usually tell if you have missed the start time but you will notice in the video if you missed it. You can of course just use a video editor if you wish.

After you have recorded all the videos you wish you can follow the settings below on how to convert them all.

If you do wish to record these videos yourself and submit them to this repo, please note that I also require the raw files as well just for safe keeping. I keep the original files (before conversion) of every emote and intro video in the event anything happens. This also lets me bulk reconvert them all with slightly different settings if I wish. This is also why I require the recordings to start and end exactly when the emote/intro starts so that I can convert all files without the need to edit any of them.

## Encoding Options
I convert all the videos using [ffmpeg](https://ffmpeg.org/), it is a CLI, you open a command window in the directory where the videos are recorded and enter the commands like below replacing the INPUT and OUTPUT to the names of the respective files.

### Emotes
#### SD
```
ffmpeg -i INPUT.mp4 -c:v libvpx-vp9 -crf 58 -b:v 0 -vf "crop=1080:x=420" -r 40 -an -preset veryslow OUTPUT.webm
```

#### HD
```
ffmpeg -i INPUT.mp4 -c:v libvpx-vp9 -crf 34 -b:v 0 -vf "crop=1080:x=420" -r 50 -ac 1 -preset veryslow OUTPUT-hd.webm
```

### Highlight Intros
#### SD
```
ffmpeg -i INPUT.mp4 -c:v libvpx-vp9 -crf 58 -b:v 0 -vf "scale=1280:720" -r 40 -ac 1 -preset veryslow OUTPUT.webm
```

#### HD
```
ffmpeg -i INPUT.mp4 -c:v libvpx-vp9 -crf 37 -b:v 0 -r 50 -ac 1 -preset veryslow OUTPUT-hd.webm
```

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
