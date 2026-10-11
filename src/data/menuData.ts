import { MenuItem, ExtraOption } from '../types/burger';

export const PONTO_CARNE_OPTIONS = [
  'Ao Ponto (suculenta, centro rosado)',
  'Ao Ponto para Bem (pouco rosada)',
  'Bem Passada (tostadinha sem rosa)',
  'Ponto Menos (bem avermelhada e suculenta)'
];

export const PAO_OPTIONS = [
  'Pão Brioche Tradicional (selado na manteiga)',
  'Pão Australiano com Toque de Mel',
  'Pão de Batata Artesanal Super Macio'
];

export const EXTRAS_OPTIONS: ExtraOption[] = [
  { id: 'bacon-extra', name: 'Bacon Artesanal Crocante Extra', price: 6.00 },
  { id: 'cheddar-extra', name: 'Queijo Cheddar Cremoso Inglês', price: 5.50 },
  { id: 'patty-extra', name: 'Blend Angus Smash Extra (100g)', price: 10.00 },
  { id: 'cebola-caramelizada', name: 'Cebola Caramelizada no Shoyu & Açúcar Mascavo', price: 4.50 },
  { id: 'queijo-prato', name: 'Queijo Prato Especial Maçaricado', price: 5.00 },
  { id: 'ovo-gema-mole', name: 'Ovo Caipira na Chapa com Gema Mole', price: 3.50 },
  { id: 'molho-secreto', name: 'Potinho Molho Secreto BB (50ml)', price: 4.00 },
  { id: 'geleia-bacon', name: 'Geléia de Bacon com Pimenta Suave', price: 5.00 }
];

