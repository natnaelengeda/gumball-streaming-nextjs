"use client";
import { Pause, Play } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import VideoProgressBar from "./video-progress-bar";
import PlayButton from "./play-button";
import PauseButton from "./pause-button";

type VideoPlayerProps = {
  src: string;
  poster?: string;
  className?: string;
};

export default function VideoPlayer({ src, poster, className }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPausedButton, setShowPausedButton] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const pauseFunction = () => {
    if (!videoRef.current) return;

    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(true);
    }
  }

  useEffect(() => {
    const div = videoRef.current;
    if (!div) return;

    // const handleMouseEnter = () => setIsHovered(true);
    // const handleMouseLeave = () => setIsHovered(false);

    // div.addEventListener("mouseenter", handleMouseEnter);
    // div.addEventListener("mouseleave", handleMouseLeave);

    // // cleanup on unmount
    // return () => {
    //   div.removeEventListener("mouseenter", handleMouseEnter);
    //   div.removeEventListener("mouseleave", handleMouseLeave);
    // };
  }, [isHovered]);

  console.log(isHovered);

  return (
    <div
      className={`w-full h-full relative ${className} bg-blue-500`}>
      {/* Video element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full rounded-xl shadow-2xl object-cover"
        preload="metadata"
      />

      {/* Custom overlay play button */}
      <PlayButton
        isPlaying={isPlaying}
        togglePlay={togglePlay} />

      <PauseButton
        isHovered={isHovered}
        pauseFunction={pauseFunction} />



      <div className="w-full">
        {/* <VideoProgressBar
          videoRef={videoRef}
          className="absolute bottom-4 left-0" /> */}
      </div>
    </div>
  );
}
