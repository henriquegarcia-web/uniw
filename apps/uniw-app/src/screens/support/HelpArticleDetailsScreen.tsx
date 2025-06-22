// src/screens/support/HelpArticleDetailsScreen.tsx

import React, { useMemo, useState } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { Feather } from '@expo/vector-icons'

import type { HelpArticleDetailsScreenProps } from '@/navigation/types'
import { theme } from '@/styles/theme'
import { getHelpArticleById } from '@/utils/mockGetters'

const HelpArticleDetailsScreen = ({ route }: HelpArticleDetailsScreenProps) => {
  const { articleId } = route.params
  const article = useMemo(() => getHelpArticleById(articleId), [articleId])
  const [feedbackSent, setFeedbackSent] = useState(false)

  if (!article) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Artigo não encontrado.</Text>
      </SafeAreaView>
    )
  }

  const handleFeedback = () => {
    setFeedbackSent(true)
    // Aqui você enviaria o feedback para sua análise
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.content}>{article.content}</Text>

        <View style={styles.feedbackContainer}>
          {feedbackSent ? (
            <Text style={styles.feedbackThanks}>Obrigado pelo seu feedback!</Text>
          ) : (
            <>
              <Text style={styles.feedbackQuestion}>Este artigo foi útil?</Text>
              <View style={styles.feedbackButtons}>
                <TouchableOpacity style={styles.button} onPress={handleFeedback}>
                  <Feather name="thumbs-up" size={20} color={theme.colors.success} />
                  <Text style={[styles.buttonText, { color: theme.colors.success }]}>
                    Sim
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleFeedback}>
                  <Feather name="thumbs-down" size={20} color={theme.colors.error} />
                  <Text style={[styles.buttonText, { color: theme.colors.error }]}>
                    Não
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.surface },
  contentContainer: { padding: theme.spacing.lg, paddingBottom: theme.spacing['3xl'] },
  errorText: { textAlign: 'center', marginTop: 50 },
  title: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.xl,
    marginBottom: theme.spacing.md,
  },
  content: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.md,
    lineHeight: 24,
    color: theme.colors.text_secondary,
  },
  feedbackContainer: {
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.lg,
    borderTopWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
  },
  feedbackQuestion: {
    fontFamily: theme.fonts.family.semiBold,
    fontSize: theme.fonts.size.md,
    marginBottom: theme.spacing.md,
  },
  feedbackButtons: { flexDirection: 'row', gap: theme.spacing.lg },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borders.radius.sm,
  },
  buttonText: { fontFamily: theme.fonts.family.medium },
  feedbackThanks: {
    fontFamily: theme.fonts.family.semiBold,
    color: theme.colors.success,
  },
})

export default HelpArticleDetailsScreen
