aws s3 sync ../resources/heroes s3://oit-resources/heroes --exclude "*" --include "*.ogg" --acl "public-read" --content-type "audio/ogg" --profile overwatch
aws s3 sync ../resources/heroes s3://oit-resources/heroes --exclude "*" --include "*.png" --acl "public-read" --content-type "image/png" --profile overwatch
aws s3 sync ../resources/heroes s3://oit-resources/heroes --exclude "*" --include "*.jpg" --acl "public-read" --content-type "image/jpg" --profile overwatch
aws s3 sync ../resources/heroes s3://oit-resources/heroes --exclude "*" --include "*.webm" --acl "public-read" --content-type "video/webm" --profile overwatch

aws s3 sync ../resources/updates s3://oit-resources/updates --exclude "*" --include "*.jpg" --acl "public-read" --content-type "image/jpg" --profile overwatch
aws s3 sync ../resources/updates s3://oit-resources/updates --exclude "*" --include "*.webm" --acl "public-read" --content-type "video/webm" --profile overwatch

pause