export const REMOVAL_OPTIONS = [
  'Sem Picles Agridoce',
  'Sem Cebola Roxa',
  'Sem Molho BB da Casa',
  'Sem Alface Americana',
  'Sem Tomate Caipira'
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'bb-smash-duplo-bacon',
    name: 'BB Smash Duplo Bacon',
    description: 'Dois suculentos smash burgueres de blend Angus 100g, fatias generosas de bacon artesanal crocante, queijo cheddar inglês derretido e maionese secreta BB em pão brioche amanteigado.',
    price: 38.90,
    originalPrice: 44.90,
    category: 'smash',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    badge: 'O MAIS PEDIDO ★',
    isPopular: true,
    prepTime: '15-20 min',
    ingredients: ['2x Smash Angus 100g', 'Bacon Artesanal Crocante', 'Cheddar Inglês Cremoso', 'Molho Secreto BB', 'Pão Brioche'],
    customizable: true
  },
  {
    id: 'bb-trufado-supremo',
    name: 'BB Trufado Supremo',
    description: 'Hambúrguer alto Angus 180g grelhado no fogo, queijo brie derretido, maionese trufada artesanal, cogumelos salteados na manteiga e rúcula baby em pão australiano.',
    price: 46.90,
    originalPrice: 52.00,
    category: 'artesanais',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    badge: 'EDIÇÃO CHEF',
    isPopular: true,
    prepTime: '18-22 min',
    ingredients: ['Angus Prime 180g', 'Queijo Brie Francês', 'Maionese Trufada', 'Cogumelos Shimeji', 'Rúcula Baby', 'Pão Australiano'],
    customizable: true
  },
  {
    id: 'bb-cheddar-melt',
    name: 'BB Cheddar Melt & Onions',
    description: 'Dois smash burgers prensados com cebola roxa bem fininha, piscina de creme cheddar artesanal cremoso e cebola caramelizada bem escura no pão australiano tostado.',
    price: 36.90,
    category: 'smash',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    badge: 'CREMOSO',
    isPopular: true,
    prepTime: '15-18 min',
    ingredients: ['2x Smash Angus 90g', 'Creme Cheddar Caseiro', 'Cebola Caramelizada', 'Cebola Roxa Smash', 'Pão Australiano'],
    customizable: true
  },
  {
    id: 'bb-classic-burger',
    name: 'BB Classic Bacon Salad',
    description: 'Hambúrguer Angus 160g, tiras de bacon crocante, queijo prato derretido, alface americana fresca, tomate caipira fatiado e picles doce em pão brioche dourado.',
    price: 34.90,
    category: 'artesanais',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=80',
    prepTime: '15-18 min',
    ingredients: ['Angus 160g', 'Bacon Crocante', 'Queijo Prato', 'Alface Americana', 'Tomate Caipira', 'Picles', 'Molho BB'],
    customizable: true
  },
  {
    id: 'bb-monster-triplo',
    name: 'BB Monster 3x3 Caveman',
    description: 'Para quem tem fome de verdade: três smash burgers de 100g, triplo cheddar, 6 fatias de bacon rústico, cebola crocante crispy e molho barbecue rústico defumado.',
    price: 49.90,
    originalPrice: 56.90,
    category: 'smash',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80',
    badge: 'GIGANTE 300G',
    isPopular: true,
    prepTime: '20-25 min',
    ingredients: ['3x Smash Angus 100g', 'Triplo Cheddar', '6x Bacon Defumado', 'Cebola Crispy', 'Barbecue Artesanal'],
    customizable: true
  },
  {
    id: 'bb-crispy-chicken',
    name: 'BB Crispy Chicken Supreme',
    description: 'Sobrecoxa de frango empanada com casquinha crocante e ultra suculenta, queijo monterey jack derretido, salada coleslaw cremosa e maionese de alho negro.',
    price: 33.90,
    category: 'artesanais',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80',
    badge: 'FRANGO CROCANTE',
    prepTime: '16-20 min',
    ingredients: ['Frango Empanado Crocante', 'Monterey Jack', 'Coleslaw Artesanal', 'Maionese de Alho Negro', 'Pão Brioche'],
    customizable: true
  },
  // COMBOS
  {
    id: 'combo-duplo-bacon-completo',
    name: 'Combo BB Smash Bacon Completo',
    description: '1x BB Smash Duplo Bacon + 1x Batata Rústica Individual com Páprica + 1x Bebida Gelada à sua escolha (Coca-Cola, Guaraná ou Suco).',
    price: 52.90,
    originalPrice: 62.90,
    category: 'combos',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80',
    badge: 'ECONOMIZE R$ 10',
    isPopular: true,
    prepTime: '18-22 min',
    ingredients: ['BB Smash Duplo Bacon', 'Batata Rústica Crocante', 'Bebida 350ml'],
    customizable: true
  },
  {
    id: 'combo-casal-bb',
    name: 'Combo Casal BB Prime',
    description: '2x Burgers à escolha (Smash Duplo ou Cheddar Melt) + 1x Batata Grande com Cheddar e Bacon + 2x Refrigerantes Lata geladíssimos.',
    price: 89.90,
    originalPrice: 104.00,
    category: 'combos',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    badge: 'COMBO 2 PESSOAS',
    isPopular: true,
    prepTime: '20-25 min',
    ingredients: ['2x Burgers Gourmet', '1x Batata Grande Cheddar & Bacon', '2x Bebidas Lata'],
    customizable: true
  },
  // SIDES
  {
    id: 'batata-rustica-alecrim',
    name: 'Batata Rústica com Alecrim & Flor de Sal',
    description: 'Batatas selecionadas cortadas rusticamente, fritas em imersão para ficarem crocantes por fora e macias por dentro. Temperadas com alecrim fresco e páprica defumada.',
    price: 19.90,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80',
    badge: 'CROCANTE',
    prepTime: '10-15 min',
    ingredients: ['Batatas Rusticas', 'Alecrim Fresco', 'Flor de Sal', 'Páprica Defumada', 'Acompanha Maionese BB'],
    customizable: false
  },
  {
    id: 'batata-cheddar-bacon-mega',
    name: 'Batata Crinkle com Cheddar & Farofa de Bacon',
    description: 'Porção generosa de batata crinkle ondulada coberta com nosso creme de cheddar inglês quentinho e chuva de bacon artesanal crocante moído.',
    price: 27.90,
    originalPrice: 32.00,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80',
    badge: 'TOP VENDAS',
    isPopular: true,
    prepTime: '12-16 min',
    ingredients: ['Batatas Crinkle', 'Creme de Cheddar Inglês', 'Farofa Crocante de Bacon Defumado'],
    customizable: false
  },
  {
    id: 'onion-rings-artesanais',
    name: 'Onion Rings Empanadas na Cerveja',
    description: 'Anéis de cebola doce gigantes empanados em massa leve com cerveja artesanal e panko super crocante. Acompanha molho barbecue com bourbon.',
    price: 22.90,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1639024471287-032f66e6545b?auto=format&fit=crop&w=800&q=80',
    prepTime: '12-15 min',
    ingredients: ['Cebolas Selecionadas', 'Empanamento Panko Beer Batter', 'Molho Barbecue Bourbon'],
    customizable: false
  },
  {
    id: 'dadinhos-tapioca-bacon',
    name: 'Dadinhos de Tapioca com Queijo Coalho & Bacon',
    description: '8 unidades de dadinhos crocantes de tapioca com queijo coalho tostado e pedacinhos de bacon, acompanhados de geleia de pimenta defumada.',
    price: 26.90,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80',
    badge: 'PETISCO',
    prepTime: '12-15 min',
    ingredients: ['Tapioca Granulada', 'Queijo Coalho Curado', 'Bacon Crocante', 'Geleia de Pimenta Vermelha'],
    customizable: false
  },
  // SOBREMESAS / SHAKES
  {
    id: 'milkshake-nutella-lotus',
    name: 'Milk-shake Nutella & Biscoito Lotus Biscoff',
    description: 'Sorvete artesanal de baunilha batido com muita Nutella pura, chantilly fresco e crumble crocante do autêntico biscoito belga Lotus Biscoff (450ml).',
    price: 25.90,
    originalPrice: 28.90,
    category: 'sobremesas',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    badge: 'IRRESISTÍVEL',
    isPopular: true,
    prepTime: '5-8 min',
    ingredients: ['Sorvete Baunilha', 'Nutella Genuína', 'Chantilly Artesanal', 'Biscoito Lotus Biscoff'],
    customizable: false
  },
  {
    id: 'milkshake-pistache-cremoso',
    name: 'Milk-shake de Pistache Italiano',
    description: 'Sorvete cremoso batido com pasta pura de pistache de Bronte (Sicília), calda de chocolate branco e praliné de pistache crocante (450ml).',
    price: 28.90,
    category: 'sobremesas',
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80',
    badge: 'PREMIUM',
    prepTime: '5-8 min',
    ingredients: ['Pasta Pura de Pistache', 'Sorvete de Creme', 'Calda Chocolate Branco', 'Pistache Torrado'],
    customizable: false
  },
  {
    id: 'brownie-belga-calda-quente',
    name: 'Brownie de Chocolate Belga com Gelato de Baunilha',
    description: 'Fatia quente de brownie denso com 70% cacau Callebaut e nozes, servida com bola de gelato de baunilha Bourbon e calda de chocolate meio amargo.',
    price: 23.90,
    category: 'sobremesas',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    prepTime: '8-10 min',
    ingredients: ['Cacau Callebaut 70%', 'Nozes Chilenas', 'Gelato Baunilha Bourbon', 'Calda de Chocolate Quente'],
    customizable: false
  },
  // BEBIDAS
  {
    id: 'coca-cola-original-lata',
    name: 'Coca-Cola Original Lata (350ml)',
    description: 'Lata geladíssima servida com limão e gelo a pedido.',
    price: 7.00,
    category: 'bebidas',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Refrigerante Cola Lata 350ml'],
    customizable: false
  },
  {
    id: 'coca-cola-zero-lata',
    name: 'Coca-Cola Sem Açúcar Lata (350ml)',
    description: 'Zero açúcar, máximo sabor, servida trincando de gelada.',
    price: 7.00,
    category: 'bebidas',
    image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Refrigerante Cola Zero Lata 350ml'],
    customizable: false
  },
  {
    id: 'guarana-antarctica-lata',
    name: 'Guaraná Antarctica Lata (350ml)',
    description: 'O sabor autêntico brasileiro da Amazônia, super refrescante.',
    price: 7.00,
    category: 'bebidas',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Guaraná Antarctica 350ml'],
    customizable: false
  },
  {
    id: 'cerveja-artesanal-ipa',
    name: 'Cerveja Artesanal IPA 500ml',
    description: 'India Pale Ale artesanal com notas cítricas e amargor equilibrado na medida certa para harmonizar perfeitamente com carne suculenta.',
    price: 21.00,
    category: 'bebidas',
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=800&q=80',
    badge: 'HARMONIZAÇÃO',
    ingredients: ['Cerveja Puro Malte IPA 500ml'],
    customizable: false
  },
  {
    id: 'suco-laranja-natural',
    name: 'Suco Natural de Laranja Integral (400ml)',
    description: '100% fruta espremida na hora do pedido, sem conservantes ou adição de água.',
    price: 11.00,
    category: 'bebidas',
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Laranja Pêra Natural 400ml'],
    customizable: false
  }
];

