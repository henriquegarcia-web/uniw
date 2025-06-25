'use client'

import React, { useState, useEffect } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { addAdminUserSchema } from '@uniw/shared-schemas'
import { IUser, IAdminProfile, UserStatus, getStatusData } from '@uniw/shared-types'
import { useAccessManager } from '@/contexts/AccessManagerContext'
import styles from './AccessControlRolesView.module.scss'

// Importando a biblioteca de componentes customizada
import { TextInput, Button, Checkbox, Table, Avatar, Badge, Drawer } from '@mantine/core'
import { ViewBlock, ViewHeader } from '@/components/layout'

// --- Tipos e Schemas ---
type AddUserFormInputs = { nome: string; email: string; cpf: string }
type EditUserFormInputs = { nome: string; permissoes: IAdminProfile['permissoes'] }

const permissionLabels: Record<keyof IAdminProfile['permissoes'], string> = {
  // ... (mesmo objeto permissionLabels de antes)
  dashboard_view: 'Ver Dashboard',
  adminAccess_view: 'Ver Controle de Acesso',
  adminAccess_manage: 'Gerenciar Admins',
  auditLogs_view: 'Ver Logs de Auditoria',
  platformSettings_view: 'Ver Configurações',
  platformSettings_manage: 'Gerenciar Configurações',
  legalContent_view: 'Ver Termos e Políticas',
  legalContent_manage: 'Gerenciar Termos e Políticas',
  suppliers_moderate: 'Moderar Fornecedores',
  suppliers_view: 'Ver Fornecedores',
  suppliers_manage: 'Gerenciar Fornecedores',
  b2bCatalog_view: 'Ver Catálogo B2B',
  b2bCatalog_manage: 'Gerenciar Catálogo B2B',
  b2bOrders_view: 'Ver Pedidos B2B',
  b2bOrders_manage: 'Gerenciar Pedidos B2B',
  partners_moderate: 'Moderar Parceiros',
  partners_view: 'Ver Parceiros',
  partners_manage: 'Gerenciar Parceiros',
  partners_viewSchedules: 'Ver Agendas',
  partners_manageStaff: 'Gerenciar Equipes',
  b2cCatalog_view: 'Ver Catálogo B2C',
  b2cCatalog_manage: 'Gerenciar Catálogo B2C',
  b2cOrders_view: 'Ver Pedidos B2C',
  b2cOrders_manage: 'Gerenciar Pedidos B2C',
  endUsers_view: 'Ver Clientes Finais',
  endUsers_manage: 'Gerenciar Clientes Finais',
  appContent_manageBanners: 'Gerenciar Banners',
  loyalty_manage: 'Gerenciar Fidelidade',
  club_manage: 'Gerenciar Clube UNIW',
  supportTickets_view: 'Ver Tickets de Suporte',
  supportTickets_manage: 'Gerenciar Tickets de Suporte',
  marketing_sendNotifications: 'Enviar Notificações',
  marketing_managePromotions: 'Gerenciar Promoções',
  marketing_manageRaffles: 'Gerenciar Sorteios',
  finances_viewTransactions: 'Ver Transações',
  finances_manageSubscriptions: 'Gerenciar Assinaturas',
  reports_viewSales: 'Ver Relatórios de Vendas',
  reports_viewUsers: 'Ver Relatórios de Usuários',
}

