import React from 'react';
import { CheckCircle2, Clock, MapPin, Phone, ChefHat, Bike, MessageCircle, X } from 'lucide-react';
import { OrderDetails } from '../types/burger';
import { RESTAURANT_INFO } from '../data/menuData';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: OrderDetails | null;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isOpen,
  onClose,
  orderDetails,
}) => {
  if (!isOpen || !orderDetails) return null;

  const orderNumber = Math.floor(1000 + Math.random() * 9000);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-lg bg-[#121217] border border-zinc-800 rounded-3xl p-6 sm:p-8 text-center shadow-2xl my-8 overflow-hidden">
        
        {/* Glow backdrop */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-amber-500/10 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-xl bg-zinc-800/40"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20">
          <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
        </div>

        <span className="text-xs font-black text-amber-400 uppercase tracking-widest">
          PEDIDO #{orderNumber} RECEBIDO
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white font-display uppercase mt-1">
          Obrigado, {orderDetails.customerName.split(' ')[0]}!
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-zinc-300 max-w-sm mx-auto">
          Seu pedido foi formatado e direcionado para nossa equipe pelo WhatsApp. Em instantes confirmamos sua comanda!
        </p>

        {/* Order Status Simulation */}
        <div className="my-6 p-4 rounded-2xl bg-[#181822] border border-zinc-800/90 text-left space-y-3">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-zinc-800">
            <span className="text-zinc-400 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-400" /> Previsão de Entrega:
            </span>
            <span className="font-bold text-white text-sm">
              {RESTAURANT_INFO.deliveryTime}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center pt-1">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold text-xs mb-1">
                <ChefHat className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-emerald-400">Na Cozinha</span>
            </div>

            <div className="flex flex-col items-center opacity-60">
              <div className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center font-bold text-xs mb-1">
                <Bike className="w-4 h-4" />
              </div>
              <span className="text-[10px] text-zinc-400">Em Rota</span>
            </div>

            <div className="flex flex-col items-center opacity-40">
              <div className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center font-bold text-xs mb-1">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-[10px] text-zinc-400">Entregue</span>
            </div>
          </div>
        </div>

        {/* Order Summary Recap */}
        <div className="p-3.5 rounded-xl bg-[#15151c] border border-zinc-800/60 text-xs text-left text-zinc-400 space-y-1 mb-6">
          <div className="flex justify-between">
            <span>Tipo:</span>
            <span className="text-zinc-200 font-semibold">
              {orderDetails.orderType === 'delivery' ? 'Delivery' : 'Retirada'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Pagamento:</span>
            <span className="text-zinc-200 font-semibold uppercase">
              {orderDetails.paymentMethod} ({orderDetails.paymentTiming === 'now' ? 'Pagar agora' : 'Na entrega'})
            </span>
          </div>
          <div className="flex justify-between border-t border-zinc-800/80 pt-1 text-sm font-bold text-white font-display">
            <span>Total:</span>
            <span className="text-amber-400">
              R$ {orderDetails.total.toFixed(2).replace('.', ',')}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5">
          <a
            href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Falar com o Atendimento no WhatsApp</span>
          </a>

          <button
            onClick={onClose}
            className="w-full py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs transition-colors"
          >
            Fazer Novo Pedido
          </button>
        </div>

      </div>

    </div>
  );
};
