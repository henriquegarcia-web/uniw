// src/types/support.ts

import { FormattedOption, MaterialCommunityIconsIcon } from './shared'

// --- TIPOS E ENUMS PARA ARTIGOS DA AJUDA ---

export interface IHelpCategory {
  id: string
  name: string
  description: string
  icon: MaterialCommunityIconsIcon
}

export interface IHelpArticle {
  id: string
  categoryId: string
  title: string
  content: string // Conteúdo em Markdown para formatação rica
  tags: string[] // Para a busca
  popularity: number // Para ordenar os mais vistos
}

// --- TIPOS E ENUMS PARA TICKETS DE SUPORTE ---

export enum TicketStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
  CLOSED = 'closed',
}

export enum TicketPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export const getTicketStatusData = (status?: TicketStatus): FormattedOption => {
  switch (status) {
    case TicketStatus.OPEN:
      return { label: 'Aberto', color: '#808080' }
    case TicketStatus.IN_PROGRESS:
      return { label: 'Em Andamento', color: '#808080' }
    case TicketStatus.RESOLVED:
      return { label: 'Resolvido', color: '#808080' }
    case TicketStatus.CLOSED:
      return { label: 'Fechado', color: '#808080' }
    default:
      return { label: 'Desconhecido', color: '#808080' }
  }
}

export interface ISupportTicketMessage {
  id: string
  author: 'user' | 'support'
  content: string
  createdAt: number
}

export interface ISupportTicket {
  id: string
  userId: string
  subject: string
  orderId?: string // Vinculado a um pedido específico, se houver
  status: TicketStatus
  priority: TicketPriority
  createdAt: number
  updatedAt: number
  messages: ISupportTicketMessage[]
}

// --- ESQUEMA DE VALIDAÇÃO PARA FORMULÁRIO DE CONTATO ---

// export const contactSupportSchema = yup.object({
//   subject: yup.string().required('O assunto é obrigatório.'),
//   message: yup
//     .string()
//     .required('A mensagem é obrigatória.')
//     .min(20, 'Sua mensagem deve ter pelo menos 20 caracteres.'),
//   orderId: yup.string().optional(),
// })

// --- DADOS MOCADOS ---

const mockHelpCategories: IHelpCategory[] = [
  {
    id: 'cat-help-1',
    name: 'Pedidos e Entregas',
    description: 'Rastreamento, prazos e problemas',
    icon: 'truck-delivery-outline',
  },
  {
    id: 'cat-help-2',
    name: 'Pagamentos',
    description: 'Cartões, PIX e reembolsos',
    icon: 'credit-card-outline',
  },
  {
    id: 'cat-help-3',
    name: 'Minha Conta',
    description: 'Alterar dados e segurança',
    icon: 'account-cog-outline',
  },
  {
    id: 'cat-help-4',
    name: 'Clube e Fidelidade',
    description: 'Pontos, cupons e benefícios',
    icon: 'crown-outline',
  },
  {
    id: 'cat-help-5',
    name: 'Trocas e Devoluções',
    description: 'Como solicitar e políticas',
    icon: 'swap-horizontal-bold',
  },
]

const mockHelpArticles: IHelpArticle[] = [
  {
    id: 'art-1',
    categoryId: 'cat-help-1',
    title: 'Como rastrear meu pedido?',
    content:
      'Para rastrear seu pedido, acesse "Meus Pedidos", selecione o pedido desejado e clique em "Rastrear Entrega". O código de rastreio e o status atual serão exibidos.',
    tags: ['pedido', 'entrega', 'rastreio'],
    popularity: 100,
  },
  {
    id: 'art-2',
    categoryId: 'cat-help-1',
    title: 'Qual o prazo de entrega?',
    content:
      'O prazo de entrega varia de acordo com sua localidade e o método de envio escolhido. Você pode consultar o prazo estimado na página do produto e no checkout.',
    tags: ['prazo', 'entrega', 'frete'],
    popularity: 85,
  },
  {
    id: 'art-3',
    categoryId: 'cat-help-2',
    title: 'Quais métodos de pagamento são aceitos?',
    content:
      'Aceitamos PIX, boleto bancário e cartões de crédito das principais bandeiras (Visa, Mastercard, Elo).',
    tags: ['pagamento', 'cartão', 'pix'],
    popularity: 90,
  },
  {
    id: 'art-4',
    categoryId: 'cat-help-4',
    title: 'Como funciona o programa de fidelidade?',
    content:
      'A cada compra realizada no app, você acumula pontos que podem ser trocados por cupons de desconto e produtos exclusivos. Consulte a seção "Fidelidade" para mais detalhes.',
    tags: ['pontos', 'fidelidade', 'clube'],
    popularity: 95,
  },
]

const mockSupportTickets: ISupportTicket[] = [
  {
    id: 'ticket-1',
    userId: 'user-123', // ID do usuário logado
    subject: 'Produto veio com defeito',
    orderId: 'order-001',
    status: TicketStatus.IN_PROGRESS,
    priority: TicketPriority.HIGH,
    createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
    messages: [
      {
        id: 'msg-1-1',
        author: 'user',
        content: 'Meu Vestido Midi Floral chegou com um rasgo na costura.',
        createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
      },
      {
        id: 'msg-1-2',
        author: 'support',
        content:
          'Olá! Sentimos muito pelo ocorrido. Poderia nos enviar uma foto do defeito?',
        createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
      },
    ],
  },
  {
    id: 'ticket-2',
    userId: 'user-123',
    subject: 'Dúvida sobre cupom',
    status: TicketStatus.RESOLVED,
    priority: TicketPriority.LOW,
    createdAt: Date.now() - 10 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 8 * 24 * 60 * 60 * 1000,
    messages: [
      {
        id: 'msg-2-1',
        author: 'user',
        content: 'Não consigo aplicar meu cupom de frete grátis.',
        createdAt: Date.now() - 10 * 24 * 60 * 60 * 1000,
      },
      {
        id: 'msg-2-2',
        author: 'support',
        content:
          'Verificamos que o cupom é válido apenas para produtos vendidos e entregues pela UNIW. Isso resolve sua dúvida?',
        createdAt: Date.now() - 9 * 24 * 60 * 60 * 1000,
      },
      {
        id: 'msg-2-3',
        author: 'user',
        content: 'Ah, entendi. Obrigado!',
        createdAt: Date.now() - 8 * 24 * 60 * 60 * 1000,
      },
    ],
  },
]
