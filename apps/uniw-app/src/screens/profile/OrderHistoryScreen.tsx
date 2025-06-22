// src/screens/profile/OrderHistoryScreen.tsx

import React from 'react'
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from 'react-native'

import {
  OrderHistoryScreenProps,
  getOrderStatusData,
  IPurchaseOrder,
} from '@uniw/shared-types'
import { themeApp as theme, colors } from '@uniw/shared-constants'
import { mockPurchaseHistory } from '@/types/auth'
import { applyMask } from '@uniw/shared-utils'
import { ProfileHeader } from '@/components/ProfileHeader'

const OrderHistoryScreen = ({ navigation }: OrderHistoryScreenProps) => {
  const handleOrderPress = (orderId: string) => {
    navigation.navigate('OrderDetails', { orderId })
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={mockPurchaseHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          const isNotLastOne =
            index + 1 < mockPurchaseHistory.length &&
            index + 1 !== mockPurchaseHistory.length
          return (
            <OrderHistoryCard
              isNotLastOne={isNotLastOne}
              order={item}
              onPress={() => handleOrderPress(item.id)}
            />
          )
        }}
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponent={<ProfileHeader title="Histórico" />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Você ainda não fez nenhum pedido.</Text>
          </View>
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: theme.spacing.custom['botom-tab-height'],
    rowGap: theme.spacing.lg,
    backgroundColor: colors.ui.surface,
  },
  contentContainer: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.custom['botom-tab-height'],
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontFamily: theme.fonts.family.medium,
    fontSize: theme.fonts.size.lg,
    color: colors.text.secondary,
    textAlign: 'center',
  },
})

export default OrderHistoryScreen

// =============================================================

interface OrderHistoryCardProps {
  isNotLastOne: boolean
  order: IPurchaseOrder
  onPress: () => void
}

export const OrderHistoryCard = ({
  isNotLastOne,
  order,
  onPress,
}: OrderHistoryCardProps) => {
  const firstItem = order.items[0]
  const statusInfo = getOrderStatusData(order.status)
  const orderDate = new Date(order.createdAt).toLocaleDateString('pt-BR')

  return (
    <TouchableOpacity
      style={[
        orderHistoryCardstyles.card,
        {
          marginBottom: isNotLastOne ? theme.spacing.sm : 0,
        },
      ]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      {/* Cabeçalho do Card */}
      <View style={orderHistoryCardstyles.header}>
        <View>
          <Text style={orderHistoryCardstyles.orderNumber}>
            Pedido #{order.orderNumber}
          </Text>
          <Text style={orderHistoryCardstyles.orderDate}>Realizado em: {orderDate}</Text>
        </View>
        <View
          style={[
            orderHistoryCardstyles.statusBadge,
            { backgroundColor: statusInfo.color },
          ]}
        >
          <Text style={orderHistoryCardstyles.statusText}>{statusInfo.label}</Text>
        </View>
      </View>

      {/* Conteúdo do Card */}
      <View style={orderHistoryCardstyles.content}>
        <Image
          source={{ uri: firstItem.imageUrl }}
          style={orderHistoryCardstyles.productImage}
        />
        <View style={orderHistoryCardstyles.productInfo}>
          <Text style={orderHistoryCardstyles.productName} numberOfLines={1}>
            {firstItem.productName}
          </Text>
          {order.items.length > 1 && (
            <Text style={orderHistoryCardstyles.moreItemsText}>
              + {order.items.length - 1} outro(s) item(ns)
            </Text>
          )}
        </View>
      </View>

      {/* Rodapé do Card */}
      <View style={orderHistoryCardstyles.footer}>
        <Text style={orderHistoryCardstyles.totalLabel}>Valor Total:</Text>
        <Text style={orderHistoryCardstyles.totalValue}>
          {applyMask(order.summary.totalAmount, 'currency')}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const orderHistoryCardstyles = StyleSheet.create({
  card: {
    backgroundColor: colors.ui.background,
    borderRadius: theme.borders.radius.sm,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: colors.ui.border,
    // elevation: 2,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: colors.ui.border,
    paddingBottom: theme.spacing.sm,
  },
  orderNumber: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.md,
    color: colors.brand.secondary,
  },
  orderDate: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.xs,
    color: colors.text.secondary,
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borders.radius.xs,
  },
  statusText: {
    fontFamily: theme.fonts.family.semiBold,
    fontSize: theme.fonts.size.xs,
    color: colors.text.onBrand,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: theme.borders.radius.xs,
    marginRight: theme.spacing.md,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontFamily: theme.fonts.family.medium,
    fontSize: theme.fonts.size.md,
  },
  moreItemsText: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.sm,
    color: colors.text.secondary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.ui.border,
    paddingTop: theme.spacing.sm,
  },
  totalLabel: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.md,
    color: colors.text.secondary,
  },
  totalValue: {
    fontFamily: theme.fonts.family.semiBold,
    fontSize: theme.fonts.size.lg,
    color: colors.text.primary,
  },
})
