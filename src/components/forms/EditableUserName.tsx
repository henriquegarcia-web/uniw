// src/components/EditableUserName.tsx

import React from 'react'
import { Text, StyleSheet, View } from 'react-native'

import { theme } from '@/styles/theme'
import { ButtonEdit } from './ButtonEdit'

interface EditableUserNameProps {}

export const EditableUserName = ({}: EditableUserNameProps) => {
  return (
    <View style={styles.nameContainer}>
      <View style={styles.nameWrapper}>
        <Text style={styles.name}>Henrique Pereira Garcia</Text>

        <View style={styles.nameEdit}>
          <ButtonEdit size="sm" onPress={() => {}} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  nameContainer: {
    alignItems: 'center',
  },
  nameWrapper: {
    position: 'relative',
  },
  name: {
    fontFamily: theme.fonts.family.semiBold,
    fontSize: theme.fonts.size.md,
    lineHeight: theme.fonts.size.lg,
    borderRadius: theme.borders.radius.circle,
  },
  nameEdit: {
    position: 'absolute',
    top: -9,
    right: -17,
  },
})
