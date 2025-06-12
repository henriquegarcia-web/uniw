// src/components/EditableUserPicture.tsx

import React from 'react'

import { theme } from '@/styles/theme'
import { Image, StyleSheet, View } from 'react-native'
import { ButtonEdit } from './ButtonEdit'

interface EditableUserPictureProps {}

export const EditableUserPicture = ({}: EditableUserPictureProps) => {
  return (
    <View style={styles.pictureContainer}>
      <View style={styles.pictureWrapper}>
        <Image source={require('@/assets/images/avatar.jpg')} style={styles.picture} />

        <View style={styles.pictureEdit}>
          <ButtonEdit onPress={() => {}} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  pictureContainer: {
    alignItems: 'center',
  },
  pictureWrapper: {
    position: 'relative',
  },
  picture: {
    width: 100,
    height: 100,
    borderRadius: theme.borders.radius.circle,
  },
  pictureEdit: {
    position: 'absolute',
    top: -2,
    right: -2,
  },
})
