"use client"
import { Player } from "@/components/player"
import { Sidebar } from "@/components/sidebar"
import { MainContent } from "@/components/main-content"
import { useMusic } from "@/hooks/use-music"
import { useState } from "react"

export type ViewType = "home" | "search" | "library" | "playlist" | "genre"

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewType>("home")
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null)
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)

  const {
    currentSong,
    isPlaying,
    queue,
    playlists,
    allSongs,
    recentlyPlayed,
    setCurrentSong,
    togglePlay,
    addToQueue,
    createPlaylist,
    addToPlaylist,
    removeFromPlaylist,
    deletePlaylist,
    playNext,
    playPrevious,
    searchSongs,
  } = useMusic()

  const handleViewChange = (view: ViewType, playlistId?: string, genre?: string) => {
    setCurrentView(view)
    setSelectedPlaylistId(playlistId || null)
    setSelectedGenre(genre || null)
  }

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          playlists={playlists}
          currentView={currentView}
          selectedPlaylistId={selectedPlaylistId}
          onViewChange={handleViewChange}
          onCreatePlaylist={createPlaylist}
        />
        <MainContent
          currentView={currentView}
          selectedPlaylistId={selectedPlaylistId}
          selectedGenre={selectedGenre}
          currentSong={currentSong}
          allSongs={allSongs}
          playlists={playlists}
          recentlyPlayed={recentlyPlayed}
          onSongSelect={setCurrentSong}
          onAddToQueue={addToQueue}
          onAddToPlaylist={addToPlaylist}
          onRemoveFromPlaylist={removeFromPlaylist}
          onDeletePlaylist={deletePlaylist}
          onSearch={searchSongs}
          onViewChange={handleViewChange}
        />
      </div>
      {currentSong && (
        <Player
          song={currentSong}
          isPlaying={isPlaying}
          onTogglePlay={togglePlay}
          onNext={playNext}
          onPrevious={playPrevious}
        />
      )}
    </div>
  )
}
