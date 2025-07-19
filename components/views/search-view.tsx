"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SongList } from "@/components/song-list"
import { Search } from "lucide-react"
import type { Song, Playlist } from "@/hooks/use-music"

interface SearchViewProps {
  onSearch: (query: string) => Song[]
  currentSong: Song | null
  onSongSelect: (song: Song, songList?: Song[]) => void
  onAddToQueue: (song: Song) => void
  onAddToPlaylist: (playlistId: string, song: Song) => void
  playlists: Playlist[]
}

export function SearchView({
  onSearch,
  currentSong,
  onSongSelect,
  onAddToQueue,
  onAddToPlaylist,
  playlists,
}: SearchViewProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Song[]>([])
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    if (query.trim()) {
      setIsSearching(true)
      const searchResults = onSearch(query)
      setResults(searchResults)
      setIsSearching(false)
    } else {
      setResults([])
    }
  }, [query, onSearch])

  return (
    <div className="h-full flex flex-col">
      <div className="p-8 pb-4">
        <h1 className="text-4xl font-bold mb-6">Search</h1>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What do you want to listen to?"
            className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
          />
        </div>
      </div>

      <ScrollArea className="flex-1 px-8">
        {query.trim() ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{isSearching ? "Searching..." : `Results for "${query}"`}</h2>
              {!isSearching && (
                <span className="text-sm text-gray-400">
                  {results.length} song{results.length !== 1 ? "s" : ""} found
                </span>
              )}
            </div>

            {results.length > 0 ? (
              <SongList
                songs={results}
                currentSong={currentSong}
                onSongSelect={onSongSelect}
                onAddToQueue={onAddToQueue}
                onAddToPlaylist={onAddToPlaylist}
                playlists={playlists}
                showIndex={true}
              />
            ) : !isSearching ? (
              <div className="text-center py-12">
                <p className="text-gray-400">No songs found for "{query}"</p>
                <p className="text-sm text-gray-500 mt-2">Try searching for artists, albums, or genres</p>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Start typing to search for music</p>
            <p className="text-sm text-gray-500 mt-2">Search by song title, artist, album, or genre</p>
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
