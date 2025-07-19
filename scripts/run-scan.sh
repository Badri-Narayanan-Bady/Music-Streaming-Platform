#!/bin/bash

echo "🎵 Groovify Music Library Scanner"
echo "================================"

# Check if music directory exists
if [ ! -d "./public/music" ]; then
    echo "❌ Music directory not found. Creating structure..."
    mkdir -p ./public/music/covers
    echo "📁 Created ./public/music/ and ./public/music/covers/"
    echo "📋 Add your music files to ./public/music/ and run this script again"
    exit 1
fi

# Count music files
MUSIC_COUNT=$(find ./public/music -name "*.mp3" -o -name "*.m4a" -o -name "*.wav" -o -name "*.ogg" | wc -l)
echo "🔍 Found $MUSIC_COUNT music files"

if [ $MUSIC_COUNT -eq 0 ]; then
    echo "❌ No music files found in ./public/music/"
    echo "📋 Supported formats: MP3, M4A, WAV, OGG"
    exit 1
fi

# Run the scanner
echo "🚀 Scanning music library..."
node scripts/add-songs.js

echo "✅ Music library scan complete!"
