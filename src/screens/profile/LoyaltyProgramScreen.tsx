// src/screens/profile/LoyaltyProgramScreen.tsx

import React from 'react'
import { StyleSheet, SafeAreaView, Text, View, ScrollView, FlatList } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import type { LoyaltyProgramScreenProps } from '@/navigation/types'
import { theme } from '@/styles/theme'
import { useClientAuth } from '@/contexts/ClientAuthProvider'
import { IPointTransaction } from '@/types/auth'
import { ProfileHeader } from '@/components/ProfileHeader'
import { Button } from '@/components/forms/Button'

// Componente para renderizar um item do extrato de pontos
const TransactionItem = ({ transaction }: { transaction: IPointTransaction }) => {
  const isEarned = transaction.type === 'earned'
  const icon = isEarned ? 'arrow-up-circle' : 'arrow-down-circle'
  const color = isEarned ? theme.colors.primary : theme.colors.error
  const sign = isEarned ? '+' : '-'

  return (
    <View style={styles.transactionItem}>
      <MaterialCommunityIcons name={icon} size={28} color={color} />
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionDescription}>{transaction.description}</Text>
        <Text style={styles.transactionDate}>
          {new Date(transaction.date).toLocaleDateString('pt-BR')}
        </Text>
      </View>
      <Text style={[styles.transactionAmount, { color }]}>
        {sign} {transaction.amount}
      </Text>
    </View>
  )
}

const LoyaltyProgramScreen = ({ navigation }: LoyaltyProgramScreenProps) => {
  const { user } = useClientAuth()
  const loyaltyData = user?.clienteProfile?.fidelidade

  // Renderiza uma mensagem se o usuário não tiver dados de fidelidade
  if (!loyaltyData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Programa de fidelidade indisponível.</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            {/* Card de Saldo de Pontos */}
            <ProfileHeader title="Programa de Fidelidade" />
            <View style={styles.card}>
              <Text style={styles.pointsLabel}>Seu Saldo Atual</Text>
              <View style={styles.pointsContainer}>
                <MaterialCommunityIcons
                  name="star-circle"
                  size={22}
                  color={theme.colors.secondary}
                  style={{
                    marginBottom: 1,
                  }}
                />
                <Text style={styles.pointsValue}>
                  {loyaltyData.pointsBalance.toLocaleString('pt-BR')}
                </Text>
              </View>
              <Text style={styles.pointsSubtitle}>Pontos para usar como quiser!</Text>
            </View>

            {/* Card de "Como Funciona" */}
            <ProfileHeader title="Como funciona?" />
            <View style={[styles.card, styles.infoCard]}>
              <Text style={styles.infoText}>
                <Text style={styles.infoTextBold}>Ganhe pontos:</Text> Acumule pontos em
                todas as compras e agendamentos feitos no app.
              </Text>
              <Text style={styles.infoText}>
                <Text style={styles.infoTextBold}>Troque por recompensas:</Text> Use seus
                pontos para resgatar cupons de desconto, produtos exclusivos e muito mais.
              </Text>
            </View>

            <ProfileHeader title="Extrato de Pontos" />
          </>
        }
        ListFooterComponent={
          <View>
            <ProfileHeader title="Ações" />
            <Button
              title="Ver cupons"
              variant="primary"
              style={{
                height: 45,
              }}
              onPress={() => navigation.navigate('Coupons')}
            />
          </View>
        }
        data={loyaltyData.pointsHistory}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={
          <View style={styles.emptyHistory}>
            <Text style={styles.emptyHistoryText}>Seu extrato está vazio.</Text>
          </View>
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  contentContainer: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing['3xl'],
  },
  card: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borders.radius.sm,
    padding: theme.spacing.lg,
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  pointsLabel: {
    fontFamily: theme.fonts.family.medium,
    fontSize: theme.fonts.size.md,
    color: theme.colors.text_secondary,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.xs,
  },
  pointsValue: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size['3xl'],
    color: theme.colors.secondary,
    marginLeft: theme.spacing.sm,
  },
  pointsSubtitle: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.md,
    color: theme.colors.text_secondary,
  },
  infoCard: {
    alignItems: 'flex-start',
    gap: theme.spacing.md,
  },
  infoText: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.md,
    lineHeight: 22,
  },
  infoTextBold: {
    fontFamily: theme.fonts.family.bold,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
    borderRadius: theme.borders.radius.sm,
    marginBottom: theme.spacing.sm,
  },
  transactionDetails: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  transactionDescription: {
    fontFamily: theme.fonts.family.medium,
    fontSize: theme.fonts.size.md,
  },
  transactionDate: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.sm,
    color: theme.colors.text_secondary,
  },
  transactionAmount: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.lg,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: theme.fonts.size.lg,
    color: theme.colors.text_secondary,
  },
  emptyHistory: {
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  emptyHistoryText: {
    fontSize: theme.fonts.size.md,
    color: theme.colors.text_secondary,
  },
})

export default LoyaltyProgramScreen
