"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Play, MoreHorizontal, Plus, Trash2 } from "lucide-react"
import type { Song, Playlist } from "@/hooks/use-music"
import Image from "next/image"
import { toast } from "@/hooks/use-toast"

interface SongListProps {
  songs: Song[]
  currentSong: Song | null
  onSongSelect: (song: Song, songList?: Song[]) => void
  onAddToQueue: (song: Song) => void
  onAddToPlaylist: (playlistId: string, song: Song) => void
  onRemoveFromPlaylist?: (songId: string) => void
  playlists: Playlist[]
  showIndex?: boolean
  showRemove?: boolean
}

export function SongList({
  songs,
  currentSong,
  onSongSelect,
  onAddToQueue,
  onAddToPlaylist,
  onRemoveFromPlaylist,
  playlists,
  showIndex = false,
  showRemove = false,
}: SongListProps) {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-1">
      <div className="grid grid-cols-12 gap-4 text-sm text-gray-400 border-b border-gray-800 pb-2 mb-2">
        {showIndex && <div className="col-span-1">#</div>}
        <div className={showIndex ? "col-span-6" : "col-span-7"}>Title</div>
        <div className="col-span-3">Album</div>
        <div className="col-span-1"></div>
      </div>

      {songs.map((song, index) => (
        <div
          key={song.id}
          className={`grid grid-cols-12 gap-4 p-2 rounded-lg hover:bg-gray-800 group cursor-pointer ${
            currentSong?.id === song.id ? "bg-gray-800" : ""
          }`}
          onClick={() => onSongSelect(song, songs)}
        >
          {showIndex && (
            <div className="col-span-1 flex items-center">
              <span className="group-hover:hidden text-gray-400">{index + 1}</span>
              <Play className="hidden group-hover:block h-4 w-4 text-white" />
            </div>
          )}
          <div className={`${showIndex ? "col-span-6" : "col-span-7"} flex items-center gap-3`}>
            <Image
              src={song.coverUrl || "/placeholder.svg"}
              alt={song.title}
              width={40}
              height={40}
              className="rounded object-cover"
            />
            <div className="min-w-0 flex-1">
              <div className="font-medium text-white truncate">{song.title}</div>
              <div className="text-sm text-gray-400 truncate">{song.artist}</div>
            </div>
          </div>
          <div className="col-span-3 flex items-center text-gray-400 truncate">{song.album}</div>
          <div className="col-span-1 flex items-center text-gray-400"></div>
          <div className="col-span-1 flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation()
                    onAddToQueue(song)
                    toast({ title: "Added to queue", description: song.title })
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add to Queue
                </DropdownMenuItem>
                {playlists.map((playlist) => (
                  <DropdownMenuItem
                    key={playlist.id}
                    onClick={(e) => {
                      e.stopPropagation()
                      onAddToPlaylist(playlist.id, song)
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add to {playlist.name}
                  </DropdownMenuItem>
                ))}
                {showRemove && onRemoveFromPlaylist && (
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation()
                      onRemoveFromPlaylist(song.id)
                    }}
                    className="text-red-400 focus:text-red-400"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove from Playlist
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  )
}
