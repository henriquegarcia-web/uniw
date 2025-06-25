'use client'

import React, { useState, useEffect } from 'react'
import styles from './AccessControlRolesView.module.scss'

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
import { TextInput, Button, Checkbox, Table, Avatar, Badge, Drawer } from '@mantine/core'
import { ViewBlock, ViewHeader } from '@/components/layout'

export default function AccessControlRolesView() {
  const { admins, loading, addUser, updateUserFields, deleteAdmin } = useAccessManager()

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
    try {
      await addUser(data)
      addForm.reset()
    } catch (error) {
      console.error('Falha ao adicionar administrador:', error)
    }
  }

  const onEditUserSubmit: SubmitHandler<EditAdminUserSchemaTypes> = async (data) => {
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

      <Drawer
        opened={isDrawerOpen && !!selectedUser}
        onClose={handleCloseDrawer}
        title={`Editando: ${selectedUser?.baseProfile.nome}`}
        size="md"
        position="right"
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
              <strong>Email:</strong> {selectedUser?.baseProfile.email}
            </p>
            <p>
              <strong>CPF:</strong> {selectedUser?.baseProfile.cpf}
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
                selectedUser &&
                handleDelete(selectedUser.id, selectedUser.baseProfile.nome)
              }
            >
              Excluir
            </Button>
          </div>
        </form>
      </Drawer>
    </div>
  )
}
