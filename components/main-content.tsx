"use client"
import { HomeView } from "@/components/views/home-view"
import { SearchView } from "@/components/views/search-view"
import { LibraryView } from "@/components/views/library-view"
import { PlaylistView } from "@/components/views/playlist-view"
import type { Song, Playlist } from "@/hooks/use-music"
import type { ViewType } from "@/app/page"
import { GenreView } from "@/components/views/genre-view"

interface MainContentProps {
  currentView: ViewType
  selectedPlaylistId: string | null
  selectedGenre: string | null
  currentSong: Song | null
  allSongs: Song[]
  playlists: Playlist[]
  recentlyPlayed: Song[]
  onSongSelect: (song: Song, songList?: Song[]) => void
  onAddToQueue: (song: Song) => void
  onAddToPlaylist: (playlistId: string, song: Song) => void
  onRemoveFromPlaylist: (playlistId: string, songId: string) => void
  onDeletePlaylist: (playlistId: string) => void
  onSearch: (query: string) => Song[]
  onViewChange: (view: ViewType, playlistId?: string, genre?: string) => void
}

export function MainContent({
  currentView,
  selectedPlaylistId,
  selectedGenre,
  currentSong,
  allSongs,
  playlists,
  recentlyPlayed,
  onSongSelect,
  onAddToQueue,
  onAddToPlaylist,
  onRemoveFromPlaylist,
  onDeletePlaylist,
  onSearch,
  onViewChange,
}: MainContentProps) {
  const selectedPlaylist = selectedPlaylistId ? playlists.find((p) => p.id === selectedPlaylistId) : null

  const renderView = () => {
    switch (currentView) {
      case "home":
        return (
          <HomeView
            allSongs={allSongs}
            recentlyPlayed={recentlyPlayed}
            playlists={playlists}
            currentSong={currentSong}
            onSongSelect={onSongSelect}
            onAddToQueue={onAddToQueue}
            onAddToPlaylist={onAddToPlaylist}
            onViewChange={onViewChange}
          />
        )
      case "search":
        return (
          <SearchView
            onSearch={onSearch}
            currentSong={currentSong}
            onSongSelect={onSongSelect}
            onAddToQueue={onAddToQueue}
            onAddToPlaylist={onAddToPlaylist}
            playlists={playlists}
          />
        )
      case "library":
        return (
          <LibraryView
            allSongs={allSongs}
            playlists={playlists}
            recentlyPlayed={recentlyPlayed}
            currentSong={currentSong}
            onSongSelect={onSongSelect}
            onAddToQueue={onAddToQueue}
            onAddToPlaylist={onAddToPlaylist}
            onDeletePlaylist={onDeletePlaylist}
          />
        )
      case "playlist":
        return selectedPlaylist ? (
          <PlaylistView
            playlist={selectedPlaylist}
            currentSong={currentSong}
            onSongSelect={onSongSelect}
            onAddToQueue={onAddToQueue}
            onAddToPlaylist={onAddToPlaylist}
            onRemoveFromPlaylist={onRemoveFromPlaylist}
            onDeletePlaylist={onDeletePlaylist}
            playlists={playlists}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">Playlist not found</p>
          </div>
        )
      case "genre":
        return selectedGenre ? (
          <GenreView
            genre={selectedGenre}
            allSongs={allSongs}
            currentSong={currentSong}
            onSongSelect={onSongSelect}
            onAddToQueue={onAddToQueue}
            onAddToPlaylist={onAddToPlaylist}
            playlists={playlists}
            onBack={() => onViewChange("home")}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">Genre not found</p>
          </div>
        )
      default:
        return null
    }
  }

  return <div className="flex-1 bg-gradient-to-b from-gray-900 to-black overflow-hidden">{renderView()}</div>
}
