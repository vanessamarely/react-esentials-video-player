import React, { useRef, useImperativeHandle, forwardRef } from 'react';

// Props para VideoPlayer
interface VideoPlayerProps {
  source: string;
}

// Ref Object con funciones expuestas por VideoPlayer
interface VideoPlayerRef {
  play: () => void;
  pause: () => void;
  setVolume: (volume: number) => void;
}

const VideoPlayer = forwardRef<VideoPlayerRef, VideoPlayerProps>(
  (props, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    // Configuración de lo que se expone al componente padre a través de la ref
    useImperativeHandle(
      ref,
      () => ({
        // Funciones que el componente padre puede llamar para controlar el video
        play: () => {
          if (videoRef.current) {
            videoRef.current.play();
          }
        },
        pause: () => {
          if (videoRef.current) {
            videoRef.current.pause();
          }
        },
        setVolume: (volume) => {
          if (videoRef.current) {
            videoRef.current.volume = volume;
          }
        },
      }),
      [videoRef]
    );

    return (
      <div>
        <video ref={videoRef} width="400" controls>
          <source src={props.source} type="video/mp4" />
          Tu navegador no soporta el tag de video.
        </video>
      </div>
    );
  }
);

export default VideoPlayer;
