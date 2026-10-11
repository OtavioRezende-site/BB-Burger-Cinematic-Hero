import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { CustomizationModal } from './components/CustomizationModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { CustomerReviews } from './components/CustomerReviews';
import { BusinessInfo } from './components/BusinessInfo';
import { Footer } from './components/Footer';
import { MenuItem, CartItem, CartCustomization, OrderDetails } from './types/burger';
import { RESTAURANT_INFO, MENU_ITEMS } from './data/menuData';
import { ShoppingBag, Phone, ArrowRight, Flame } from 'lucide-react';

const CART_STORAGE_KEY = 'bb_burger_cart_items';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutDiscount, setCheckoutDiscount] = useState(0);
  const [checkoutCoupon, setCheckoutCoupon] = useState('');
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [addedToast, setAddedToast] = useState<string | null>(null);

  // Sync cart with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  // Smooth scroll helper
  const scrollToMenu = () => {
    const el = document.getElementById('cardapio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOrderNow = () => {
    if (cart.length > 0) {
      setIsCartOpen(true);
    } else {
      scrollToMenu();
    }
  };

  const showToast = (itemName: string) => {
    setAddedToast(`${itemName} adicionado ao seu pedido!`);
    setTimeout(() => {
      setAddedToast(null);
    }, 3000);
  };

  // Open customization modal
  const handleOpenCustomize = (item: MenuItem) => {
    setCustomizingItem(item);
    setIsCustomizationOpen(true);
  };

  // Quick add without modal for non-customizable or direct items
  const handleQuickAdd = (item: MenuItem) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (ci) => ci.menuItem.id === item.id && !ci.customization
      );

      if (existingIndex > -1) {
        const copy = [...prev];
        const existing = copy[existingIndex];
        const newQty = existing.quantity + 1;
        copy[existingIndex] = {
          ...existing,
          quantity: newQty,
          totalPrice: existing.itemPrice * newQty,
        };
        return copy;
      }

      const newItem: CartItem = {
        cartItemId: `${item.id}-${Date.now()}`,
        menuItem: item,
        quantity: 1,
        itemPrice: item.price,
        totalPrice: item.price,
      };
      return [...prev, newItem];
    });

    showToast(item.name);
  };

  // Add customized item
  const handleAddCustomizedToCart = (
    item: MenuItem,
    quantity: number,
    customization?: CartCustomization
  ) => {
    const extrasPrice =
      customization?.adicionais.reduce((sum, e) => sum + e.price, 0) || 0;
    const unitPrice = item.price + extrasPrice;
    const totalPrice = unitPrice * quantity;

    const newItem: CartItem = {
      cartItemId: `${item.id}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      menuItem: item,
      quantity,
      customization,
      itemPrice: unitPrice,
      totalPrice,
    };

    setCart((prev) => [...prev, newItem]);
    showToast(item.name);
  };

  // Update item quantity in cart
  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (item.cartItemId === cartItemId) {
          return {
            ...item,
            quantity: newQuantity,
            totalPrice: item.itemPrice * newQuantity,
          };
        }
        return item;
      })
    );
  };

  // Remove item from cart
  const handleRemoveItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  // Clear cart
  const handleClearCart = () => {
    setCart([]);
  };

  // Proceed from Drawer to Checkout
  const handleProceedToCheckout = (discount: number, couponCode: string) => {
    setCheckoutDiscount(discount);
    setCheckoutCoupon(couponCode);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Order completed
  const handleOrderCompleted = (details: OrderDetails) => {
    setCompletedOrder(details);
    setIsCheckoutOpen(false);
    setIsSuccessOpen(true);
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-[#0b0b0e] text-zinc-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 p-4 rounded-2xl bg-zinc-900 border border-amber-500/50 text-white text-xs font-bold shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
          <span>{addedToast}</span>
        </div>
      )}

      {/* Global Header */}
      <Header
        cartItemCount={cartItemCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onScrollToMenu={scrollToMenu}
      />

      {/* 5. CINEMATIC HERO SECTION WITH ATTACHED BURGER VIDEO */}
      <main className="flex-1">
        <Hero onScrollToMenu={scrollToMenu} onOrderNow={handleOrderNow} />

        {/* Featured Teaser Banner */}
        <section id="destaques" className="relative z-10 pt-12 sm:pt-16 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-r from-[#171720] via-[#1a1a24] to-[#171720] border border-amber-500/30 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-400">
                  Destaque da Semana
                </span>
                <h3 className="text-base sm:text-lg font-black text-white font-display">
                  BB Smash Duplo Bacon — De R$ 44,90 por R$ 38,90
                </h3>
                <p className="text-xs text-zinc-400">
                  Blend Angus 200g, bacon defumado crocante e cheddar inglês cremoso.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                const promoItem = MENU_ITEMS.find((i) => i.id === 'bb-smash-duplo-bacon');
                if (promoItem) handleOpenCustomize(promoItem);
                else scrollToMenu();
              }}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-xs uppercase tracking-wider shrink-0 transition-transform active:scale-95 cursor-pointer shadow-md shadow-amber-500/20"
            >
              Pedir Oferta
            </button>
          </div>
        </section>

        {/* Interactive Digital Menu Section */}
        <MenuSection
          onCustomize={handleOpenCustomize}
          onQuickAdd={handleQuickAdd}
        />

        {/* Customer Reviews Section */}
        <CustomerReviews />

        {/* Business Hours, Location & FAQ */}
        <BusinessInfo />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-5 right-4 sm:right-6 z-40 flex flex-col items-end gap-2.5">
        {/* Floating WhatsApp */}
        <a
          href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=${encodeURIComponent('Olá BB Burger! Gostaria de fazer um pedido.')}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar no WhatsApp"
          className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-2xl shadow-green-900/50 hover:scale-110 active:scale-95 transition-all"
          title="Falar no WhatsApp"
        >
          <Phone className="w-6 h-6 fill-white" />
        </a>

        {/* Floating Cart Button on Mobile if items in cart */}
        {cartItemCount > 0 && (
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Ver carrinho"
            className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-extrabold text-xs shadow-2xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-black text-amber-400 text-[9px] font-black flex items-center justify-center">
                {cartItemCount}
              </span>
            </div>
            <span>R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
          </button>
        )}
      </div>

      {/* Modals & Drawers */}
      <CustomizationModal
        item={customizingItem}
        isOpen={isCustomizationOpen}
        onClose={() => setIsCustomizationOpen(false)}
        onAddToCart={handleAddCustomizedToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={handleProceedToCheckout}
        onScrollToMenu={scrollToMenu}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        discount={checkoutDiscount}
        couponCode={checkoutCoupon}
        onOrderCompleted={handleOrderCompleted}
      />

      <OrderSuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        orderDetails={completedOrder}
      />

    </div>
  );
}
