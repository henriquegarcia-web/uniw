import { IProduct, IProductCategory, ProductBadge } from '@uniw/shared-types'

export const mockCategories: IProductCategory[] = [
  {
    id: 'cat-1',
    name: 'Maquiagem',
    imageUrl: 'https://picsum.photos/seed/makeup/400/400',
  },
  {
    id: 'cat-2',
    name: 'Skincare',
    imageUrl: 'https://picsum.photos/seed/skincare/400/400',
  },
  {
    id: 'cat-3',
    name: 'Perfumes',
    imageUrl: 'https://picsum.photos/seed/perfume/400/400',
  },
  {
    id: 'cat-4',
    name: 'Cabelo',
    imageUrl: 'https://picsum.photos/seed/haircare/400/400',
  },
  {
    id: 'cat-5',
    name: 'Moda Feminina',
    imageUrl: 'https://picsum.photos/seed/fashion/400/400',
  },
  {
    id: 'cat-6',
    name: 'Bolsas e Acessórios',
    imageUrl: 'https://picsum.photos/seed/accessories/400/400',
  },
  {
    id: 'cat-7',
    name: 'Sapatos',
    imageUrl: 'https://picsum.photos/seed/shoes/400/400',
  },
  {
    id: 'cat-8',
    name: 'Unhas',
    imageUrl: 'https://picsum.photos/seed/nails/400/400',
  },
]

