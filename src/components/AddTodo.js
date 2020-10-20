import React from 'react'
import { StyleSheet, View, TextInput, Button, Alert, Keyboard } from 'react-native'
import { useState } from 'react'
import {AntDesign} from '@expo/vector-icons'

import { THEME } from '../theme'

export const AddTodo = ({ onSubmit }) => {
  const [value, setValue] = useState('')

  const pressHandler = () => {
    if (value.trim()) {
      onSubmit(value)
      setValue('')
      Keyboard.dismiss()
    } else {
      Alert.alert('Название не может быть пустым')
    }

  }

  return (
    <View style={styles.block}>
      <TextInput
        style={styles.input}
        onChangeText={setValue}
        value={value}
        placeholder='Введите название дела...'
        autoCapitalize='none'
        autoCorrect={false}
        // keyboardType='number-pad'
      />
      {/* <Button title='Добавить' onPress={pressHandler} /> */}
      <AntDesign.Button onPress={pressHandler} name='pluscircleo'>
        Добавить
      </AntDesign.Button>
    </View>
  )
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    width: '60%',
    padding: 10,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: THEME.MAIN_COLOR,
  },
})
