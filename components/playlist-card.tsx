"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Trash2, Play } from "lucide-react"
import type { Playlist } from "@/hooks/use-music"
import Image from "next/image"

interface PlaylistCardProps {
  playlist: Playlist
  onDelete?: (playlistId: string) => void
  showActions?: boolean
}

export function PlaylistCard({ playlist, onDelete, showActions = false }: PlaylistCardProps) {
  return (
    <div className="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 cursor-pointer transition-colors group">
      <div className="relative mb-4">
        <Image
          src={playlist.coverUrl || "/placeholder.svg"}
          alt={playlist.name}
          width={200}
          height={200}
          className="w-full aspect-square object-cover rounded-lg"
        />
        <Button
          size="sm"
          className="absolute bottom-2 right-2 bg-green-600 hover:bg-green-700 rounded-full h-10 w-10 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Play className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-1">
        <h3 className="font-medium truncate">{playlist.name}</h3>
        <p className="text-sm text-gray-400">
          {playlist.songs.length} song{playlist.songs.length !== 1 ? "s" : ""}
        </p>
        {playlist.description && <p className="text-xs text-gray-500 truncate">{playlist.description}</p>}
      </div>
      {showActions && onDelete && (
        <div className="mt-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onDelete(playlist.id)} className="text-red-400 focus:text-red-400">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Playlist
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  )
}
