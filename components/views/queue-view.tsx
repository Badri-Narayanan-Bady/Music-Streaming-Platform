"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { SongList } from "@/components/song-list"
import { ArrowLeft, Shuffle, Trash2 } from "lucide-react"
import type { Song, Playlist } from "@/hooks/use-music"

interface QueueViewProps {
  queue: Song[]
  currentSong: Song | null
  onSongSelect: (song: Song, songList?: Song[]) => void
  onAddToQueue: (song: Song) => void
  onAddToPlaylist: (playlistId: string, song: Song) => void
  onClearQueue: () => void
  playlists: Playlist[]
  onBack: () => void
}

export function QueueView({
  queue,
  currentSong,
  onSongSelect,
  onAddToQueue,
  onAddToPlaylist,
  onClearQueue,
  playlists,
  onBack,
}: QueueViewProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-400 hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>

          {queue.length > 0 && (
            <Button
              variant="outline"
              onClick={onClearQueue}
              className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Queue
            </Button>
          )}
        </div>

        <div className="mb-8">
          <h1 className="text-6xl font-bold mb-4">Queue</h1>
          <p className="text-gray-300">
            {queue.length} song{queue.length !== 1 ? "s" : ""} in queue
          </p>
        </div>
      </div>

      <ScrollArea className="flex-1 px-8">
        {queue.length > 0 ? (
          <SongList
            songs={queue}
            currentSong={currentSong}
            onSongSelect={onSongSelect}
            onAddToQueue={onAddToQueue}
            onAddToPlaylist={onAddToPlaylist}
            playlists={playlists}
            showIndex={true}
          />
        ) : (
          <div className="text-center py-12">
            <Shuffle className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Your queue is empty</p>
            <p className="text-sm text-gray-500 mt-2">Add songs to your queue to see them here</p>
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