export const REVIEWS = [
  {
    id: '1',
    author: 'Lucas Ribeiro',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: 'Há 2 dias',
    title: 'O melhor hambúrguer de Maricá disparado!',
    comment: 'Pedi o BB Smash Duplo com bacon e que experiência incrível. A carne tem aquela crostinha de smash perfeita, queijo super cremoso e pão brioche amanteigado leve. Atendimento pelo WhatsApp nota 10!',
    badge: 'Local Guide • Maricá, RJ'
  },
  {
    id: '2',
    author: 'Beatriz Fontoura',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: 'Há 5 dias',
    title: 'O BB Pool Party com piscina de queijo é surreal!',
    comment: 'Pedimos no delivery e chegou antes do tempo previsto, bem quentinho e com as batatas super crocantes. Embalagem de primeiríssima qualidade. Recomendo demais!',
    badge: 'Avaliação no Google ★★★★★'
  },
  {
    id: '3',
    author: 'Gabriel Vasconcellos',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: 'Há 1 semana',
    title: 'Qualidade impecável e carne artesanal de verdade',
    comment: 'Carne suculenta no ponto certo, ingredientes frescos e a maionese especial da casa é fora de série. Já virou nosso ponto fixo no Centro de Maricá!',
    badge: 'Local Guide • Maricá, RJ'
  },
  {
    id: '4',
    author: 'Juliana Menezes',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: 'Há 1 semana',
    title: 'Atendimento rápido e lanche muito saboroso!',
    comment: 'Pedimos pelo WhatsApp, fomos atendidos com muita agilidade e o pedido veio perfeito. Pão selado na chapa e o bacon crocante de verdade. Parabéns à equipe BB!',
    badge: 'Avaliação no Google ★★★★★'
  },
  {
    id: '5',
    author: 'Thiago Silveira',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: 'Há 2 semanas',
    title: 'Smash burgers e porções nota mil!',
    comment: 'As entradas e os hambúrgueres artesanais são diferenciados. Sabor autêntico, muito recheio e preço justo. Vale cada centavo!',
    badge: 'Local Guide • 32 avaliações'
  },
  {
    id: '6',
    author: 'Mariana Duarte',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: 'Há 2 semanas',
    title: 'Entrega rápida e hambúrguer quentinho!',
    comment: 'Moro em Maricá e sempre peço aqui. O lanche chega como se tivesse acabado de sair da chapa. A batata com cheddar e farofa de bacon é divina!',
    badge: 'Avaliação no Google ★★★★★'
  }
];

