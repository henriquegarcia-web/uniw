// src/screens/support/TicketHistoryScreen.tsx

import React, { useCallback } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import { themeApp as theme, colors } from '@uniw/shared-constants'
import { useHelpCenter } from '@/contexts/HelpCenterProvider'
import { ListEmptyMessage } from '@/components/ListEmptyMessage'
import {
  TicketHistoryScreenProps,
  getTicketStatusData,
  ISupportTicket,
} from '@uniw/shared-types'

const TicketItem = ({
  ticket,
  onPress,
}: {
  ticket: ISupportTicket
  onPress: () => void
}) => {
  const statusInfo = getTicketStatusData(ticket.status)
  const lastUpdate = new Date(ticket.updatedAt).toLocaleDateString('pt-BR')

  return (
    <TouchableOpacity style={styles.ticketItem} onPress={onPress}>
      <View style={[styles.statusIndicator, { backgroundColor: statusInfo.color }]} />
      <View style={styles.ticketInfo}>
        <Text style={styles.ticketSubject} numberOfLines={1}>
          {ticket.subject}
        </Text>
        <Text style={styles.ticketUpdate}>Última atualização: {lastUpdate}</Text>
      </View>
      <Text style={[styles.ticketStatus, { color: statusInfo.color }]}>
        {statusInfo.label}
      </Text>
    </TouchableOpacity>
  )
}

const TicketHistoryScreen = ({ navigation }: TicketHistoryScreenProps) => {
  const { tickets, isLoading, loadUserTickets } = useHelpCenter()

  useFocusEffect(
    useCallback(() => {
      loadUserTickets()
    }, []),
  )

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.brand.secondary} />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tickets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TicketItem
            ticket={item}
            onPress={() => navigation.navigate('TicketDetails', { ticketId: item.id })}
          />
        )}
        contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={
          <ListEmptyMessage message="Você não possui chamados abertos." />
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.ui.surface },
  contentContainer: { padding: theme.spacing.lg },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  ticketItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.ui.background,
    padding: theme.spacing.md,
    borderRadius: theme.borders.radius.sm,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: colors.ui.border,
  },
  statusIndicator: {
    width: 8,
    height: '100%',
    borderRadius: 4,
    marginRight: theme.spacing.md,
  },
  ticketInfo: { flex: 1 },
  ticketSubject: { fontFamily: theme.fonts.family.bold, fontSize: theme.fonts.size.md },
  ticketUpdate: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.sm,
    color: colors.text.secondary,
  },
  ticketStatus: {
    fontFamily: theme.fonts.family.semiBold,
    fontSize: theme.fonts.size.sm,
  },
})

export default TicketHistoryScreen
