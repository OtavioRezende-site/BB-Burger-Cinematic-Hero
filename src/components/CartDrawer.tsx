import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Check, Sparkles, AlertCircle } from 'lucide-react';
import { CartItem } from '../types/burger';
import { RESTAURANT_INFO } from '../data/menuData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: (discount: number, couponCode: string) => void;
  onScrollToMenu: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  onScrollToMenu,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; percent: number } | null>(null);
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.percent) / 100 : 0;
  const isFreeDelivery = subtotal >= RESTAURANT_INFO.freeDeliveryThreshold;
  const deliveryFee = subtotal > 0 ? (isFreeDelivery ? 0 : RESTAURANT_INFO.deliveryFee) : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const missingForFreeDelivery = Math.max(0, RESTAURANT_INFO.freeDeliveryThreshold - subtotal);
  const freeDeliveryProgress = Math.min(100, (subtotal / RESTAURANT_INFO.freeDeliveryThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponInput.trim().toUpperCase();
    if (code === 'PRIMEIRACOMPRA' || code === 'BBBURGER10' || code === 'BURGERLOVE') {
      setAppliedCoupon({ code, percent: 10 });
      setCouponInput('');
    } else {
      setCouponError('Cupom inválido. Tente PRIMEIRACOMPRA');
    }
  };

  const handleCheckout = () => {
    onProceedToCheckout(discountAmount, appliedCoupon ? appliedCoupon.code : '');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Backdrop click area */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide-out Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#111116] border-l border-zinc-800 shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-zinc-800/80 flex items-center justify-between bg-[#14141a]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-black text-white uppercase font-display tracking-wide">
                  Meu Pedido
                </h2>
                <span className="text-xs text-zinc-400">
                  {items.length} {items.length === 1 ? 'item adicionado' : 'itens adicionados'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  onClick={onClearCart}
                  className="text-xs text-zinc-500 hover:text-rose-400 transition-colors px-2 py-1"
                  title="Esvaziar carrinho"
                >
                  Limpar
                </button>
              )}
              <button
                onClick={onClose}
                aria-label="Fechar carrinho"
                className="p-2 rounded-xl bg-zinc-800/60 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Free Delivery Bar */}
          {items.length > 0 && (
            <div className="px-5 py-3 bg-[#171720] border-b border-zinc-800/80">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-zinc-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  {isFreeDelivery ? (
                    <span className="text-emerald-400 font-bold">Parabéns! Você ganhou Entrega Grátis 🎉</span>
                  ) : (
                    <span>
                      Faltam <strong className="text-amber-400">R$ {missingForFreeDelivery.toFixed(2).replace('.', ',')}</strong> para frete grátis
                    </span>
                  )}
                </span>
              </div>
              <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    isFreeDelivery ? 'bg-emerald-500' : 'bg-gradient-to-r from-amber-500 to-orange-500'
                  }`}
                  style={{ width: `${freeDeliveryProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Drawer Body - Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-20 px-4 flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 mb-4">
                  <ShoppingBag className="w-9 h-9" />
                </div>
                <h3 className="text-lg font-bold text-white font-display">Seu pedido está vazio</h3>
                <p className="mt-1 text-xs text-zinc-400 max-w-xs">
                  Adicione seus smash burgers favoritos, acompanhamentos e bebidas para continuar.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onScrollToMenu();
                  }}
                  className="mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-extrabold text-xs uppercase tracking-wider hover:opacity-95 shadow-md active:scale-95 transition-all cursor-pointer"
                >
                  Explorar Cardápio
                </button>
              </div>
            ) : (
              items.map((cartItem) => (
                <div
                  key={cartItem.cartItemId}
                  className="p-3.5 rounded-2xl bg-[#16161c] border border-zinc-800/90 flex flex-col gap-2.5 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={cartItem.menuItem.image}
                      alt={cartItem.menuItem.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 bg-zinc-800"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-sm font-bold text-white truncate">
                          {cartItem.menuItem.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(cartItem.cartItemId)}
                          className="text-zinc-500 hover:text-rose-400 p-1 shrink-0 transition-colors"
                          title="Remover item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-xs font-black text-amber-400 font-display">
                        R$ {cartItem.itemPrice.toFixed(2).replace('.', ',')} cada
                      </span>
                    </div>
                  </div>

                  {/* Customization Details */}
                  {cartItem.customization && (
                    <div className="text-[11px] bg-[#121216] p-2.5 rounded-xl space-y-1 text-zinc-400 border border-zinc-800/50">
                      {cartItem.customization.pontoCarne && (
                        <div>
                          <span className="text-zinc-500">Ponto:</span>{' '}
                          <span className="text-zinc-200">{cartItem.customization.pontoCarne}</span>
                        </div>
                      )}
                      {cartItem.customization.pao && (
                        <div>
                          <span className="text-zinc-500">Pão:</span>{' '}
                          <span className="text-zinc-200">{cartItem.customization.pao}</span>
                        </div>
                      )}
                      {cartItem.customization.adicionais.length > 0 && (
                        <div>
                          <span className="text-zinc-500">Adicionais:</span>{' '}
                          <span className="text-amber-300 font-medium">
                            {cartItem.customization.adicionais.map((a) => a.name).join(', ')}
                          </span>
                        </div>
                      )}
                      {cartItem.customization.remocoes.length > 0 && (
                        <div>
                          <span className="text-rose-400">Retirar:</span>{' '}
                          <span className="text-zinc-300">
                            {cartItem.customization.remocoes.join(', ')}
                          </span>
                        </div>
                      )}
                      {cartItem.customization.observacoes && (
                        <div>
                          <span className="text-zinc-500">Obs:</span>{' '}
                          <span className="italic text-zinc-300">
                            &ldquo;{cartItem.customization.observacoes}&rdquo;
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Quantity Controls and Subtotal */}
                  <div className="flex items-center justify-between pt-1 border-t border-zinc-800/50">
                    <div className="flex items-center bg-[#1c1c24] border border-zinc-700/60 rounded-lg p-0.5">
                      <button
                        onClick={() =>
                          onUpdateQuantity(cartItem.cartItemId, cartItem.quantity - 1)
                        }
                        className="w-6 h-6 rounded flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                        aria-label="Diminuir"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center text-xs font-bold text-white">
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(cartItem.cartItemId, cartItem.quantity + 1)
                        }
                        className="w-6 h-6 rounded flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                        aria-label="Aumentar"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-black text-white font-display">
                        R$ {cartItem.totalPrice.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer (Subtotal, Coupon & Checkout) */}
          {items.length > 0 && (
            <div className="p-5 bg-[#14141b] border-t border-zinc-800 space-y-4">
              
              {/* Coupon Form */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs">
                    <span className="flex items-center gap-1 font-semibold">
                      <Check className="w-3.5 h-3.5" /> Cupom {appliedCoupon.code} ({appliedCoupon.percent}% OFF)
                    </span>
                    <button
                      onClick={() => setAppliedCoupon(null)}
                      className="text-zinc-400 hover:text-rose-400 text-[11px] underline"
                    >
                      Remover
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Cupom (ex: PRIMEIRACOMPRA)"
                        className="w-full pl-8 pr-3 py-2 rounded-xl bg-[#191922] border border-zinc-800 text-xs text-white uppercase placeholder:text-zinc-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Aplicar
                    </button>
                  </form>
                )}
                {couponError && (
                  <span className="text-[11px] text-rose-400 mt-1 block">
                    {couponError}
                  </span>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-zinc-400 border-t border-zinc-800/80 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-zinc-200">
                    R$ {subtotal.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Desconto ({appliedCoupon?.code})</span>
                    <span>- R$ {discountAmount.toFixed(2).replace('.', ',')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Taxa de Entrega</span>
                  <span className={isFreeDelivery ? 'text-emerald-400 font-semibold' : 'text-zinc-200'}>
                    {isFreeDelivery ? 'GRÁTIS' : `R$ ${deliveryFee.toFixed(2).replace('.', ',')}`}
                  </span>
                </div>

                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-zinc-800 font-display">
                  <span>TOTAL ESTIMADO</span>
                  <span className="text-amber-400 text-xl">
                    R$ {grandTotal.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              {/* Proceed to Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-base uppercase tracking-wider flex items-center justify-between shadow-xl shadow-amber-500/20 active:scale-98 transition-all cursor-pointer"
              >
                <span>Avançar para Entrega</span>
                <ArrowRight className="w-5 h-5" />
              </button>

            </div>
          )}

        </div>
      </div>

    </div>
  );
};
