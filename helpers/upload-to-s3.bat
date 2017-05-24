aws s3 sync ../resources/heroes s3://oit-resources/heroes --exclude "*" --include "*.ogg" --acl "public-read" --content-type "audio/ogg" --size-only --profile overwatch
aws s3 sync ../resources/heroes s3://oit-resources/heroes --exclude "*" --include "*.png" --acl "public-read" --content-type "image/png" --size-only --profile overwatch
aws s3 sync ../resources/heroes s3://oit-resources/heroes --exclude "*" --include "*.jpg" --acl "public-read" --content-type "image/jpg" --size-only --profile overwatch
aws s3 sync ../resources/heroes s3://oit-resources/heroes --exclude "*" --include "*.webm" --acl "public-read" --content-type "video/webm" --size-only --profile overwatch

aws s3 sync ../resources/updates s3://oit-resources/updates --exclude "*" --include "*.jpg" --acl "public-read" --content-type "image/jpg" --size-only --profile overwatch
aws s3 sync ../resources/updates s3://oit-resources/updates --exclude "*" --include "*.webm" --acl "public-read" --content-type "video/webm" --size-only --profile overwatch

pause