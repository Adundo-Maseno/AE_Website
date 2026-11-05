#!/bin/bash
find public -type f \( -iname \*.jpg -o -iname \*.jpeg -o -iname \*.png -o -iname \*.webp \) | while read img; do
    echo "Processing $img"
    ext="${img##*.}"
    ext=$(echo "$ext" | tr '[:upper:]' '[:lower:]')
    
    if [ "$ext" = "jpg" ] || [ "$ext" = "jpeg" ]; then
        ffmpeg -y -i "$img" -vf "scale='min(1920,iw)':-2" -q:v 5 "${img}.tmp.$ext" 2>/dev/null
        if [ -f "${img}.tmp.$ext" ]; then
            mv "${img}.tmp.$ext" "$img"
        fi
    elif [ "$ext" = "png" ]; then
        # For PNG, resizing is usually the main benefit if it's too big, but we can also use a palette if we want.
        # We will just resize and let ffmpeg re-encode it.
        ffmpeg -y -i "$img" -vf "scale='min(1920,iw)':-2" "${img}.tmp.$ext" 2>/dev/null
        if [ -f "${img}.tmp.$ext" ]; then
            mv "${img}.tmp.$ext" "$img"
        fi
    elif [ "$ext" = "webp" ]; then
        ffmpeg -y -i "$img" -vf "scale='min(1920,iw)':-2" -c:v libwebp -quality 75 "${img}.tmp.$ext" 2>/dev/null
        if [ -f "${img}.tmp.$ext" ]; then
            mv "${img}.tmp.$ext" "$img"
        fi
    fi
done
echo "Done optimizing images."
