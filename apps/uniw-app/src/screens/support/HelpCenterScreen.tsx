// src/screens/support/HelpCenterScreen.tsx

import React, { useMemo, useState } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import type { HelpCenterScreenProps } from '@uniw/shared-types'
import { themeApp as theme, colors } from '@uniw/shared-constants'
import { InputSearch } from '@/components/forms/InputSearch'
import { Button } from '@/components/forms/Button'
import { getHelpArticles, getHelpCategories } from '@/utils/mockGetters'
import { ProfileHeader } from '@/components/ProfileHeader'

const HelpCenterScreen = ({ navigation }: HelpCenterScreenProps) => {
  const [searchQuery, setSearchQuery] = useState('')

  const categories = useMemo(() => getHelpCategories(), [])
  const popularArticles = useMemo(() => getHelpArticles(3), []) // Pega os 3 mais populares

  const handleSearch = () => {
    // A navegação para resultados de busca da ajuda pode ser uma nova tela ou um modal
    console.log('Buscando por:', searchQuery)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Como podemos ajudar?</Text>
          <InputSearch
            placeholder="Pesquisar na Central de Ajuda"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
        </View>

        <View style={styles.section}>
          <ProfileHeader title="Tópicos de Ajuda" />
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                onPress={() =>
                  navigation.navigate('HelpTopicDetails', { categoryId: category.id })
                }
              >
                <MaterialCommunityIcons
                  name={category.icon}
                  size={28}
                  color={colors.brand.secondary}
                />
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <ProfileHeader title="Perguntas Frequentes" />
          {popularArticles.map((article) => (
            <TouchableOpacity
              key={article.id}
              style={styles.articleItem}
              onPress={() =>
                navigation.navigate('HelpArticleDetails', { articleId: article.id })
              }
            >
              <Text style={styles.articleTitle}>{article.title}</Text>
              <MaterialCommunityIcons
                name="chevron-right"
                size={22}
                color={colors.text.tertiary}
              />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <Button
            title="Meus Chamados"
            variant="primary"
            onPress={() => navigation.navigate('TicketHistory')}
            style={{ width: '100%', height: 50 }}
          />
          <Text style={styles.footerText}>Não encontrou o que procurava?</Text>
          <Button
            title="Fale Conosco"
            variant="secondary"
            onPress={() => navigation.navigate('ContactSupport', {})}
            style={{ width: '100%', height: 50 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.ui.surface },
  contentContainer: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.custom['botom-tab-height'],
  },
  header: { marginBottom: theme.spacing.lg, alignItems: 'center' },
  title: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.xl,
    marginBottom: theme.spacing.md,
  },
  section: { marginVertical: theme.spacing.sm },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: colors.ui.background,
    padding: theme.spacing.md,
    borderRadius: theme.borders.radius.sm,
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: colors.ui.border,
  },
  categoryName: {
    fontFamily: theme.fonts.family.semiBold,
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
  articleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.ui.background,
    padding: theme.spacing.md,
    borderRadius: theme.borders.radius.sm,
    marginBottom: theme.spacing.xs,
    borderWidth: 1,
    borderColor: colors.ui.border,
  },
  articleTitle: {
    flex: 1,
    fontFamily: theme.fonts.family.medium,
    fontSize: theme.fonts.size.md,
  },
  footer: { marginTop: theme.spacing.md, alignItems: 'center' },
  footerText: { marginVertical: theme.spacing.md, color: colors.text.secondary },
})

export default HelpCenterScreen
