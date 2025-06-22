// src/screens/support/ContactSupportScreen.tsx

import React, { useEffect } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { useForm, Controller, FieldValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import type { ContactSupportScreenProps } from '@uniw/shared-types'
import { themeApp as theme, colors } from '@uniw/shared-constants'
import { useHelpCenter } from '@/contexts/HelpCenterProvider'
import { contactSupportSchema } from '@/types/support'
import { InputText } from '@/components/forms/InputText'
import { Button } from '@/components/forms/Button'

const ContactSupportScreen = ({ navigation, route }: ContactSupportScreenProps) => {
  const { orderId } = route.params
  const { submitSupportTicket, isLoading } = useHelpCenter()

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactSupportSchema),
    defaultValues: { subject: '', message: '', orderId: '' },
  })

  useEffect(() => {
    if (orderId) {
      setValue('orderId', orderId)
      setValue('subject', `Dúvida sobre o pedido #${orderId}`)
    }
  }, [orderId, setValue])

  const onSubmit = async (data: FieldValues) => {
    try {
      await submitSupportTicket(
        data as { subject: string; message: string; orderId?: string },
      )
      Alert.alert('Enviado!', 'Sua solicitação foi enviada. Responderemos em breve.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ])
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível enviar sua solicitação. Tente novamente.')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Fale Conosco</Text>
          <Text style={styles.subtitle}>
            Descreva seu problema ou dúvida e nossa equipe responderá o mais rápido
            possível.
          </Text>

          {orderId && (
            <InputText
              label="Pedido Relacionado"
              value={`#${orderId}`}
              editable={false}
            />
          )}

          <Controller
            control={control}
            name="subject"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                label="Assunto"
                placeholder="Ex: Problema com a entrega"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.subject?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="message"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                label="Mensagem"
                placeholder="Descreva sua dúvida ou problema com detalhes..."
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.message?.message}
                multiline
                numberOfLines={5}
                style={{ height: 120, textAlignVertical: 'top' }}
              />
            )}
          />

          <Button
            title="Enviar Solicitação"
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
            style={{ marginTop: theme.spacing.md }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.ui.surface },
  contentContainer: { padding: theme.spacing.lg, gap: theme.spacing.md },
  title: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.xl,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontFamily: theme.fonts.family.regular,
    color: colors.text.secondary,
    marginBottom: theme.spacing.md,
  },
})

export default ContactSupportScreen
