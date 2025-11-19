import { Brand, GlobalContent, Language, Product } from './types';

export const CONTENT: GlobalContent = {
  nav: {
    title: { [Language.EN]: 'AIO X-TREME SHOWROOM', [Language.CN]: '极寒水冷展览馆', [Language.VN]: 'TRIỂN LÃM TẢN NHIỆT NƯỚC' },
    toggleTheme: { [Language.EN]: 'SWITCH MODE', [Language.CN]: '切换模式', [Language.VN]: 'CHẾ ĐỘ' },
    back: { [Language.EN]: 'BACK TO SHOWROOM', [Language.CN]: '返回展厅', [Language.VN]: 'QUAY LẠI' },
  },
  product: {
    viewSpecs: { [Language.EN]: 'VIEW SPECS', [Language.CN]: '查看参数', [Language.VN]: 'XEM THÔNG SỐ' },
    specsTitle: { [Language.EN]: 'TECHNICAL SPECIFICATIONS', [Language.CN]: '技术规格详情', [Language.VN]: 'THÔNG SỐ KỸ THUẬT' },
  }
};

const generateSpecs = (modifier: number): Product['specs'] => ({
  dimensions: `${277 + modifier}mm x 120mm x ${27 + (modifier % 5)}mm`,
  weight: `${1.2 + (modifier * 0.1)} kg`,
  workTemp: `5°C - ${60 + modifier}°C`,
  voltage: '12V DC',
  current: `${0.3 + (modifier * 0.05)}A`,
  fanSpeed: `${500 + (modifier * 100)} - ${2000 + (modifier * 50)} RPM`,
  pumpSpeed: `${2800 + (modifier * 50)} RPM`,
  coolantConcentration: 'Propylene Glycol 35%',
  coolantFreezingPoint: '-25°C',
  coolantPH: '7.5 - 8.5',
});

