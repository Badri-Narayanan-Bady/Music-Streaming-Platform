const fs = require("fs")
const path = require("path")

console.log("🔍 Verifying Groovify Music Setup...\n")

// Check if music directory exists
const musicDir = "./public/music"
if (!fs.existsSync(musicDir)) {
  console.log("❌ Music directory not found!")
  console.log("📋 Run: bash scripts/setup-music-directory.sh")
  process.exit(1)
}

// Check subdirectories
const requiredDirs = [
  "covers",
  "demo-artist/demo-album",
  "electronic/neon-dreams",
  "hip-hop/urban-poet",
  "rock/electric-storm",
  "pop/pop-princess",
  "jazz/smooth-jazz-trio",
]

let allDirsExist = true
requiredDirs.forEach((dir) => {
  const fullPath = path.join(musicDir, dir)
  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${dir}/`)
  } else {
    console.log(`❌ ${dir}/ - Missing!`)
    allDirsExist = false
  }
})

// Count music files
const musicExtensions = [".mp3", ".m4a", ".wav", ".ogg"]
let totalMusicFiles = 0

function countMusicFiles(dir) {
  const items = fs.readdirSync(dir)
  items.forEach((item) => {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      countMusicFiles(fullPath)
    } else if (musicExtensions.some((ext) => item.toLowerCase().endsWith(ext))) {
      totalMusicFiles++
    }
  })
}

countMusicFiles(musicDir)

console.log(`\n🎵 Found ${totalMusicFiles} music files`)

// Check cover images
const coversDir = path.join(musicDir, "covers")
const coverFiles = fs.existsSync(coversDir)
  ? fs
      .readdirSync(coversDir)
      .filter((file) => [".jpg", ".jpeg", ".png", ".webp"].some((ext) => file.toLowerCase().endsWith(ext))).length
  : 0

console.log(`🖼️  Found ${coverFiles} cover images`)

// Final status
console.log("\n" + "=".repeat(40))
if (allDirsExist && totalMusicFiles > 0) {
  console.log("✅ Setup Complete! Ready to run Groovify")
  console.log("\n📋 Next steps:")
  console.log("1. npm install")
  console.log("2. npm run dev")
  console.log("3. Open http://localhost:3000")
} else {
  console.log("⚠️  Setup Incomplete")
  if (!allDirsExist) {
    console.log("- Run: bash scripts/setup-music-directory.sh")
  }
  if (totalMusicFiles === 0) {
    console.log("- Add your music files to public/music/")
  }
}
