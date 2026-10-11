import React from 'react';
import { Star, Quote, CheckCircle, ExternalLink } from 'lucide-react';
import { REVIEWS, RESTAURANT_INFO } from '../data/menuData';

export const CustomerReviews: React.FC = () => {
  // Duplicate reviews to create a seamless infinite marquee loop
  const marqueeReviews = [...REVIEWS, ...REVIEWS];

  return (
    <section id="avaliacoes" className="py-16 sm:py-24 bg-[#0d0d12] border-t border-b border-zinc-800/80 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            {/* Google Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold mb-3">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span className="text-zinc-200">Google Meu Negócio</span>
              <span className="text-amber-400 font-bold flex items-center gap-1">
                4.8
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-display tracking-tight">
              O Que Nossos Clientes <span className="text-amber-400">Dizem</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-zinc-400 max-w-xl">
              Depoimentos reais deixados no Google Maps sobre os smash burgers e o atendimento da BB Burger em Maricá.
            </p>
          </div>

          {/* Button to Google Profile */}
          <a
            href={RESTAURANT_INFO.googleBusinessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-800 hover:border-amber-500/40 text-xs font-bold flex items-center gap-2 transition-all shrink-0 shadow-lg cursor-pointer"
          >
            <span>Ver Todas as Avaliações no Google</span>
            <ExternalLink className="w-4 h-4 text-amber-400" />
          </a>
        </div>

      </div>

      {/* Infinite Continuous Marquee Container (Right to Left) */}
      <div className="relative w-full overflow-hidden py-3">
        
        {/* Left & Right Gradient Shadows for seamless fade effect */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#0d0d12] via-[#0d0d12]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#0d0d12] via-[#0d0d12]/80 to-transparent z-10 pointer-events-none" />

        {/* Marquee Track Moving from Right to Left */}
        <div className="animate-marquee-left flex gap-5 sm:gap-6 will-change-transform">
          {marqueeReviews.map((review, idx) => (
            <div
              key={`${review.id}-${idx}`}
              className="w-[300px] sm:w-[380px] p-5 sm:p-6 rounded-3xl bg-[#14141c] hover:bg-[#181822] border border-zinc-800/90 hover:border-amber-500/50 shrink-0 flex flex-col justify-between transition-all duration-300 shadow-xl group cursor-pointer"
            >
              <div>
                {/* Header with Google Logo & Stars */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-zinc-500">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>{review.date}</span>
                  </div>
                </div>

                {/* Review Title */}
                <h3 className="text-sm font-bold text-white mb-2 leading-snug group-hover:text-amber-300 transition-colors">
                  &ldquo;{review.title}&rdquo;
                </h3>
                
                {/* Review Comment */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic line-clamp-4">
                  {review.comment}
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-5 pt-3.5 border-t border-zinc-800/80 flex items-center gap-3">
                <img
                  src={review.avatar}
                  alt={review.author}
                  className="w-9 h-9 rounded-full object-cover border border-amber-500/40 shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white flex items-center gap-1 truncate">
                    {review.author}
                    <CheckCircle className="w-3 h-3 text-emerald-400 inline shrink-0" />
                  </h4>
                  <span className="text-[10px] text-amber-400/90 font-medium block truncate">
                    {review.badge}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <div className="text-center mt-6">
        <span className="text-[11px] text-zinc-500 tracking-wider">
          ✦ Passe o mouse ou toque para pausar e ler cada depoimento ✦
        </span>
      </div>

    </section>
  );
};
