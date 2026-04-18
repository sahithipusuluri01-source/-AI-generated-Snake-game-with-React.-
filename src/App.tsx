import React from 'react';
import MusicPlayer from './components/MusicPlayer';
import SnakeGame from './components/SnakeGame';

export default function App() {
  return (
    <div className="min-h-screen scanlines relative bg-[#050505] text-[#00FFFF] p-4 flex flex-col items-center overflow-x-hidden flicker">
      <div className="static-noise"></div>
      
      {/* HUD HEADER */}
      <header className="w-full max-w-5xl flex justify-between items-end border-b-4 border-[#FF00FF] pb-4 mb-4 z-10 opacity-90 mt-4 screen-tear relative">
        <div className="absolute top-0 right-0 text-[10px] uppercase text-[#00FFFF] opacity-50 font-pixel transform rotate-90 origin-top-right">
          ADDR_0x00F8B
        </div>
        <div>
          <h1 className="text-4xl font-header glitch-text text-[#FFFFFF]" data-text="OS.OROBOROS_">OS.OROBOROS_</h1>
          <div className="text-[#00FFFF] bg-[#FF00FF]/20 px-2 py-1 border border-[#00FFFF] font-pixel text-xl mt-2 tracking-widest uppercase inline-block">
            &gt; SECURE_SUBROUTINE_ENV_v9
          </div>
        </div>
        <div className="text-right hidden sm:flex flex-col items-end gap-1">
          <div className="text-[#FF00FF] font-pixel bg-[#FF00FF]/10 px-2 border border-[#FF00FF] shadow-[2px_2px_0px_#00FFFF]">
            SYS_TIME_SYNC: {new Date().toLocaleTimeString('en-US', { hour12: false })}
          </div>
          <div className="text-[#00FFFF] font-pixel bg-black border border-[#00FFFF] px-2 shadow-[-2px_-2px_0px_#FF00FF]">
            STATUS: CORRUPTED
          </div>
        </div>
      </header>

      {/* OVERLAY CRYPTIC TEXT */}
      <div className="absolute top-[20%] left-[2%] text-[#FF00FF] opacity-30 font-header text-[8px] transform -rotate-90 origin-left hidden lg:block tracking-widest whitespace-nowrap">
        MEM_ALLOC_ERROR // SEC_BREACH_DETECTED // OVERRIDE_PROTOCOL_INITIATED //
      </div>

      {/* MAIN CONTENT GRID - JARRING LAYOUT */}
      <main className="w-full max-w-5xl flex flex-col lg:flex-row gap-8 z-10 relative">
        
        {/* LEFTPANEL - LOGS */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
           <div className="neon-panel p-4 brutal-border h-fit relative flicker">
              <h3 className="font-header text-[#FFFFFF] bg-[#FF00FF] text-[10px] w-fit px-2 py-1 mb-4 shadow-[2px_2px_0px_#00FFFF]">SYS.DIAG_0x00</h3>
              <ul className="text-lg font-pixel text-[#00FFFF] space-y-1 uppercase tracking-wider">
                <li className="flex justify-between"><span>[CPU]</span> <span className="text-[#FF00FF]">104.9%</span></li>
                <li className="flex justify-between"><span>[MEM]</span> <span>ERR_NO_PAGE</span></li>
                <li className="flex justify-between"><span>[NET]</span> <span className="text-[#FF00FF] glitch-text" data-text="SEVERED">SEVERED</span></li>
                <li className="flex justify-between border-t border-[#00FFFF]/30 pt-2 mt-2"><span>[FWL]</span> <span>DISABLED</span></li>
              </ul>
              <div className="absolute -bottom-3 -right-3 text-[10px] font-pixel bg-[#00FFFF] text-black px-1">PID_394</div>
           </div>
           
           <div className="mt-4 p-4 border border-[#00FFFF] text-[#00FFFF] font-pixel text-sm uppercase relative bg-black backdrop-blur-md">
               <div className="absolute top-0 left-0 w-full h-full bg-[#FF00FF]/5 pointer-events-none"></div>
               <span className="font-header text-[#FF00FF]">[!] SEC_WARN :</span> PROLONGED EXPOSURE TO HEX-FREQUENCIES MAY INDUCE COGNITIVE CASCADE. EXECUTE AUDIO AT OWN RISK.
           </div>
        </div>

        {/* CENTER PANEL - TERMINAL */}
        <div className="w-full lg:w-2/3 flex flex-col items-center">
            <div className="w-full flex justify-between border-b border-[#FF00FF] mb-2 px-2 text-[#FF00FF] font-pixel text-[12px] uppercase tracking-widest">
              <span>ROOT@OROBOROS:~/SNAKE_MODULE</span>
              <span className="animate-pulse">_</span>
            </div>
            <SnakeGame />
            <div className="mt-8 w-full max-w-[400px] screen-tear">
                <MusicPlayer />
            </div>
        </div>

      </main>

    </div>
  );
}
