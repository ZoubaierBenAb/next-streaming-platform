"use client";

import { Track, Participant } from "livekit-client";

import { useTracks } from "@livekit/components-react";

import { useRef, useState } from "react";
import { FullScreenControl } from "./full-screen-control";

import { useEventListener } from "usehooks-ts";

interface LiveVideoProps {
  participant?: Participant;
}

export const LiveVideo = ({ participant }: LiveVideoProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [fullScreen, setFullScreen] = useState(false);

  const toggleFullScreen = () => {
    if (fullScreen) {
      document.exitFullscreen()
    } else if (wrapperRef?.current) {
      wrapperRef.current.requestFullscreen()
    }
  };

  const handleFullscreenChange = () => {
    const isCurrentlyFullscreen = document.fullscreenElement !== null;
    setFullScreen(isCurrentlyFullscreen);
  }

  useEventListener("fullscreenchange", handleFullscreenChange, wrapperRef);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant?.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current);
      }
    });

  return (
    <div ref={wrapperRef} className={"relative h-full flex"}>
      <video ref={videoRef} width={"100%"} />
      <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
        <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
          <FullScreenControl
            isFullScreen={fullScreen}
            onToggle={toggleFullScreen}
          />
        </div>
      </div>
    </div>
  );
};
