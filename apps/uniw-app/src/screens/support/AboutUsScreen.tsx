// src/screens/support/AboutUsScreen.tsx

import React from 'react'
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native'
import { Feather } from '@expo/vector-icons'

import type { AboutUsScreenProps } from '@uniw/shared-types'
import { themeApp as theme, colors } from '@uniw/shared-constants'
import { ProfileHeader } from '@/components/ProfileHeader'

// Subcomponente para cada item de "Nossos Valores"
const ValueItem = ({
  icon,
  title,
  description,
}: {
  icon: keyof typeof Feather.glyphMap
  title: string
  description: string
}) => (
  <View style={styles.valueItem}>
    <View style={styles.valueIconContainer}>
      <Feather name={icon} size={24} color={colors.brand.secondary} />
    </View>
    <View style={styles.valueTextContainer}>
      <Text style={styles.valueTitle}>{title}</Text>
      <Text style={styles.valueDescription}>{description}</Text>
    </View>
  </View>
)

const AboutUsScreen = ({ navigation }: AboutUsScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Seção Hero com a imagem e o título principal */}
        <View style={styles.header}>
          <Image
            source={require('@/assets/uniw_logo.png')} // Reutilizando o logo
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Unindo Clientes e Negócios</Text>
          <Text style={styles.subtitle}>
            Nossa missão é criar a ponte perfeita entre você e os melhores serviços e
            produtos do mercado.
          </Text>
        </View>

        {/* Seção "Nossa História" */}
        <View style={styles.section}>
          <ProfileHeader title="Nossa História" />
          <Text style={styles.paragraph}>
            A UNIW nasceu da simples ideia de que encontrar serviços de qualidade e
            produtos autênticos não deveria ser complicado. Observamos a necessidade de
            uma plataforma que não apenas listasse negócios, mas que criasse uma
            comunidade real, baseada na confiança e na excelência.
          </Text>
          <Text style={styles.paragraph}>
            Desde o início, nosso foco tem sido empoderar tanto os clientes, dando-lhes
            acesso fácil e seguro, quanto os lojistas e fornecedores, oferecendo
            ferramentas para que seus negócios prosperem.
          </Text>
        </View>

        {/* Seção "Nossos Valores" */}
        <View style={styles.section}>
          <ProfileHeader title="Nossos Valores" />
          <ValueItem
            icon="link"
            title="Conexão"
            description="Criamos laços duradouros entre clientes e empresas, promovendo confiança e lealdade."
          />
          <ValueItem
            icon="zap"
            title="Inovação"
            description="Buscamos constantemente as melhores tecnologias para simplificar a vida dos nossos usuários."
          />
          <ValueItem
            icon="shield"
            title="Confiança"
            description="Garantimos um ambiente seguro para transações, avaliações e interações."
          />
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
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    padding: theme.spacing.md,
    backgroundColor: colors.ui.background,
    borderRadius: theme.borders.radius.sm,
    borderWidth: 1,
    borderColor: colors.ui.border,
  },
  logo: {
    width: 120,
    height: 60,
    marginBottom: theme.spacing.md,
  },
  title: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.xl,
    textAlign: 'center',
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
  paragraph: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.md,
    lineHeight: 24,
    color: colors.text.secondary,
    marginBottom: theme.spacing.md,
  },
  valueItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: theme.spacing.sm,
  },
  valueIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.ui.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
    borderWidth: 1,
    borderColor: colors.ui.border,
  },
  valueTextContainer: {
    flex: 1,
  },
  valueTitle: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.lg,
    color: colors.text.primary,
  },
  valueDescription: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.md,
    color: colors.text.secondary,
    marginTop: 2,
  },
})

export default AboutUsScreen
