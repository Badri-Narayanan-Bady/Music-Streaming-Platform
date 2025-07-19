"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { SongList } from "@/components/song-list"
import { ArrowLeft, Play } from "lucide-react"
import type { Song, Playlist } from "@/hooks/use-music"

interface GenreViewProps {
  genre: string
  allSongs: Song[]
  currentSong: Song | null
  onSongSelect: (song: Song, songList?: Song[]) => void
  onAddToQueue: (song: Song) => void
  onAddToPlaylist: (playlistId: string, song: Song) => void
  playlists: Playlist[]
  onBack: () => void
}

export function GenreView({
  genre,
  allSongs,
  currentSong,
  onSongSelect,
  onAddToQueue,
  onAddToPlaylist,
  playlists,
  onBack,
}: GenreViewProps) {
  const genreSongs = allSongs.filter((song) => song.genre === genre)

  const handlePlayAll = () => {
    if (genreSongs.length > 0) {
      onSongSelect(genreSongs[0], genreSongs)
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-400 hover:text-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="mb-8">
          <h1 className="text-6xl font-bold mb-4">{genre}</h1>
          <p className="text-gray-300 mb-6">
            {genreSongs.length} song{genreSongs.length !== 1 ? "s" : ""} in this genre
          </p>

          <Button
            size="lg"
            onClick={handlePlayAll}
            disabled={genreSongs.length === 0}
            className="bg-green-600 hover:bg-green-700 rounded-full h-12 px-8"
          >
            <Play className="h-6 w-6 mr-2" />
            Play All
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 px-8">
        {genreSongs.length > 0 ? (
          <SongList
            songs={genreSongs}
            currentSong={currentSong}
            onSongSelect={onSongSelect}
            onAddToQueue={onAddToQueue}
            onAddToPlaylist={onAddToPlaylist}
            playlists={playlists}
            showIndex={true}
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No songs found in {genre}</p>
            <p className="text-sm text-gray-500 mt-2">Try exploring other genres</p>
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
