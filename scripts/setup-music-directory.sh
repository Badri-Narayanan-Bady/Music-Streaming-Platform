#!/bin/bash

echo "🎵 Setting up Groovify Music Directory Structure"
echo "=============================================="

# Create main music directory structure
mkdir -p public/music
mkdir -p public/music/covers
mkdir -p public/music/demo-artist/demo-album
mkdir -p public/music/electronic/neon-dreams
mkdir -p public/music/hip-hop/urban-poet
mkdir -p public/music/rock/electric-storm
mkdir -p public/music/pop/pop-princess
mkdir -p public/music/jazz/smooth-jazz-trio

echo "📁 Created directory structure:"
echo "   public/music/"
echo "   ├── covers/ (for album artwork)"
echo "   ├── demo-artist/demo-album/"
echo "   ├── electronic/neon-dreams/"
echo "   ├── hip-hop/urban-poet/"
echo "   ├── rock/electric-storm/"
echo "   ├── pop/pop-princess/"
echo "   └── jazz/smooth-jazz-trio/"

# Create placeholder files to show structure
touch public/music/demo-artist/demo-album/song1.mp3
touch public/music/demo-artist/demo-album/song2.mp3
touch public/music/electronic/neon-dreams/midnight-pulse.mp3
touch public/music/hip-hop/urban-poet/street-chronicles.mp3
touch public/music/rock/electric-storm/thunder-road.mp3
touch public/music/pop/pop-princess/summer-nights.mp3
touch public/music/jazz/smooth-jazz-trio/blue-note-cafe.mp3

# Create sample cover images (placeholders)
touch public/music/covers/demo-album.jpg
touch public/music/covers/digital-horizons.jpg
touch public/music/covers/city-stories.jpg
touch public/music/covers/lightning-strikes.jpg
touch public/music/covers/seasonal-moods.jpg
touch public/music/covers/late-night-sessions.jpg

echo ""
echo "✅ Directory structure created successfully!"
echo ""
echo "📋 Next Steps:"
echo "1. Replace placeholder .mp3 files with your actual music"
echo "2. Add album cover images to public/music/covers/"
echo "3. Update the song paths in hooks/use-music.ts if needed"
echo "4. Run 'npm run dev' to start the development server"
echo ""
echo "🎵 Your music files should be in formats: MP3, M4A, WAV, OGG"
echo "🖼️  Cover images should be: JPG, PNG, WEBP (recommended: 300x300px)"
