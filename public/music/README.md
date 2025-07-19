# Groovify Music Directory

This directory contains all the music files for your Groovify streaming platform.

## Directory Structure

\`\`\`
public/music/
├── covers/                 # Album artwork (300x300px recommended)
│   ├── album1.jpg
│   └── album2.jpg
├── artist1/
│   ├── album1/
│   │   ├── song1.mp3
│   │   └── song2.mp3
│   └── album2/
│       └── song3.mp3
└── artist2/
    └── album3/
        └── song4.mp3
\`\`\`

## Supported Audio Formats
- MP3 (recommended)
- M4A/AAC
- WAV
- OGG

## File Naming Best Practices
- Use lowercase with hyphens: `my-song-title.mp3`
- Avoid spaces and special characters
- Keep filenames under 50 characters

## Adding New Music
1. Create artist/album folders
2. Add music files to the album folder
3. Add cover art to the covers/ folder
4. Update the song database in `hooks/use-music.ts`

## Audio Quality Recommendations
- Bitrate: 128-320 kbps (192 kbps is good balance)
- Sample Rate: 44.1 kHz
- Format: MP3 for best compatibility

## Cover Art Guidelines
- Size: 300x300px to 1000x1000px
- Format: JPG or PNG
- Keep file size under 500KB for faster loading
