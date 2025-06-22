// src/screens/support/PoliciesScreen.tsx

import React from 'react'
import { StyleSheet, SafeAreaView, Text, View, ScrollView } from 'react-native'

import type { PoliciesScreenProps } from '@uniw/shared-types'
import { themeApp as theme, colors } from '@uniw/shared-constants'
import { ProfileHeader } from '@/components/ProfileHeader' // Reutilizando o header de seção

const PoliciesScreen = ({ navigation }: PoliciesScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Políticas da UNIW</Text>
          <Text style={styles.lastUpdated}>Última atualização: 14 de Junho, 2025</Text>
        </View>

        {/* Seção de Política de Privacidade */}
        <View style={styles.section}>
          <ProfileHeader title="1. Política de Privacidade" />
          <Text style={styles.paragraph}>
            Bem-vindo à UNIW. Sua privacidade é de extrema importância para nós. Esta
            Política de Privacidade descreve como coletamos, usamos, processamos e
            divulgamos suas informações, incluindo dados pessoais, em conjunto com seu
            acesso e uso da plataforma UNIW.
          </Text>
          <Text style={styles.paragraph}>
            Coletamos informações que você nos fornece diretamente ao se cadastrar, como
            nome, e-mail, CPF e telefone. Também coletamos informações de transações,
            incluindo produtos comprados, serviços agendados e detalhes de pagamento. Os
            dados de uso, como suas buscas e interações, nos ajudam a personalizar sua
            experiência. Não compartilhamos seus dados pessoais com terceiros para fins de
            marketing sem o seu consentimento explícito.
          </Text>
        </View>

        {/* Seção de Termos de Uso */}
        <View style={styles.section}>
          <ProfileHeader title="2. Termos de Uso" />
          <Text style={styles.paragraph}>
            Ao acessar e usar a plataforma UNIW, você concorda em cumprir e se vincular a
            estes Termos de Uso. Estes termos regem seu acesso e uso do aplicativo móvel,
            do site e de todos os serviços associados.
          </Text>
          <Text style={styles.paragraph}>
            Você concorda em não usar a plataforma para fins ilegais ou não autorizados. É
            sua responsabilidade garantir que as informações da sua conta permaneçam
            confidenciais. A UNIW não se responsabiliza pela qualidade dos produtos ou
            serviços fornecidos pelos lojistas, mas mediaremos disputas e garantiremos que
            as avaliações reflitam experiências genuínas para manter a integridade da
            comunidade.
          </Text>
        </View>

        {/* Seção de Política de Devolução e Reembolso */}
        <View style={styles.section}>
          <ProfileHeader title="3. Política de Devolução" />
          <Text style={styles.paragraph}>
            Entendemos que, às vezes, um produto pode não ser o que você esperava. Nossa
            política de devolução visa tornar esse processo o mais simples possível. Os
            produtos podem ser devolvidos dentro de 7 (sete) dias corridos após o
            recebimento, desde que estejam em sua condição original, sem uso e na
            embalagem original.
          </Text>
          <Text style={styles.paragraph}>
            Para iniciar uma devolução, acesse seu "Histórico de Compras", selecione o
            pedido e siga as instruções. O reembolso será processado para o método de
            pagamento original após o recebimento e inspeção do item devolvido pelo
            lojista. Custos de frete de devolução podem ser aplicados, dependendo da
            política específica do lojista.
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
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.custom['botom-tab-height'],
  },
  header: {
    marginBottom: theme.spacing.lg,
    alignItems: 'center',
  },
  title: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.xxl,
    color: colors.text.primary,
    textAlign: 'center',
  },
  lastUpdated: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.sm,
    color: colors.text.secondary,
    marginTop: theme.spacing.xs,
  },
  section: {
    marginBottom: theme.spacing.md,
  },
  paragraph: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.md,
    color: colors.text.secondary,
    lineHeight: 24, // Melhora a legibilidade de textos longos
    textAlign: 'justify',
  },
})

export default PoliciesScreen