export const RESTAURANT_INFO = {
  name: 'BB Burger',
  slogan: 'Hamburgueria Artesanal',
  phone: '(21) 96730-6913',
  phoneInternational: '+55 21 96730-6913',
  whatsappRaw: '5521967306913',
  googleBusinessUrl: 'https://share.google/4v2RbgB55z1QgBkCZ',
  address: 'R. Alferes Gomes, 19 - Centro',
  fullAddress: 'R. Alferes Gomes, 19 - Centro, Maricá - RJ, 24900-855, Brasil',
  neighborhood: 'Centro',
  city: 'Maricá',
  state: 'RJ',
  cep: '24900-855',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=R.+Alferes+Gomes,+19+-+Centro,+Maric%C3%A1+-+RJ,+24900-855',
  deliveryTime: '30 a 45 min',
  deliveryFee: 5.00,
  freeDeliveryThreshold: 70.00,
  pixKey: '21967306913',
  goomerUrl: 'https://bb-burger-1.goomer.app',
  since: 'Setembro de 2025',
  hours: 'Almoço: Seg a Sex 11h às 15h | Jantar: Ter a Dom 18h às 23h',
  hoursSummary: 'Almoço: Seg a Sex 11h-15h | Jantar: Ter a Dom 18h-23h',
  detailedHours: [
    { day: 'Segunda-feira', lunch: '11:00 – 15:00', dinner: 'Fechado' },
    { day: 'Terça-feira', lunch: '11:00 – 15:00', dinner: '18:00 – 23:00' },
    { day: 'Quarta-feira', lunch: '11:00 – 15:00', dinner: '18:00 – 23:00' },
    { day: 'Quinta-feira', lunch: '11:00 – 15:00', dinner: '18:00 – 23:00' },
    { day: 'Sexta-feira', lunch: '11:00 – 15:00', dinner: '18:00 – 23:00' },
    { day: 'Sábado', lunch: 'Fechado', dinner: '18:00 – 23:00' },
    { day: 'Domingo', lunch: 'Fechado', dinner: '18:00 – 23:00' }
  ],
  instagram: '@bbburger_oficial',
  rating: 4.9,
  reviewsCount: 1280
};
