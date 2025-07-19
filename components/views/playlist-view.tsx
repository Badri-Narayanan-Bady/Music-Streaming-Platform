"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { SongList } from "@/components/song-list"
import { Play, MoreHorizontal, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Song, Playlist } from "@/hooks/use-music"
import Image from "next/image"

interface PlaylistViewProps {
  playlist: Playlist
  currentSong: Song | null
  onSongSelect: (song: Song, songList?: Song[]) => void
  onAddToQueue: (song: Song) => void
  onAddToPlaylist: (playlistId: string, song: Song) => void
  onRemoveFromPlaylist: (playlistId: string, songId: string) => void
  onDeletePlaylist: (playlistId: string) => void
  playlists: Playlist[]
}

export function PlaylistView({
  playlist,
  currentSong,
  onSongSelect,
  onAddToQueue,
  onAddToPlaylist,
  onRemoveFromPlaylist,
  onDeletePlaylist,
  playlists,
}: PlaylistViewProps) {
  const totalDuration = playlist.songs.reduce((acc, song) => acc + song.duration, 0)
  const formatTotalDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    if (hours > 0) {
      return `${hours} hr ${minutes} min`
    }
    return `${minutes} min`
  }

  const handlePlayAll = () => {
    if (playlist.songs.length > 0) {
      onSongSelect(playlist.songs[0], playlist.songs)
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-8">
        <div className="flex items-end gap-6 mb-8">
          <Image
            src={playlist.coverUrl || "/placeholder.svg"}
            alt={playlist.name}
            width={200}
            height={200}
            className="rounded-lg shadow-xl"
          />
          <div>
            <p className="text-sm text-gray-300 uppercase tracking-wider">Playlist</p>
            <h1 className="text-6xl font-bold mb-4">{playlist.name}</h1>
            {playlist.description && <p className="text-gray-300 mb-2">{playlist.description}</p>}
            <div className="flex items-center gap-2 text-gray-300">
              <span>{playlist.songs.length} songs</span>
              {playlist.songs.length > 0 && (
                <>
                  <span>•</span>
                  <span>{formatTotalDuration(totalDuration)}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <Button
            size="lg"
            onClick={handlePlayAll}
            disabled={playlist.songs.length === 0}
            className="bg-green-600 hover:bg-green-700 rounded-full h-12 w-12"
          >
            <Play className="h-6 w-6" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="lg">
                <MoreHorizontal className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => onDeletePlaylist(playlist.id)}
                className="text-red-400 focus:text-red-400"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Playlist
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <ScrollArea className="flex-1 px-8">
        {playlist.songs.length > 0 ? (
          <SongList
            songs={playlist.songs}
            currentSong={currentSong}
            onSongSelect={onSongSelect}
            onAddToQueue={onAddToQueue}
            onAddToPlaylist={onAddToPlaylist}
            onRemoveFromPlaylist={(songId) => onRemoveFromPlaylist(playlist.id, songId)}
            playlists={playlists.filter((p) => p.id !== playlist.id)}
            showIndex={true}
            showRemove={true}
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">This playlist is empty</p>
            <p className="text-sm text-gray-500 mt-2">Add songs from your library or search to get started</p>
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
