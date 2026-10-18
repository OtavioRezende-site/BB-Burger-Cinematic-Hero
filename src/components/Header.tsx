import React, { useState, useEffect } from 'react';
import { ShoppingBag, Phone, Clock, MapPin, Menu as MenuIcon, X } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface HeaderProps {
  cartItemCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onScrollToMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartItemCount,
  cartTotal,
  onOpenCart,
  onScrollToMenu,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0d0d11]/90 backdrop-blur-md border-b border-zinc-800/80 shadow-2xl py-3'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Official BB Burger Logo Brand - Apenas a Logo */}
          <a
            href="#"
            className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-xl p-1"
            aria-label="BB Burger Início"
          >
            <img
              src="./bb-logo.svg"
              alt="BB Burger Logo Oficial"
              className="w-12 h-12 sm:w-14 sm:h-14 object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
            />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-300">
            <button
              onClick={onScrollToMenu}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Cardápio
            </button>
            <a
              href="#destaques"
              className="hover:text-amber-400 transition-colors"
            >
              Destaques
            </a>
            <a
              href="#avaliacoes"
              className="hover:text-amber-400 transition-colors"
            >
              Avaliações
            </a>
            <a
              href="#informacoes"
              className="hover:text-amber-400 transition-colors"
            >
              Horários & Local
            </a>
            
            {/* Status Pill */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Aberto Agora • até 23h30</span>
            </div>
          </nav>

          {/* Action CTAs & Cart */}
          <div className="flex items-center gap-3">
            {/* WhatsApp Quick Link */}
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=${encodeURIComponent('Olá BB Burger! Gostaria de tirar uma dúvida sobre o cardápio.')}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar no WhatsApp"
              className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 hover:border-zinc-700 text-xs font-semibold transition-all hover:scale-105"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              aria-label="Abrir carrinho de compras"
              className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold text-sm shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 active:scale-95 transition-all cursor-pointer"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-black text-amber-400 text-[10px] font-black flex items-center justify-center border border-amber-400">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">
                {cartItemCount > 0
                  ? `R$ ${cartTotal.toFixed(2).replace('.', ',')}`
                  : 'Meu Pedido'}
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-zinc-900/80 text-zinc-300 md:hidden hover:text-white"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-zinc-800/80 pb-2 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-semibold w-fit mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Aberto Agora • {RESTAURANT_INFO.deliveryTime}</span>
            </div>
            <button
              onClick={() => {
                onScrollToMenu();
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-zinc-200 hover:bg-zinc-800/70"
            >
              🍔 Cardápio Completo
            </button>
            <a
              href="#destaques"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-zinc-200 hover:bg-zinc-800/70"
            >
              🔥 Mais Vendidos
            </a>
            <a
              href="#avaliacoes"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-zinc-200 hover:bg-zinc-800/70"
            >
              ⭐ Avaliações dos Clientes
            </a>
            <a
              href="#informacoes"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-zinc-200 hover:bg-zinc-800/70"
            >
              📍 Horários e Localização
            </a>
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-emerald-400 hover:bg-emerald-950/30"
            >
              <Phone className="w-4 h-4" />
              <span>Falar no WhatsApp ({RESTAURANT_INFO.phone})</span>
            </a>
          </div>
        )}

      </div>
    </header>
  );
};
