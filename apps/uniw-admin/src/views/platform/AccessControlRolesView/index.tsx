import React, { useState, useEffect } from 'react'
import * as S from './styles'

import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import {
  addAdminUserSchema,
  addAdminUserSchemaDefaultValues,
  AddAdminUserSchemaType,
  EditAdminUserSchemaTypes,
} from '@uniw/shared-schemas'
import {
  IUser,
  IAdminProfile,
  UserStatus,
  getStatusData,
  permissionLabels,
} from '@uniw/shared-types'
import { useAccessManager } from '@/contexts/AccessManagerContext'

// Importando a biblioteca de componentes customizada
import { TextInput, Button, Checkbox, Table, Avatar, Badge } from '@mantine/core'
import { FormHeader, ViewBlock, ViewHeader } from '@/components/layout'
import { Drawer } from '@/components/shared'
import { useConfirmationModal } from '@/contexts/ConfirmationModalContext'
import { useAuth } from '@/contexts/AuthContext'
import { applyMask } from '@uniw/shared-utils'

export default function AccessControlRolesView() {
  const { openModal } = useConfirmationModal()
  const { admins, loading, addUser, updateUserFields, deleteAdmin } = useAccessManager()
  const { user } = useAuth()

  // Estado para controlar o drawer de edição
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)

  // Formulário para ADICIONAR usuário
  const addForm = useForm<AddAdminUserSchemaType>({
    resolver: yupResolver(addAdminUserSchema),
    defaultValues: addAdminUserSchemaDefaultValues,
  })

  // Formulário para EDITAR usuário
  const editForm = useForm<EditAdminUserSchemaTypes>()

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

  const onAddUserSubmit: SubmitHandler<AddAdminUserSchemaType> = async (data) => {
    const response = await addUser(data)

    if (response) {
      addForm.reset()
    }
  }

  const onEditUserSubmit: SubmitHandler<EditAdminUserSchemaTypes> = async (data) => {
    if (!selectedUser) return

    await updateUserFields(selectedUser.id, {
      'baseProfile/nome': data.nome,
      'adminProfile/permissoes': data.permissoes,
    })
    handleCloseDrawer()
  }

  const handleBlockUser = () => {
    if (!selectedUser) return

    const blockUser = async () => {
      await updateUserFields(selectedUser.id, { status: UserStatus.BLOQUEADO })
      handleCloseDrawer()
    }

    openModal({
      type: 'negative',
      title: 'Bloquear Administrador',
      message: `Tem certeza que deseja bloquear o usuário "${selectedUser.baseProfile.nome}"?`,
      onConfirm: blockUser,
    })
  }

  const handleDeleteUser = (userId: string, userName: string) => {
    const deleteUser = async () => {
      await deleteAdmin(userId)
      if (selectedUser?.id === userId) {
        handleCloseDrawer()
      }
    }

    openModal({
      type: 'negative',
      title: 'Deletar Administrador',
      message: `Tem certeza que deseja excluir o administrador "${userName}"?`,
      onConfirm: deleteUser,
    })
  }

  return (
    <S.AccessControlRolesView>
      <ViewHeader />

      <ViewBlock title="Adicionar Novo Administrador">
        <S.FormWrapper onSubmit={addForm.handleSubmit(onAddUserSubmit)}>
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
                style={{ flex: 1 }}
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
                style={{ flex: 1 }}
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
                onChange={(value) => field.onChange(applyMask(value.target.value, 'cpf'))}
                error={addForm?.formState?.errors?.cpf?.message}
                withAsterisk
                style={{ flex: 1 }}
              />
            )}
          />
          <S.FormFooter>
            <Button type="submit" loading={loading} fullWidth={false}>
              Adicionar Admin
            </Button>
          </S.FormFooter>
        </S.FormWrapper>
      </ViewBlock>

      <ViewBlock title="Administradores">
        {loading ? (
          <p>Carregando administradores...</p>
        ) : (
          <S.AdminListTable withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Foto</Table.Th>
                <Table.Th>Nome</Table.Th>
                <Table.Th>E-mail</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Super Admin</Table.Th>
                <Table.Th>Ações</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {admins.map((admin) => {
                const isLoggedUser = admin.id === user?.id
                const isSuperAdminUser = admin.adminProfile?.permissoes.super_admin

                return (
                  <S.AdminListTableTr key={admin.id} disabled={isLoggedUser ? 1 : 0}>
                    <Table.Td>
                      <Avatar
                        src={admin.baseProfile.foto}
                        alt={admin.baseProfile.nome}
                        radius="xl"
                      >
                        {admin.baseProfile.nome.charAt(0)}
                      </Avatar>
                    </Table.Td>
                    <Table.Td>
                      {admin.baseProfile.nome} {isLoggedUser && ' (Você)'}
                    </Table.Td>
                    <Table.Td>{admin.baseProfile.email}</Table.Td>
                    <Table.Td>
                      <Badge color={getStatusData(admin.status).color} variant="light">
                        {getStatusData(admin.status).label}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      {isSuperAdminUser ? (
                        <Badge color="grape" variant="light">
                          Sim
                        </Badge>
                      ) : (
                        <Badge color="gray" variant="light">
                          Não
                        </Badge>
                      )}
                    </Table.Td>
                    <S.ActionsCell>
                      <Button
                        variant="light"
                        color="blue"
                        onClick={() => handleOpenEditDrawer(admin)}
                        disabled={isSuperAdminUser && !isLoggedUser}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="light"
                        color="red"
                        onClick={() => handleDeleteUser(admin.id, admin.baseProfile.nome)}
                        disabled={isLoggedUser || isSuperAdminUser}
                      >
                        Excluir
                      </Button>
                    </S.ActionsCell>
                  </S.AdminListTableTr>
                )
              })}
            </Table.Tbody>
          </S.AdminListTable>
        )}
      </ViewBlock>

      <Drawer
        opened={isDrawerOpen && !!selectedUser}
        onClose={handleCloseDrawer}
        title={`Editando: ${selectedUser?.baseProfile.nome}`}
        size="md"
      >
        <S.EditAdminForm onSubmit={editForm.handleSubmit(onEditUserSubmit)}>
          <S.ReadOnlyData>
            <p>
              <b>Email:</b> {selectedUser?.baseProfile.email}
            </p>
            <p>
              <b>CPF:</b> {selectedUser?.baseProfile.cpf}
            </p>
          </S.ReadOnlyData>

          <S.EditAdminFormWrapper>
            <FormHeader title="Perfil" />
            <Controller
              name="nome"
              control={editForm.control}
              render={({ field }) => <TextInput {...field} label="Nome" withAsterisk />}
            />
          </S.EditAdminFormWrapper>

          <S.EditAdminFormWrapper>
            <FormHeader title="Permissões" />
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
          </S.EditAdminFormWrapper>

          <S.DrawerActions>
            <Button
              type="submit"
              disabled={!editForm.formState.isDirty}
              loading={editForm.formState.isSubmitting}
            >
              Salvar Alterações
            </Button>
            <Button color="yellow" variant="light" onClick={handleBlockUser}>
              Bloquear Usuário
            </Button>
            <Button
              color="red"
              variant="subtle"
              onClick={() =>
                selectedUser &&
                handleDeleteUser(selectedUser.id, selectedUser.baseProfile.nome)
              }
            >
              Excluir
            </Button>
          </S.DrawerActions>
        </S.EditAdminForm>
      </Drawer>
    </S.AccessControlRolesView>
  )
}
