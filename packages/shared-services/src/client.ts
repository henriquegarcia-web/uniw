// src/srvices/profile.ts

import { get, ref, set, update } from 'firebase/database'
import { IAddress, ICreditCard, INotificationSettings } from '@uniw/shared-types'
import { getFirebaseDb } from './firebase'

// ────────────── FAVORITOS

export async function addFavoriteProduct(
  userId: string,
  productId: string,
): Promise<void> {
  try {
    const database = getFirebaseDb()

    const favoritesRef = ref(database, `/users/${userId}/clientProfile/favoritos`)
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
    const database = getFirebaseDb()

    const favoritesRef = ref(database, `/users/${userId}/clientProfile/favoritos`)
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
    const database = getFirebaseDb()

    const settingsRef = ref(
      database,
      `/users/${userId}/clientProfile/notificationSettings`,
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
    const database = getFirebaseDb()

    const cardsRef = ref(database, `/users/${userId}/clientProfile/cartoesSalvos`)
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
    const database = getFirebaseDb()

    const cardsRef = ref(database, `/users/${userId}/clientProfile/cartoesSalvos`)
    const snapshot = await get(cardsRef)
    const currentCards: ICreditCard[] = snapshot.val() || []

    const newCardsList = currentCards.filter((card) => card.id !== cardId)

    // Se o cartão removido era o padrão, define o primeiro da lista como novo padrão (se houver)
    const removedCard = currentCards.find((c) => c.id === cardId)
    if (removedCard?.isDefault && !!newCardsList[0] && newCardsList.length > 0) {
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
    const database = getFirebaseDb()

    const cardsRef = ref(database, `/users/${userId}/clientProfile/cartoesSalvos`)
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

// ────────────── ENDEREÇOS

export async function addAddress(
  userId: string,
  addressData: Omit<IAddress, 'id'>,
): Promise<void> {
  try {
    const database = getFirebaseDb()

    const addressesRef = ref(database, `/users/${userId}/clientProfile/enderecosSalvos`)
    const snapshot = await get(addressesRef)
    const currentAddresses: IAddress[] = snapshot.val() || []

    const isFirstAddress = currentAddresses.length === 0
    const newAddress: IAddress = {
      id: Date.now().toString(36), // Gera um ID único
      ...addressData,
      isDefault: addressData.isDefault || isFirstAddress,
    }

    if (newAddress.isDefault && !isFirstAddress) {
      currentAddresses.forEach((address) => (address.isDefault = false))
    }

    const newAddressesList = [...currentAddresses, newAddress]
    await set(addressesRef, newAddressesList)
    await update(ref(database, `/users/${userId}`), { updatedAt: Date.now() })
  } catch (error: any) {
    console.error('Erro ao adicionar endereço:', error.message)
    throw new Error('Não foi possível salvar o novo endereço.')
  }
}

export async function removeAddress(userId: string, addressId: string): Promise<void> {
  try {
    const database = getFirebaseDb()

    const addressesRef = ref(database, `/users/${userId}/clientProfile/enderecosSalvos`)
    const snapshot = await get(addressesRef)
    const currentAddresses: IAddress[] = snapshot.val() || []

    const newAddressesList = currentAddresses.filter(
      (address) => address.id !== addressId,
    )

    const removedAddress = currentAddresses.find((a) => a.id === addressId)
    if (
      removedAddress?.isDefault &&
      !!newAddressesList[0] &&
      newAddressesList.length > 0
    ) {
      newAddressesList[0].isDefault = true
    }

    await set(addressesRef, newAddressesList)
    await update(ref(database, `/users/${userId}`), { updatedAt: Date.now() })
  } catch (error: any) {
    console.error('Erro ao remover endereço:', error.message)
    throw new Error('Não foi possível remover o endereço.')
  }
}

export async function setDefaultAddress(
  userId: string,
  addressId: string,
): Promise<void> {
  try {
    const database = getFirebaseDb()

    const addressesRef = ref(database, `/users/${userId}/clientProfile/enderecosSalvos`)
    const snapshot = await get(addressesRef)
    const currentAddresses: IAddress[] = snapshot.val() || []

    const newAddressesList = currentAddresses.map((address) => ({
      ...address,
      isDefault: address.id === addressId,
    }))

    await set(addressesRef, newAddressesList)
    await update(ref(database, `/users/${userId}`), { updatedAt: Date.now() })
  } catch (error: any) {
    console.error('Erro ao definir endereço padrão:', error.message)
    throw new Error('Não foi possível definir o endereço como padrão.')
  }
}
