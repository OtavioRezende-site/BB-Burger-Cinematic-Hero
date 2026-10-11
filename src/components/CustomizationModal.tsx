import React, { useState, useEffect } from 'react';
import { X, Check, Plus, Minus, Flame, Sparkles, AlertCircle } from 'lucide-react';
import { MenuItem, ExtraOption, CartCustomization } from '../types/burger';
import { PONTO_CARNE_OPTIONS, PAO_OPTIONS, EXTRAS_OPTIONS, REMOVAL_OPTIONS } from '../data/menuData';

interface CustomizationModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (
    item: MenuItem,
    quantity: number,
    customization?: CartCustomization
  ) => void;
}

export const CustomizationModal: React.FC<CustomizationModalProps> = ({
  item,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [selectedPonto, setSelectedPonto] = useState(PONTO_CARNE_OPTIONS[0]);
  const [selectedPao, setSelectedPao] = useState(PAO_OPTIONS[0]);
  const [selectedExtras, setSelectedExtras] = useState<ExtraOption[]>([]);
  const [selectedRemovals, setSelectedRemovals] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (isOpen) {
      setSelectedPonto(PONTO_CARNE_OPTIONS[0]);
      setSelectedPao(PAO_OPTIONS[0]);
      setSelectedExtras([]);
      setSelectedRemovals([]);
      setNotes('');
      setQuantity(1);
    }
  }, [isOpen, item]);

  if (!isOpen || !item) return null;

  const toggleExtra = (extra: ExtraOption) => {
    setSelectedExtras((prev) => {
      const exists = prev.some((e) => e.id === extra.id);
      if (exists) {
        return prev.filter((e) => e.id !== extra.id);
      } else {
        return [...prev, extra];
      }
    });
  };

  const toggleRemoval = (removal: string) => {
    setSelectedRemovals((prev) => {
      if (prev.includes(removal)) {
        return prev.filter((r) => r !== removal);
      } else {
        return [...prev, removal];
      }
    });
  };

  const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const unitPrice = item.price + extrasTotal;
  const totalPrice = unitPrice * quantity;

  const handleConfirm = () => {
    const customization: CartCustomization = {
      pontoCarne: item.customizable ? selectedPonto : undefined,
      pao: item.customizable ? selectedPao : undefined,
      adicionais: selectedExtras,
      remocoes: selectedRemovals,
      observacoes: notes.trim() ? notes.trim() : undefined,
    };

    onAddToCart(item, quantity, customization);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl bg-[#121217] border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl my-8 flex flex-col max-h-[90vh]">
        
        {/* Header with Product Cover */}
        <div className="relative h-44 sm:h-52 w-full overflow-hidden shrink-0 bg-zinc-900">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-[#121217]/50 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="absolute top-4 right-4 p-2 rounded-full bg-black/70 hover:bg-black text-zinc-300 hover:text-white border border-zinc-700/60 transition-transform active:scale-95 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Title on Image */}
          <div className="absolute bottom-4 left-6 right-6">
            {item.badge && (
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-amber-500 text-black text-[10px] font-black uppercase tracking-wider mb-1.5 shadow">
                {item.badge}
              </span>
            )}
            <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
              {item.name}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 line-clamp-1">
              {item.description}
            </p>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 divide-y divide-zinc-800/80">
          
          {/* Ponto da Carne (if customizable burger) */}
          {item.customizable && (
            <div className="pt-1">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-500" />
                  <span>1. Ponto da Carne</span>
                </label>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Obrigatório (1)
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PONTO_CARNE_OPTIONS.map((ponto) => {
                  const isChecked = selectedPonto === ponto;
                  return (
                    <button
                      key={ponto}
                      type="button"
                      onClick={() => setSelectedPonto(ponto)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-amber-500/15 border-amber-500 text-white'
                          : 'bg-[#181820] border-zinc-800/80 text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      <span>{ponto}</span>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-2 ${
                          isChecked
                            ? 'border-amber-400 bg-amber-500 text-black'
                            : 'border-zinc-600'
                        }`}
                      >
                        {isChecked && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tipo de Pão */}
          {item.customizable && (
            <div className="pt-5">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>2. Escolha o Pão</span>
                </label>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Obrigatório (1)
                </span>
              </div>
              <div className="space-y-2">
                {PAO_OPTIONS.map((pao) => {
                  const isChecked = selectedPao === pao;
                  return (
                    <button
                      key={pao}
                      type="button"
                      onClick={() => setSelectedPao(pao)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-amber-500/15 border-amber-500 text-white'
                          : 'bg-[#181820] border-zinc-800/80 text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      <span>{pao}</span>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-2 ${
                          isChecked
                            ? 'border-amber-400 bg-amber-500 text-black'
                            : 'border-zinc-600'
                        }`}
                      >
                        {isChecked && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Adicionais / Turbinar */}
          <div className="pt-5">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-bold text-white uppercase tracking-wider">
                3. Adicionais & Extras
              </label>
              <span className="text-[11px] text-zinc-400">Opcional</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {EXTRAS_OPTIONS.map((extra) => {
                const isSelected = selectedExtras.some((e) => e.id === extra.id);
                return (
                  <button
                    key={extra.id}
                    type="button"
                    onClick={() => toggleExtra(extra)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500/80 text-white'
                        : 'bg-[#181820] border-zinc-800/80 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex flex-col pr-2">
                      <span className="text-xs font-medium text-zinc-200">{extra.name}</span>
                      <span className="text-[11px] font-bold text-amber-400">
                        + R$ {extra.price.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-amber-500 border-amber-500 text-black'
                          : 'border-zinc-600 bg-zinc-800/50'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Ingredientes para Retirar */}
          {item.customizable && (
            <div className="pt-5">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-zinc-400" />
                  <span>4. Retirar Algum Ingrediente?</span>
                </label>
                <span className="text-[11px] text-zinc-400">Sem custo</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {REMOVAL_OPTIONS.map((rem) => {
                  const isChecked = selectedRemovals.includes(rem);
                  return (
                    <button
                      key={rem}
                      type="button"
                      onClick={() => toggleRemoval(rem)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                          : 'bg-[#181820] border-zinc-800 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {isChecked ? '✓ ' : ''}{rem}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Observações */}
          <div className="pt-5">
            <label className="block text-sm font-bold text-white uppercase tracking-wider mb-2">
              5. Observações Especiais
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Mandar maionese à parte, cortar ao meio, etc."
              rows={2}
              className="w-full p-3 rounded-xl bg-[#181820] border border-zinc-800 text-xs text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-amber-500"
            />
          </div>

        </div>

        {/* Modal Footer / Total & Add CTA */}
        <div className="p-4 sm:p-5 bg-[#0e0e13] border-t border-zinc-800/80 flex items-center justify-between gap-4 shrink-0">
          
          {/* Quantity Selector */}
          <div className="flex items-center bg-[#181820] border border-zinc-700/80 rounded-xl p-1">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-300 hover:text-white disabled:opacity-40 transition-colors cursor-pointer"
              aria-label="Diminuir quantidade"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center text-sm font-extrabold text-white">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Aumentar quantidade"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add Button with Total */}
          <button
            onClick={handleConfirm}
            className="flex-1 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-sm sm:text-base flex items-center justify-between shadow-lg shadow-amber-500/25 active:scale-98 transition-all cursor-pointer"
          >
            <span>Adicionar ao Pedido</span>
            <span className="font-black font-display text-lg tracking-tight">
              R$ {totalPrice.toFixed(2).replace('.', ',')}
            </span>
          </button>

        </div>

      </div>

    </div>
  );
};
