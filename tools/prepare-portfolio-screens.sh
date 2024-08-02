#!/bin/bash

# Convert all images to JPEG format
for i in *; do
  if [[ $i != *.jpg ]]; then
    convert "$i" "${i%.*}.jpg"
  fi
done


# Optimize JPEG images for the web
mogrify -strip -interlace Plane -gaussian-blur 0.05 -quality 85% *.jpg

# Resize all JPEG images down by 50%
mogrify -resize 50% *.jpg

mogrify -bordercolor lightgray -border 20x20 *.jpg

