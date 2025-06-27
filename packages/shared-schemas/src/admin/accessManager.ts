import * as yup from 'yup'

import { isValidCpf, isValidEmail } from '@uniw/shared-utils'

// ==========================================

export const addAdminUserSchema = yup.object().shape({
  nome: yup.string().required('O nome é obrigatório.'),
  email: yup
    .string()
    .email('Digite um e-mail válido.')
    .required('O e-mail é obrigatório.')
    .test('is-email-valid', 'Digite um e-mail válido.', (value) => {
      if (!value) return true
      return isValidEmail(value)
    }),
  cpf: yup
    .string()
    .required('O CPF é obrigatório.')
    .test('is-cpf-valid', 'Digite um CPF válido.', (value) => {
      if (!value) return true
      return isValidCpf(value)
    }),
})

export type AddAdminUserSchemaType = yup.InferType<typeof addAdminUserSchema>

export const addAdminUserSchemaDefaultValues = {
  nome: '',
  email: '',
  cpf: '',
}

// ==========================================

export const adminPermissionsSchema = yup.object().shape({
  dashboard_view: yup.boolean().required(),
  adminAccess_view: yup.boolean().required(),
  adminAccess_manage: yup.boolean().required(),
  auditLogs_view: yup.boolean().required(),
  platformSettings_view: yup.boolean().required(),
  platformSettings_manage: yup.boolean().required(),
  legalContent_view: yup.boolean().required(),
  legalContent_manage: yup.boolean().required(),
  suppliers_moderate: yup.boolean().required(),
  suppliers_view: yup.boolean().required(),
  suppliers_manage: yup.boolean().required(),
  b2bCatalog_view: yup.boolean().required(),
  b2bCatalog_manage: yup.boolean().required(),
  b2bOrders_view: yup.boolean().required(),
  b2bOrders_manage: yup.boolean().required(),
  partners_moderate: yup.boolean().required(),
  partners_view: yup.boolean().required(),
  partners_manage: yup.boolean().required(),
  partners_viewSchedules: yup.boolean().required(),
  partners_manageStaff: yup.boolean().required(),
  b2cCatalog_view: yup.boolean().required(),
  b2cCatalog_manage: yup.boolean().required(),
  b2cOrders_view: yup.boolean().required(),
  b2cOrders_manage: yup.boolean().required(),
  endUsers_view: yup.boolean().required(),
  endUsers_manage: yup.boolean().required(),
  appContent_manageBanners: yup.boolean().required(),
  loyalty_manage: yup.boolean().required(),
  club_manage: yup.boolean().required(),
  supportTickets_view: yup.boolean().required(),
  supportTickets_manage: yup.boolean().required(),
  marketing_sendNotifications: yup.boolean().required(),
  marketing_managePromotions: yup.boolean().required(),
  marketing_manageRaffles: yup.boolean().required(),
  finances_viewTransactions: yup.boolean().required(),
  finances_manageSubscriptions: yup.boolean().required(),
  reports_viewSales: yup.boolean().required(),
  reports_viewUsers: yup.boolean().required(),
  super_admin: yup.boolean().required(),
})

// ==========================================

export const editAdminUserSchema = yup.object().shape({
  nome: yup.string().required('O nome é obrigatório.'),
  permissoes: adminPermissionsSchema,
})

export type EditAdminUserSchemaTypes = yup.InferType<typeof editAdminUserSchema>

// ==========================================
