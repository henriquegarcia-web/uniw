// src/srvices/profile.ts

import { get, ref, set, update } from 'firebase/database'
import { database } from './firebaseConfig'
import { ICreditCard, INotificationSettings } from '@/types/auth'

// ────────────── FAVORITOS

export async function addFavoriteProduct(
  userId: string,
  productId: string,
): Promise<void> {
  try {
    const favoritesRef = ref(database, `/users/${userId}/clienteProfile/favoritos`)
    const snapshot = await get(favoritesRef)
    const currentFavorites: string[] = snapshot.val() || []

    if (!currentFavorites.includes(productId)) {
      const newFavorites = [...currentFavorites, productId]
      await set(favoritesRef, newFavorites)

      await update(ref(database, `/users/${userId}`), { updatedAt: Date.now() })
    }
  } catch (error: any) {
    console.error('Erro ao adicionar favorito:', error.message)
    throw new Error('Não foi possível adicionar o produto aos favoritos.')
  }
}

export async function removeFavoriteProduct(
  userId: string,
  productId: string,
): Promise<void> {
  try {
    const favoritesRef = ref(database, `/users/${userId}/clienteProfile/favoritos`)
    const snapshot = await get(favoritesRef)
    const currentFavorites: string[] = snapshot.val() || []

    const newFavorites = currentFavorites.filter((id) => id !== productId)

    await set(favoritesRef, newFavorites)

    await update(ref(database, `/users/${userId}`), { updatedAt: Date.now() })
  } catch (error: any) {
    console.error('Erro ao remover favorito:', error.message)
    throw new Error('Não foi possível remover o produto dos favoritos.')
  }
}

// ────────────── NOTIFICAÇÕES

export async function updateNotificationSettings(
  userId: string,
  settings: INotificationSettings,
): Promise<void> {
  try {
    const settingsRef = ref(
      database,
      `/users/${userId}/clienteProfile/notificationSettings`,
    )
    await set(settingsRef, settings)

    // Atualiza também o timestamp geral do perfil
    const updatedAtRef = ref(database, `/users/${userId}/updatedAt`)
    await set(updatedAtRef, Date.now())
  } catch (error: any) {
    console.error('Erro ao atualizar configurações de notificação:', error.message)
    throw new Error('Não foi possível salvar suas preferências.')
  }
}

// ────────────── MEIOS DE PAGAMENTO

export async function addCreditCard(
  userId: string,
  cardData: Omit<ICreditCard, 'id' | 'token'>,
): Promise<void> {
  try {
    const cardsRef = ref(database, `/users/${userId}/clienteProfile/cartoesSalvos`)
    const snapshot = await get(cardsRef)
    const currentCards: ICreditCard[] = snapshot.val() || []

    // Se este for o primeiro cartão, defina-o como padrão
    const isFirstCard = currentCards.length === 0
    const newCard: ICreditCard = {
      id: Date.now().toString(36), // Gera um ID único para o cartão
      token: Date.now().toString(36), // Token gerado pelo checkout
      ...cardData,
      isDefault: isFirstCard,
    }

    // Se já existem outros cartões e este novo é o padrão, desmarque os outros
    if (newCard.isDefault && !isFirstCard) {
      currentCards.forEach((card) => (card.isDefault = false))
    }

    const newCardsList = [...currentCards, newCard]
    await set(cardsRef, newCardsList)
    await update(ref(database, `/users/${userId}`), { updatedAt: Date.now() })
  } catch (error: any) {
    console.error('Erro ao adicionar cartão:', error.message)
    throw new Error('Não foi possível salvar o novo cartão.')
  }
}

export async function removeCreditCard(userId: string, cardId: string): Promise<void> {
  try {
    const cardsRef = ref(database, `/users/${userId}/clienteProfile/cartoesSalvos`)
    const snapshot = await get(cardsRef)
    const currentCards: ICreditCard[] = snapshot.val() || []

    const newCardsList = currentCards.filter((card) => card.id !== cardId)

    // Se o cartão removido era o padrão, define o primeiro da lista como novo padrão (se houver)
    const removedCard = currentCards.find((c) => c.id === cardId)
    if (removedCard?.isDefault && newCardsList.length > 0) {
      newCardsList[0].isDefault = true
    }

    await set(cardsRef, newCardsList)
    await update(ref(database, `/users/${userId}`), { updatedAt: Date.now() })
  } catch (error: any) {
    console.error('Erro ao remover cartão:', error.message)
    throw new Error('Não foi possível remover o cartão.')
  }
}

export async function setDefaultCreditCard(
  userId: string,
  cardId: string,
): Promise<void> {
  try {
    const cardsRef = ref(database, `/users/${userId}/clienteProfile/cartoesSalvos`)
    const snapshot = await get(cardsRef)
    const currentCards: ICreditCard[] = snapshot.val() || []

    // Desmarca todos os outros cartões e marca o selecionado como padrão
    const newCardsList = currentCards.map((card) => ({
      ...card,
      isDefault: card.id === cardId,
    }))

    await set(cardsRef, newCardsList)
    await update(ref(database, `/users/${userId}`), { updatedAt: Date.now() })
  } catch (error: any) {
    console.error('Erro ao definir cartão padrão:', error.message)
    throw new Error('Não foi possível definir o cartão como padrão.')
  }
}
