// src/screens/profile/AddNewCardScreen.tsx

import React from 'react'
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
import { useForm, Controller, type FieldValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import type { AddNewCardScreenProps } from '@/navigation/types'
import { theme } from '@/styles/theme'
import { useClientProfile } from '@/contexts/ClientProfileProvider'
import { addCardSchema, CardBrand, ICreditCard } from '@/types/auth'
import { applyMask } from '@/utils/masks'

import { InputText } from '@/components/forms/InputText'
import { Switch } from '@/components/forms/Switch'
import { Button } from '@/components/forms/Button'

// Subcomponente para o preview do cartão
const CardPreview = ({
  number,
  name,
  expiry,
}: {
  number: string
  name: string
  expiry: string
}) => (
  <View style={styles.cardPreview}>
    <View style={styles.cardChipContainer}>
      <MaterialCommunityIcons name="integrated-circuit-chip" size={40} color="#FFD700" />
    </View>
    <Text style={styles.cardNumberPreview}>{number || '•••• •••• •••• ••••'}</Text>
    <View style={styles.cardDetailsPreview}>
      <View>
        <Text style={styles.cardLabelPreview}>Titular</Text>
        <Text style={styles.cardValuePreview}>{name || 'NOME COMPLETO'}</Text>
      </View>
      <View>
        <Text style={styles.cardLabelPreview}>Validade</Text>
        <Text style={styles.cardValuePreview}>{expiry || 'MM/AA'}</Text>
      </View>
    </View>
  </View>
)

const AddNewCardScreen = ({ navigation }: AddNewCardScreenProps) => {
  const { addCreditCard, isProfileLoading } = useClientProfile()

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(addCardSchema),
    defaultValues: {
      cardNumber: '',
      cardHolderName: '',
      expiryDate: '',
      isDefault: false,
    },
  })

  // Assiste às mudanças nos campos para atualizar o preview em tempo real
  const [cardNumber, cardHolderName, expiryDate] = watch([
    'cardNumber',
    'cardHolderName',
    'expiryDate',
  ])

  // Função para detectar a bandeira do cartão (simplificada)
  const detectCardBrand = (number: string): CardBrand => {
    if (number.startsWith('4')) return CardBrand.VISA
    if (number.startsWith('5')) return CardBrand.MASTERCARD
    if (number.startsWith('3')) return CardBrand.AMEX
    return CardBrand.UNKNOWN
  }

  const handleSaveCard = async (data: FieldValues) => {
    const cleanedCardNumber = data.cardNumber.replace(/\D/g, '')
    const [expiryMonth, expiryYear] = data.expiryDate.split('/')

    const newCardData: Omit<ICreditCard, 'id' | 'token'> = {
      last4: cleanedCardNumber.slice(-4),
      brand: detectCardBrand(cleanedCardNumber),
      expiryMonth: parseInt(expiryMonth, 10),
      expiryYear: parseInt(expiryYear, 10),
      isDefault: data.isDefault,
      // O campo 'nome do titular' não está na sua tipagem ICreditCard, então não o incluímos aqui.
      // O 'token' seria gerado por um gateway de pagamento em um app real.
    }

    try {
      await addCreditCard(newCardData)
      Alert.alert('Sucesso!', 'Seu novo cartão foi salvo.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ])
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Não foi possível salvar o cartão.')
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
          <CardPreview number={cardNumber} name={cardHolderName} expiry={expiryDate} />

          <View style={styles.formContainer}>
            <Controller
              control={control}
              name="cardNumber"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputText
                  label="Número do Cartão"
                  placeholder="0000 0000 0000 0000"
                  keyboardType="numeric"
                  maxLength={19} // 16 dígitos + 3 espaços
                  onBlur={onBlur}
                  onChangeText={(text) => onChange(applyMask(text, 'cardNumber'))} // Uma nova máscara será necessária
                  value={value}
                  error={errors.cardNumber?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="cardHolderName"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputText
                  label="Nome impresso no cartão"
                  placeholder="NOME COMPLETO"
                  autoCapitalize="characters"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.cardHolderName?.message}
                />
              )}
            />

            <View style={styles.row}>
              <Controller
                control={control}
                name="expiryDate"
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputText
                    label="Validade"
                    placeholder="MM/AA"
                    keyboardType="numeric"
                    maxLength={5}
                    onBlur={onBlur}
                    onChangeText={(text) => onChange(applyMask(text, 'expiryDate'))}
                    value={value}
                    error={errors.expiryDate?.message}
                    // containerStyle={{ flex: 1 }}
                  />
                )}
              />
              {/* O campo CVV normalmente não é salvo, mas seria inserido aqui */}
            </View>

            <Controller
              control={control}
              name="isDefault"
              render={({ field: { onChange, value } }) => (
                <Switch
                  label="Definir como cartão padrão"
                  onValueChange={onChange}
                  value={value}
                />
              )}
            />
          </View>
          <Button
            title="Salvar Cartão"
            variant="primary"
            onPress={handleSubmit(handleSaveCard)}
            loading={isProfileLoading}
            disabled={!isDirty || isProfileLoading}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    padding: theme.spacing.lg,
  },
  cardPreview: {
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.borders.radius.sm,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    height: 200,
    justifyContent: 'space-between',
  },
  cardChipContainer: {
    alignItems: 'flex-start',
  },
  cardNumberPreview: {
    fontFamily: theme.fonts.family.semiBold,
    fontSize: theme.fonts.size.xl,
    color: theme.colors.text_contrast,
    letterSpacing: 2,
  },
  cardDetailsPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardLabelPreview: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.xs,
    color: theme.colors.text_contrast,
    opacity: 0.7,
  },
  cardValuePreview: {
    fontFamily: theme.fonts.family.medium,
    fontSize: theme.fonts.size.md,
    color: theme.colors.text_contrast,
    textTransform: 'uppercase',
  },
  formContainer: {
    gap: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
})
export default AddNewCardScreen
