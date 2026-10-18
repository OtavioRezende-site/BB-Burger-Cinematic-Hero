import React from 'react';
import { Flame, Instagram, Phone, MapPin, Heart, ArrowUp } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#09090c] border-t border-zinc-800/80 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-zinc-800/80">
          
          {/* Col 1: Brand - Apenas a Logo */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center">
              <img
                src="./bb-logo.svg"
                alt="BB Burger Logo Oficial"
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
              />
            </div>

            <p className="text-zinc-400 text-xs max-w-sm leading-relaxed">
              Hambúrgueres artesanais de alto padrão em Maricá - RJ. Blend Angus exclusivo, queijo cheddar inglês derretido, bacon artesanal super crocante e pão brioche amanteigado.
            </p>

            <div className="text-xs text-zinc-300 space-y-1">
              <div className="flex items-center gap-1.5 text-zinc-400">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>{RESTAURANT_INFO.fullAddress}</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <Phone className="w-3.5 h-3.5 shrink-0" />
                <span>WhatsApp: {RESTAURANT_INFO.phone}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-zinc-300 pt-1">
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}`}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-zinc-900 hover:bg-emerald-950/60 border border-zinc-800 hover:border-emerald-500/50 hover:text-emerald-400 transition-colors"
                aria-label="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={RESTAURANT_INFO.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-zinc-900 hover:bg-amber-950/60 border border-zinc-800 hover:border-amber-500/50 hover:text-amber-400 transition-colors"
                aria-label="Google Maps"
              >
                <MapPin className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-zinc-900 hover:bg-amber-950/60 border border-zinc-800 hover:border-amber-500/50 hover:text-amber-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Navegação</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#cardapio" className="hover:text-amber-400 transition-colors">
                  Cardápio Digital
                </a>
              </li>
              <li>
                <a href="#destaques" className="hover:text-amber-400 transition-colors">
                  Smash Burgers Mais Pedidos
                </a>
              </li>
              <li>
                <a href="#avaliacoes" className="hover:text-amber-400 transition-colors">
                  Depoimentos de Clientes
                </a>
              </li>
              <li>
                <a href="#informacoes" className="hover:text-amber-400 transition-colors">
                  Horários e Entrega
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Payment Methods */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Pagamentos Aceitos</h4>
            <div className="flex flex-wrap gap-1.5 text-[11px] text-zinc-300">
              <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 font-semibold text-emerald-400">
                PIX Instantâneo
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800">
                Cartão de Crédito
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800">
                Cartão de Débito
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800">
                Dinheiro / Troco
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800">
                VR / Refeição
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <p>© {new Date().getFullYear()} BB Burger. Todos os direitos reservados. CNPJ: 45.123.890/0001-44</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-amber-400 transition-colors cursor-pointer"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
