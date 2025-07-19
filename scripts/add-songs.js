const fs = require("fs")
const path = require("path")

// Configuration
const MUSIC_DIR = "./public/music"
const OUTPUT_FILE = "./music-library.js"

function scanMusicDirectory(dir, basePath = "") {
  const songs = []
  const items = fs.readdirSync(dir)

  items.forEach((item) => {
    const fullPath = path.join(dir, item)
    const relativePath = path.join(basePath, item)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      // Recursively scan subdirectories
      songs.push(...scanMusicDirectory(fullPath, relativePath))
    } else if (item.match(/\.(mp3|m4a|wav|ogg)$/i)) {
      // Extract info from file path structure
      const pathParts = relativePath.split(path.sep)
      const fileName = path.basename(item, path.extname(item))

      // Assume structure: artist/album/song.mp3
      const artist = pathParts.length > 2 ? pathParts[0] : "Unknown Artist"
      const album = pathParts.length > 2 ? pathParts[1] : "Unknown Album"

      const song = {
        id: `song_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title: fileName.replace(/^\d+\s*-?\s*/, ""), // Remove track numbers
        artist: artist,
        album: album,
        duration: 180, // Default duration - you can use a library to get actual duration
        coverUrl: `/music/covers/${album.toLowerCase().replace(/\s+/g, "-")}.jpg`,
        audioUrl: `/music/${relativePath.replace(/\\/g, "/")}`,
        genre: "Unknown", // You can add logic to determine genre
        year: 2024,
        dateAdded: new Date().toISOString(),
      }

      songs.push(song)
    }
  })

  return songs
}

// Generate the music library
const songs = scanMusicDirectory(MUSIC_DIR)

// Create the output file
const output = `// Auto-generated music library
// Generated on: ${new Date().toISOString()}
// Total songs: ${songs.length}

export const musicLibrary = ${JSON.stringify(songs, null, 2)};
`

fs.writeFileSync(OUTPUT_FILE, output)
console.log(`✅ Generated music library with ${songs.length} songs`)
console.log(`📁 Output saved to: ${OUTPUT_FILE}`)
console.log(`\n📋 Next steps:`)
console.log(`1. Review the generated file: ${OUTPUT_FILE}`)
console.log(`2. Import it in hooks/use-music.ts:`)
console.log(`   import { musicLibrary } from '../music-library.js'`)
console.log(`3. Replace demoSongs with musicLibrary`)
