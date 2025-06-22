// src/services/support.ts

import { ref, set, get, update, push, child } from 'firebase/database'
import { database } from './firebaseConfig'
import {
  ISupportTicket,
  ISupportTicketMessage,
  TicketStatus,
  TicketPriority,
} from '@/types/support'

const ticketsRef = ref(database, 'supportTickets')

export async function createSupportTicket(
  userId: string,
  data: { subject: string; message: string; orderId?: string },
): Promise<string> {
  try {
    const newTicketRef = push(ticketsRef) // Gera um ID único
    const ticketId = newTicketRef.key

    if (!ticketId) {
      throw new Error('Não foi possível gerar um ID para o ticket.')
    }

    const now = Date.now()
    const firstMessage: ISupportTicketMessage = {
      id: push(child(newTicketRef, 'messages')).key!,
      author: 'user',
      content: data.message,
      createdAt: now,
    }

    const newTicket: ISupportTicket = {
      id: ticketId,
      userId,
      subject: data.subject,
      orderId: data.orderId,
      status: TicketStatus.OPEN,
      priority: TicketPriority.MEDIUM,
      createdAt: now,
      updatedAt: now,
      messages: [firstMessage],
    }

    await set(newTicketRef, newTicket)

    // Opcional: Manter uma referência de tickets no perfil do usuário
    const userTicketsRef = ref(
      database,
      `users/${userId}/clienteProfile/supportTickets/${ticketId}`,
    )
    await set(userTicketsRef, true)

    return ticketId
  } catch (error: any) {
    console.error('Erro ao criar ticket de suporte:', error.message)
    throw new Error('Não foi possível enviar sua solicitação.')
  }
}

export async function addMessageToTicket(
  ticketId: string,
  messageContent: string,
  author: 'user' | 'support' = 'user',
): Promise<void> {
  try {
    const ticketMessagesRef = ref(database, `supportTickets/${ticketId}/messages`)
    const newMessageRef = push(ticketMessagesRef)
    const messageId = newMessageRef.key
    const now = Date.now()

    const newMessage: ISupportTicketMessage = {
      id: messageId!,
      author,
      content: messageContent,
      createdAt: now,
    }

    await set(newMessageRef, newMessage)

    // Atualiza o timestamp e o status do ticket
    const ticketRef = ref(database, `supportTickets/${ticketId}`)
    await update(ticketRef, {
      updatedAt: now,
      status: author === 'support' ? TicketStatus.IN_PROGRESS : TicketStatus.OPEN,
    })
  } catch (error: any) {
    console.error('Erro ao adicionar mensagem ao ticket:', error.message)
    throw new Error('Não foi possível enviar sua mensagem.')
  }
}

export async function fetchUserTickets(userId: string): Promise<ISupportTicket[]> {
  try {
    const userTicketsSnapshot = await get(
      ref(database, `users/${userId}/clienteProfile/supportTickets`),
    )
    if (!userTicketsSnapshot.exists()) return []

    const ticketIds = Object.keys(userTicketsSnapshot.val())
    const ticketPromises = ticketIds.map((id) =>
      get(ref(database, `supportTickets/${id}`)),
    )
    const ticketSnapshots = await Promise.all(ticketPromises)

    return ticketSnapshots.map((snap) => snap.val() as ISupportTicket).filter(Boolean)
  } catch (error: any) {
    console.error('Erro ao buscar tickets do usuário:', error.message)
    throw new Error('Não foi possível carregar o histórico de chamados.')
  }
}
