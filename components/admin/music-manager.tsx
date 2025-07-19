"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Upload, Trash2 } from "lucide-react"
import type { Song } from "@/hooks/use-music"

interface MusicManagerProps {
  songs: Song[]
  onAddSong: (song: Omit<Song, "id">) => void
  onRemoveSong: (songId: string) => void
}

export function MusicManager({ songs, onAddSong, onRemoveSong }: MusicManagerProps) {
  const [newSong, setNewSong] = useState({
    title: "",
    artist: "",
    album: "",
    duration: 0,
    coverUrl: "",
    audioUrl: "",
    genre: "",
    year: new Date().getFullYear(),
  })

  const handleAddSong = () => {
    if (newSong.title && newSong.artist && newSong.audioUrl) {
      onAddSong({
        ...newSong,
      })

      // Reset form
      setNewSong({
        title: "",
        artist: "",
        album: "",
        duration: 0,
        coverUrl: "",
        audioUrl: "",
        genre: "",
        year: new Date().getFullYear(),
      })
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // In a real implementation, you'd upload to your server/CDN
      const audioUrl = URL.createObjectURL(file)
      setNewSong((prev) => ({
        ...prev,
        audioUrl,
        title: prev.title || file.name.replace(/\.[^/.]+$/, ""),
      }))
    }
  }

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Song
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Song Title</Label>
              <Input
                id="title"
                value={newSong.title}
                onChange={(e) => setNewSong((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Enter song title"
              />
            </div>
            <div>
              <Label htmlFor="artist">Artist</Label>
              <Input
                id="artist"
                value={newSong.artist}
                onChange={(e) => setNewSong((prev) => ({ ...prev, artist: e.target.value }))}
                placeholder="Enter artist name"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="album">Album</Label>
              <Input
                id="album"
                value={newSong.album}
                onChange={(e) => setNewSong((prev) => ({ ...prev, album: e.target.value }))}
                placeholder="Enter album name"
              />
            </div>
            <div>
              <Label htmlFor="genre">Genre</Label>
              <Input
                id="genre"
                value={newSong.genre}
                onChange={(e) => setNewSong((prev) => ({ ...prev, genre: e.target.value }))}
                placeholder="Enter genre"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                type="number"
                value={newSong.year}
                onChange={(e) => setNewSong((prev) => ({ ...prev, year: Number.parseInt(e.target.value) }))}
              />
            </div>
            <div>
              <Label htmlFor="duration">Duration (seconds)</Label>
              <Input
                id="duration"
                type="number"
                value={newSong.duration}
                onChange={(e) => setNewSong((prev) => ({ ...prev, duration: Number.parseInt(e.target.value) }))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="audio-file">Audio File</Label>
            <div className="flex gap-2">
              <Input
                id="audio-url"
                value={newSong.audioUrl}
                onChange={(e) => setNewSong((prev) => ({ ...prev, audioUrl: e.target.value }))}
                placeholder="Enter audio URL or upload file"
              />
              <Button variant="outline" onClick={() => document.getElementById("file-upload")?.click()}>
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
              <input id="file-upload" type="file" accept="audio/*" onChange={handleFileUpload} className="hidden" />
            </div>
          </div>

          <div>
            <Label htmlFor="cover-url">Cover Image URL</Label>
            <Input
              id="cover-url"
              value={newSong.coverUrl}
              onChange={(e) => setNewSong((prev) => ({ ...prev, coverUrl: e.target.value }))}
              placeholder="Enter cover image URL"
            />
          </div>

          <Button onClick={handleAddSong} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Song to Library
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Library ({songs.length} songs)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {songs.map((song) => (
              <div key={song.id} className="flex items-center justify-between p-2 bg-gray-800 rounded">
                <div>
                  <p className="font-medium">{song.title}</p>
                  <p className="text-sm text-gray-400">
                    {song.artist} - {song.album}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveSong(song.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
