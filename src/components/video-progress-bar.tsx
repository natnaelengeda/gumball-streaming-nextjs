"use client";
import React, { useRef, useState, useEffect } from "react";

type VideoProgressBarProps = {
  videoRef: React.RefObject<HTMLVideoElement> | null;
  className?: string;
};

export default function VideoProgressBar({ videoRef, className }: VideoProgressBarProps) {
  const [progress, setProgress] = useState(0);

  // Update progress as video plays
  useEffect(() => {
    const video = videoRef!.current;
    if (!video) return;

    const updateProgress = () => {
      setProgress((video.currentTime / video.duration) * 100);
    };

    video.addEventListener("timeupdate", updateProgress);
    return () => video.removeEventListener("timeupdate", updateProgress);
  }, [videoRef]);

  // Seek video when user clicks on the progress bar
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const video = videoRef!.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * video.duration;
    video.currentTime = newTime;
  };

  return (
    <div
      className={`h-2 w-80 mx-3 bg-white/20 rounded-full cursor-pointer ${className}`}
      onClick={handleClick}>
      <div
        className="h-full bg-primary rounded"
        style={{ width: `${progress}%` }} />
    </div>
  );
}
