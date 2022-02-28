import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
  return <Image source={require('../../../assets/auth/logo.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 115,
    height: 135,
    marginBottom: 8,
  },
})
