// src/screens/support/SaleAnnouncementScreen.tsx

import React from 'react'
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'

import type { SaleAnnouncementScreenProps } from '@uniw/shared-types'
import { themeApp as theme, colors } from '@uniw/shared-constants'
import { Button } from '@/components/forms/Button'

// Subcomponente para cada passo da instrução
const InstructionStep = ({
  step,
  title,
  description,
}: {
  step: number
  title: string
  description: string
}) => (
  <View style={styles.stepContainer}>
    <View style={styles.stepNumberCircle}>
      <Text style={styles.stepNumberText}>{step}</Text>
    </View>
    <View style={styles.stepTextContainer}>
      <Text style={styles.stepTitle}>{title}</Text>
      <Text style={styles.stepDescription}>{description}</Text>
    </View>
  </View>
)

const SaleAnnouncementScreen = ({ navigation }: SaleAnnouncementScreenProps) => {
  const handleOpenDashboard = () => {
    // Em um app real, aqui você colocaria o link para o seu painel web
    const dashboardUrl = 'https://sua-plataforma-uniw.com/parceiro/login'
    Linking.openURL(dashboardUrl).catch((err) =>
      console.error('Não foi possível abrir o link', err),
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Seção do Cabeçalho */}
        <View style={styles.header}>
          <MaterialCommunityIcons
            name="storefront-outline"
            size={50}
            color={colors.brand.secondary}
          />
          <Text style={styles.title}>Venda na UNIW e Expanda seu Negócio</Text>
          <Text style={styles.subtitle}>
            Junte-se à nossa rede de parceiros e fornecedores e alcance milhares de novos
            clientes.
          </Text>
        </View>

        {/* Seção "Como Funciona" */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Começar é Simples</Text>
          <InstructionStep
            step={1}
            title="Acesse o Painel do Parceiro"
            description="Toda a gestão é feita através do nosso painel web, otimizado para desktop e celular."
          />
          <InstructionStep
            step={2}
            title="Cadastre seus Produtos e Serviços"
            description="Adicione seu catálogo, defina preços, estoque e gerencie seu agendamento de forma fácil."
          />
          <InstructionStep
            step={3}
            title="Gerencie seu Negócio"
            description="Acompanhe vendas, agendamentos, finanças e comunique-se com seus clientes em um só lugar."
          />
        </View>

        {/* Seção "Vantagens" */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Principais Vantagens</Text>
          <View style={styles.benefitItem}>
            <Feather name="users" size={20} color={colors.brand.primary} />
            <Text style={styles.benefitText}>
              Visibilidade para uma nova base de clientes.
            </Text>
          </View>
          <View style={styles.benefitItem}>
            <Feather name="calendar" size={20} color={colors.brand.primary} />
            <Text style={styles.benefitText}>
              Sistema completo de agendamento online.
            </Text>
          </View>
          <View style={styles.benefitItem}>
            <Feather name="dollar-sign" size={20} color={colors.brand.primary} />
            <Text style={styles.benefitText}>
              Ferramentas de gestão financeira e de estoque.
            </Text>
          </View>
        </View>

        {/* Seção CTA (Call to Action) */}
        <View style={styles.ctaContainer}>
          <Button
            title="Acessar Painel do Parceiro"
            variant="primary"
            onPress={handleOpenDashboard}
          />
          <Text style={styles.ctaFooterText}>
            O cadastro e gerenciamento são feitos através do nosso site.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ui.surface,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.custom['botom-tab-height'],
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.xxl,
    textAlign: 'center',
    marginTop: theme.spacing.md,
    color: colors.text.primary,
  },
  subtitle: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.md,
    textAlign: 'center',
    color: colors.text.secondary,
    marginTop: theme.spacing.sm,
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.xl,
    marginBottom: theme.spacing.md,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
    padding: theme.spacing.md,
    borderRadius: theme.borders.radius.sm,
    backgroundColor: colors.ui.background,
    borderWidth: 1,
    borderColor: colors.ui.border,
  },
  stepNumberCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.brand.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  stepNumberText: {
    color: colors.text.onBrand,
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.lg,
    marginTop: 1.5,
    marginLeft: 1.5,
  },
  stepTextContainer: {
    flex: 1,
  },
  stepTitle: {
    fontFamily: theme.fonts.family.semiBold,
    fontSize: theme.fonts.size.lg,
    marginTop: 4,
  },
  stepDescription: {
    fontFamily: theme.fonts.family.regular,
    color: colors.text.secondary,
    fontSize: theme.fonts.size.md,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.ui.background,
    padding: theme.spacing.md,
    borderRadius: theme.borders.radius.sm,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: colors.ui.border,
  },
  benefitText: {
    flex: 1,
    marginLeft: theme.spacing.md,
    fontFamily: theme.fonts.family.medium,
    fontSize: theme.fonts.size.md,
  },
  ctaContainer: {
    marginTop: theme.spacing.xs,
  },
  ctaFooterText: {
    textAlign: 'center',
    marginTop: theme.spacing.md,
    color: colors.text.secondary,
    fontSize: theme.fonts.size.sm,
  },
})

export default SaleAnnouncementScreen
