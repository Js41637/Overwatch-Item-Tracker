# ffmpeg presets for encoding videos

These presets assume a 1920x1080 video

## Standard
### Emotes
`ffmpeg -i '.mp4' -c:v libvpx-vp9 -crf 58 -b:v 0 -vf "crop=1080:x=410" -r 40 -an -preset veryslow output.webm`
### Highlight Intros
`ffmpeg -i ".mp4" -c:v libvpx-vp9 -crf 58 -b:v 0 -filter:v "scale=1280:720" -r 40 -ac 1 -preset veryslow output.webm`

## HD
### Emotes
`ffmpeg -i '.mp4' -c:v libvpx-vp9 -crf 34 -b:v 0 -vf "crop=1080:x=410" -r 50 -ac 1 -preset veryslow ouput-hd.webm`
### Highlight Intros
`ffmpeg -i ".mp4" -c:v libvpx-vp9 -crf 36 -b:v 0 -r 50 -ac 1 -preset veryslow ouput-hd.webm`


## Batch Emotes
```
for %%a in ("*.*") do (
	ffmpeg -i "%%a" -c:v libvpx-vp9 -crf 58 -b:v 0 -vf "crop=1080:x=410" -r 40 -an -preset veryslow "converted\%%~na.webm"
	ffmpeg -i "%%a" -c:v libvpx-vp9 -crf 34 -b:v 0 -vf "crop=1080:x=410" -r 50 -ac 1 -preset veryslow "converted\%%~na-hd.webm"
)
pause
```
