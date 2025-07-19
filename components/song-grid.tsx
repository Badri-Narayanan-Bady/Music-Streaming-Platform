"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Play, MoreHorizontal, Plus } from "lucide-react"
import type { Song, Playlist } from "@/hooks/use-music"
import Image from "next/image"
import { toast } from "@/hooks/use-toast"

interface SongGridProps {
  songs: Song[]
  currentSong: Song | null
  onSongSelect: (song: Song, songList?: Song[]) => void
  onAddToQueue: (song: Song) => void
  onAddToPlaylist: (playlistId: string, song: Song) => void
  playlists: Playlist[]
}

export function SongGrid({
  songs,
  currentSong,
  onSongSelect,
  onAddToQueue,
  onAddToPlaylist,
  playlists,
}: SongGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {songs.map((song) => (
        <div
          key={song.id}
          className="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 cursor-pointer transition-colors group"
        >
          <div className="relative mb-4">
            <Image
              src={song.coverUrl || "/placeholder.svg"}
              alt={song.title}
              width={200}
              height={200}
              className="w-full aspect-square object-cover rounded-lg"
            />
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onSongSelect(song, songs)
              }}
              className="absolute bottom-2 right-2 bg-green-600 hover:bg-green-700 rounded-full h-10 w-10 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Play className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium truncate">{song.title}</h3>
            <p className="text-sm text-gray-400 truncate">{song.artist}</p>
          </div>
          <div className="mt-2">
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
                  <DropdownMenuItem key={playlist.id} onClick={() => onAddToPlaylist(playlist.id, song)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add to {playlist.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  )
}
