"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SongList } from "@/components/song-list"
import { PlaylistCard } from "@/components/playlist-card"
import { Music, Clock, List } from "lucide-react"
import type { Song, Playlist } from "@/hooks/use-music"

interface LibraryViewProps {
  allSongs: Song[]
  playlists: Playlist[]
  recentlyPlayed: Song[]
  currentSong: Song | null
  onSongSelect: (song: Song, songList?: Song[]) => void
  onAddToQueue: (song: Song) => void
  onAddToPlaylist: (playlistId: string, song: Song) => void
  onDeletePlaylist: (playlistId: string) => void
}

export function LibraryView({
  allSongs,
  playlists,
  recentlyPlayed,
  currentSong,
  onSongSelect,
  onAddToQueue,
  onAddToPlaylist,
  onDeletePlaylist,
}: LibraryViewProps) {
  const [sortBy, setSortBy] = useState<"recent" | "alphabetical" | "artist">("recent")

  const sortedSongs = [...allSongs].sort((a, b) => {
    switch (sortBy) {
      case "alphabetical":
        return a.title.localeCompare(b.title)
      case "artist":
        return a.artist.localeCompare(b.artist)
      case "recent":
      default:
        // Replace 'createdAt' with a valid property, e.g., 'id' (assuming it's a string or number)
        // If you have a date property like 'addedAt', use that instead
        return b.id.localeCompare(a.id)
    }
  })

  return (
    <div className="h-full">
      <div className="p-8 pb-4">
        <h1 className="text-4xl font-bold mb-6">Your Library</h1>
      </div>

      <Tabs defaultValue="songs" className="flex-1 flex flex-col">
        <div className="px-8">
          <TabsList className="bg-gray-800">
            <TabsTrigger value="songs" className="flex items-center gap-2">
              <Music className="h-4 w-4" />
              Songs ({allSongs.length})
            </TabsTrigger>
            <TabsTrigger value="playlists" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              Playlists ({playlists.length})
            </TabsTrigger>
            <TabsTrigger value="recent" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Recently Played
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="songs" className="flex-1 mt-4">
          <div className="px-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm text-gray-400">Sort by:</span>
              <div className="flex gap-2">
                <Button
                  variant={sortBy === "recent" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setSortBy("recent")}
                >
                  Recently Added
                </Button>
                <Button
                  variant={sortBy === "alphabetical" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setSortBy("alphabetical")}
                >
                  A-Z
                </Button>
                <Button
                  variant={sortBy === "artist" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setSortBy("artist")}
                >
                  Artist
                </Button>
              </div>
            </div>
          </div>

          <ScrollArea className="flex-1 px-8">
            <SongList
              songs={sortedSongs}
              currentSong={currentSong}
              onSongSelect={onSongSelect}
              onAddToQueue={onAddToQueue}
              onAddToPlaylist={onAddToPlaylist}
              playlists={playlists}
              showIndex={true}
            />
          </ScrollArea>
        </TabsContent>

        <TabsContent value="playlists" className="flex-1 mt-4">
          <ScrollArea className="flex-1 px-8">
            {playlists.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {playlists.map((playlist) => (
                  <PlaylistCard key={playlist.id} playlist={playlist} onDelete={onDeletePlaylist} showActions={true} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <List className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No playlists yet</p>
                <p className="text-sm text-gray-500 mt-2">Create your first playlist to get started</p>
              </div>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="recent" className="flex-1 mt-4">
          <ScrollArea className="flex-1 px-8">
            {recentlyPlayed.length > 0 ? (
              <SongList
                songs={recentlyPlayed}
                currentSong={currentSong}
                onSongSelect={onSongSelect}
                onAddToQueue={onAddToQueue}
                onAddToPlaylist={onAddToPlaylist}
                playlists={playlists}
                showIndex={true}
              />
            ) : (
              <div className="text-center py-12">
                <Clock className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No recently played songs</p>
                <p className="text-sm text-gray-500 mt-2">Start listening to see your recent tracks here</p>
              </div>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}
