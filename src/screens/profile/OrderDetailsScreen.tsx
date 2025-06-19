// src/screens/profile/OrderDetailsScreen.tsx

import React, { useMemo } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native'

import type { AppStackParamList, OrderDetailsScreenProps } from '@/navigation/types'
import { theme } from '@/styles/theme'
import { getOrderById } from '@/utils/mockGetters'
import { applyMask } from '@/utils/masks'
import { getOrderStatusData } from '@/types/auth'
import { ProfileHeader } from '@/components/ProfileHeader'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Button } from '@/components/forms/Button'

const OrderDetailsScreen = ({ navigation, route }: OrderDetailsScreenProps) => {
  const { orderId } = route.params
  const rootNavigation =
    navigation.getParent<NativeStackNavigationProp<AppStackParamList>>()

  const orderData = useMemo(() => getOrderById(orderId), [orderId])

  if (!orderData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Pedido não encontrado!</Text>
      </SafeAreaView>
    )
  }

  const statusInfo = getOrderStatusData(orderData.status)
  const orderDate = new Date(orderData.createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  const handleSelectProductOrder = (productId: string) => {
    rootNavigation.navigate('ProductDetails', { productId })
  }

  const handleReOrder = () => {}

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Seção do Cabeçalho do Pedido */}
        <View style={styles.sectionContainer}>
          <ProfileHeader title="Pedido" />

          <View style={styles.section}>
            <View style={styles.header}>
              <Text style={styles.orderNumber}>Pedido #{orderData.orderNumber}</Text>
              <View style={[styles.statusBadge, { backgroundColor: statusInfo.color }]}>
                <Text style={styles.statusText}>{statusInfo.label}</Text>
              </View>
            </View>
            <Text style={styles.orderDate}>Realizado em {orderDate}</Text>
          </View>
        </View>

        {/* Seção dos Itens do Pedido */}
        <View style={styles.sectionContainer}>
          <ProfileHeader title="Itens do Pedido" />

          <View style={styles.section}>
            {orderData.items.map((item, index) => {
              const isNotLastOne =
                index + 1 < orderData.items.length && index + 1 !== orderData.items.length
              return (
                <TouchableOpacity
                  key={item.skuId}
                  style={[
                    styles.itemContainer,
                    {
                      borderBottomWidth: isNotLastOne ? 1 : 0,
                      marginBottom: isNotLastOne ? 12 : 0,
                      paddingBottom: isNotLastOne ? 12 : 0,
                    },
                  ]}
                  onPress={() => handleSelectProductOrder(item.productId)}
                >
                  <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName} numberOfLines={2}>
                      {item.productName}
                    </Text>
                    <Text style={styles.itemAttributes}>
                      {Object.values(item.attributes).join(' / ')}
                    </Text>
                    <Text style={styles.itemQuantity}>Quantidade: {item.quantity}</Text>
                  </View>
                  <Text style={styles.itemPrice}>
                    {applyMask(item.priceAtPurchase, 'currency')}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>

        {/* Seção de Resumo do Pagamento */}
        <View style={styles.sectionContainer}>
          <ProfileHeader title="Resumo do Pagamento" />

          <View style={styles.section}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>
                {applyMask(orderData.summary.subtotal, 'currency')}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Frete</Text>
              <Text style={styles.summaryValue}>
                {applyMask(orderData.summary.shippingCost, 'currency')}
              </Text>
            </View>
            {orderData.summary.discountAmount > 0 && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Descontos</Text>
                <Text style={[styles.summaryValue, styles.discountValue]}>
                  - {applyMask(orderData.summary.discountAmount, 'currency')}
                </Text>
              </View>
            )}
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>
                {applyMask(orderData.summary.totalAmount, 'currency')}
              </Text>
            </View>
          </View>
        </View>

        {/* Seção de Endereço de Entrega */}
        <View style={styles.sectionContainer}>
          <ProfileHeader title="Endereço de Entrega" />

          <View style={styles.section}>
            <Text style={styles.addressText}>
              {orderData.shipping.address.rua}, {orderData.shipping.address.numero}
            </Text>
            <Text style={styles.addressText}>
              {orderData.shipping.address.bairro}, {orderData.shipping.address.cidade} -{' '}
              {orderData.shipping.address.estado}
            </Text>
            <Text style={styles.addressText}>CEP: {orderData.shipping.address.cep}</Text>
          </View>
        </View>

        {/* Seção de Ações */}
        <View style={styles.sectionContainer}>
          <ProfileHeader title="Ações" />

          <Button title="Refazer esse pedido" onPress={handleReOrder} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: theme.spacing['4xl'],
    backgroundColor: theme.colors.surface,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing['3xl'],
    rowGap: theme.spacing.md,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 50,
  },
  sectionContainer: {},
  section: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borders.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  orderNumber: {
    fontFamily: theme.fonts.family.semiBold,
    fontSize: theme.fonts.size.md,
  },
  orderDate: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.sm,
    color: theme.colors.text_secondary,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borders.radius.xs,
  },
  statusText: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.xs,
    color: theme.colors.text_contrast,
  },
  itemContainer: {
    flexDirection: 'row',
    // borderWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: theme.borders.radius.xs,
    marginRight: theme.spacing.md,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontFamily: theme.fonts.family.medium,
  },
  itemAttributes: {
    fontSize: theme.fonts.size.xs,
    color: theme.colors.text_secondary,
  },
  itemQuantity: {
    fontSize: theme.fonts.size.sm,
    marginTop: 4,
  },
  itemPrice: {
    fontFamily: theme.fonts.family.semiBold,
    fontSize: theme.fonts.size.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.xs,
  },
  summaryLabel: {
    fontFamily: theme.fonts.family.regular,
    color: theme.colors.text_secondary,
  },
  summaryValue: {
    fontFamily: theme.fonts.family.medium,
  },
  discountValue: {
    color: theme.colors.primary,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    marginTop: theme.spacing.sm,
    paddingTop: theme.spacing.sm,
  },
  totalLabel: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.md,
  },
  totalValue: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.lg,
  },
  addressText: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.md,
    lineHeight: 22,
  },
})
export default OrderDetailsScreen
