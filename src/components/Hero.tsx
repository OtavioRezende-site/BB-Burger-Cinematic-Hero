import React, { useRef, useState, useEffect } from 'react';
import { ArrowDown, Star, Clock, Sparkles, ChevronRight } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface HeroProps {
  onScrollToMenu: () => void;
  onOrderNow: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToMenu, onOrderNow }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (prefersReducedMotion) {
      video.pause();
      return;
    }

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy prevented playback
      });
    }
  }, [prefersReducedMotion]);

  return (
    <section
      aria-label="Apresentação BB Burger"
      className="relative w-full h-screen min-h-[100dvh] max-h-[100dvh] flex flex-col justify-between items-center overflow-hidden bg-[#09090b] select-none"
    >
      {/* Cinematic Burger Video Background - 100% Fullscreen on all viewports */}
      <div className="absolute inset-0 w-full h-full min-h-full min-w-full overflow-hidden select-none pointer-events-none">
        <video
          ref={videoRef}
          src={`${import.meta.env.BASE_URL}hero-burger.mp4`}
          poster={`${import.meta.env.BASE_URL}hero-burger-poster.jpg`}
          autoPlay={!prefersReducedMotion}
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`w-full h-full min-w-full min-h-full object-cover object-center scale-[1.02] transform transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-90'
          }`}
          aria-hidden="true"
        />

        {/* Subtle Dark Gradient Overlays - Preserves burger visibility & ensures text readability */}
        {/* Top Vignette for Nav bar */}
        <div className="absolute inset-x-0 top-0 h-32 sm:h-44 bg-gradient-to-b from-black/90 via-black/50 to-transparent pointer-events-none" />

        {/* Center-Bottom Radial Vignette to gently frame the burger */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/25 to-black/80 pointer-events-none" />

        {/* Bottom Gradient for smooth flow */}
        <div className="absolute inset-x-0 bottom-0 h-36 sm:h-52 bg-gradient-to-t from-[#0b0b0e] via-[#0b0b0e]/70 to-transparent pointer-events-none" />

        {/* Subtle Side Gradients for Desktop */}
        <div className="hidden lg:block absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black/60 to-transparent pointer-events-none" />
        <div className="hidden lg:block absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black/60 to-transparent pointer-events-none" />
      </div>

      {/* Hero Foreground Content - Perfectly Vertically Balanced (No Logo, Pure Cinematic Focus) */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex-1 flex flex-col justify-center items-center pt-24 sm:pt-28 pb-4">
        
        {/* Bold Headline in Brazilian Portuguese */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase font-display leading-[0.95] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          Seu próximo hambúrguer{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 animate-pulse-glow">
            favorito
          </span>{' '}
          está aqui.
        </h1>

        {/* Supporting Copy */}
        <p className="mt-4 sm:mt-5 text-base sm:text-xl md:text-2xl text-zinc-200 max-w-2xl font-medium leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          Explore nosso cardápio, personalize seu pedido e peça direto pelo WhatsApp.
        </p>

        {/* CTAs: PRIMARY "VER CARDÁPIO" & SECONDARY "FAZER PEDIDO" */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4.5 w-full max-w-sm sm:max-w-none animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          
          {/* Primary CTA */}
          <button
            onClick={onScrollToMenu}
            className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-4.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-base sm:text-lg tracking-wide uppercase shadow-[0_0_35px_rgba(245,158,11,0.45)] hover:shadow-[0_0_45px_rgba(245,158,11,0.6)] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer border border-amber-300/40"
          >
            <span>VER CARDÁPIO</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Secondary CTA */}
          <button
            onClick={onOrderNow}
            className="w-full sm:w-auto px-8 sm:px-9 py-4 sm:py-4.5 rounded-2xl bg-black/60 hover:bg-black/80 backdrop-blur-md text-white hover:text-amber-300 font-bold text-base sm:text-lg tracking-wide uppercase border border-zinc-700 hover:border-amber-500/60 shadow-xl active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>FAZER PEDIDO</span>
          </button>

        </div>

      </div>

      {/* Bottom Section - Highlights Strip & Scroll Guide anchored to screen bottom */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 pb-4 sm:pb-6 flex flex-col items-center">
        
        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-3 gap-2 sm:gap-6 w-full border-t border-zinc-800/80 pt-3 sm:pt-4 text-zinc-300 mb-2">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-amber-400 font-bold text-xs sm:text-sm">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>4.9 / 5.0</span>
            </div>
            <span className="text-[10px] sm:text-xs text-zinc-400">1.280+ avaliações</span>
          </div>

          <div className="flex flex-col items-center border-x border-zinc-800">
            <div className="flex items-center gap-1 text-zinc-100 font-bold text-xs sm:text-sm">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>30-45 min</span>
            </div>
            <span className="text-[10px] sm:text-xs text-zinc-400">Entrega rápida Maricá</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-zinc-100 font-bold text-xs sm:text-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>100% Angus</span>
            </div>
            <span className="text-[10px] sm:text-xs text-zinc-400">Pão Brioche Selado</span>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <button
          onClick={onScrollToMenu}
          aria-label="Rolar para o cardápio"
          className="flex flex-col items-center gap-0.5 text-zinc-400 hover:text-amber-400 transition-colors animate-bounce cursor-pointer group pt-1"
        >
          <span className="text-[9px] sm:text-[10px] tracking-widest uppercase font-semibold text-zinc-500 group-hover:text-amber-400">
            Cardápio
          </span>
          <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>

      </div>

    </section>
  );
};
