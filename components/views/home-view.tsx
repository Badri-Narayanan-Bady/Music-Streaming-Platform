"use client"

import { useState, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SongGrid } from "@/components/song-grid"
import { PlaylistCard } from "@/components/playlist-card"
import type { Song, Playlist } from "@/hooks/use-music"

type ViewType = "home" | "playlist" | "genre" | "search"

interface HomeViewProps {
  allSongs: Song[]
  recentlyPlayed: Song[]
  playlists: Playlist[]
  currentSong: Song | null
  onSongSelect: (song: Song, songList?: Song[]) => void
  onAddToQueue: (song: Song) => void
  onAddToPlaylist: (playlistId: string, song: Song) => void
  onViewChange: (view: ViewType, playlistId?: string, genre?: string) => void
}

export function HomeView({
  allSongs,
  recentlyPlayed,
  playlists,
  currentSong,
  onSongSelect,
  onAddToQueue,
  onAddToPlaylist,
  onViewChange,
}: HomeViewProps) {
  const [popularSongs, setPopularSongs] = useState<Song[]>([])
  const [mounted, setMounted] = useState(false)

  // Fix hydration mismatch by only randomizing on client side
  useEffect(() => {
    setMounted(true)
    // Create consistent randomization using a seed
    const shuffled = [...allSongs].sort((a, b) => {
      // Use song ID as seed for consistent ordering
      const seedA = Number.parseInt(a.id) || 0
      const seedB = Number.parseInt(b.id) || 0
      return ((seedA * 9301 + 49297) % 233280) - ((seedB * 9301 + 49297) % 233280)
    })
    setPopularSongs(shuffled.slice(0, 10))
  }, [allSongs])

  const getGreeting = () => {
    if (!mounted) return "Good evening" // Default for SSR

    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  const recentSongs = recentlyPlayed.slice(0, 6)
  const featuredPlaylists = playlists.slice(0, 6)

  // Don't render dynamic content until mounted
  if (!mounted) {
    return (
      <ScrollArea className="h-full">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Good evening</h1>
            <p className="text-gray-300">Welcome back to Groovify</p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Loading...</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-lg p-4 animate-pulse">
                  <div className="w-full aspect-square bg-gray-700 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </ScrollArea>
    )
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{getGreeting()}</h1>
          <p className="text-gray-300">Welcome back to Groovify</p>
        </div>

        {recentSongs.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Recently Played</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentSongs.map((song) => (
                <div
                  key={song.id}
                  className="flex items-center bg-gray-800 hover:bg-gray-700 rounded-lg p-2 cursor-pointer transition-colors group"
                  onClick={() => onSongSelect(song, recentlyPlayed)}
                >
                  <img
                    src={song.coverUrl || "/placeholder.svg"}
                    alt={song.title}
                    className="w-16 h-16 rounded object-cover"
                  />
                  <div className="ml-4 flex-1 min-w-0">
                    <p className="font-medium truncate">{song.title}</p>
                    <p className="text-sm text-gray-400 truncate">{song.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Popular Right Now</h2>
          <SongGrid
            songs={popularSongs}
            currentSong={currentSong}
            onSongSelect={onSongSelect}
            onAddToQueue={onAddToQueue}
            onAddToPlaylist={onAddToPlaylist}
            playlists={[]}
          />
        </section>

        {featuredPlaylists.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Your Playlists</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {featuredPlaylists.map((playlist) => (
                <PlaylistCard key={playlist.id} playlist={playlist} />
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-2xl font-bold mb-4">Browse by Genre</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from(new Set(allSongs.map((song) => song.genre))).map((genre) => (
              <div
                key={genre}
                className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg p-6 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => onViewChange("genre", undefined, genre)}
              >
                <h3 className="text-xl font-bold">{genre}</h3>
                <p className="text-sm opacity-80">{allSongs.filter((song) => song.genre === genre).length} songs</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </ScrollArea>
  )
}
