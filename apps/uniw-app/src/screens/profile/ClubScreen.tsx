// src/screens/profile/ClubScreen.tsx

import React from 'react'
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { themeApp as theme, colors } from '@uniw/shared-constants'
import { useClientAuth } from '@/contexts/ClientAuthProvider'
import {
  ClubStatus,
  getClubStatusData,
  ClubScreenProps,
  MaterialCommunityIconsIcon,
} from '@uniw/shared-types'
import { Button } from '@/components/forms/Button'
import { applyMask } from '@uniw/shared-utils'
import { ProfileHeader } from '@/components/ProfileHeader'
import { ProfileMenu, ProfileMenuItem } from './ProfileScreen'

// Componente de Card de Benefício
const BenefitCard = ({
  icon,
  title,
  description,
}: {
  icon: MaterialCommunityIconsIcon
  title: string
  description: string
}) => (
  <View style={styles.benefitCard}>
    <MaterialCommunityIcons name={icon} size={28} color={colors.brand.secondary} />
    <Text style={styles.benefitTitle}>{title}</Text>
    <Text style={styles.benefitDescription}>{description}</Text>
  </View>
)

const BenefitItem = ({ title }: { title: string }) => (
  <View style={styles.benefitItem}>
    <MaterialCommunityIcons
      name="checkbox-marked-circle-outline"
      size={16}
      color={colors.brand.primary}
    />
    <Text style={styles.benefitItemText}>{title}</Text>
  </View>
)

