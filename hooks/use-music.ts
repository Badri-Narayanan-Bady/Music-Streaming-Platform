"use client"

import { useState, useEffect, useCallback } from "react"

export interface Song {
  id: string
  title: string
  artist: string
  album: string
  coverUrl: string
  audioUrl: string
  genre: string
  year: number
}

export interface Playlist {
  id: string
  name: string
  songs: Song[]
  coverUrl: string
  createdAt: Date
  description?: string
}

// Updated demo songs with correct file paths and no dateAdded
const demoSongs: Song[] = [
  {
    id: "1",
    title: "Not Like Us",
    artist: "Kendrick Lamar",
    album: "Single",
    coverUrl: "/music/covers/not-like-us.webp",
    audioUrl: "/music/Not Like Us.mp3",
    genre: "Hip-Hop",
    year: 2024,
  },
  {
    id: "2",
    title: "Chuttamalle",
    artist: "Shilpa Rao, Anirudh",
    album: "Devara",
    coverUrl: "/music/covers/chuttamalle.webp",
    audioUrl: "/music/Chuttamalle.mp3",
    genre: "Melody",
    year: 2024,
  },
  {
    id: "3",
    title: "Ae Dil Hai Mushkil",
    artist: "Arijit Singh, Pritam",
    album: "Ae Dil Hai Mushkil",
    coverUrl: "/music/covers/ae-dil-hai-mushkil.webp",
    audioUrl: "/music/Ae Dil Hai Mushkil - Title Track.mp3",
    genre: "Romance, Heartbreak",
    year: 2016,
  },
  {
    id: "4",
    title: "I Ain't Worried - OneRepublic",
    artist: "OneRepublic",
    album: "Topgun: Maverick",
    coverUrl: "/music/covers/I-Ain't-Worried.webp",
    audioUrl: "/music/I Aint Worried - One Republic.mp3",
    genre: "Pop, Rock",
    year: 2022,
  }
] as const;

export function useMusic() {
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [queue, setQueue] = useState<Song[]>([])
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [recentlyPlayed, setRecentlyPlayed] = useState<Song[]>([])
  const [jsonSongs, setJsonSongs] = useState<Song[]>([])

  // Load songs from songs.json
  useEffect(() => {
    fetch("/music/songs.json")
      .then(res => res.json())
      .then(setJsonSongs)
      .catch(console.error)
  }, [])

  // Combine hardcoded and JSON songs, avoiding duplicates by id
  const allSongs = [...demoSongs, ...jsonSongs.filter(
    jsonSong => !demoSongs.some(demoSong => demoSong.id === jsonSong.id)
  )];

  // Load saved data from localStorage
  useEffect(() => {
    const savedPlaylists = localStorage.getItem("groovify-playlists")
    const savedRecentlyPlayed = localStorage.getItem("groovify-recently-played")

    if (savedPlaylists) {
      const parsed = JSON.parse(savedPlaylists)
      setPlaylists(
        parsed.map((p: any) => ({
          ...p,
          createdAt: new Date(p.createdAt),
          songs: p.songs, // dateAdded removed
        })),
      )
    }

    if (savedRecentlyPlayed) {
      const parsed = JSON.parse(savedRecentlyPlayed)
      setRecentlyPlayed(parsed) // dateAdded removed
    }
  }, [])

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem("groovify-playlists", JSON.stringify(playlists))
  }, [playlists])

  useEffect(() => {
    localStorage.setItem("groovify-recently-played", JSON.stringify(recentlyPlayed))
  }, [recentlyPlayed])

  // Update recently played when song changes
  useEffect(() => {
    if (currentSong) {
      setRecentlyPlayed((prev) => {
        const filtered = prev.filter((song) => song.id !== currentSong.id)
        return [currentSong, ...filtered].slice(0, 20) // Keep last 20 songs
      })
    }
  }, [currentSong])

  const togglePlay = () => setIsPlaying(!isPlaying)

  const addToQueue = useCallback((song: Song) => {
    setQueue((prev) => {
      // Prevent duplicates by song id
      if (prev.some((s) => s.id === song.id)) return prev
      return [...prev, song]
    })
  }, [])

  const createPlaylist = useCallback((name: string, description?: string) => {
    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name,
      description,
      songs: [],
      coverUrl: "/placeholder.svg?height=300&width=300&text=Playlist",
      createdAt: new Date(),
    }
    setPlaylists((prev) => [...prev, newPlaylist])
    return newPlaylist
  }, [])

  const addToPlaylist = useCallback((playlistId: string, song: Song) => {
    setPlaylists((prev) =>
      prev.map((playlist) =>
        playlist.id === playlistId
          ? { ...playlist, songs: [...playlist.songs.filter((s) => s.id !== song.id), song] }
          : playlist,
      ),
    )
  }, [])

  const removeFromPlaylist = useCallback((playlistId: string, songId: string) => {
    setPlaylists((prev) =>
      prev.map((playlist) =>
        playlist.id === playlistId ? { ...playlist, songs: playlist.songs.filter((s) => s.id !== songId) } : playlist,
      ),
    )
  }, [])

  const deletePlaylist = useCallback((playlistId: string) => {
    setPlaylists((prev) => prev.filter((p) => p.id !== playlistId))
  }, [])

  const playNext = useCallback(() => {
    if (queue.length > 0 && currentSong) {
      const currentIndex = queue.findIndex((s) => s.id === currentSong.id)
      if (currentIndex < queue.length - 1) {
        setCurrentSong(queue[currentIndex + 1])
      }
    }
  }, [currentSong, queue])

  const playPrevious = useCallback(() => {
    if (queue.length > 0 && currentSong) {
      const currentIndex = queue.findIndex((s) => s.id === currentSong.id)
      if (currentIndex > 0) {
        setCurrentSong(queue[currentIndex - 1])
      }
    }
  }, [currentSong, queue])

  const searchSongs = useCallback(
    (query: string): Song[] => {
      if (!query.trim()) return allSongs

      const lowercaseQuery = query.toLowerCase()
      return allSongs.filter(
        (song) =>
          song.title.toLowerCase().includes(lowercaseQuery) ||
          song.artist.toLowerCase().includes(lowercaseQuery) ||
          song.album.toLowerCase().includes(lowercaseQuery) ||
          song.genre.toLowerCase().includes(lowercaseQuery),
      )
    },
    [allSongs],
  )

  const playSong = useCallback(
    (song: Song, songList: Song[] = allSongs) => {
      setCurrentSong(song)
      setQueue(songList)
      setIsPlaying(true)
    },
    [allSongs],
  )

  return {
    currentSong,
    isPlaying,
    queue,
    playlists,
    allSongs,
    recentlyPlayed,
    setCurrentSong: playSong,
    togglePlay,
    addToQueue,
    createPlaylist,
    addToPlaylist,
    removeFromPlaylist,
    deletePlaylist,
    playNext,
    playPrevious,
    searchSongs,
  }
}
