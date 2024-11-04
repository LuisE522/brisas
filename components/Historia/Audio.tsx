"use client";

import React, { useEffect, useRef, useState } from "react";

const YouTubeAudioPlayer = ({
  videoId,
  onMute,
}: {
  videoId: string;
  onMute: boolean;
}) => {
  //@ts-ignore
  const [player, setPlayer] = useState<YT.Player | null>(null);
  const playerRef = useRef(null);

  console.log(onMute);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(script);

    //@ts-ignore
    window.onYouTubeIframeAPIReady = () => {
      //@ts-ignore
      const newPlayer = new window.YT.Player("youtube-player", {
        height: "0%",
        width: "0%",
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          mute: 1,
          loop: 1,
          playlist: videoId,
          playsinline: 1,
        },
        events: {
          onReady: (event: any) => {
            setPlayer(event.target);
          },
        },
      });
      setPlayer(newPlayer);
    };

    return () => {
      const existingScript = document.querySelector(
        `script[src="https://www.youtube.com/iframe_api"]`
      );
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, [videoId]);

  useEffect(() => {
    if (onMute) {
      if (player) {
        player.mute();
      }
    } else {
      if (player) {
        player.unMute();
      }
    }
  }, [onMute]);

  return (
    <div className="hidden">
      <div
        id="youtube-player"
        style={{ width: "0%", height: "0%", display: "hidden" }}
      />
    </div>
  );
};

export default YouTubeAudioPlayer;
