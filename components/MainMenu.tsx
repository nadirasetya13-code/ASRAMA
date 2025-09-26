import React, { useRef, useEffect } from 'react';

const MainMenu: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Set the playback speed to 30% of the original speed
      videoRef.current.playbackRate = 0.3;
    }
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full min-h-[calc(100vh-140px)] overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        src="https://raw.githubusercontent.com/nadirasetya13-code/asset-profile/Game/vidio/main.webm"
        autoPlay
        loop
        muted
        playsInline
        crossOrigin="anonymous"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />
    </div>
  );
};

export default MainMenu;