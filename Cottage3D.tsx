import React, { useState, useEffect } from 'react';
import { CottageStage } from './types';

interface Cottage3DProps {
  stage: CottageStage;
  playerName: string;
  isCurrent: boolean;
  themeColor: string; // e.g. '#3b82f6' or '#ef4444'
}

export const Cottage3D: React.FC<Cottage3DProps> = ({ stage, playerName, isCurrent, themeColor }) => {
  const [rotation, setRotation] = useState<number>(45); // angle in degrees
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  useEffect(() => {
    let interval: any;
    if (autoRotate) {
      interval = setInterval(() => {
        setRotation((prev) => (prev + 0.8) % 360);
      }, 30);
    }
    return () => clearInterval(interval);
  }, [autoRotate]);

  // Stage details Armenian / Russian / Spanish translation helper
  const getStageTitleArm = (s: number) => {
    switch (s) {
      case 0: return 'Դատարկ հողամաս';
      case 1: return 'Հիմք (Cimientos)';
      case 2: return 'Պատեր և Սյուներ (Paredes)';
      case 3: return 'Պատուհաններ (Ventanas)';
      case 4: return 'Դուռ և Պատշգամբ (Puerta)';
      case 5: return 'Կղմինդրե Տանիք (Tejado)';
      case 6: return 'Ծխնելույզ և Ծուխ (Chimenea)';
      case 7: return 'Այգի և Ցանկապատ (Jardín)';
      case 8: return 'Լողավազան և Լույսեր (Piscina y Luces)';
      default: return 'Անհայտ փուլ';
    }
  };

  return (
    <div className={`relative flex flex-col items-center p-6 bg-white rounded-2xl border-4 transition-all duration-300 ${
      isCurrent ? 'border-indigo-500 shadow-xl shadow-indigo-200/50 scale-[1.01]' : 'border-slate-200 shadow-md'
    }`}>
      {/* Player Header */}
      <div className="w-full flex items-center justify-between mb-2">
        <span className="font-sans font-black text-lg text-slate-800 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: themeColor }} />
          {playerName}
        </span>
        <span className="font-mono text-xs font-bold px-2 py-0.5 bg-amber-100 border border-amber-300 text-amber-800 rounded-full">
          Փուլ {stage}/8
        </span>
      </div>

      <div className="w-full text-center text-xs font-mono text-slate-500 mb-4 h-5 truncate font-semibold">
        {getStageTitleArm(stage)}
      </div>

      {/* 3D Scene Wrapper */}
      <div className="relative w-72 h-72 flex items-center justify-center overflow-hidden bg-sky-50 rounded-xl border-2 border-indigo-100 shadow-inner">
        {/* Sky gradient background */}
        <div className="absolute inset-0 bg-gradient-to-t from-sky-100/60 via-white to-white pointer-events-none" />

        {/* Ambient grids / star dots if night lights active */}
        {stage >= 8 && (
          <div className="absolute inset-0 pointer-events-none opacity-50 bg-[radial-gradient(circle_at_20%_30%,rgba(251,191,36,0.25)_1.5px,transparent_1.5px)] bg-[size:16px_16px]" />
        )}

        {/* The 3D container */}
        <div 
          className="relative w-44 h-44"
          style={{
            perspective: '800px',
            transformStyle: 'preserve-3d',
          }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center transition-transform duration-100"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateX(-24deg) rotateY(${rotation}deg)`,
            }}
          >
            {/* Ground / Grass lot - always present (Stage 0+) */}
            <div 
              className="absolute w-36 h-36 bg-gradient-to-br from-emerald-800 to-emerald-950 border border-emerald-500/30 rounded-lg shadow-2xl transition-all duration-700"
              style={{
                transform: 'rotateX(90deg) translateZ(-40px)',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Inner details like grass patches */}
              <div className="absolute inset-1 border border-dashed border-emerald-600/40 rounded" />
              
              {/* STAGE 7: Garden & Picket Fence around the grass */}
              {stage >= 7 && (
                <div 
                  className="absolute inset-0"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Fence Front */}
                  <div className="absolute top-0 left-0 right-0 h-4 bg-amber-100/90 border border-amber-900/10 flex justify-between px-2" style={{ transform: 'rotateX(-95deg) translateY(-4px)', transformOrigin: 'top' }}>
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="w-1.5 h-6 bg-slate-100 border-t-2 border-slate-300 -mt-1 shadow" />
                    ))}
                  </div>
                  {/* Flowers inside garden */}
                  <div className="absolute top-8 left-3 w-3 h-3 rounded-full bg-rose-500 animate-bounce" style={{ transform: 'rotateX(-90deg) translateZ(10px)' }} />
                  <div className="absolute top-12 left-20 w-3.5 h-3.5 rounded-full bg-yellow-400" style={{ transform: 'rotateX(-90deg) translateZ(8px)' }} />
                  <div className="absolute top-24 left-4 w-3 h-3 rounded-full bg-cyan-400" style={{ transform: 'rotateX(-90deg) translateZ(12px)' }} />
                </div>
              )}

              {/* STAGE 8: Swimming Pool */}
              {stage >= 8 && (
                <div 
                  className="absolute bottom-1 right-1 w-14 h-14 bg-indigo-950 border-2 border-slate-400/50 rounded flex items-center justify-center overflow-hidden"
                  style={{
                    transform: 'translateZ(1px)',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* Blue shiny water */}
                  <div className="absolute inset-0.5 bg-cyan-400/50 animate-pulse flex items-center justify-center">
                    <div className="w-10 h-10 bg-cyan-300/60 rounded-full filter blur-sm" />
                  </div>
                  <span className="text-[8px] text-cyan-200/90 font-mono tracking-widest uppercase pointer-events-none translate-y-1">POOL</span>
                </div>
              )}
            </div>

            {/* STAGE 1+: Foundation concrete block */}
            {stage >= 1 && (
              <div 
                className="absolute w-28 h-28 bg-slate-600 border border-slate-500 shadow-lg transition-transform duration-700"
                style={{
                  transform: 'rotateX(90deg) translateZ(-34px)',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Sides of the concrete slab for actual 3D thickness */}
                {/* Front Side */}
                <div className="absolute bottom-0 left-0 w-28 h-4 bg-slate-700 border-t border-slate-500" style={{ transform: 'rotateX(-90deg)', transformOrigin: 'bottom', height: '6px' }} />
                {/* Back Side */}
                <div className="absolute top-0 left-0 w-28 h-4 bg-slate-800" style={{ transform: 'rotateX(90deg)', transformOrigin: 'top', height: '6px' }} />
                {/* Left Side */}
                <div className="absolute top-0 left-0 h-28 w-4 bg-slate-755" style={{ transform: 'rotateY(-90deg) translateX(-6px)', transformOrigin: 'left', width: '6px' }} />
                {/* Right Side */}
                <div className="absolute top-0 right-0 h-28 w-4 bg-slate-650" style={{ transform: 'rotateY(90deg)', transformOrigin: 'right', width: '6px' }} />
              </div>
            )}

            {/* STAGE 2+: Cozy Walls & Structure (Main building block) */}
            {stage >= 2 && (
              <div 
                className="absolute w-24 h-20 transition-all duration-700 font-sans"
                style={{
                  transform: 'translateZ(-5px)', // lift walls
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* 1. FRONT WALL (Wood texture or lovely cream stucco) */}
                <div 
                  className="absolute inset-x-0 bottom-0 h-20 bg-amber-50 border border-slate-300/80 rounded-sm flex flex-col justify-end p-2"
                  style={{
                    transform: 'translateZ(24px)',
                    backgroundImage: 'radial-gradient(#fef3c7 40%, transparent 41%), radial-gradient(#fef3c7 40%, transparent 41%)',
                    backgroundSize: '12px 12px',
                    backgroundPosition: '0 0, 6px 6px',
                  }}
                >
                  {/* If stage 3 is not reached, walls are plain */}
                  {/* STAGE 4: Front Door entry */}
                  {stage >= 4 && (
                    <div className="mx-auto w-8 h-14 bg-amber-800 border-2 border-amber-950 rounded-t-lg relative flex items-center justify-center shadow-lg">
                      {/* Brass handle */}
                      <div className="absolute right-1 top-7 w-1 h-2 bg-yellow-400 rounded-full" />
                      {/* Small glassy panel inside door */}
                      <div className="w-4 h-4 bg-cyan-200/80 border border-amber-950 rounded mb-4" />
                    </div>
                  )}
                </div>

                {/* 2. BACK WALL */}
                <div 
                  className="absolute inset-x-0 bottom-0 h-20 bg-amber-100 border border-slate-300"
                  style={{
                    transform: 'translateZ(-24px) rotateY(180deg)',
                  }}
                >
                  <div className="absolute left-6 top-5 w-6 h-6 bg-slate-800/90 rounded border" />
                </div>

                {/* 3. LEFT WALL */}
                <div 
                  className="absolute bottom-0 h-20 bg-amber-50/95 border border-slate-300"
                  style={{
                    width: '48px',
                    left: '-12px',
                    transform: 'rotateY(-90deg) translateZ(12px)',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* STAGE 3: Left window */}
                  {stage >= 3 && (
                    <div className="absolute left-3 top-5 w-6 h-8 bg-sky-200/90 border-2 border-white rounded shadow-inner flex flex-wrap p-0.5">
                      <div className="w-1/2 h-1/2 border-r border-b border-white" />
                      <div className="w-1/2 h-1/2 border-b border-white" />
                      <div className="w-1/2 h-1/2 border-r border-white" />
                      <div className="w-1/2 h-1/2" />
                    </div>
                  )}
                </div>

                {/* 4. RIGHT WALL */}
                <div 
                  className="absolute bottom-0 h-20 bg-amber-100/95 border border-slate-350"
                  style={{
                    width: '48px',
                    right: '-12px',
                    transform: 'rotateY(90deg) translateZ(12px)',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* STAGE 3: Right window */}
                  {stage >= 3 && (
                    <div className="absolute right-3 top-5 w-6 h-8 bg-sky-200/90 border-2 border-white rounded shadow-inner flex flex-wrap p-0.5">
                      <div className="w-1/2 h-1/2 border-r border-b border-white" />
                      <div className="w-1/2 h-1/2 border-b border-white" />
                      <div className="w-1/2 h-1/2 border-r border-white" />
                      <div className="w-1/2 h-1/2" />
                    </div>
                  )}
                </div>

                {/* STAGE 4: Porch base and columns */}
                {stage >= 4 && (
                  <div 
                    className="absolute"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Front Porch floor extended */}
                    <div className="absolute w-12 h-6 bg-amber-900 border border-amber-950" style={{ transform: 'rotateX(90deg) translateZ(-19px) translateY(-32px)', left: '6px' }} />
                  </div>
                )}
              </div>
            )}

            {/* STAGE 5+: Majestic Triangular Roof */}
            {stage >= 5 && (
              <div 
                className="absolute w-28 h-16 transition-all duration-1000"
                style={{
                  top: '48px',
                  transform: 'translateZ(-5px)',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Front triangular wood pitch */}
                <div 
                  className="absolute w-24 h-10 bg-amber-800"
                  style={{
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                    transform: 'translateZ(24px)',
                    left: '2px'
                  }}
                />

                {/* Back triangular wood pitch */}
                <div 
                  className="absolute w-24 h-10 bg-amber-800"
                  style={{
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                    transform: 'translateZ(-24px) rotateY(180deg)',
                    left: '2px'
                  }}
                />

                {/* Slanted Roof Left Panel (Terracotta styled) */}
                <div 
                  className="absolute w-28 h-18 bg-rose-700 border-b-2 border-rose-900 shadow-md flex justify-around items-center"
                  style={{
                    width: '54px',
                    height: '28px',
                    left: '-2px',
                    top: '2px',
                    transform: 'rotateY(-90deg) rotateX(45deg) translateZ(10px)',
                    backgroundImage: 'repeating-linear-gradient(45deg, #be123c, #be123c 2px, #9f1239 2px, #9f1239 8px)',
                  }}
                />

                {/* Slanted Roof Right Panel */}
                <div 
                  className="absolute w-28 h-18 bg-rose-700 border-b-2 border-rose-900 shadow-md flex justify-around items-center"
                  style={{
                    width: '54px',
                    height: '28px',
                    right: '-2px',
                    top: '2px',
                    transform: 'rotateY(90deg) rotateX(45deg) translateZ(10px)',
                    backgroundImage: 'repeating-linear-gradient(-45deg, #be123c, #be123c 2px, #9f1239 2px, #9f1239 8px)',
                  }}
                />

                {/* STAGE 6: Chimney & active smoke */}
                {stage >= 6 && (
                  <div 
                    className="absolute w-4 h-10 bg-red-800 border border-amber-950"
                    style={{
                      left: '8px',
                      top: '-14px',
                      transform: 'translateZ(-10px)',
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* Smoke puffs */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col gap-0.5 items-center pointer-events-none">
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-ping opacity-60" style={{ animationDuration: '2s' }} />
                      <div className="w-2.5 h-2.5 bg-slate-200 rounded-full animate-bounce opacity-70" style={{ animationDuration: '3s' }} />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STAGE 8: Evening lanterns/Lights glowing points */}
            {stage >= 8 && (
              <div 
                className="absolute"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Porch Lantern glow */}
                <div className="absolute w-2 h-2 rounded-full bg-yellow-300 animate-ping" style={{ transform: 'translateY(12px) translateZ(28px)', left: '8px' }} />
                <div className="absolute w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-[0_0_12px_#fbbf24]" style={{ transform: 'translateY(12px) translateZ(28px)', left: '8px' }} />
                
                {/* Garden lantern right */}
                <div className="absolute w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_10px_#f59e0b]" style={{ transform: 'translateY(30px) translateZ(-15px) translateX(25px)' }} />
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Rotation and Rotation Settings */}
      <div className="w-full mt-4 flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-mono text-slate-500 font-bold">
          <span>Պտտել 3D տունը`</span>
          <span className="text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">{Math.round(rotation)}°</span>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="0"
            max="360"
            value={rotation}
            onChange={(e) => {
              setRotation(Number(e.target.value));
              setAutoRotate(false); // disable auto once manual slider touched
            }}
            className="flex-1 accent-indigo-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            id={`rotation-slider-${playerName.replace(/\s+/g, '-')}`}
          />
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-3 py-1 rounded-xl text-[10px] font-sans font-bold border-2 transition-all ${
              autoRotate 
                ? 'bg-amber-100 text-amber-800 border-amber-300' 
                : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200 hover:text-slate-800'
            }`}
            id={`auto-rotate-btn-${playerName.replace(/\s+/g, '-')}`}
          >
            {autoRotate ? '⏸ Կանգնեցնել' : '▶ Պտտել'}
          </button>
        </div>
      </div>
    </div>
  );
};
