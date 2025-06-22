// src/screens/support/HelpTopicDetailsScreen.tsx

import React, { useMemo } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import type { HelpTopicDetailsScreenProps } from '@uniw/shared-types'
import { themeApp as theme, colors } from '@uniw/shared-constants'
import { getHelpArticlesByCategoryId, getHelpCategoryById } from '@/utils/mockGetters'
import { ListEmptyMessage } from '@/components/ListEmptyMessage'

const HelpTopicDetailsScreen = ({ navigation, route }: HelpTopicDetailsScreenProps) => {
  const { categoryId } = route.params

  const category = useMemo(() => getHelpCategoryById(categoryId), [categoryId])
  const articles = useMemo(() => getHelpArticlesByCategoryId(categoryId), [categoryId])

  if (!category) {
    return (
      <SafeAreaView style={styles.container}>
        <ListEmptyMessage message="Tópico não encontrado." />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={articles}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.header}>
            <MaterialCommunityIcons
              name={category.icon}
              size={40}
              color={colors.brand.secondary}
            />
            <Text style={styles.title}>{category.name}</Text>
            <Text style={styles.description}>{category.description}</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.articleItem}
            onPress={() =>
              navigation.navigate('HelpArticleDetails', { articleId: item.id })
            }
          >
            <Text style={styles.articleTitle}>{item.title}</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={22}
              color={colors.text.tertiary}
            />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={
          <ListEmptyMessage message="Nenhum artigo encontrado neste tópico." />
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.ui.surface },
  contentContainer: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.custom['botom-tab-height'],
  },
  header: {
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    alignItems: 'center',
    backgroundColor: colors.ui.background,
    borderRadius: theme.borders.radius.sm,
    borderWidth: 1,
    borderColor: colors.ui.border,
  },
  title: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.xl,
    marginTop: theme.spacing.sm,
  },
  description: {
    fontFamily: theme.fonts.family.regular,
    color: colors.text.secondary,
    marginTop: theme.spacing.xs,
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
})

export default HelpTopicDetailsScreen
