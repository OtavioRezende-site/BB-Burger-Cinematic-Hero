import React, { useState, useMemo } from 'react';
import { Search, Flame, Sparkles, UtensilsCrossed, GlassWater, IceCream, Layers, X, Tag } from 'lucide-react';
import { MenuItem, MenuCategory } from '../types/burger';
import { MENU_ITEMS } from '../data/menuData';
import { ProductCard } from './ProductCard';

interface MenuSectionProps {
  onCustomize: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onCustomize,
  onQuickAdd,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTag, setFilterTag] = useState<'all' | 'popular' | 'promos'>('all');

  const categories: { id: MenuCategory; label: string; icon: React.ReactNode; count: number }[] = [
    {
      id: 'todos',
      label: 'Todos os Itens',
      icon: <UtensilsCrossed className="w-4 h-4" />,
      count: MENU_ITEMS.length,
    },
    {
      id: 'smash',
      label: 'Smash Burgers',
      icon: <Flame className="w-4 h-4" />,
      count: MENU_ITEMS.filter((i) => i.category === 'smash').length,
    },
    {
      id: 'artesanais',
      label: 'Burgers Altos & Chef',
      icon: <Sparkles className="w-4 h-4" />,
      count: MENU_ITEMS.filter((i) => i.category === 'artesanais').length,
    },
    {
      id: 'combos',
      label: 'Combos & Ofertas',
      icon: <Tag className="w-4 h-4" />,
      count: MENU_ITEMS.filter((i) => i.category === 'combos').length,
    },
    {
      id: 'sides',
      label: 'Acompanhamentos',
      icon: <Layers className="w-4 h-4" />,
      count: MENU_ITEMS.filter((i) => i.category === 'sides').length,
    },
    {
      id: 'sobremesas',
      label: 'Shakes & Doces',
      icon: <IceCream className="w-4 h-4" />,
      count: MENU_ITEMS.filter((i) => i.category === 'sobremesas').length,
    },
    {
      id: 'bebidas',
      label: 'Bebidas Geladas',
      icon: <GlassWater className="w-4 h-4" />,
      count: MENU_ITEMS.filter((i) => i.category === 'bebidas').length,
    },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      if (selectedCategory !== 'todos' && item.category !== selectedCategory) {
        return false;
      }

      // Quick filter pills
      if (filterTag === 'popular' && !item.isPopular) return false;
      if (filterTag === 'promos' && !item.originalPrice) return false;

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesIngredients = item.ingredients.some((ing) =>
          ing.toLowerCase().includes(query)
        );
        return matchesName || matchesDesc || matchesIngredients;
      }

      return true;
    });
  }, [selectedCategory, searchQuery, filterTag]);

  return (
    <section id="cardapio" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <span className="text-xs sm:text-sm font-black tracking-widest text-amber-500 uppercase">
          CARDÁPIO DIGITAL INTERATIVO
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-display mt-1 tracking-tight">
          Escolha Seu <span className="text-amber-400">Burger Perfeito</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-zinc-400">
          Carne fresca moída diariamente, pão brioche artesanal tostado na manteiga e receitas exclusivas.
        </p>
      </div>

      {/* Search & Secondary Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        
        {/* Search input */}
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por bacon, cheddar, smash, batata..."
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-[#131318] border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1"
              aria-label="Limpar busca"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Tag Pills */}
        <div className="flex items-center gap-2 self-start sm:self-auto overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilterTag('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              filterTag === 'all'
                ? 'bg-zinc-800 text-white border border-zinc-700'
                : 'bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border border-zinc-800/60'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilterTag('popular')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              filterTag === 'popular'
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                : 'bg-zinc-900/60 text-zinc-400 hover:text-amber-400 border border-zinc-800/60'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Mais Vendidos</span>
          </button>
          <button
            onClick={() => setFilterTag('promos')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              filterTag === 'promos'
                ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                : 'bg-zinc-900/60 text-zinc-400 hover:text-red-400 border border-zinc-800/60'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Promoções</span>
          </button>
        </div>

      </div>

      {/* Category Scrollable Navigation */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-4 pt-1 mb-8 scrollbar-none no-scrollbar">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 sm:px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-lg shadow-amber-500/25 scale-[1.02]'
                  : 'bg-[#131318] hover:bg-[#1a1a22] text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-black/30 text-black font-extrabold' : 'bg-zinc-800 text-zinc-400'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Items Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredItems.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              onCustomize={onCustomize}
              onQuickAdd={onQuickAdd}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-[#131318] rounded-3xl border border-zinc-800/80">
          <div className="w-16 h-16 rounded-2xl bg-zinc-800/80 mx-auto flex items-center justify-center text-zinc-400 mb-4">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-white">Nenhum item encontrado</h3>
          <p className="mt-1 text-sm text-zinc-400 max-w-sm mx-auto">
            Não encontramos nenhum produto com &ldquo;{searchQuery}&rdquo;. Tente buscar por outros ingredientes ou limpe o filtro.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('todos');
              setFilterTag('all');
            }}
            className="mt-5 px-5 py-2.5 rounded-xl bg-amber-500 text-black font-bold text-xs uppercase tracking-wide hover:bg-amber-400 transition-colors"
          >
            Ver Todo o Cardápio
          </button>
        </div>
      )}

    </section>
  );
};
