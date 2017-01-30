# ffmpeg presets for encoding videos

## Standard
### Emotes
`ffmpeg -i ".mp4" -c:v libvpx-vp9 -crf 58 -b:v 0 -filter:v "scale=1280:720,crop=in_w-500:in_h-80:x=295" -an -preset veryslow output.webm`
### Highlight Intros
`ffmpeg -i ".mp4" -c:v libvpx-vp9 -crf 58 -b:v 0 -filter:v "scale=1280:720" -ac 1 -preset veryslow output.webm`

## HD
### Emotes
`ffmpeg -i ".mp4" -c:v libvpx-vp9 -crf 38 -b:v 0 -filter:v "crop=in_w-500:in_h-80:x=295" -ac 1 -preset veryslow ouput-hd.webm`
### Highlight Intros
`ffmpeg -i ".mp4" -c:v libvpx-vp9 -crf 38 -b:v 0 -ac 1 -preset veryslow ouput-hd.webm`
