import {
  ref,
  query,
  onValue,
  orderByChild,
  equalTo,
  push,
  update,
  remove,
  Unsubscribe,
} from 'firebase/database'
import { IUser, UserRole, UserStatus } from '@uniw/shared-types'
import { getFirebaseDb } from '../firebase'
import { isCpfInUse, isEmailInUse } from '../auth'

const USERS_COLLECTION = 'users'

export const adminAccessManagerService = {
  listenToAdminUsers(callback: (users: IUser[]) => void): Unsubscribe {
    const database = getFirebaseDb()
    const usersRef = ref(database, USERS_COLLECTION)
    const usersQuery = query(
      usersRef,
      orderByChild('role'),
      equalTo(UserRole.ADMINISTRADOR),
    )

    return onValue(usersQuery, (snapshot) => {
      if (snapshot.exists()) {
        const usersObject = snapshot.val()
        const admins = Object.keys(usersObject).map((key) => ({
          id: key,
          ...usersObject[key],
        }))
        callback(admins)
      } else {
        callback([])
      }
    })
  },

  async addAdminUser(userData: {
    nome: string
    email: string
    cpf: string
  }): Promise<void> {
    try {
      const database = getFirebaseDb()

      const isEmailTaken = await isEmailInUse(userData.email)
      const isCpfTaken = await isCpfInUse(userData.cpf)

      if (isEmailTaken) {
        throw new Error('O e-mail digitado já está em uso.')
      }

      if (isCpfTaken) {
        throw new Error('O CPF digitado já está em uso.')
      }

      const usersRef = ref(database, USERS_COLLECTION)
      const now = Date.now()

      const newUser: Omit<IUser, 'id'> = {
        role: UserRole.ADMINISTRADOR,
        status: UserStatus.PENDENTE,
        baseProfile: {
          nome: userData.nome,
          email: userData.email,
          cpf: userData.cpf.replace(/\D/g, ''),
          foto: null,
          telefone: null,
          dataNascimento: null,
          verificacoes: {
            identidade: false,
            telefone: false,
          },
          authProviders: [],
        },
        clientProfile: null,
        partnerProfile: null,
        providerProfile: null,
        adminProfile: {
          permissoes: {
            super_admin: false,
            dashboard_view: true,
            adminAccess_view: false,
            adminAccess_manage: false,
            auditLogs_view: false,
            platformSettings_view: false,
            platformSettings_manage: false,
            legalContent_view: true,
            legalContent_manage: false,
            suppliers_moderate: false,
            suppliers_view: true,
            suppliers_manage: false,
            b2bCatalog_view: true,
            b2bCatalog_manage: false,
            b2bOrders_view: true,
            b2bOrders_manage: false,
            partners_moderate: false,
            partners_view: true,
            partners_manage: false,
            partners_viewSchedules: true,
            partners_manageStaff: false,
            b2cCatalog_view: true,
            b2cCatalog_manage: false,
            b2cOrders_view: true,
            b2cOrders_manage: false,
            endUsers_view: true,
            endUsers_manage: false,
            appContent_manageBanners: false,
            loyalty_manage: false,
            club_manage: false,
            supportTickets_view: true,
            supportTickets_manage: false,
            marketing_sendNotifications: false,
            marketing_managePromotions: false,
            marketing_manageRaffles: false,
            finances_viewTransactions: false,
            finances_manageSubscriptions: false,
            reports_viewSales: false,
            reports_viewUsers: false,
          },
        },
        createdAt: now,
        updatedAt: now,
      }
      await push(usersRef, newUser)
    } catch (error: any) {
      throw new Error(error.message)
    }
  },

  async updateUserFields(
    userId: string,
    updates: Partial<{ [K in keyof IUser | string]: any }>,
  ): Promise<void> {
    const database = getFirebaseDb()
    const userRef = ref(database, `${USERS_COLLECTION}/${userId}`)
    const now = Date.now()

    const dataToUpdate = {
      ...updates,
      updatedAt: now,
    }
    await update(userRef, dataToUpdate)
  },

  async deleteUser(userId: string): Promise<void> {
    const database = getFirebaseDb()
    const userRef = ref(database, `${USERS_COLLECTION}/${userId}`)
    await remove(userRef)
  },
}
