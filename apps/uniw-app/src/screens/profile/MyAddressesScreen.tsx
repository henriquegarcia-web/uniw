// src/screens/profile/MyAddressesScreen.tsx

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

import type { MyAddressesScreenProps, IAddress } from '@uniw/shared-types'
import { themeApp as theme, colors } from '@uniw/shared-constants'
import { useClientAuth } from '@/contexts/ClientAuthProvider'
import { useClientProfile } from '@/contexts/ClientProfileProvider'
import { Button } from '@/components/forms/Button'
import { ProfileHeader } from '@/components/ProfileHeader'

// Subcomponente para renderizar um único endereço
const AddressItem = ({
  address,
  onSetDefault,
  onRemove,
}: {
  address: IAddress
  onSetDefault: () => void
  onRemove: () => void
}) => {
  return (
    <View style={[styles.card, address.isDefault && styles.defaultCard]}>
      {address.isDefault && <Text style={styles.defaultBadge}>Padrão</Text>}
      <View style={styles.cardHeader}>
        <MaterialCommunityIcons
          name="map-marker-outline"
          size={26}
          color={colors.brand.secondary}
        />
        <Text style={styles.cardTitle}>{address.nome}</Text>
      </View>
      <View style={styles.addressDetails}>
        <Text style={styles.addressText}>
          {address.rua}, {address.numero}
        </Text>
        <Text style={styles.addressText}>
          {address.bairro}, {address.cidade} - {address.estado}
        </Text>
        <Text style={styles.addressText}>CEP: {address.cep}</Text>
      </View>
      <View style={styles.cardFooter}>
        <View style={styles.cardActions}>
          {!address.isDefault && (
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

const MyAddressesScreen = ({ navigation }: MyAddressesScreenProps) => {
  const { user } = useClientAuth()
  const { removeAddress, setDefaultAddress, isProfileLoading } = useClientProfile()

  const savedAddresses = user?.clientProfile?.enderecosSalvos || []

  const handleRemoveAddress = (addressId: string) => {
    Alert.alert('Remover Endereço', 'Tem certeza que deseja remover este endereço?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Remover', style: 'destructive', onPress: () => removeAddress(addressId) },
    ])
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={savedAddresses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AddressItem
            address={item}
            onRemove={() => handleRemoveAddress(item.id)}
            onSetDefault={() => setDefaultAddress(item.id)}
          />
        )}
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Button
              title="Adicionar Novo Endereço"
              variant="primary"
              leftIcon="map-marker-plus-outline"
              onPress={() => navigation.navigate('AddNewAddress')}
              loading={isProfileLoading}
            />
            <ProfileHeader title="Endereços salvos" />
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Você ainda não possui endereços cadastrados.
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
  cardTitle: {
    flex: 1,
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.lg,
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
  addressDetails: {
    marginBottom: theme.spacing.md,
  },
  addressText: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.md,
    color: colors.text.secondary,
    lineHeight: 22,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.ui.border,
    paddingTop: theme.spacing.sm,
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
    marginBottom: theme.spacing.xs,
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

export default MyAddressesScreen
