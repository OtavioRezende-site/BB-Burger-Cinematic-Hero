import React from 'react';
import { Plus, SlidersHorizontal, Flame, Sparkles } from 'lucide-react';
import { MenuItem } from '../types/burger';

interface ProductCardProps {
  item: MenuItem;
  onCustomize: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  item,
  onCustomize,
  onQuickAdd,
}) => {
  return (
    <div className="group relative bg-[#131318] hover:bg-[#181820] border border-zinc-800/90 hover:border-amber-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between">
      
      {/* Top Image & Badges */}
      <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-zinc-900">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient shadow for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#131318] via-transparent to-black/30 pointer-events-none" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {item.badge && (
            <span className="px-2.5 py-1 rounded-md bg-amber-500 text-black text-[10px] font-black tracking-wider uppercase shadow-md flex items-center gap-1">
              <Flame className="w-3 h-3 fill-black" />
              {item.badge}
            </span>
          )}
          {item.originalPrice && (
            <span className="px-2 py-1 rounded-md bg-red-600 text-white text-[10px] font-bold tracking-wider uppercase shadow-md">
              OFERTA
            </span>
          )}
        </div>

        {/* Prep Time */}
        {item.prepTime && (
          <span className="absolute bottom-2 right-3 text-[11px] font-medium text-zinc-300 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded-md">
            🕒 {item.prepTime}
          </span>
        )}
      </div>

      {/* Item Body Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
              {item.name}
            </h3>
          </div>

          <p className="mt-1.5 text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          {/* Ingredient Pills */}
          <div className="mt-3 flex flex-wrap gap-1">
            {item.ingredients.slice(0, 3).map((ing, idx) => (
              <span
                key={idx}
                className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800/80 text-zinc-300 font-medium"
              >
                {ing}
              </span>
            ))}
            {item.ingredients.length > 3 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-zinc-800/50 text-zinc-400">
                +{item.ingredients.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Price & Action Buttons */}
        <div className="mt-5 pt-4 border-t border-zinc-800/80 flex items-center justify-between gap-2">
          
          {/* Price */}
          <div className="flex flex-col">
            {item.originalPrice && (
              <span className="text-[11px] text-zinc-500 line-through">
                R$ {item.originalPrice.toFixed(2).replace('.', ',')}
              </span>
            )}
            <span className="text-xl sm:text-2xl font-black text-amber-400 tracking-tight font-display">
              R$ {item.price.toFixed(2).replace('.', ',')}
            </span>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {item.customizable ? (
              <button
                onClick={() => onCustomize(item)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-black border border-amber-500/40 hover:border-amber-400 text-xs font-bold transition-all duration-200 cursor-pointer shadow-sm active:scale-95"
                title="Personalizar adicionais, pão e ponto"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Personalizar</span>
                <span className="sm:hidden">Montar</span>
              </button>
            ) : null}

            <button
              onClick={() => (item.customizable ? onCustomize(item) : onQuickAdd(item))}
              className="p-2 sm:px-3.5 sm:py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-xs flex items-center gap-1 transition-all duration-200 shadow-md shadow-amber-500/20 active:scale-95 cursor-pointer"
              aria-label={`Adicionar ${item.name}`}
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">Adicionar</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
