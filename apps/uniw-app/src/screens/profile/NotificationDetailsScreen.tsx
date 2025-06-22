// src/screens/profile/NotificationDetailsScreen.tsx

import React, { useMemo } from 'react'
import { StyleSheet, SafeAreaView, Text, View, ScrollView } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import type {
  NotificationDetailsScreenProps,
  AppStackParamList,
} from '@/navigation/types'
import { theme } from '@/styles/theme'
import { getNotificationTypeData } from '@/types/notifications'
import { Button } from '@/components/forms/Button'
import { getNotificationById } from '@/utils/mockGetters'

const NotificationDetailsScreen = ({ route }: NotificationDetailsScreenProps) => {
  const { notificationId } = route.params
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()

  // Busca os dados da notificação específica
  const notification = useMemo(
    () => getNotificationById(notificationId),
    [notificationId],
  )

  if (!notification) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Notificação não encontrada.</Text>
      </SafeAreaView>
    )
  }

  const typeData = getNotificationTypeData(notification.type)
  const notificationDate = new Date(notification.createdAt).toLocaleString('pt-BR', {
    dateStyle: 'long',
    timeStyle: 'short',
  })

  const handleLinkPress = () => {
    if (notification?.link) {
      const { screen, params } = notification.link
      navigation.navigate(screen as any, params as any)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: typeData.color }]}>
            <MaterialCommunityIcons name={typeData.icon} size={28} color="white" />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>{notification.title}</Text>
            <Text style={styles.date}>{notificationDate}</Text>
          </View>
        </View>

        <Text style={styles.content}>{notification.content}</Text>

        {notification.link && (
          <Button
            title="Ver Mais Detalhes"
            onPress={handleLinkPress}
            style={{ marginTop: 20 }}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    padding: theme.spacing.lg,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.xl,
  },
  date: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.sm,
    color: theme.colors.text_secondary,
  },
  content: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.md,
    lineHeight: 24,
    color: theme.colors.text,
    marginTop: theme.spacing.lg,

    // borderWidth: 1,
  },
})

export default NotificationDetailsScreen
