// src/screens/profile/CouponsScreen.tsx

import React, { useMemo } from 'react'
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
import * as Clipboard from 'expo-clipboard'

import {
  CouponsScreenProps,
  ICoupon,
  IRedeemedCoupon,
  RedeemedCouponStatus,
} from '@uniw/shared-types'
import { themeApp as theme, colors } from '@uniw/shared-constants'
import { useClientAuth } from '@/contexts/ClientAuthProvider'
import { mockCoupons, mockRedeemedCoupons } from '@/types/rewards'
import { Button } from '@/components/forms/Button'
import { ProfileHeader } from '@/components/ProfileHeader'

// --- Subcomponente para o Card de Cupom ---

const CouponCard = ({
  coupon,
  userPoints,
  userOwnedCouponIds,
}: {
  coupon: ICoupon
  userPoints: number
  userOwnedCouponIds: string[]
}) => {
  const isAlreadyOwned = userOwnedCouponIds.includes(coupon.id)
  const canAfford = userPoints >= coupon.costInPoints
  const isAvailable = coupon.status === 'avaliable'
  const canRedeem = canAfford && isAvailable && !isAlreadyOwned

  const couponCardStyles = {
    container: {
      borderLeftColor: canRedeem ? colors.brand.secondary : colors.ui.disabled,
    },
    mainText: {
      color: canRedeem ? colors.text.primary : colors.text.tertiary,
    },
    text: {
      color: canRedeem ? colors.brand.secondary : colors.ui.disabled,
    },
  }

  const handleRedeem = () => {
    Alert.alert(
      'Confirmar Resgate',
      `Você deseja usar ${coupon.costInPoints} pontos para resgatar este cupom?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', onPress: () => console.log('Cupom resgatado:', coupon.id) },
      ],
    )
  }

  return (
    <View
      style={[
        styles.card,
        couponCardStyles.container,
        // !canAfford && !isAlreadyOwned && styles.disabledCard,
      ]}
    >
      <View style={styles.cardHeader}>
        <MaterialCommunityIcons
          name="tag"
          size={20}
          color={couponCardStyles.text.color}
        />
        <Text style={[styles.cardTitle, couponCardStyles.mainText]} numberOfLines={1}>
          {coupon.title}
        </Text>
      </View>
      <Text style={[styles.cardDescription, couponCardStyles.mainText]}>
        {coupon.description}
      </Text>
      <View style={styles.cardFooter}>
        <View style={styles.pointsCostContainer}>
          <MaterialCommunityIcons
            name="star-circle"
            size={18}
            color={couponCardStyles.text.color}
          />
          <View style={styles.pointsCostTextWrapper}>
            <Text style={[styles.pointsCost, couponCardStyles.text]}>
              {coupon.costInPoints.toLocaleString('pt-BR')} pontos
            </Text>
            {!canAfford && (
              <Text style={styles.pointsCostInsufficient}>Pontos insuficientes</Text>
            )}
          </View>
        </View>
        <Button
          title={isAlreadyOwned ? 'Resgatado' : 'Resgatar'}
          variant="primary"
          style={{ width: isAlreadyOwned ? 120 : 105, height: 35 }}
          disabled={!canRedeem}
          onPress={handleRedeem}
        />
      </View>
    </View>
  )
}

// --- NOVO Subcomponente para o Card de Cupom do Usuário ---
const MyCouponCard = ({
  couponDetails,
  userCoupon,
}: {
  couponDetails: ICoupon
  userCoupon: IRedeemedCoupon
}) => {
  const isUsed = userCoupon.status === RedeemedCouponStatus.USED

  const handleCopyCode = async () => {
    await Clipboard.setStringAsync(couponDetails.code)
    Alert.alert(
      'Código Copiado!',
      `O código ${couponDetails.code} foi copiado para sua área de transferência.`,
    )
  }

  return (
    <View
      style={[myCouponCardStyles.container, isUsed && myCouponCardStyles.usedContainer]}
    >
      {isUsed && <Text style={myCouponCardStyles.usedLabel}>UTILIZADO</Text>}
      <Text style={myCouponCardStyles.title}>{couponDetails.title}</Text>
      <Text style={myCouponCardStyles.description}>{couponDetails.description}</Text>
      {!isUsed && (
        <View style={myCouponCardStyles.footer}>
          <Text style={myCouponCardStyles.codeLabel}>CÓDIGO:</Text>
          <Text style={myCouponCardStyles.codeText}>{couponDetails.code}</Text>
          <TouchableOpacity onPress={handleCopyCode} disabled={isUsed}>
            <MaterialCommunityIcons
              name="content-copy"
              size={18}
              color={colors.text.tertiary}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const myCouponCardStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.ui.background,
    borderRadius: theme.borders.radius.sm,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderTopColor: colors.ui.border,
    borderRightColor: colors.ui.border,
    borderBottomColor: colors.ui.border,
    borderLeftWidth: 4,
    borderLeftColor: colors.brand.secondary,
  },
  title: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.md,
    color: colors.semantic.success,
  },
  description: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.sm,
    color: colors.text.secondary,
    marginVertical: theme.spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.ui.surface,
    paddingVertical: theme.spacing.sm,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.sm,
    borderRadius: theme.borders.radius.xs,
    borderWidth: 1,
    borderColor: colors.ui.border,
  },
  codeLabel: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.xs,
    color: colors.text.secondary,
  },
  codeText: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.lg,
    color: colors.text.primary,
    flex: 1,
    marginLeft: theme.spacing.sm,
  },
  usedContainer: {
    backgroundColor: colors.ui.surface,
    borderColor: colors.ui.disabled,
  },
  usedLabel: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: colors.text.secondary,
    color: 'white',
    paddingHorizontal: 12,
    paddingVertical: 4,
    fontSize: 10,
    fontFamily: theme.fonts.family.bold,
    borderTopRightRadius: theme.borders.radius.sm,
    borderBottomLeftRadius: theme.borders.radius.sm,
  },
})

// --- Componente Principal da Tela ---
const CouponsScreen = ({ navigation }: CouponsScreenProps) => {
  const { user } = useClientAuth()
  // const loyaltyData = user?.clientProfile?.fidelidade
  const loyaltyData = {
    pointsBalance: 1200,
    pointsHistory: [],
    coupons: mockRedeemedCoupons,
  }

  // const myCoupons = useMemo(() => {
  //   return getCouponsByIds(loyaltyData?.coupons || [])
  // }, [loyaltyData?.coupons])

  // Renderiza um estado de carregamento ou vazio se os dados não estiverem disponíveis
  if (!loyaltyData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Não foi possível carregar seus cupons.</Text>
        </View>
      </SafeAreaView>
    )
  }

  const userPoints = loyaltyData.pointsBalance
  // A lista de cupons que o usuário possui (com status)
  const myRedeemedCoupons = loyaltyData.coupons || []
  // Um array simples apenas com os IDs dos cupons que o usuário possui
  const myCouponIds = myRedeemedCoupons.map((c) => c.couponId)

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={mockCoupons.filter((c) => c.status === 'avaliable')}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CouponCard
            coupon={item}
            userPoints={userPoints}
            userOwnedCouponIds={myCouponIds}
          />
        )}
        ListHeaderComponent={
          <View>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.pointsHeader}
              onPress={() => navigation.navigate('LoyaltyProgram')}
            >
              <Text style={styles.pointsHeaderText}>Seu Saldo</Text>
              <View style={styles.pointsHeaderValueWrapper}>
                <MaterialCommunityIcons
                  name="star-circle"
                  size={22}
                  color={colors.text.onBrand}
                  style={{
                    marginBottom: 1,
                  }}
                />
                <Text style={styles.pointsHeaderValue}>
                  {userPoints.toLocaleString('pt-BR')} pontos
                </Text>
              </View>
              <Text style={styles.pointsHeaderLink}>Ver extrato</Text>
            </TouchableOpacity>

            <ProfileHeader title="Ofertas disponíveis" />
          </View>
        }
        ListFooterComponent={
          <View style={styles.footerContainer}>
            <ProfileHeader title="Meus Cupons" />
            {myRedeemedCoupons.length > 0 ? (
              myRedeemedCoupons.map((userCoupon) => {
                // Para cada cupom do usuário, encontramos os detalhes completos
                const couponDetails = mockCoupons.find(
                  (c) => c.id === userCoupon.couponId,
                )
                if (!couponDetails) return null
                return (
                  <MyCouponCard
                    key={userCoupon.id}
                    couponDetails={couponDetails}
                    userCoupon={userCoupon}
                  />
                )
              })
            ) : (
              <View style={styles.emptyHistory}>
                <Text style={styles.emptyHistoryText}>
                  Você ainda não resgatou nenhum cupom.
                </Text>
              </View>
            )}
          </View>
        }
        contentContainerStyle={styles.contentContainer}
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
  pointsHeader: {
    backgroundColor: colors.brand.secondary,
    borderRadius: theme.borders.radius.sm,
    padding: theme.spacing.lg,
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  pointsHeaderValueWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: theme.spacing.sm,
  },
  pointsHeaderText: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.md,
    color: colors.text.onBrand,
    opacity: 0.8,
  },
  pointsHeaderValue: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.xxl,
    color: colors.text.onBrand,
    marginVertical: theme.spacing.xs,
  },
  pointsHeaderLink: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.md,
    color: colors.text.onBrand,
    textDecorationLine: 'underline',
  },
  card: {
    backgroundColor: colors.ui.background,
    borderRadius: theme.borders.radius.sm,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderTopColor: colors.ui.border,
    borderRightColor: colors.ui.border,
    borderBottomColor: colors.ui.border,
    borderLeftWidth: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  cardTitle: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.lg,
    flex: 1,
  },
  cardDescription: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.md,
    marginVertical: theme.spacing.sm,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.ui.border,
    paddingTop: theme.spacing.sm,
  },
  pointsCostContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  pointsCostTextWrapper: {
    // rowGap: theme.spacing.xs,
  },
  pointsCost: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.md,
    lineHeight: theme.fonts.size.lg,
  },
  pointsCostInsufficient: {
    fontFamily: theme.fonts.family.semiBold,
    fontSize: theme.fonts.size.xs,
    lineHeight: theme.fonts.size.lg,
    color: colors.semantic.error,
    opacity: 0.6,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: theme.fonts.size.lg,
    color: colors.text.secondary,
  },
  footerContainer: {
    marginTop: theme.spacing.sm,
  },
  emptyHistory: {
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  emptyHistoryText: {
    fontSize: theme.fonts.size.md,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  disabledCard: {
    opacity: 0.6,
  },
})

export default CouponsScreen
