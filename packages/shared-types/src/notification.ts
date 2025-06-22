// ─── NOTIFICATION SETTIONS TYPES ────────────────────────────────────────────

import { AppStackParamList } from './navigation'
import { MaterialCommunityIconsIcon } from './shared'

export interface INotificationChannelSettings {
  push: boolean
  email: boolean
  whatsapp: boolean
}

export interface INotificationSettings {
  promotions: INotificationChannelSettings
  orderUpdates: INotificationChannelSettings
  announcements: INotificationChannelSettings
}

// ─── NOTIFICATION TYPES ─────────────────────────────────────────────────────

export enum NotificationType {
  ORDER_UPDATE = 'order_update',
  PROMOTION = 'promotion',
  ANNOUNCEMENT = 'announcement',
  REWARD = 'reward',
}

export interface INotificationTypeData {
  icon: MaterialCommunityIconsIcon
  color: string
}

export const getNotificationTypeData = (
  type: NotificationType,
): INotificationTypeData => {
  switch (type) {
    case NotificationType.ORDER_UPDATE:
      return { icon: 'package-variant-closed', color: '#eb9526' }
    case NotificationType.PROMOTION:
      return { icon: 'tag-outline', color: '#edd12d' }
    case NotificationType.REWARD:
      return { icon: 'gift-outline', color: '#eb9526' }
    case NotificationType.ANNOUNCEMENT:
    default:
      return { icon: 'rocket-launch-outline', color: '#eb9526' }
  }
}

type AppStackNavigationAction = {
  [K in keyof AppStackParamList]: {
    screen: K
    params: AppStackParamList[K]
  }
}[keyof AppStackParamList]

export interface INotification {
  id: string
  type: NotificationType
  title: string
  body: string
  content: string
  createdAt: number
  isRead: boolean
  link?: AppStackNavigationAction
}

// ─── NOTIFICATION MOCK ──────────────────────────────────────────────────────

const mockNotifications: INotification[] = [
  {
    id: 'notif-001',
    type: NotificationType.ORDER_UPDATE,
    title: 'Seu pedido foi enviado!',
    body: 'Boas notícias! O seu pedido #1001-2025 já está a caminho.',
    content:
      'Seu pedido contendo o **Vestido Midi Floral** e **Batom Hidratante** foi despachado e deve chegar em breve. Use o código de rastreio BR123456789BR para acompanhar a entrega.',
    createdAt: Date.now() - 2 * 60 * 60 * 1000,
    isRead: false,
    link: {
      screen: 'MainTabs',
      params: { screen: 'ProfileStack', params: { screen: 'OrderHistory' } },
    },
  },
  {
    id: 'notif-002',
    type: NotificationType.PROMOTION,
    title: 'Oferta Relâmpago em Skincare!',
    body: 'Só hoje: 20% de desconto em todos os sérums. Não perca!',
    content:
      'Aproveite o dia para cuidar da sua pele! Todos os sérums da nossa coleção estão com **20% de desconto** usando o cupom **SKINCARE20**. A promoção é válida apenas hoje.',
    createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
    isRead: false,
  },
  {
    id: 'notif-003',
    type: NotificationType.REWARD,
    title: 'Você ganhou 100 pontos!',
    body: 'Parabéns pela sua compra! Adicionamos 100 pontos de fidelidade à sua conta.',
    content:
      'Obrigado por comprar conosco! Como recompensa, você recebeu **100 pontos** no nosso programa de fidelidade. Continue comprando para desbloquear cupons e prêmios incríveis!',
    createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
    isRead: true,
    link: {
      screen: 'MainTabs',
      params: { screen: 'ProfileStack', params: { screen: 'LoyaltyProgram' } },
    },
  },
  {
    id: 'notif-004',
    type: NotificationType.ANNOUNCEMENT,
    title: 'Nova coleção de Verão',
    body: 'Confira as peças que acabaram de chegar para a nova estação.',
    content:
      'O verão chegou na UNIW! Explore nossa nova coleção com vestidos, bolsas e acessórios que são a cara da estação. Toque para ver mais.',
    createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
    isRead: true,
    link: {
      screen: 'MainTabs',
      params: {
        screen: 'CategoryStack',
        params: { screen: 'CategoryDetails', params: { categoryId: 'cat-5' } },
      },
    },
  },
]
