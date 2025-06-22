'use client'

// ─── Imports ────────────────────────────────────────────────────────────────

import styles from './forms.module.scss'

import { TextInput, PasswordInput, Button } from '@mantine/core'
import { useForm } from '@mantine/form'

import { useAuth } from '@/contexts/AuthContext'
import { UserRole } from '@uniw/shared-types'

// ─── Componente SignInForm ──────────────────────────────────────────────────

export default function SignInForm() {
  const { login, loading, error } = useAuth()

  const {
    values: formValues,
    onSubmit,
    getInputProps,
  } = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : 'E-mail inválido'),
      password: (value) =>
        value.length >= 6 ? null : 'A senha deve ter no mínimo 6 caracteres',
    },
  })

  const handleLogin = (values: typeof formValues) => {
    login(values.email, values.password, UserRole.ADMINISTRADOR)
  }

  return (
    <form className={styles.form} onSubmit={onSubmit(handleLogin)}>
      <TextInput
        label="E-mail"
        placeholder="Digite seu e-mail"
        withAsterisk
        {...getInputProps('email')}
      />

      <PasswordInput
        label="Senha"
        placeholder="Digite sua senha"
        withAsterisk
        {...getInputProps('password')}
      />

      {error && <p className={styles.form_error}>{error}</p>}

      <Button type="submit" fullWidth loading={loading}>
        Entrar
      </Button>
    </form>
  )
}
