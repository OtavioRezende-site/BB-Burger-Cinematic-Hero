import React, { useState } from 'react';
import { X, Send, QrCode, CreditCard, Banknote, MapPin, Store, Check, Copy, AlertCircle, Phone, ArrowLeft } from 'lucide-react';
import { CartItem, OrderDetails } from '../types/burger';
import { RESTAURANT_INFO } from '../data/menuData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discount: number;
  couponCode?: string;
  onOrderCompleted: (details: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discount,
  couponCode,
  onOrderCompleted,
}) => {
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  
  // Delivery address fields
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [reference, setReference] = useState('');

  // Payment fields
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit' | 'debit' | 'money'>('pix');
  const [paymentTiming, setPaymentTiming] = useState<'delivery' | 'now'>('delivery');
  const [needsChange, setNeedsChange] = useState(false);
  const [changeForAmount, setChangeForAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [isCopiedPix, setIsCopiedPix] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const isFreeDelivery = subtotal >= RESTAURANT_INFO.freeDeliveryThreshold;
  const deliveryFee = orderType === 'delivery' ? (isFreeDelivery ? 0 : RESTAURANT_INFO.deliveryFee) : 0;
  const grandTotal = Math.max(0, subtotal - discount + deliveryFee);

  const copyPixKey = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.pixKey);
    setIsCopiedPix(true);
    setTimeout(() => setIsCopiedPix(false), 2500);
  };

  const handleFormatWhatsAppMessage = (): string => {
    const timestamp = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    
    let msg = `🍔 *NOVO PEDIDO — BB BURGER* 🍔\n`;
    msg += `🕒 _Horário do envio: ${timestamp}_\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `👤 *Cliente:* ${customerName.trim()}\n`;
    msg += `📱 *WhatsApp:* ${phone.trim()}\n`;
    msg += `📍 *Tipo:* ${orderType === 'delivery' ? 'Entrega em Domicílio (Delivery)' : 'Retirada no Balcão'}\n`;
    
    if (orderType === 'delivery') {
      msg += `🏠 *Endereço:* ${street}, nº ${number}\n`;
      if (neighborhood) msg += `🏘️ *Bairro:* ${neighborhood}\n`;
      if (complement) msg += `🏢 *Complemento:* ${complement}\n`;
      if (reference) msg += `📌 *Ponto de Ref:* ${reference}\n`;
    } else {
      msg += `🏬 *Retirada na Unidade:* ${RESTAURANT_INFO.address}\n`;
    }

    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `📋 *ITENS DO PEDIDO:*\n`;

    items.forEach((item, index) => {
      msg += `\n*${item.quantity}x ${item.menuItem.name}* — R$ ${item.totalPrice.toFixed(2).replace('.', ',')}\n`;
      if (item.customization) {
        if (item.customization.pontoCarne) {
          msg += `  • Ponto: ${item.customization.pontoCarne}\n`;
        }
        if (item.customization.pao) {
          msg += `  • Pão: ${item.customization.pao}\n`;
        }
        if (item.customization.adicionais.length > 0) {
          const extrasStr = item.customization.adicionais
            .map((e) => `+${e.name} (R$ ${e.price.toFixed(2).replace('.', ',')})`)
            .join(', ');
          msg += `  • Adicionais: ${extrasStr}\n`;
        }
        if (item.customization.remocoes.length > 0) {
          msg += `  • Retirar: ${item.customization.remocoes.join(', ')}\n`;
        }
        if (item.customization.observacoes) {
          msg += `  • Observação: "${item.customization.observacoes}"\n`;
        }
      }
    });

    msg += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
    
    const paymentLabels = {
      pix: 'PIX',
      credit: 'Cartão de Crédito',
      debit: 'Cartão de Débito',
      money: 'Dinheiro',
    };

    msg += `💳 *Forma de Pagamento:* ${paymentLabels[paymentMethod]}\n`;
    msg += `⏳ *Momento do Pagamento:* ${paymentTiming === 'now' ? 'Pagar Agora' : 'Pagar na Entrega/Retirada'}\n`;
    
    if (paymentMethod === 'money' && needsChange && changeForAmount) {
      msg += `💵 *Troco para:* R$ ${changeForAmount}\n`;
    }

    if (couponCode) {
      msg += `🎟️ *Cupom Aplicado:* ${couponCode} (-R$ ${discount.toFixed(2).replace('.', ',')})\n`;
    }

    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `💵 *Subtotal:* R$ ${subtotal.toFixed(2).replace('.', ',')}\n`;
    if (orderType === 'delivery') {
      msg += `🛵 *Taxa de Entrega:* ${isFreeDelivery ? 'GRÁTIS' : `R$ ${deliveryFee.toFixed(2).replace('.', ',')}`}\n`;
    }
    msg += `💰 *TOTAL FINAL:* R$ ${grandTotal.toFixed(2).replace('.', ',')}\n`;
    
    if (notes.trim()) {
      msg += `📝 *Nota Geral:* ${notes.trim()}\n`;
    }

    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `🕒 *Tempo Estimado:* ${RESTAURANT_INFO.deliveryTime}\n`;
    msg += `Obrigado por escolher a BB Burger! 🚀`;

    return msg;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!customerName.trim()) {
      setErrorMessage('Por favor, informe seu nome completo.');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('Por favor, informe seu número de WhatsApp com DDD.');
      return;
    }
    if (orderType === 'delivery') {
      if (!street.trim() || !number.trim()) {
        setErrorMessage('Por favor, informe a rua e o número da entrega.');
        return;
      }
    }

    const orderDetails: OrderDetails = {
      customerName,
      phone,
      orderType,
      address:
        orderType === 'delivery'
          ? {
              street,
              number,
              complement,
              neighborhood,
              city: RESTAURANT_INFO.city,
              reference,
            }
          : undefined,
      paymentMethod,
      paymentTiming,
      cashChangeFor: needsChange ? changeForAmount : undefined,
      notes,
      couponCode,
      discount,
      deliveryFee,
      subtotal,
      total: grandTotal,
    };

    const message = handleFormatWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');

    // Notify parent to display success modal
    onOrderCompleted(orderDetails);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-2xl bg-[#121217] border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl my-8 flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="p-5 bg-[#16161f] border-b border-zinc-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-500">
              Etapa Final
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white font-display uppercase tracking-wide">
              Finalizar Pedido via WhatsApp
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-800/60 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmitOrder} className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-950/60 border border-rose-500/50 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* 1. Tipo de Pedido (Delivery vs Retirada) */}
          <div>
            <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2.5">
              1. Tipo de Pedido
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`flex items-center justify-center gap-2 p-3.5 rounded-2xl border font-bold text-xs uppercase tracking-wide transition-all cursor-pointer ${
                  orderType === 'delivery'
                    ? 'bg-amber-500/15 border-amber-500 text-amber-400 shadow-md'
                    : 'bg-[#181822] border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>Delivery (Entrega)</span>
              </button>

              <button
                type="button"
                onClick={() => setOrderType('pickup')}
                className={`flex items-center justify-center gap-2 p-3.5 rounded-2xl border font-bold text-xs uppercase tracking-wide transition-all cursor-pointer ${
                  orderType === 'pickup'
                    ? 'bg-amber-500/15 border-amber-500 text-amber-400 shadow-md'
                    : 'bg-[#181822] border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <Store className="w-4 h-4" />
                <span>Retirada no Balcão</span>
              </button>
            </div>
          </div>

          {/* 2. Dados Pessoais */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
              2. Seus Dados de Contato
            </label>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">Seu Nome Completo *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Ex: João da Silva"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#181822] border border-zinc-800 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">WhatsApp com DDD *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ex: (11) 98765-4321"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#181822] border border-zinc-800 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* 3. Endereço de Entrega (se for delivery) */}
          {orderType === 'delivery' ? (
            <div className="space-y-3 p-4 rounded-2xl bg-[#16161f] border border-zinc-800/80">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  <span>3. Endereço para Entrega</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold">
                  Previsão: {RESTAURANT_INFO.deliveryTime}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] text-zinc-400 mb-1">Rua / Avenida *</label>
                  <input
                    type="text"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="Ex: Rua das Flores"
                    className="w-full px-3 py-2 rounded-xl bg-[#1a1a24] border border-zinc-800 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Número *</label>
                  <input
                    type="text"
                    required
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="Ex: 123"
                    className="w-full px-3 py-2 rounded-xl bg-[#1a1a24] border border-zinc-800 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Bairro *</label>
                  <input
                    type="text"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    placeholder="Ex: Centro / Jardins"
                    className="w-full px-3 py-2 rounded-xl bg-[#1a1a24] border border-zinc-800 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Complemento (Apto, Bloco)</label>
                  <input
                    type="text"
                    value={complement}
                    onChange={(e) => setComplement(e.target.value)}
                    placeholder="Ex: Apto 42 Bloco B"
                    className="w-full px-3 py-2 rounded-xl bg-[#1a1a24] border border-zinc-800 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">Ponto de Referência</label>
                <input
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="Ex: Próximo à padaria central"
                  className="w-full px-3 py-2 rounded-xl bg-[#1a1a24] border border-zinc-800 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-[#16161f] border border-zinc-800/80 text-xs space-y-1">
              <span className="font-bold text-amber-400 flex items-center gap-1.5">
                <Store className="w-4 h-4" /> Endereço de Retirada
              </span>
              <p className="text-zinc-300 font-medium">{RESTAURANT_INFO.address}</p>
              <p className="text-zinc-500">Horário: {RESTAURANT_INFO.hours}</p>
            </div>
          )}

          {/* 4. Forma de Pagamento */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
              4. Forma de Pagamento
            </label>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button
                type="button"
                onClick={() => setPaymentMethod('pix')}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === 'pix'
                    ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400 shadow-sm'
                    : 'bg-[#181822] border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <QrCode className="w-5 h-5" />
                <span className="text-xs font-bold">PIX</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('credit')}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === 'credit'
                    ? 'bg-amber-500/15 border-amber-500 text-amber-400 shadow-sm'
                    : 'bg-[#181822] border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span className="text-xs font-bold">Crédito</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('debit')}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === 'debit'
                    ? 'bg-amber-500/15 border-amber-500 text-amber-400 shadow-sm'
                    : 'bg-[#181822] border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span className="text-xs font-bold">Débito</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('money')}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === 'money'
                    ? 'bg-amber-500/15 border-amber-500 text-amber-400 shadow-sm'
                    : 'bg-[#181822] border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <Banknote className="w-5 h-5" />
                <span className="text-xs font-bold">Dinheiro</span>
              </button>
            </div>

            {/* PIX Key Quick Copy */}
            {paymentMethod === 'pix' && (
              <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between gap-3 text-xs">
                <div className="flex flex-col">
                  <span className="text-emerald-400 font-bold">Chave PIX BB Burger:</span>
                  <span className="text-zinc-200 font-mono text-[11px]">{RESTAURANT_INFO.pixKey}</span>
                </div>
                <button
                  type="button"
                  onClick={copyPixKey}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-black font-bold text-xs transition-colors cursor-pointer"
                >
                  {isCopiedPix ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopiedPix ? 'Copiado!' : 'Copiar'}</span>
                </button>
              </div>
            )}

            {/* Money Change Option */}
            {paymentMethod === 'money' && (
              <div className="p-3 rounded-xl bg-[#181822] border border-zinc-800 space-y-2">
                <label className="flex items-center gap-2 text-xs text-zinc-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={needsChange}
                    onChange={(e) => setNeedsChange(e.target.checked)}
                    className="rounded border-zinc-700 text-amber-500 focus:ring-amber-500"
                  />
                  <span>Precisa de troco?</span>
                </label>
                {needsChange && (
                  <div className="pt-1">
                    <label className="block text-[11px] text-zinc-400 mb-1">Troco para quanto?</label>
                    <input
                      type="text"
                      value={changeForAmount}
                      onChange={(e) => setChangeForAmount(e.target.value)}
                      placeholder="Ex: R$ 100,00"
                      className="w-full px-3 py-2 rounded-xl bg-[#121217] border border-zinc-700 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Payment Timing */}
            <div className="pt-2">
              <label className="block text-[11px] text-zinc-400 mb-1.5">Quando prefere pagar?</label>
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setPaymentTiming('delivery')}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    paymentTiming === 'delivery'
                      ? 'bg-zinc-800 border-zinc-600 text-white'
                      : 'bg-[#181822] border-zinc-800/80 text-zinc-400'
                  }`}
                >
                  Na Entrega / Maquininha
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentTiming('now')}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    paymentTiming === 'now'
                      ? 'bg-zinc-800 border-zinc-600 text-white'
                      : 'bg-[#181822] border-zinc-800/80 text-zinc-400'
                  }`}
                >
                  Pagar Agora (PIX)
                </button>
              </div>
            </div>
          </div>

          {/* Observações Gerais */}
          <div>
            <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
              Observações Gerais (Opcional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Interfone quebrado, bater no portão"
              className="w-full px-3 py-2 rounded-xl bg-[#181822] border border-zinc-800 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500"
            />
          </div>

        </form>

        {/* Modal Footer (Summary & WhatsApp Trigger) */}
        <div className="p-5 bg-[#14141d] border-t border-zinc-800 shrink-0 space-y-3">
          
          <div className="flex items-center justify-between text-xs text-zinc-300">
            <span>
              Total do Pedido ({items.reduce((s, i) => s + i.quantity, 0)} itens):
            </span>
            <span className="text-xl font-black text-amber-400 font-display">
              R$ {grandTotal.toFixed(2).replace('.', ',')}
            </span>
          </div>

          <button
            onClick={handleSubmitOrder}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-black font-extrabold text-sm sm:text-base uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/25 active:scale-98 transition-all cursor-pointer"
          >
            <Send className="w-5 h-5 fill-black" />
            <span>ENVIAR PEDIDO DIRETO NO WHATSAPP</span>
          </button>

          <p className="text-[11px] text-center text-zinc-500">
            Você será redirecionado para o WhatsApp com o pedido já formatado e pronto para envio.
          </p>

        </div>

      </div>

    </div>
  );
};
