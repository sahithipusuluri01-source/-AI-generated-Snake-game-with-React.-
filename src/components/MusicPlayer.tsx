import React, { useEffect, useRef, useState } from 'react';
import { DEMO_TRACKS } from '../context/MusicData';

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = DEMO_TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Audio playback error:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DEMO_TRACKS.length);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DEMO_TRACKS.length) % DEMO_TRACKS.length);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="neon-panel p-4 flex flex-col gap-4 w-full brutal-border bg-[#050505] select-none shadow-[6px_6px_0px_#00FFFF]">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onEnded={handleNext}
        autoPlay={isPlaying}
      />
      
      <div className="flex justify-between items-center border-b-2 border-[#FF00FF] pb-2">
        <div>
          <h2 className="text-[#00FFFF] font-header text-sm glitch-text" data-text="NET_AUDIO_STREAM">NET_AUDIO_STREAM</h2>
          <p className="text-[#FF00FF] text-xs font-pixel tracking-widest mt-1">SEQ: {isPlaying ? 'R_X_ACTIVE' : 'IDLE_WAIT_0'}</p>
        </div>
        <button className="text-[#FFFFFF] bg-[#FF00FF] px-2 py-1 font-pixel text-xs hover:bg-[#00FFFF] hover:text-black transition-colors border border-black shadow-[2px_2px_0px_#00FFFF]" onClick={toggleMute}>
          {isMuted ? '[ X_MUTED ]' : '[ VOL_MAX ]'}
        </button>
      </div>

      <div className="flex flex-col gap-1 my-2 bg-black border border-[#00FFFF] p-2 relative overflow-hidden">
        <div className="absolute right-0 top-0 text-[60px] opacity-10 text-[#FF00FF] font-header rotate-12 z-0 leading-none">
          ♫
        </div>
        <div className="text-lg font-header text-[#FFFFFF] truncate z-10" title={currentTrack.title}>
          &gt; {currentTrack.title}
        </div>
        <div className="text-[#00FFFF] text-sm font-pixel z-10">
          ORG: {currentTrack.artist} | DUR: {currentTrack.duration}
        </div>
      </div>

      <div className="flex justify-between gap-2 mt-2 w-full font-pixel font-bold">
        <button 
          onClick={handlePrev}
          className="flex-1 py-1 border border-[#FF00FF] text-[#FF00FF] hover:bg-[#FF00FF] hover:text-black transition-all shadow-[2px_2px_0px_#00FFFF]"
        >
          [ &lt;&lt; BWD ]
        </button>
        <button 
          onClick={togglePlay}
          className="flex-1 py-1 border-2 border-[#00FFFF] bg-[#00FFFF] text-black hover:bg-black hover:text-[#00FFFF] transition-all tracking-widest"
        >
          {isPlaying ? '[ HALT ]' : '[ EXEC ]'}
        </button>
        <button 
          onClick={handleNext}
          className="flex-1 py-1 border border-[#FF00FF] text-[#FF00FF] hover:bg-[#FF00FF] hover:text-black transition-all shadow-[2px_2px_0px_#00FFFF]"
        >
          [ FWD &gt;&gt; ]
        </button>
      </div>
      
      <div className="flex justify-between items-center mt-3 font-pixel text-[#00FFFF]">
         <span className="text-[10px]">MEM_BLK:</span>
         <div className="flex-1 mx-2 flex space-x-1">
           {DEMO_TRACKS.map((_, idx) => (
             <div 
               key={idx} 
               className={`h-3 w-full border ${idx === currentTrackIndex ? 'bg-[#FFFFFF] border-[#FF00FF]' : 'bg-transparent border-[#00FFFF]/40'}`}
             >
               {idx === currentTrackIndex && <div className="w-full h-full animate-pulse bg-[#FF00FF]/50" />}
             </div>
           ))}
         </div>
      </div>
    </div>
  );
}
