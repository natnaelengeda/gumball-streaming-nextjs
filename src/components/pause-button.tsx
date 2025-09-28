import React from 'react'
import { Pause } from 'lucide-react';

interface IPauseButton {
  isHovered: boolean;
  pauseFunction: () => void;
}

export default function PauseButton({ isHovered, pauseFunction }: IPauseButton) {
  return (
    <div
      style={{
        display: isHovered ? "flex" : "none"
      }}
      className="w-20 h-12 absolute inset-0 top-1/2 left-1/2 flex items-center justify-center cursor-pointer">
      <div
        onClick={pauseFunction}
        className="w-20 h-12 bg-primary hover:bg-primary/90 rounded-lg flex items-center justify-center">
        <Pause
          className="text-white" />
      </div>
    </div>
  )
}
