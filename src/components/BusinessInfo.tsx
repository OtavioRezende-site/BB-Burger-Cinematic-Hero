import React, { useState } from 'react';
import { Clock, MapPin, Phone, ExternalLink, ChevronDown, Bike, CheckCircle2, MessageCircle, Navigation, ShieldCheck } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export const BusinessInfo: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Current day index (0 = Sunday, 1 = Monday, etc.)
  const today = new Date().getDay();
  // Map index to match detailedHours array (0=Segunda, ..., 6=Domingo)
  // JS getDay(): 0 is Sunday, 1 is Monday...
  const todayRowIndex = today === 0 ? 6 : today - 1;

  const faqs = [
    {
      q: 'Como funciona o pedido pelo WhatsApp?',
      a: 'Você monta seu pedido aqui no nosso cardápio digital, escolhe suas preferências (pão, ponto da carne, adicionais), clica em Finalizar e um texto perfeitamente organizado é enviado direto para o nosso atendimento no WhatsApp (+55 21 96730-6913). Confirmamos o recebimento e começamos o preparo imediatamente!'
    },
    {
      q: 'Qual é o tempo médio de entrega e taxa para Maricá?',
      a: `Nosso tempo médio de entrega em Maricá é de ${RESTAURANT_INFO.deliveryTime}. A taxa padrão para bairros centrais é de apenas R$ ${RESTAURANT_INFO.deliveryFee.toFixed(2).replace('.', ',')}, e pedidos a partir de R$ ${RESTAURANT_INFO.freeDeliveryThreshold.toFixed(2).replace('.', ',')} ganham Entrega Grátis automática!`
    },
    {
      q: 'Onde fica a hamburgueria em Maricá?',
      a: 'Estamos localizados na R. Alferes Gomes, 19 - Centro, Maricá - RJ (CEP 24900-855), com fácil acesso para retirada no balcão e delivery rápido para toda a região.'
    },
    {
      q: 'O hambúrguer chega quentinho e com batata crocante?',
      a: 'Sim! Utilizamos embalagens térmicas com respiro especial anti-umidade para que as batatas não amoleçam no vapor e os smash burgers continuem com queijo derretido e pão tostado até sua mesa.'
    },
    {
      q: 'Quais formas de pagamento são aceitas?',
      a: 'Aceitamos PIX (chave: 21967306913), Cartão de Crédito e Débito na maquininha levada pelo motoboy, e Dinheiro físico (com troco facilitado).'
    }
  ];

  return (
    <section id="informacoes" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Top Banner: Official WhatsApp Business Verified Badge */}
      <div className="mb-10 p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-[#14141e] to-[#14141e] border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className="text-sm sm:text-base font-bold text-white">
                WhatsApp Oficial BB Burger: {RESTAURANT_INFO.phone}
              </span>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <CheckCircle2 className="w-3 h-3" /> Responde rapidamente
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Conta comercial WhatsApp Business ativa desde {RESTAURANT_INFO.since} • Maricá - RJ
            </p>
          </div>
        </div>

        <a
          href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=${encodeURIComponent('Olá BB Burger! Gostaria de tirar uma dúvida sobre o cardápio e entregas em Maricá.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shrink-0 transition-transform active:scale-95 shadow-md shadow-emerald-500/20"
        >
          <Phone className="w-4 h-4 fill-black" />
          <span>Chamar no WhatsApp</span>
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        
        {/* Left Card: Location & Schedule */}
        <div className="p-7 sm:p-9 rounded-3xl bg-[#131319] border border-zinc-800 shadow-2xl space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-3">
              <MapPin className="w-3.5 h-3.5" />
              <span>Maricá, Rio de Janeiro</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase font-display tracking-tight">
              Localização & <span className="text-amber-400">Horários</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Atendimento presencial no balcão e entregas expressas em toda a região central de Maricá.
            </p>
          </div>

          {/* Address Details */}
          <div className="p-4 rounded-2xl bg-[#181822] border border-zinc-800/90 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Endereço da Loja</h4>
                  <p className="text-xs text-zinc-300 font-medium mt-0.5">
                    {RESTAURANT_INFO.fullAddress}
                  </p>
                  <span className="text-[11px] text-zinc-500">
                    Centro, Maricá - RJ • CEP {RESTAURANT_INFO.cep}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <a
                href={RESTAURANT_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-zinc-700/80"
              >
                <Navigation className="w-3.5 h-3.5 text-amber-400" />
                <span>Abrir no Google Maps</span>
              </a>

              <a
                href={RESTAURANT_INFO.goomerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center gap-1.5 transition-colors border border-amber-500/30"
                title="Cardápio Goomer App"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Goomer</span>
              </a>
            </div>
          </div>

          {/* Weekly Schedule Table */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Tabela de Horários Semanais</span>
              </h4>
              <span className="text-[11px] text-emerald-400 font-semibold">
                Almoço e Jantar
              </span>
            </div>

            <div className="rounded-2xl border border-zinc-800/80 overflow-hidden bg-[#16161f] text-xs divide-y divide-zinc-800/60">
              {RESTAURANT_INFO.detailedHours.map((item, idx) => {
                const isToday = idx === todayRowIndex;
                return (
                  <div
                    key={item.day}
                    className={`flex items-center justify-between p-2.5 sm:px-3.5 transition-colors ${
                      isToday
                        ? 'bg-amber-500/10 font-bold text-white border-l-4 border-l-amber-500'
                        : 'text-zinc-300 hover:bg-zinc-800/30'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-24 sm:w-28 text-left">{item.day}</span>
                      {isToday && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500 text-black font-black uppercase">
                          Hoje
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-[11px]">
                      {item.lunch !== 'Fechado' && (
                        <span className="text-zinc-400">
                          ☀️ <strong className="text-zinc-200">{item.lunch}</strong>
                        </span>
                      )}
                      {item.dinner !== 'Fechado' && (
                        <span className="text-amber-300">
                          🌙 <strong className="text-amber-300">{item.dinner}</strong>
                        </span>
                      )}
                      {item.lunch === 'Fechado' && item.dinner === 'Fechado' && (
                        <span className="text-zinc-500">Fechado</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery Note */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-orange-950/30 border border-orange-500/20 text-xs text-orange-300">
            <Bike className="w-4 h-4 shrink-0 text-orange-400" />
            <span>
              Entregas com motoboy próprio em Maricá com embalagem lacrada e maquininha sem fio.
            </span>
          </div>

        </div>

        {/* Right Card: Frequently Asked Questions (FAQ) */}
        <div className="p-7 sm:p-9 rounded-3xl bg-[#131319] border border-zinc-800 shadow-2xl">
          <div className="mb-6">
            <span className="text-xs font-black tracking-widest text-amber-500 uppercase">
              TIRE SUAS DÚVIDAS
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase font-display tracking-tight mt-1">
              Perguntas Frequentes
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-zinc-800/90 overflow-hidden bg-[#16161f] transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-white hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-amber-400' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-zinc-300 leading-relaxed border-t border-zinc-800/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </section>
  );
};
