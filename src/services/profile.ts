// src/srvices/profile.ts

import { get, ref, set, update } from 'firebase/database'
import { database } from './firebaseConfig'

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
