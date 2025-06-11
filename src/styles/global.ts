// src/styles/global.ts

import { StyleSheet, Platform } from 'react-native'
import { theme } from './theme'

export const globalStyles = StyleSheet.create({
  // Container principal para telas
  screenContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
  },

  // Estilo para títulos principais de tela
  title: {
    fontSize: theme.fonts.size['2xl'],
    fontFamily: theme.fonts.family.bold,
    fontWeight: theme.fonts.weights.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },

  // Estilo para subtítulos ou texto de destaque
  subtitle: {
    fontSize: theme.fonts.size.lg,
    fontFamily: theme.fonts.family.medium,
    fontWeight: theme.fonts.weights.medium,
    color: theme.colors.text_secondary,
    marginBottom: theme.spacing.md,
  },

  // Estilo base para inputs de texto
  input: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderWidth: theme.borders.width.thin,
    borderRadius: theme.borders.radius.sm,
    padding: theme.spacing.md,
    fontSize: theme.fonts.size.md,
    fontFamily: theme.fonts.family.regular,
    color: theme.colors.text,
  },

  // Estilo para um card com sombra
  card: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borders.radius.md,
    padding: theme.spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
})