export default function AccessControlRolesView() {
  const { admins, loading, addUser, updateUserFields, deleteAdmin } = useAccessManager()

  // Estado para controlar o drawer de edição
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)

  // Formulário para ADICIONAR usuário
  const addForm = useForm<AddUserFormInputs>({
    resolver: yupResolver(addAdminUserSchema),
    defaultValues: { nome: '', email: '', cpf: '' },
  })

  // Formulário para EDITAR usuário
  const editForm = useForm<EditUserFormInputs>()

  // Popula o formulário de edição quando um usuário é selecionado
  useEffect(() => {
    if (selectedUser) {
      editForm.reset({
        nome: selectedUser.baseProfile.nome,
        permissoes: selectedUser.adminProfile?.permissoes,
      })
    }
  }, [selectedUser, editForm])

  // --- Handlers ---
  const handleOpenEditDrawer = (user: IUser) => {
    setSelectedUser(user)
    setIsDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
    setSelectedUser(null)
  }

  const onAddUserSubmit: SubmitHandler<AddUserFormInputs> = async (data) => {
    try {
      await addUser(data)
      addForm.reset()
    } catch (error) {
      console.error('Falha ao adicionar administrador:', error)
    }
  }

  const onEditUserSubmit: SubmitHandler<EditUserFormInputs> = async (data) => {
    if (!selectedUser) return
    try {
      await updateUserFields(selectedUser.id, {
        'baseProfile/nome': data.nome,
        'adminProfile/permissoes': data.permissoes,
      })
      handleCloseDrawer() // Fecha o drawer após salvar
    } catch (error) {
      console.error('Falha ao atualizar administrador:', error)
    }
  }

  const handleBlockUser = async () => {
    if (!selectedUser) return
    if (
      window.confirm(
        `Tem certeza que deseja bloquear o usuário "${selectedUser.baseProfile.nome}"?`,
      )
    ) {
      await updateUserFields(selectedUser.id, { status: UserStatus.BLOQUEADO })
      handleCloseDrawer()
    }
  }

  const handleDelete = async (userId: string, userName: string) => {
    if (window.confirm(`Tem certeza que deseja excluir o administrador "${userName}"?`)) {
      await deleteAdmin(userId)
      if (selectedUser?.id === userId) {
        handleCloseDrawer()
      }
    }
  }

  return (
    <div className={styles.accessControlRolesView}>
      <ViewHeader />

      <ViewBlock title="Adicionar Novo Administrador">
        <form onSubmit={addForm.handleSubmit(onAddUserSubmit)} className={styles.form}>
          <Controller
            name="nome"
            control={addForm.control}
            render={({ field }) => (
              <TextInput
                {...field}
                label="Nome Completo"
                placeholder="Nome do usuário"
                error={addForm?.formState?.errors?.nome?.message}
                withAsterisk
                style={{
                  flex: 1,
                }}
              />
            )}
          />
          <Controller
            name="email"
            control={addForm.control}
            render={({ field }) => (
              <TextInput
                {...field}
                label="Email"
                placeholder="email@uniw.com.br"
                error={addForm?.formState?.errors?.email?.message}
                withAsterisk
                style={{
                  flex: 1,
                }}
              />
            )}
          />
          <Controller
            name="cpf"
            control={addForm.control}
            render={({ field }) => (
              <TextInput
                {...field}
                label="CPF"
                placeholder="000.000.000-00"
                error={addForm?.formState?.errors?.cpf?.message}
                withAsterisk
                style={{
                  flex: 1,
                }}
              />
            )}
          />
          <div className={styles.form__button_wrapper}>
            <Button type="submit" loading={loading} fullWidth={false}>
              Adicionar Admin
            </Button>
          </div>
        </form>
      </ViewBlock>

      <ViewBlock title="Administradores">
        {loading ? (
          <p>Carregando administradores...</p>
        ) : (
          <Table withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Foto</Table.Th>
                <Table.Th>Nome</Table.Th>
                <Table.Th>E-mail</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Ações</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {admins.map((admin) => (
                <Table.Tr key={admin.id}>
                  <Table.Td>
                    <Avatar
                      src={admin.baseProfile.foto}
                      alt={admin.baseProfile.nome}
                      radius="xl"
                    >
                      {admin.baseProfile.nome.charAt(0)}
                    </Avatar>
                  </Table.Td>
                  <Table.Td>{admin.baseProfile.nome}</Table.Td>
                  <Table.Td>{admin.baseProfile.email}</Table.Td>
                  <Table.Td>
                    <Badge color={getStatusData(admin.status).color} variant="light">
                      {getStatusData(admin.status).label}
                    </Badge>
                  </Table.Td>
                  <Table.Td className={styles.actionsCell}>
                    <Button
                      variant="light"
                      color="blue"
                      onClick={() => handleOpenEditDrawer(admin)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="light"
                      color="red"
                      onClick={() => handleDelete(admin.id, admin.baseProfile.nome)}
                    >
                      Excluir
                    </Button>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        )}
      </ViewBlock>

      {selectedUser && (
        <Drawer
          opened={isDrawerOpen}
          onClose={handleCloseDrawer}
          title={`Editando: ${selectedUser.baseProfile.nome}`}
          size="xl"
          position="right"
          transitionProps={{
            transition: 'rotate-left',
            duration: 150,
            timingFunction: 'linear',
          }}
        >
          <form
            onSubmit={editForm.handleSubmit(onEditUserSubmit)}
            className={styles.drawerForm}
          >
            {/* Nome Editável */}
            <Controller
              name="nome"
              control={editForm.control}
              render={({ field }) => <TextInput {...field} label="Nome" withAsterisk />}
            />

            {/* Dados não editáveis */}
            <div className={styles.readOnlyData}>
              <p>
                <strong>Email:</strong> {selectedUser.baseProfile.email}
              </p>
              <p>
                <strong>CPF:</strong> {selectedUser.baseProfile.cpf}
              </p>
            </div>

            {/* Permissões */}
            <div className={styles.permissionsGrid}>
              <h4>Permissões</h4>
              {Object.entries(permissionLabels).map(([key, label]) => (
                <Controller
                  key={key}
                  name={`permissoes.${key as keyof IAdminProfile['permissoes']}`}
                  control={editForm.control}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onChange={field.onChange}
                      label={label}
                    />
                  )}
                />
              ))}
            </div>

            {/* Botões de Ação do Drawer */}
            <div className={styles.drawerActions}>
              <Button type="submit" loading={editForm.formState.isSubmitting}>
                Salvar Alterações
              </Button>
              <Button color="yellow" variant="light" onClick={handleBlockUser}>
                Bloquear Usuário
              </Button>
              <Button
                color="red"
                variant="subtle"
                onClick={() =>
                  handleDelete(selectedUser.id, selectedUser.baseProfile.nome)
                }
              >
                Excluir
              </Button>
            </div>
          </form>
        </Drawer>
      )}
    </div>
  )
}
