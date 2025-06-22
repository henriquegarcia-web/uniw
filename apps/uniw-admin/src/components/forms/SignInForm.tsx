'use client'

// ─── Imports ────────────────────────────────────────────────────────────────

import styles from './forms.module.scss'

import { TextInput, PasswordInput, Button } from '@mantine/core'
import { yupResolver } from '@hookform/resolvers/yup'

import { useAuth } from '@/contexts/AuthContext'
import { useForm, Controller } from 'react-hook-form'
import { signInSchema, SignInSchemaType } from '@uniw/shared-schemas'

// ─── Componente SignInForm ──────────────────────────────────────────────────

export default function SignInForm() {
  const { login, isAuthLoading, authError } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInSchemaType>({
    resolver: yupResolver(signInSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleLogin = (data: SignInSchemaType) => {
    login({ email: data.email, password: data.password })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleLogin)}>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            label="E-mail"
            placeholder="Digite seu e-mail"
            withAsterisk
            error={errors.email?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <PasswordInput
            {...field}
            label="Senha"
            placeholder="Digite sua senha"
            withAsterisk
            error={errors.password?.message}
          />
        )}
      />

      {authError && <p className={styles.form_error}>{authError}</p>}

      <Button type="submit" fullWidth loading={isAuthLoading || isSubmitting}>
        Entrar
      </Button>
    </form>
  )
}