export const mockProducts: IProduct[] = [
  // --- MAQUIAGEM (5 Produtos) ---
  {
    id: 'prod-1',
    categoryId: 'cat-1',
    name: 'Base Líquida Matte Effect',
    caption: 'Cobertura perfeita por 24 horas',
    description:
      'Nossa base mais vendida, com acabamento matte aveludado, longa duração e resistente à água. Controla a oleosidade e minimiza a aparência dos poros.',
    images: [
      'https://picsum.photos/seed/base1/400/800',
      'https://picsum.photos/seed/base2/400/800',
      'https://picsum.photos/seed/base3/400/800',
    ],
    badges: [ProductBadge.VIP, ProductBadge.IN_STOCK],
    rating: {
      average: 3.8,
      reviewsCount: 2000,
    },
    variationTypes: [
      {
        name: 'Cor',
        options: [
          { value: 'claro-01', label: 'Claro 01' },
          { value: 'medio-02', label: 'Médio 02' },
          { value: 'escuro-03', label: 'Escuro 03' },
        ],
      },
    ],
    skus: [
      {
        id: 'sku-1-claro',
        price: 129.9,
        stock: 50,
        attributes: { Cor: 'claro-01' },
        shippingDetails: {
          weightInGrams: 150,
          dimensionsCm: { width: 5, height: 12, length: 5 },
          shippingLeadTimeDays: 2,
        },
      },
      {
        id: 'sku-1-medio',
        price: 129.9,
        stock: 45,
        attributes: { Cor: 'medio-02' },
        shippingDetails: {
          weightInGrams: 150,
          dimensionsCm: { width: 5, height: 12, length: 5 },
          shippingLeadTimeDays: 2,
        },
      },
      {
        id: 'sku-1-escuro',
        price: 129.9,
        stock: 30,
        attributes: { Cor: 'escuro-03' },
        shippingDetails: {
          weightInGrams: 150,
          dimensionsCm: { width: 5, height: 12, length: 5 },
          shippingLeadTimeDays: 2,
        },
      },
    ],
  },
  {
    id: 'prod-2',
    categoryId: 'cat-1',
    name: 'Batom Hidratante Cremoso',
    caption: 'Cor intensa e hidratação profunda',
    description:
      'Batom com fórmula enriquecida com manteiga de karité e vitamina E para lábios macios e coloridos o dia todo.',
    images: ['https://picsum.photos/seed/lipstick1/800/800'],
    badges: [ProductBadge.SALE],
    rating: {
      average: 4.6,
      reviewsCount: 2000,
    },
    variationTypes: [
      {
        name: 'Cor',
        options: [
          { value: 'vermelho-fatal', label: 'Vermelho Fatal' },
          { value: 'nude-classico', label: 'Nude Clássico' },
        ],
      },
    ],
    skus: [
      {
        id: 'sku-2-vermelho',
        price: 49.9,
        promotionalPrice: 39.9,
        stock: 100,
        attributes: { Cor: 'vermelho-fatal' },
        shippingDetails: {
          weightInGrams: 150,
          dimensionsCm: { width: 5, height: 12, length: 5 },
          shippingLeadTimeDays: 2,
        },
      },
      {
        id: 'sku-2-nude',
        price: 49.9,
        promotionalPrice: 39.9,
        stock: 150,
        attributes: { Cor: 'nude-classico' },
        shippingDetails: {
          weightInGrams: 150,
          dimensionsCm: { width: 5, height: 12, length: 5 },
          shippingLeadTimeDays: 2,
        },
      },
    ],
  },
  {
    id: 'prod-3',
    categoryId: 'cat-1',
    name: 'Paleta de Sombras "Sunset"',
    caption: '12 tons quentes e vibrantes',
    description:
      'Crie looks incríveis com 12 sombras de alta pigmentação, incluindo acabamentos matte e cintilantes.',
    images: ['https://picsum.photos/seed/palette1/800/800'],
    rating: {
      average: 4.9,
      reviewsCount: 2000,
    },
    variationTypes: [],
    skus: [
      {
        id: 'sku-3-sunset',
        price: 189.9,
        stock: 70,
        attributes: {},
        shippingDetails: {
          weightInGrams: 150,
          dimensionsCm: { width: 5, height: 12, length: 5 },
          shippingLeadTimeDays: 2,
        },
      },
    ],
  },
  {
    id: 'prod-4',
    categoryId: 'cat-1',
    name: 'Máscara de Cílios Volume Extremo',
    caption: 'Cílios de boneca em uma camada',
    description: '...',
    images: ['https://picsum.photos/seed/mascara/800/800'],
    rating: {
      average: 4.7,
      reviewsCount: 2000,
    },
    variationTypes: [],
    skus: [
      {
        id: 'sku-4-mascara',
        price: 79.9,
        stock: 200,
        attributes: {},
        shippingDetails: {
          weightInGrams: 150,
          dimensionsCm: { width: 5, height: 12, length: 5 },
          shippingLeadTimeDays: 2,
        },
      },
    ],
  },
  {
    id: 'prod-5',
    categoryId: 'cat-1',
    name: 'Pó Compacto Translúcido',
    caption: 'Sela a maquiagem e controla o brilho',
    description: '...',
    images: ['https://picsum.photos/seed/powder/800/800'],
    rating: {
      average: 4.5,
      reviewsCount: 2000,
    },
    variationTypes: [],
    skus: [
      {
        id: 'sku-5-powder',
        price: 89.9,
        stock: 120,
        attributes: {},
        shippingDetails: {
          weightInGrams: 150,
          dimensionsCm: { width: 5, height: 12, length: 5 },
          shippingLeadTimeDays: 2,
        },
      },
    ],
  },

  // --- SKINCARE (4 Produtos) ---
  {
    id: 'prod-6',
    categoryId: 'cat-2',
    name: 'Sérum Facial com Vitamina C',
    caption: 'Antioxidante e uniformizador',
    description:
      'Combate os radicais livres, uniformiza o tom da pele e promove luminosidade. Ideal para todos os tipos de pele.',
    images: ['https://picsum.photos/seed/serum1/800/800'],
    badges: [ProductBadge.NEW_ARRIVAL, ProductBadge.VIP],
    rating: {
      average: 4.9,
      reviewsCount: 2000,
    },
    variationTypes: [],
    skus: [
      {
        id: 'sku-6-serum',
        price: 210.0,
        stock: 80,
        attributes: {},
        shippingDetails: {
          weightInGrams: 150,
          dimensionsCm: { width: 5, height: 12, length: 5 },
          shippingLeadTimeDays: 2,
        },
      },
    ],
  },
  {
    id: 'prod-7',
    categoryId: 'cat-2',
    name: 'Gel de Limpeza Facial Suave',
    caption: 'Limpa sem ressecar',
    description: '...',
    images: ['https://picsum.photos/seed/cleanser/800/800'],
    rating: {
      average: 4.8,
      reviewsCount: 2000,
    },
    variationTypes: [],
    skus: [
      {
        id: 'sku-7-cleanser',
        price: 95.5,
        stock: 150,
        attributes: {},
        shippingDetails: {
          weightInGrams: 150,
          dimensionsCm: { width: 5, height: 12, length: 5 },
          shippingLeadTimeDays: 2,
        },
      },
    ],
  },
  {
    id: 'prod-8',
    categoryId: 'cat-2',
    name: 'Hidratante Facial com Ácido Hialurônico',
    caption: 'Hidratação intensa por 48h',
    description: '...',
    images: ['https://picsum.photos/seed/moisturizer/800/800'],
    rating: {
      average: 4.7,
      reviewsCount: 2000,
    },
    variationTypes: [],
    skus: [
      {
        id: 'sku-8-moisturizer',
        price: 150.0,
        stock: 100,
        attributes: {},
        shippingDetails: {
          weightInGrams: 150,
          dimensionsCm: { width: 5, height: 12, length: 5 },
          shippingLeadTimeDays: 2,
        },
      },
    ],
  },
  {
    id: 'prod-9',
    categoryId: 'cat-2',
    name: 'Protetor Solar Toque Seco FPS 60',
    caption: 'Alta proteção e controle de oleosidade',
    description: '...',
    images: ['https://picsum.photos/seed/sunscreen/800/800'],
    rating: {
      average: 5.0,
      reviewsCount: 2000,
    },
    variationTypes: [],
    skus: [
      {
        id: 'sku-9-sunscreen',
        price: 110.0,
        stock: 300,
        attributes: {},
        shippingDetails: {
          weightInGrams: 150,
          dimensionsCm: { width: 5, height: 12, length: 5 },
          shippingLeadTimeDays: 2,
        },
      },
    ],
  },

  // --- PERFUMES (3 Produtos) ---
  {
    id: 'prod-10',
    categoryId: 'cat-3',
    name: 'Eau de Parfum "La Nuit"',
    caption: 'Fragrância floral amadeirada',
    description:
      'Uma fragrância misteriosa e sedutora, com notas de jasmim, baunilha e sândalo. Perfeita para a noite.',
    images: ['https://picsum.photos/seed/perfume1/800/800'],
    badges: [ProductBadge.VIP],
    rating: { average: 4.9, reviewsCount: 2000 },
    variationTypes: [
      {
        name: 'Tamanho',
        options: [
          { value: '30ml', label: '30ml' },
          { value: '50ml', label: '50ml' },
          { value: '100ml', label: '100ml' },
        ],
      },
    ],
    skus: [
      {
        id: 'sku-10-30',
        price: 250.0,
        stock: 50,
        attributes: { Tamanho: '30ml' },
        shippingDetails: {
          weightInGrams: 150,
          dimensionsCm: { width: 5, height: 12, length: 5 },
          shippingLeadTimeDays: 2,
        },
      },
      {
        id: 'sku-10-50',
        price: 380.0,
        stock: 40,
        attributes: { Tamanho: '50ml' },
        shippingDetails: {
          weightInGrams: 150,
          dimensionsCm: { width: 5, height: 12, length: 5 },
          shippingLeadTimeDays: 2,
        },
      },
      {
        id: 'sku-10-100',
        price: 520.0,
        stock: 20,
        attributes: { Tamanho: '100ml' },
        shippingDetails: {
          weightInGrams: 150,
          dimensionsCm: { width: 5, height: 12, length: 5 },
          shippingLeadTimeDays: 2,
        },
      },
    ],
  },
  {
    id: 'prod-11',
    categoryId: 'cat-3',
    name: 'Deo Colônia "Fresh Breeze"',
    caption: 'Cítrico e refrescante',
    description: '...',
    images: ['https://picsum.photos/seed/perfume2/800/800'],
    rating: {
      average: 4.6,
      reviewsCount: 2000,
    },
    variationTypes: [],
    skus: [
      {
        id: 'sku-11-fresh',
        price: 180.0,
        stock: 90,
        attributes: {},
        shippingDetails: {
          weightInGrams: 150,
          dimensionsCm: { width: 5, height: 12, length: 5 },
          shippingLeadTimeDays: 2,
        },
      },
    ],
  },
  {
    id: 'prod-12',
    categoryId: 'cat-3',
    name: 'Body Splash "Vanilla Kiss"',
    caption: 'Doce e aconchegante',
    description: '...',
    images: ['https://picsum.photos/seed/bodysplash/800/800'],
    rating: {
      average: 4.7,
      reviewsCount: 2000,
    },
    variationTypes: [],
    skus: [
      {
        id: 'sku-12-vanilla',
        price: 89.9,
        stock: 250,
        attributes: {},
        shippingDetails: {
          weightInGrams: 150,
          dimensionsCm: { width: 5, height: 12, length: 5 },
          shippingLeadTimeDays: 2,
        },
      },
    ],
  },

  // --- CABELO (3 Produtos) ---
  {
    id: 'prod-13',
    categoryId: 'cat-4',
    name: 'Shampoo Hidratação Profunda',
    caption: 'Para cabelos secos e danificados',
    description: '...',
    images: ['https://picsum.photos/seed/shampoo/800/800'],
    rating: {
      average: 4.8,
      reviewsCount: 2000,
    },
    variationTypes: [],
    skus: [
      {
        id: 'sku-13-shampoo',
        price: 65.0,
        stock: 180,
        attributes: {},
        shippingDetails: {
          weightInGrams: 150,
          dimensionsCm: { width: 5, height: 12, length: 5 },
          shippingLeadTimeDays: 2,
        },
      },
    ],
  },
  {
    id: 'prod-14',
    categoryId: 'cat-4',
    name: 'Máscara de Reconstrução Capilar',
    caption: 'Reparação intensa em 3 minutos',
    description: '...',
    images: ['https://picsum.photos/seed/hairmask/800/800'],
    rating: {
      average: 4.9,
      reviewsCount: 2000,
    },
    variationTypes: [],
    skus: [
      {
        id: 'sku-14-hairmask',
        price: 99.0,
        stock: 110,
        attributes: {},
        shippingDetails: {
          weightInGrams: 150,
          dimensionsCm: { width: 5, height: 12, length: 5 },
          shippingLeadTimeDays: 2,
        },
      },
    ],
  },
  {
    id: 'prod-15',
    categoryId: 'cat-4',
    name: 'Óleo Reparador de Pontas',
    caption: 'Brilho e maciez sem pesar',
    description: '...',
    images: ['https://picsum.photos/seed/hairoil/800/800'],
    rating: {
      average: 5.0,
      reviewsCount: 2000,
    },
    variationTypes: [],
    skus: [
      {
        id: 'sku-15-hairoil',
        price: 75.0,
        stock: 220,
        attributes: {},
        shippingDetails: {
          weightInGrams: 150,
          dimensionsCm: { width: 5, height: 12, length: 5 },
          shippingLeadTimeDays: 2,
        },
      },
    ],
  },

  // --- MODA FEMININA (6 Produtos) ---
  {
    id: 'prod-16',
    categoryId: 'cat-5',
    name: 'Vestido Midi Floral',
    caption: 'Leveza e elegância para o verão',
    description:
      'Vestido em tecido viscose leve, com estampa floral exclusiva, alças finas e caimento fluido.',
    images: [
      'https://picsum.photos/seed/dress1/800/800',
      'https://picsum.photos/seed/dress2/800/800',
    ],
    rating: { average: 4.7, reviewsCount: 2000 },
    badges: [ProductBadge.NEW_ARRIVAL],
    variationTypes: [
      {
        name: 'Cor',
        options: [
          { value: 'vermelho', label: 'Vermelho' },
          { value: 'azul', label: 'Azul' },
        ],
      },
      {
        name: 'Tamanho',
        options: [
          { value: 'p', label: 'P' },
          { value: 'm', label: 'M' },
          { value: 'g', label: 'G' },
        ],
      },
    ],
    skus: [
      {
        id: 'sku-16-red-p',
        price: 199.9,
        stock: 10,
        attributes: { Cor: 'vermelho', Tamanho: 'p' },
        shippingDetails: {
          weightInGrams: 150,
          dimensionsCm: { width: 5, height: 12, length: 5 },
          shippingLeadTimeDays: 2,
        },
      },
      {
        id: 'sku-16-red-m',
        price: 299.9,
        stock: 15,
        attributes: { Cor: 'vermelho', Tamanho: 'm' },
        shippingDetails: {
          weightInGrams: 150,
          dimensionsCm: { width: 5, height: 12, length: 5 },
          shippingLeadTimeDays: 2,
        },
      },
      {
        id: 'sku-16-blue-m',
        price: 299.9,
        stock: 12,
        attributes: { Cor: 'azul', Tamanho: 'm' },
        shippingDetails: {
          weightInGrams: 150,
          dimensionsCm: { width: 5, height: 12, length: 5 },
          shippingLeadTimeDays: 2,
        },
      },
      {
        id: 'sku-16-blue-g',
        price: 299.9,
        stock: 8,
        attributes: { Cor: 'azul', Tamanho: 'g' },
        shippingDetails: {
          weightInGrams: 150,
          dimensionsCm: { width: 5, height: 12, length: 5 },
          shippingLeadTimeDays: 2,
        },
      },
    ],
  },
  {
    id: 'prod-17',
    categoryId: 'cat-5',
    name: 'Blazer de Alfaiataria',
    caption: 'O clássico indispensável',
    description: '...',
    images: ['https://picsum.photos/seed/blazer/800/800'],
    rating: { average: 4.9, reviewsCount: 2000 },
    variationTypes: [
      {
        name: 'Tamanho',
        options: [
          { value: 'p', label: 'P' },
          { value: 'm', label: 'M' },
        ],
      },
    ],
    skus: [
      {
        id: 'sku-17-p',
        price: 450.0,
        stock: 20,
        attributes: { Tamanho: 'p' },
        shippingDetails: {
          weightInGrams: 150,
          dimensionsCm: { width: 5, height: 12, length: 5 },
          shippingLeadTimeDays: 2,
        },
      },
      {
        id: 'sku-17-m',
        price: 450.0,
        stock: 25,
        attributes: { Tamanho: 'm' },
        shippingDetails: {
          weightInGrams: 150,
          dimensionsCm: { width: 5, height: 12, length: 5 },
          shippingLeadTimeDays: 2,
        },
      },
    ],
  },
  {
    id: 'prod-18',
    categoryId: 'cat-5',
    name: 'Calça Jeans Skinny',
    caption: 'Modelagem perfeita que valoriza',
    description: '...',
    images: ['https://picsum.photos/seed/jeans/800/800'],
    rating: {
      average: 4.6,
      reviewsCount: 2000,
    },
    variationTypes: [],
    skus: [
      {
        id: 'sku-18-jeans',
        price: 220.0,
        stock: 50,
        attributes: {},
        shippingDetails: {
          weightInGrams: 150,
          dimensionsCm: { width: 5, height: 12, length: 5 },
          shippingLeadTimeDays: 2,
        },
      },
    ],
  },
  {
    id: 'prod-19',
    categoryId: 'cat-5',
    name: 'Saia Plissada Midi',
    caption: 'Moderna e versátil',
    description: '...',
    images: ['https://picsum.photos/seed/skirt/800/800'],
    rating: {
      average: 4.8,
      reviewsCount: 2000,
    },
    variationTypes: [],
    skus: [
      {
        id: 'sku-19-skirt',
        price: 199.9,
        stock: 40,
        attributes: {},
        shippingDetails: {
          weightInGrams: 150,
          dimensionsCm: { width: 5, height: 12, length: 5 },
          shippingLeadTimeDays: 2,
        },
      },
    ],
  },
  {
    id: 'prod-20',
    categoryId: 'cat-5',
    name: 'Body de Renda',
    caption: 'Sensualidade e sofisticação',
    description: '...',
    images: ['https://picsum.photos/seed/body/800/800'],
    rating: {
      average: 4.9,
      reviewsCount: 2000,
    },
    variationTypes: [],
    skus: [
      {
        id: 'sku-20-body',
        price: 159.0,
        stock: 60,
        attributes: {},
        shippingDetails: {
          weightInGrams: 150,
          dimensionsCm: { width: 5, height: 12, length: 5 },
          shippingLeadTimeDays: 2,
        },
      },
    ],
  },
  {
    id: 'prod-21',
    categoryId: 'cat-5',
    name: 'T-shirt Básica de Algodão Pima',
    caption: 'Toque macio e qualidade superior',
    description: '...',
    images: ['https://picsum.photos/seed/tshirt/800/800'],
    rating: {
      average: 5.0,
      reviewsCount: 2000,
    },
    variationTypes: [],
    skus: [
      {
        id: 'sku-21-tshirt',
        price: 120.0,
        stock: 100,
        attributes: {},
        shippingDetails: {
          weightInGrams: 150,
          dimensionsCm: { width: 5, height: 12, length: 5 },
          shippingLeadTimeDays: 2,
        },
      },
    ],
  },

  // --- BOLSAS E ACESSÓRIOS (4 Produtos) ---
  {
    id: 'prod-22',
    categoryId: 'cat-6',
    name: 'Bolsa Tote de Couro',
    caption: 'Espaçosa e elegante para o dia a dia',
    description: '...',
    images: ['https://picsum.photos/seed/bag1/800/800'],
    rating: {
      average: 4.9,
      reviewsCount: 2000,
    },
    variationTypes: [],
    skus: [
      {
        id: 'sku-22-bag',
        price: 599.0,
        stock: 30,
        attributes: {},
        shippingDetails: {
          weightInGrams: 150,
          dimensionsCm: { width: 5, height: 12, length: 5 },
          shippingLeadTimeDays: 2,
        },
      },
    ],
  },
  {
    id: 'prod-23',
    categoryId: 'cat-6',
    name: 'Colar Ponto de Luz',
    caption: 'Discreto e sofisticado',
    description: '...',
    images: ['https://picsum.photos/seed/necklace/800/800'],
    rating: {
      average: 4.8,
      reviewsCount: 2000,
    },
    variationTypes: [],
    skus: [
      {
        id: 'sku-23-necklace',
        price: 180.0,
        stock: 70,
        attributes: {},
        shippingDetails: {
          weightInGrams: 150,
          dimensionsCm: { width: 5, height: 12, length: 5 },
          shippingLeadTimeDays: 2,
        },
      },
    ],
  },
  {
    id: 'prod-24',
    categoryId: 'cat-6',
    name: 'Cinto de Couro com Fivela Dourada',
    caption: 'O toque final para seu look',
    description: '...',
    images: ['https://picsum.photos/seed/belt/800/800'],
    rating: {
      average: 4.7,
      reviewsCount: 2000,
    },
    variationTypes: [],
    skus: [
      {
        id: 'sku-24-belt',
        price: 129.0,
        stock: 90,
        attributes: {},
        shippingDetails: {
          weightInGrams: 150,
          dimensionsCm: { width: 5, height: 12, length: 5 },
          shippingLeadTimeDays: 2,
        },
      },
    ],
  },
  {
    id: 'prod-25',
    categoryId: 'cat-6',
    name: 'Óculos de Sol "Cat Eye"',
    caption: 'Estilo retrô e proteção UV400',
    description: '...',
    images: ['https://picsum.photos/seed/sunglasses/800/800'],
    rating: {
      average: 4.9,
      reviewsCount: 2000,
    },
    variationTypes: [],
    skus: [
      {
        id: 'sku-25-sunglasses',
        price: 350.0,
        stock: 50,
        attributes: {},
        shippingDetails: {
          weightInGrams: 150,
          dimensionsCm: { width: 5, height: 12, length: 5 },
          shippingLeadTimeDays: 2,
        },
      },
    ],
  },

  // --- SAPATOS (3 Produtos) ---
  {
    id: 'prod-26',
    categoryId: 'cat-7',
    name: 'Scarpin de Salto Fino',
    caption: 'Elegância e poder',
    description: '...',
    images: ['https://picsum.photos/seed/scarpin/800/800'],
    rating: {
      average: 4.8,
      reviewsCount: 2000,
    },
    variationTypes: [],
    skus: [
      {
        id: 'sku-26-scarpin',
        price: 320.0,
        stock: 45,
        attributes: {},
        shippingDetails: {
          weightInGrams: 150,
          dimensionsCm: { width: 5, height: 12, length: 5 },
          shippingLeadTimeDays: 2,
        },
      },
    ],
  },
  {
    id: 'prod-27',
    categoryId: 'cat-7',
    name: 'Tênis Casual Branco',
    caption: 'Conforto e estilo para qualquer ocasião',
    description: '...',
    images: ['https://picsum.photos/seed/sneaker/800/800'],
    rating: {
      average: 4.9,
      reviewsCount: 2000,
    },
    variationTypes: [],
    skus: [
      {
        id: 'sku-27-sneaker',
        price: 280.0,
        stock: 120,
        attributes: {},
        shippingDetails: {
          weightInGrams: 150,
          dimensionsCm: { width: 5, height: 12, length: 5 },
          shippingLeadTimeDays: 2,
        },
      },
    ],
  },
  {
    id: 'prod-28',
    categoryId: 'cat-7',
    name: 'Sandália de Tiras Finas',
    caption: 'Minimalista e chique',
    description: '...',
    images: ['https://picsum.photos/seed/sandal/800/800'],
    rating: {
      average: 4.7,
      reviewsCount: 2000,
    },
    variationTypes: [],
    skus: [
      {
        id: 'sku-28-sandal',
        price: 250.0,
        stock: 80,
        attributes: {},
        shippingDetails: {
          weightInGrams: 150,
          dimensionsCm: { width: 5, height: 12, length: 5 },
          shippingLeadTimeDays: 2,
        },
      },
    ],
  },

  // --- UNHAS (2 Produtos) ---
  {
    id: 'prod-29',
    categoryId: 'cat-8',
    name: 'Esmalte em Gel "Vermelho Paixão"',
    caption: 'Brilho intenso e longa duração',
    description: '...',
    images: ['https://picsum.photos/seed/nailpolish/800/800'],
    rating: {
      average: 4.9,
      reviewsCount: 2000,
    },
    variationTypes: [],
    skus: [
      {
        id: 'sku-29-polish',
        price: 25.0,
        stock: 500,
        attributes: {},
        shippingDetails: {
          weightInGrams: 150,
          dimensionsCm: { width: 5, height: 12, length: 5 },
          shippingLeadTimeDays: 2,
        },
      },
    ],
  },
  {
    id: 'prod-30',
    categoryId: 'cat-8',
    name: 'Kit Manicure Essencial',
    caption: 'Tudo que você precisa para unhas perfeitas',
    description: '...',
    images: ['https://picsum.photos/seed/manicurekit/800/800'],
    rating: {
      average: 4.8,
      reviewsCount: 2000,
    },
    variationTypes: [],
    skus: [
      {
        id: 'sku-30-kit',
        price: 85.0,
        stock: 150,
        attributes: {},
        shippingDetails: {
          weightInGrams: 150,
          dimensionsCm: { width: 5, height: 12, length: 5 },
          shippingLeadTimeDays: 2,
        },
      },
    ],
  },
]