const ClubScreen = ({ navigation }: ClubScreenProps) => {
  const { user } = useClientAuth()

  const clubInfo = user?.clienteProfile?.clube
  const loyaltyInfo = user?.clienteProfile?.fidelidade
  const isMember = !!clubInfo && clubInfo.status === ClubStatus.ATIVO

  const paymentHistory = [
    { id: '1', date: '15 de Junho, 2025', amount: 30.0 },
    { id: '2', date: '15 de Maio, 2025', amount: 30.0 },
    { id: '3', date: '15 de Abril, 2025', amount: 30.0 },
  ]

  // Componente para o estado de "Membro Ativo"
  const MemberView = () => {
    if (!clubInfo) return null

    const statusData = getClubStatusData(clubInfo.status)
    const memberSinceDate = clubInfo.memberSince
      ? new Date(clubInfo.memberSince).toLocaleDateString('pt-BR')
      : 'N/A'

    const defaultCard = user?.clienteProfile?.cartoesSalvos?.find((c) => c.isDefault)

    return (
      <View style={styles.viewWrapper}>
        <View style={styles.viewContainer}>
          <ProfileHeader title="Sua assinatura" />
          <View style={[styles.card, styles.statusCard]}>
            <View style={styles.statusHeader}>
              <Text style={styles.statusTitle}>Membro do Clube</Text>
              <View style={[styles.statusBadge, { backgroundColor: statusData.color }]}>
                <Text style={styles.statusBadgeText}>{statusData.label}</Text>
              </View>
            </View>
            <Text style={styles.memberSinceText}>Ativo desde: {memberSinceDate}</Text>
            <View style={styles.planDetailsContainer}>
              <View style={styles.planInfoRow}>
                <Text style={styles.planInfoLabel}>Plano</Text>
                <Text style={styles.planInfoValue}>UNIW Club Mensal</Text>
              </View>
              <View style={styles.planInfoRow}>
                <Text style={styles.planInfoLabel}>Valor</Text>
                <Text style={styles.planInfoValue}>R$ 30,00 / mês</Text>
              </View>
              <View style={styles.divider} />
              <Text style={styles.benefitsTitle}>Seus benefícios incluem:</Text>
              <BenefitItem title="Descontos Exclusivos" />
              <BenefitItem title="Frete Grátis Selecionado" />
              <BenefitItem title="Acesso VIP a Lançamentos" />
            </View>
          </View>
        </View>
        <View style={styles.viewContainer}>
          <ProfileHeader title="Pagamento da Assinatura" />
          <View style={styles.card}>
            {/* Método de Pagamento Selecionado */}
            <View style={styles.paymentMethodContainer}>
              <MaterialCommunityIcons
                name="credit-card"
                size={24}
                color={colors.text.secondary}
              />
              <View style={styles.paymentMethodDetails}>
                {defaultCard ? (
                  <>
                    <Text style={styles.paymentMethodText}>
                      {defaultCard.brand.charAt(0).toUpperCase() +
                        defaultCard.brand.slice(1)}{' '}
                      final {defaultCard.last4}
                    </Text>
                    <Text style={styles.nextBillingText}>
                      Próxima cobrança: 15 de Julho, 2025
                    </Text>
                  </>
                ) : (
                  <Text style={styles.paymentMethodText}>Nenhum cartão selecionado</Text>
                )}
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('MyCards')}>
                <Text style={styles.changeButtonText}>Trocar</Text>
              </TouchableOpacity>
            </View>

            {/* Histórico de Cobranças */}
            <View style={styles.historyContainer}>
              <Text style={styles.historyTitle}>Últimas cobranças</Text>
              {paymentHistory.map((item) => (
                <View key={item.id} style={styles.historyItem}>
                  <Text style={styles.historyDate}>{item.date}</Text>
                  <Text style={styles.historyAmount}>
                    {applyMask(item.amount, 'currency')}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.viewContainer}>
          <ProfileMenu sectionTitle="Ações" type="list">
            {/* <ProfileMenuItem
              label="Central de ajuda"
              icon="headset"
              appScreen="HelpCenter"
            /> */}
            <ProfileMenuItem
              label="Cancelar assinatura"
              icon="credit-card-remove-outline"
              type="negative"
              onPress={() => {}}
            />
          </ProfileMenu>
        </View>
      </View>
    )
  }

  // Componente para o estado de "Não é Membro"
  const NonMemberView = () => (
    <View style={styles.viewWrapper}>
      <View style={styles.viewContainer}>
        <View style={[styles.card, styles.ctaCard]}>
          <MaterialCommunityIcons
            name="crown-outline"
            size={60}
            color={colors.brand.secondary}
          />
          <Text style={styles.ctaTitle}>Faça Parte do Clube UNIW!</Text>
          <Text style={styles.ctaDescription}>
            Tenha acesso a descontos exclusivos, frete grátis, recompensas e muito mais.
          </Text>
          <Button
            title="Assinar por R$ 30,00/mês"
            variant="primary"
            style={{
              height: 45,
              marginTop: theme.spacing.md,
            }}
            onPress={() => navigation.navigate('ClubSignature')}
          />
        </View>
      </View>

      <View style={styles.viewContainer}>
        <ProfileHeader title="O que você ganha?" size="large" />
        <View style={styles.benefitsWrapper}>
          <BenefitCard
            icon="tag"
            title="Descontos Exclusivos"
            description="Ofertas especiais em produtos e serviços que só membros do clube têm."
          />
          <BenefitCard
            icon="gift"
            title="Recompensas de Fidelidade"
            description="Acumule pontos em cada compra e troque por produtos ou descontos."
          />
          <BenefitCard
            icon="star"
            title="Acesso VIP a Lançamentos"
            description="Compre novos produtos e coleções antes de todo mundo."
          />
        </View>
      </View>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {isMember ? <MemberView /> : <NonMemberView />}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: theme.spacing.custom['botom-tab-height'],
    backgroundColor: colors.ui.surface,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.custom['botom-tab-height'],
  },
  viewWrapper: {
    rowGap: theme.spacing.md,
  },
  viewContainer: {},
  card: {
    flex: 1,
    backgroundColor: colors.ui.background,
    borderRadius: theme.borders.radius.sm,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: colors.ui.border,
  },
  statusCard: {
    // gap: theme.spacing.md,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  statusTitle: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.lg,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.borders.radius.full,
  },
  statusBadgeText: {
    color: colors.text.onBrand,
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.xs,
  },
  memberSinceText: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.sm,
    color: colors.text.secondary,
    marginBottom: theme.spacing.sm,
  },
  pointsContainer: {
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: colors.ui.surface,
    borderRadius: theme.borders.radius.sm,
    borderWidth: 1,
    borderColor: colors.ui.border,
  },
  pointsValue: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.xxxl,
    color: colors.brand.primary,
  },
  pointsLabel: {
    fontFamily: theme.fonts.family.medium,
    color: colors.text.secondary,
  },
  ctaCard: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
    rowGap: theme.spacing.xs,
  },
  ctaTitle: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.xl,
    lineHeight: theme.fonts.size.xxl,
    textAlign: 'center',
  },
  ctaDescription: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.md,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  benefitsWrapper: {
    rowGap: theme.spacing.sm,
  },
  benefitCard: {
    backgroundColor: colors.ui.background,
    borderRadius: theme.borders.radius.sm,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.ui.border,
  },
  benefitTitle: {
    fontFamily: theme.fonts.family.semiBold,
    fontSize: theme.fonts.size.lg,
    marginTop: theme.spacing.sm,
  },
  benefitDescription: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.md,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.ui.border,
  },
  paymentMethodDetails: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  paymentMethodText: {
    fontFamily: theme.fonts.family.semiBold,
    fontSize: theme.fonts.size.md,
  },
  nextBillingText: {
    fontFamily: theme.fonts.family.regular,
    color: colors.text.secondary,
    fontSize: theme.fonts.size.sm,
  },
  changeButtonText: {
    fontFamily: theme.fonts.family.bold,
    color: colors.brand.secondary,
    fontSize: theme.fonts.size.md,
  },
  historyContainer: {
    marginTop: theme.spacing.md,
  },
  historyTitle: {
    fontFamily: theme.fonts.family.semiBold,
    fontSize: theme.fonts.size.md,
    color: colors.text.secondary,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.sm,
  },
  historyDate: {
    fontFamily: theme.fonts.family.regular,
    color: colors.text.primary,
  },
  historyAmount: {
    fontFamily: theme.fonts.family.medium,
    color: colors.text.primary,
  },
  planDetailsContainer: {
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderColor: colors.ui.border,
  },
  planInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xs,
  },
  planInfoLabel: {
    fontFamily: theme.fonts.family.regular,
    color: colors.text.secondary,
  },
  planInfoValue: {
    fontFamily: theme.fonts.family.semiBold,
    color: colors.text.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.ui.border,
    marginVertical: theme.spacing.md,
  },
  benefitsTitle: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.md,
    marginBottom: theme.spacing.sm,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  benefitItemText: {
    fontFamily: theme.fonts.family.regular,
    marginLeft: 6,
    color: colors.text.primary,
  },
})

export default ClubScreen
