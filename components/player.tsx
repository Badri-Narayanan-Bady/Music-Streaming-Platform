"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat } from "lucide-react"
import type { Song } from "@/hooks/use-music"

interface PlayerProps {
  song: Song
  isPlaying: boolean
  onTogglePlay: () => void
  onNext: () => void
  onPrevious: () => void
}

export function Player({ song, isPlaying, onTogglePlay, onNext, onPrevious }: PlayerProps) {
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState([70])
  const [isShuffled, setIsShuffled] = useState(false)
  const [repeatMode, setRepeatMode] = useState<"off" | "all" | "one">("off")
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current && song) {
      audioRef.current.load()
      setCurrentTime(0)
      setDuration(0)
      if (isPlaying) {
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          playPromise.catch(console.error)
        }
      }
    }
  }, [song])

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(console.error)
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, song])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100
    }
  }, [volume])

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const handleEnded = () => {
    if (repeatMode === "one") {
      if (audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play().catch(console.error)
      }
    } else if (repeatMode === "all") {
      onNext()
    } else {
      onNext()
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const toggleRepeat = () => {
    setRepeatMode((prev) => {
      switch (prev) {
        case "off":
          return "all"
        case "all":
          return "one"
        case "one":
          return "off"
        default:
          return "off"
      }
    })
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0)
      if (isPlaying) {
        audioRef.current.play().catch(console.error)
      }
    }
  }

  return (
    <div className="bg-gray-900 border-t border-gray-800 p-4">
      <audio
        ref={audioRef}
        src={song.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onLoadedMetadata={handleLoadedMetadata}
        preload="metadata"
      />

      <div className="flex items-center justify-between">
        {/* Song Info */}
        <div className="flex items-center gap-4 w-1/4 min-w-0">
          <img
            src={song.coverUrl || "/placeholder.svg"}
            alt={song.title}
            width={56}
            height={56}
            className="rounded object-cover"
          />
          <div className="min-w-0 flex-1">
            <div className="font-medium text-white truncate">{song.title}</div>
            <div className="text-sm text-gray-400 truncate">{song.artist}</div>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center gap-2 w-1/2 max-w-md">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsShuffled(!isShuffled)}
              className={isShuffled ? "text-green-500" : "text-gray-400"}
            >
              <Shuffle className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onPrevious}>
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button
              size="sm"
              onClick={onTogglePlay}
              className="bg-white text-black hover:bg-gray-200 rounded-full h-10 w-10"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={onNext}>
              <SkipForward className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleRepeat}
              className={repeatMode !== "off" ? "text-green-500" : "text-gray-400"}
            >
              <Repeat className="h-4 w-4" />
              {repeatMode === "one" && <span className="text-xs ml-1">1</span>}
            </Button>
          </div>

          <div className="flex items-center gap-2 w-full">
            <span className="text-xs text-gray-400 w-10 text-right">{formatTime(currentTime)}</span>
            <Slider
              value={[currentTime]}
              max={duration}
              step={1}
              onValueChange={handleSeek}
              className="flex-1 bg-green-600 [&_.slider-track]:bg-green-600 [&_.slider-thumb]:bg-green-500"
            />
            <span className="text-xs text-gray-400 w-10">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2 w-1/4 justify-end">
          <Volume2 className="h-4 w-4 text-gray-400" />
          <Slider value={volume} max={100} step={1} onValueChange={setVolume} className="w-24" />
        </div>
      </div>
    </div>
  )
}
