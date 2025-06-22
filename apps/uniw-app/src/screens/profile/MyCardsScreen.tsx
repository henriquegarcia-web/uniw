// src/screens/profile/MyCardsScreen.tsx

import React from 'react'
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import type { MyCardsScreenProps, ICreditCard } from '@uniw/shared-types'
import { themeApp as theme, colors } from '@uniw/shared-constants'
import { useClientAuth } from '@/contexts/ClientAuthProvider'
import { useClientProfile } from '@/contexts/ClientProfileProvider'
import { Button } from '@/components/forms/Button'
import { ProfileHeader } from '@/components/ProfileHeader'

// Subcomponente para renderizar um único cartão
const CreditCardItem = ({
  card,
  onSetDefault,
  onRemove,
}: {
  card: ICreditCard
  onSetDefault: () => void
  onRemove: () => void
}) => {
  return (
    <View style={[styles.card, card.isDefault && styles.defaultCard]}>
      {card.isDefault && <Text style={styles.defaultBadge}>Padrão</Text>}
      <View style={styles.cardHeader}>
        <MaterialCommunityIcons
          name="credit-card-outline"
          size={26}
          color={colors.brand.secondary}
        />
        <Text style={styles.cardBrand}>{card.brand}</Text>
      </View>
      <Text style={styles.cardNumber}>•••• •••• •••• {card.last4}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.cardExpiry}>
          Validade: {String(card.expiryMonth).padStart(2, '0')}/{card.expiryYear}
        </Text>
        <View style={styles.cardActions}>
          {!card.isDefault && (
            <TouchableOpacity onPress={onSetDefault}>
              <Text style={styles.actionText}>Tornar Padrão</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={onRemove}>
            <Text style={[styles.actionText, styles.removeText]}>Remover</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const MyCardsScreen = ({ navigation }: MyCardsScreenProps) => {
  const { user } = useClientAuth()
  const { removeCreditCard, setDefaultCreditCard, isProfileLoading } = useClientProfile()

  const savedCards = user?.clientProfile?.cartoesSalvos || []

  const handleRemoveCard = (cardId: string) => {
    Alert.alert('Remover Cartão', 'Tem certeza que deseja remover este cartão?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Remover', style: 'destructive', onPress: () => removeCreditCard(cardId) },
    ])
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={savedCards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CreditCardItem
            card={item}
            onRemove={() => handleRemoveCard(item.id)}
            onSetDefault={() => setDefaultCreditCard(item.id)}
          />
        )}
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Button
              title="Adicionar Novo Cartão"
              variant="primary"
              leftIcon="credit-card-plus-outline"
              onPress={() => navigation.navigate('AddNewCard')}
              loading={isProfileLoading}
            />
            <ProfileHeader title="Cartões salvos" />
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Você ainda não possui cartões cadastrados.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: theme.spacing.custom['botom-tab-height'],
    backgroundColor: colors.ui.surface,
  },
  contentContainer: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.custom['botom-tab-height'],
  },
  card: {
    backgroundColor: colors.ui.background,
    borderRadius: theme.borders.radius.sm,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: colors.ui.border,
  },
  defaultCard: {
    position: 'relative',
    borderColor: colors.brand.secondary,
    borderWidth: 2,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  cardBrand: {
    flex: 1,
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.lg,
    lineHeight: theme.fonts.size.xl,
    textTransform: 'capitalize',
  },
  defaultBadge: {
    position: 'absolute',
    top: -1,
    right: -1,
    backgroundColor: colors.brand.secondary,
    color: 'white',
    paddingHorizontal: 14,
    paddingVertical: 6,
    fontSize: 12,
    fontFamily: theme.fonts.family.bold,
    borderBottomLeftRadius: theme.borders.radius.sm,
  },
  cardNumber: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.lg,
    color: colors.text.secondary,
    textAlign: 'center',
    letterSpacing: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  cardExpiry: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.sm,
    color: colors.text.secondary,
  },
  cardActions: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  actionText: {
    fontFamily: theme.fonts.family.semiBold,
    fontSize: theme.fonts.size.sm,
    color: colors.brand.secondary,
  },
  removeText: {
    color: colors.ecommerce.sale,
  },
  headerContainer: {
    rowGap: theme.spacing.md,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: theme.fonts.size.md,
    color: colors.text.secondary,
    textAlign: 'center',
  },
})

export default MyCardsScreen
