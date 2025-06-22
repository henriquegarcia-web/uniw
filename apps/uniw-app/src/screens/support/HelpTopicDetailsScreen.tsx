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

import type { HelpTopicDetailsScreenProps } from '@/navigation/types'
import { theme } from '@/styles/theme'
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
              color={theme.colors.secondary}
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
              color={theme.colors.text_tertiary}
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
  container: { flex: 1, backgroundColor: theme.colors.surface },
  contentContainer: { padding: theme.spacing.lg, paddingBottom: theme.spacing['3xl'] },
  header: {
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderRadius: theme.borders.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  title: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.xl,
    marginTop: theme.spacing.sm,
  },
  description: {
    fontFamily: theme.fonts.family.regular,
    color: theme.colors.text_secondary,
    marginTop: theme.spacing.xs,
    textAlign: 'center',
  },
  articleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
    borderRadius: theme.borders.radius.sm,
    marginBottom: theme.spacing.xs,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  articleTitle: {
    flex: 1,
    fontFamily: theme.fonts.family.medium,
    fontSize: theme.fonts.size.md,
  },
})

export default HelpTopicDetailsScreen
