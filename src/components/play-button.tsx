import { Play } from 'lucide-react'
import React from 'react'

interface IPlayButton {
  isPlaying: boolean;
  togglePlay: () => void;
}

export default function PlayButton({ isPlaying, togglePlay }: IPlayButton) {
  return (
    <div
      style={{
        display: isPlaying ? "none" : "flex"
      }}
      className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/20">
      <div
        onClick={togglePlay}
        className="w-20 h-12 bg-primary hover:bg-primary/90 rounded-lg flex items-center justify-center">
        <Play
          className="text-white" />
      </div>
    </div>
  )
}
