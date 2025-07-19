const fs = require("fs")
const path = require("path")

// Configuration
const REPLACEMENTS = [
  {
    oldId: "1",
    newSong: {
      title: "New Song Title",
      artist: "New Artist",
      album: "New Album",
      audioUrl: "/music/new-path/new-song.mp3",
      coverUrl: "/music/covers/new-cover.jpg",
    },
  },
  // Add more replacements...
]

function replaceSongs() {
  const musicFilePath = "./hooks/use-music.ts"
  let content = fs.readFileSync(musicFilePath, "utf8")

  REPLACEMENTS.forEach(({ oldId, newSong }) => {
    console.log(`🔄 Replacing song with ID: ${oldId}`)

    // Find and replace the song object
    const songRegex = new RegExp(`{[^}]*id:\\s*["']${oldId}["'][^}]*}`, "gs")

    const newSongObject = `{
    id: "${oldId}",
    title: "${newSong.title}",
    artist: "${newSong.artist}",
    album: "${newSong.album}",
    duration: 180, // Update as needed
    coverUrl: "${newSong.coverUrl}",
    audioUrl: "${newSong.audioUrl}",
    genre: "Unknown", // Update as needed
    year: 2024,
    dateAdded: new Date("${new Date().toISOString()}"),
  }`

    content = content.replace(songRegex, newSongObject)
  })

  // Write back to file
  fs.writeFileSync(musicFilePath, content)
  console.log(`✅ Replaced ${REPLACEMENTS.length} songs`)
}

replaceSongs()
