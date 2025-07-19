"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Home, Search, Library, Plus, Heart, Music } from "lucide-react"
import type { Playlist } from "@/hooks/use-music"
import type { ViewType } from "@/app/page"
import { useState } from "react"

interface SidebarProps {
  playlists: Playlist[]
  currentView: ViewType
  selectedPlaylistId: string | null
  onViewChange: (view: ViewType, playlistId?: string) => void
  onCreatePlaylist: (name: string, description?: string) => void
}

export function Sidebar({ playlists, currentView, selectedPlaylistId, onViewChange, onCreatePlaylist }: SidebarProps) {
  const [isCreating, setIsCreating] = useState(false)
  const [newPlaylistName, setNewPlaylistName] = useState("")
  const [newPlaylistDescription, setNewPlaylistDescription] = useState("")

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      onCreatePlaylist(newPlaylistName.trim(), newPlaylistDescription.trim() || undefined)
      setNewPlaylistName("")
      setNewPlaylistDescription("")
      setIsCreating(false)
    }
  }

  return (
    <div className="w-64 bg-black p-6 flex flex-col h-full border-r border-gray-800">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-green-500 flex items-center gap-2">
          <Music className="h-6 w-6" />
          Groovify
        </h1>
      </div>

      <nav className="space-y-2 mb-8">
        <Button
          variant={currentView === "home" ? "secondary" : "ghost"}
          className="w-full justify-start text-gray-300 hover:text-white"
          onClick={() => onViewChange("home")}
        >
          <Home className="mr-3 h-5 w-5" />
          Home
        </Button>
        <Button
          variant={currentView === "search" ? "secondary" : "ghost"}
          className="w-full justify-start text-gray-300 hover:text-white"
          onClick={() => onViewChange("search")}
        >
          <Search className="mr-3 h-5 w-5" />
          Search
        </Button>
        <Button
          variant={currentView === "library" ? "secondary" : "ghost"}
          className="w-full justify-start text-gray-300 hover:text-white"
          onClick={() => onViewChange("library")}
        >
          <Library className="mr-3 h-5 w-5" />
          Your Library
        </Button>
        <Button
          variant={currentView === "queue" ? "secondary" : "ghost"}
          className="w-full justify-start text-gray-300 hover:text-white"
          onClick={() => onViewChange("queue")}
        >
          <Music className="mr-3 h-5 w-5" />
          Queue
        </Button>
      </nav>

      <div className="space-y-2 mb-6">
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white">
              <Plus className="mr-3 h-5 w-5" />
              Create Playlist
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 text-white border-gray-700">
            <DialogHeader>
              <DialogTitle>Create New Playlist</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Playlist Name</label>
                <Input
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  placeholder="My Awesome Playlist"
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description (Optional)</label>
                <Textarea
                  value={newPlaylistDescription}
                  onChange={(e) => setNewPlaylistDescription(e.target.value)}
                  placeholder="Describe your playlist..."
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCreatePlaylist} className="bg-green-600 hover:bg-green-700">
                  Create
                </Button>
                <Button variant="outline" onClick={() => setIsCreating(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white">
          <Heart className="mr-3 h-5 w-5" />
          Liked Songs
        </Button>
      </div>

      <div className="border-t border-gray-800 pt-4 flex-1">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-400">Your Playlists</span>
          <span className="text-xs text-gray-500">{playlists.length}</span>
        </div>

        <ScrollArea className="flex-1">
          <div className="space-y-1">
            {playlists.map((playlist) => (
              <Button
                key={playlist.id}
                variant={selectedPlaylistId === playlist.id ? "secondary" : "ghost"}
                className="w-full justify-start text-left p-2 h-auto"
                onClick={() => onViewChange("playlist", playlist.id)}
              >
                <div className="truncate">
                  <div className="font-medium text-sm truncate">{playlist.name}</div>
                  <div className="text-xs text-gray-400">{playlist.songs.length} songs</div>
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