export const BRANDS: Brand[] = [
  {
    id: 'corsair',
    name: { [Language.EN]: 'Corsair', [Language.CN]: '美商海盗船', [Language.VN]: 'Corsair' },
    origin: 'California, USA',
    bgSeed: 'california_tech',
    primaryColor: '#FFFF00',
    description: {
      [Language.EN]: 'High-performance gear for gamers and content creators.',
      [Language.CN]: '为游戏玩家和创作者打造的高性能装备。',
      [Language.VN]: 'Thiết bị hiệu suất cao cho game thủ và người sáng tạo.'
    },
    products: [
      {
        id: 'c-h150i',
        name: 'iCUE H150i ELITE',
        price: { [Language.EN]: '$189.99', [Language.CN]: '¥1399', [Language.VN]: '4.500.000₫' },
        imageSeed: 'corsair1',
        specs: generateSpecs(1),
      },
      {
        id: 'c-h100i',
        name: 'iCUE H100i RGB',
        price: { [Language.EN]: '$139.99', [Language.CN]: '¥999', [Language.VN]: '3.200.000₫' },
        imageSeed: 'corsair2',
        specs: generateSpecs(2),
      },
      {
        id: 'c-h170i',
        name: 'iCUE H170i LCD',
        price: { [Language.EN]: '$259.99', [Language.CN]: '¥1999', [Language.VN]: '6.100.000₫' },
        imageSeed: 'corsair3',
        specs: generateSpecs(3),
      },
    ]
  },
  {
    id: 'msi',
    name: { [Language.EN]: 'MSI', [Language.CN]: '微星', [Language.VN]: 'MSI' },
    origin: 'Taipei, Taiwan',
    bgSeed: 'taipei_neon',
    primaryColor: '#FF0000',
    description: {
      [Language.EN]: 'True Gaming. Some are born for gaming, some are chosen.',
      [Language.CN]: '真正的游戏。有些是为游戏而生，有些是被选中。',
      [Language.VN]: 'Chơi game đích thực. Sinh ra để chiến game.'
    },
    products: [
      {
        id: 'm-core360',
        name: 'MAG CORELIQUID 360R',
        price: { [Language.EN]: '$129.99', [Language.CN]: '¥899', [Language.VN]: '3.100.000₫' },
        imageSeed: 'msi1',
        specs: generateSpecs(4),
      },
      {
        id: 'm-meg',
        name: 'MEG CORELIQUID S360',
        price: { [Language.EN]: '$279.99', [Language.CN]: '¥2199', [Language.VN]: '6.800.000₫' },
        imageSeed: 'msi2',
        specs: generateSpecs(5),
      },
      {
        id: 'm-mpg',
        name: 'MPG CORELIQUID K240',
        price: { [Language.EN]: '$199.99', [Language.CN]: '¥1499', [Language.VN]: '4.800.000₫' },
        imageSeed: 'msi3',
        specs: generateSpecs(6),
      },
    ]
  },
  {
    id: 'asr',
    name: { [Language.EN]: 'ASRock', [Language.CN]: '华擎', [Language.VN]: 'ASRock' },
    origin: 'Taipei, Taiwan',
    bgSeed: 'factory_tech',
    primaryColor: '#00FF00',
    description: {
      [Language.EN]: 'Innovative design and reliable performance.',
      [Language.CN]: '创新设计与可靠性能的结合。',
      [Language.VN]: 'Thiết kế sáng tạo và hiệu suất đáng tin cậy.'
    },
    products: [
      {
        id: 'a-carrara',
        name: 'Carrara Edition 360',
        price: { [Language.EN]: '$159.99', [Language.CN]: '¥1099', [Language.VN]: '3.800.000₫' },
        imageSeed: 'asrock1',
        specs: generateSpecs(7),
      },
      {
        id: 'a-lumen',
        name: 'Lumen S24 RGB',
        price: { [Language.EN]: '$119.99', [Language.CN]: '¥799', [Language.VN]: '2.900.000₫' },
        imageSeed: 'asrock2',
        specs: generateSpecs(8),
      },
      {
        id: 'a-aqua',
        name: 'AQUA 360',
        price: { [Language.EN]: '$199.99', [Language.CN]: '¥1499', [Language.VN]: '4.900.000₫' },
        imageSeed: 'asrock3',
        specs: generateSpecs(9),
      },
    ]
  },
  {
    id: 'fd',
    name: { [Language.EN]: 'Fractal Design', [Language.CN]: '分形工艺', [Language.VN]: 'Fractal Design' },
    origin: 'Gothenburg, Sweden',
    bgSeed: 'nordic_interior',
    primaryColor: '#FFFFFF',
    description: {
      [Language.EN]: 'Scandinavian design, silent cooling.',
      [Language.CN]: '斯堪的纳维亚设计，静音散热。',
      [Language.VN]: 'Thiết kế Scandinavian, làm mát êm ái.'
    },
    products: [
      {
        id: 'f-celsius',
        name: 'Celsius+ S36 Prisma',
        price: { [Language.EN]: '$199.99', [Language.CN]: '¥1499', [Language.VN]: '4.800.000₫' },
        imageSeed: 'fractal1',
        specs: generateSpecs(10),
      },
      {
        id: 'f-lumen',
        name: 'Lumen S28 RGB',
        price: { [Language.EN]: '$139.99', [Language.CN]: '¥999', [Language.VN]: '3.400.000₫' },
        imageSeed: 'fractal2',
        specs: generateSpecs(11),
      },
      {
        id: 'f-aspect',
        name: 'Aspect 12 RGB',
        price: { [Language.EN]: '$109.99', [Language.CN]: '¥749', [Language.VN]: '2.600.000₫' },
        imageSeed: 'fractal3',
        specs: generateSpecs(12),
      },
    ]
  },
  {
    id: 'rog',
    name: { [Language.EN]: 'ROG', [Language.CN]: '玩家国度', [Language.VN]: 'ROG' },
    origin: 'Taipei, Taiwan',
    bgSeed: 'esports_arena',
    primaryColor: '#FF0055',
    description: {
      [Language.EN]: 'Republic of Gamers. For those who dare.',
      [Language.CN]: '玩家国度。只为超越。',
      [Language.VN]: 'Republic of Gamers. Dành cho những kẻ dám thách thức.'
    },
    products: [
      {
        id: 'r-ryujin',
        name: 'ROG RYUJIN III 360',
        price: { [Language.EN]: '$349.99', [Language.CN]: '¥2699', [Language.VN]: '8.500.000₫' },
        imageSeed: 'rog1',
        specs: generateSpecs(13),
      },
      {
        id: 'r-strix',
        name: 'ROG STRIX LC II',
        price: { [Language.EN]: '$189.99', [Language.CN]: '¥1399', [Language.VN]: '4.600.000₫' },
        imageSeed: 'rog2',
        specs: generateSpecs(14),
      },
      {
        id: 'r-ryuo',
        name: 'ROG RYUO III',
        price: { [Language.EN]: '$249.99', [Language.CN]: '¥1899', [Language.VN]: '6.000.000₫' },
        imageSeed: 'rog3',
        specs: generateSpecs(15),
      },
    ]
  },
  {
    id: 'nzxt',
    name: { [Language.EN]: 'NZXT', [Language.CN]: '恩杰', [Language.VN]: 'NZXT' },
    origin: 'California, USA',
    bgSeed: 'clean_setup',
    primaryColor: '#8800FF',
    description: {
      [Language.EN]: 'Simplicity and performance for PC builders.',
      [Language.CN]: '为PC装机者提供简约与性能。',
      [Language.VN]: 'Đơn giản và hiệu suất cho người lắp ráp PC.'
    },
    products: [
      {
        id: 'n-krakenz',
        name: 'Kraken Elite 360',
        price: { [Language.EN]: '$279.99', [Language.CN]: '¥1999', [Language.VN]: '6.900.000₫' },
        imageSeed: 'nzxt1',
        specs: generateSpecs(16),
      },
      {
        id: 'n-krakenx',
        name: 'Kraken 240 RGB',
        price: { [Language.EN]: '$159.99', [Language.CN]: '¥1199', [Language.VN]: '3.900.000₫' },
        imageSeed: 'nzxt2',
        specs: generateSpecs(17),
      },
      {
        id: 'n-120',
        name: 'Kraken 120',
        price: { [Language.EN]: '$89.99', [Language.CN]: '¥599', [Language.VN]: '2.200.000₫' },
        imageSeed: 'nzxt3',
        specs: generateSpecs(18),
      },
    ]
  },
  {
    id: 'valkyrie',
    name: { [Language.EN]: 'Valkyrie', [Language.CN]: '瓦尔基里', [Language.VN]: 'Valkyrie' },
    origin: 'Shenzhen, China',
    bgSeed: 'cyber_anime',
    primaryColor: '#00CCFF',
    description: {
      [Language.EN]: 'Mythological power in your cooling system.',
      [Language.CN]: '散热系统中的神话力量。',
      [Language.VN]: 'Sức mạnh thần thoại trong hệ thống làm mát của bạn.'
    },
    products: [
      {
        id: 'v-gl360',
        name: 'Valkyrie GL360',
        price: { [Language.EN]: '$169.99', [Language.CN]: '¥1299', [Language.VN]: '4.100.000₫' },
        imageSeed: 'valk1',
        specs: generateSpecs(19),
      },
      {
        id: 'v-e360',
        name: 'Valkyrie E360',
        price: { [Language.EN]: '$149.99', [Language.CN]: '¥1099', [Language.VN]: '3.600.000₫' },
        imageSeed: 'valk2',
        specs: generateSpecs(20),
      },
      {
        id: 'v-dragon',
        name: 'Dragon AIO 240',
        price: { [Language.EN]: '$129.99', [Language.CN]: '¥899', [Language.VN]: '3.200.000₫' },
        imageSeed: 'valk3',
        specs: generateSpecs(21),
      },
    ]
  },
];