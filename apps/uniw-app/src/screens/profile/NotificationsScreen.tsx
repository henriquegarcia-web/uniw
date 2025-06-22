// src/screens/profile/NotificationsScreen.tsx

import React, { useState } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import type { NotificationsScreenProps } from '@/navigation/types'
import { theme } from '@/styles/theme'
import {
  mockNotifications,
  INotification,
  getNotificationTypeData,
} from '@/types/notifications'
import { ProfileHeader } from '@/components/ProfileHeader'

// --- Subcomponente para cada item da lista ---
const NotificationItem = ({
  notification,
  onPress,
}: {
  notification: INotification
  onPress: () => void
}) => {
  const typeData = getNotificationTypeData(notification.type)

  return (
    <TouchableOpacity
      style={[styles.itemContainer, !notification.isRead && styles.unreadItem]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: typeData.color }]}>
        <MaterialCommunityIcons name={typeData.icon} size={24} color="white" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {notification.title}
        </Text>
        <Text style={styles.body} numberOfLines={2}>
          {notification.body}
        </Text>
      </View>
      {!notification.isRead && <View style={styles.unreadIndicator} />}
    </TouchableOpacity>
  )
}

// --- Componente Principal da Tela ---
const NotificationsScreen = ({ navigation }: NotificationsScreenProps) => {
  // Em um app real, este estado viria de um contexto ou API
  const [notifications, setNotifications] = useState(mockNotifications)

  const handleNotificationPress = (notification: INotification) => {
    // Marca a notificação como lida ao ser clicada
    const updatedNotifications = notifications.map((n) =>
      n.id === notification.id ? { ...n, isRead: true } : n,
    )
    setNotifications(updatedNotifications)

    // Navega para a tela de detalhes
    navigation.navigate('NotificationDetails', { notificationId: notification.id })
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NotificationItem
            notification={item}
            onPress={() => handleNotificationPress(item)}
          />
        )}
        contentContainerStyle={styles.contentContainer}
        // ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={<ProfileHeader title="Caixa de Entrada" />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhuma notificação por aqui.</Text>
          </View>
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: theme.spacing['4xl'],
    backgroundColor: theme.colors.surface,
  },
  contentContainer: {
    padding: theme.spacing.lg,
  },
  itemContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
    borderRadius: theme.borders.radius.sm,
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  unreadItem: {
    backgroundColor: '#F7F4FF', // Um fundo sutil para não lidas
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.md,
  },
  body: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.sm,
    color: theme.colors.text_secondary,
    marginTop: 2,
  },
  unreadIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.secondary,
    marginLeft: theme.spacing.md,
  },
  separator: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginLeft: theme.spacing.lg + 44 + theme.spacing.md, // Alinha com o texto
  },
  emptyContainer: {
    flex: 1,
    paddingTop: 150,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: theme.fonts.size.lg,
    color: theme.colors.text_secondary,
  },
})

export default NotificationsScreen
