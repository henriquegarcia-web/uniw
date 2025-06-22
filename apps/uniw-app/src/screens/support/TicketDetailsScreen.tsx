// src/screens/support/TicketDetailsScreen.tsx

import React, { useMemo, useState } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import type { TicketDetailsScreenProps } from '@uniw/shared-types'
import { themeApp as theme, colors } from '@uniw/shared-constants'
import { useHelpCenter } from '@/contexts/HelpCenterProvider'
import { getTicketById, getTicketsByUserId } from '@/utils/mockGetters' // Usando getters para simplicidade
import { useClientAuth } from '@/contexts/ClientAuthProvider'

const TicketDetailsScreen = ({ route }: TicketDetailsScreenProps) => {
  const { ticketId } = route.params
  const { user } = useClientAuth()
  const [newMessage, setNewMessage] = useState('')

  // Em um app real, o `useHelpCenter` poderia ter um `currentTicket` no estado.
  // Para manter simples, vamos buscar dos mocks/tickets já carregados.
  const ticket = useMemo(() => getTicketById(ticketId), [ticketId, user])

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return
    // Lógica para enviar a mensagem via `useHelpCenter`
    console.log(`Enviando mensagem para ticket ${ticketId}:`, newMessage)
    setNewMessage('')
  }

  if (!ticket) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Ticket não encontrado.</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >
        <Text style={styles.subjectTitle}>{ticket.subject}</Text>
        <FlatList
          data={ticket.messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageBubble,
                item.author === 'user' ? styles.userBubble : styles.supportBubble,
              ]}
            >
              <Text style={item.author === 'user' ? styles.userText : styles.supportText}>
                {item.content}
              </Text>
              <Text style={styles.messageDate}>
                {new Date(item.createdAt).toLocaleString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </View>
          )}
          contentContainerStyle={styles.messagesContainer}
          inverted // Começa do fim da lista
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Digite sua mensagem..."
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
            <MaterialCommunityIcons
              name="send-circle"
              size={36}
              color={colors.brand.secondary}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.ui.surface },
  errorText: { textAlign: 'center', marginTop: 50 },
  subjectTitle: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.lg,
    padding: theme.spacing.md,
    backgroundColor: colors.ui.background,
    borderBottomWidth: 1,
    borderColor: colors.ui.border,
  },
  messagesContainer: { padding: theme.spacing.md, flexDirection: 'column-reverse' },
  messageBubble: {
    maxWidth: '80%',
    padding: theme.spacing.md,
    borderRadius: theme.borders.radius.sm,
    marginBottom: theme.spacing.md,
  },
  userBubble: {
    backgroundColor: colors.brand.secondary,
    alignSelf: 'flex-end',
  },
  supportBubble: {
    backgroundColor: colors.ui.background,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: colors.ui.border,
  },
  userText: { color: colors.text.onBrand },
  supportText: { color: colors.text.primary },
  messageDate: {
    fontSize: 10,
    color: colors.text.secondary,
    alignSelf: 'flex-end',
    marginTop: theme.spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.sm,
    borderTopWidth: 1,
    borderColor: colors.ui.border,
    backgroundColor: colors.ui.background,
  },
  textInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    backgroundColor: colors.ui.surface,
    borderRadius: theme.borders.radius.full,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 10,
  },
  sendButton: { marginLeft: theme.spacing.sm },
})

export default TicketDetailsScreen
