# ffmpeg presets for encoding videos

## Standard
### Emotes
`ffmpeg -i "" -c:v libvpx-vp9 -b:v 750K -filter:v "scale=1280:720,crop=in_w-500:in_h-80:x=295" -an -preset veryslow output.webm
`
### Highlight Intros
`ffmpeg -i "" -c:v libvpx-vp9 -b:v 850K -filter:v "scale=1280:720" -ac 1 -preset veryslow output.webm`

## HD
### Emotes
`ffmpeg -i "" -c:v libvpx-vp9 -crf 40 -b:v 0 -filter:v "crop=in_w-500:in_h-80:x=295" -ac 1 -preset veryslow output.webm`
### Highlight Intros
`ffmpeg -i "" -c:v libvpx-vp9 -crf 40 -b:v 0 -ac 1 -preset veryslow output.webm`
