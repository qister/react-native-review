import React, {useState} from 'react'
import {View, StyleSheet, } from 'react-native'
import { Navbar } from './components/Navbar'

import { THEME } from './theme'

export const MainLayout = () => {

  const [todoId, setTodoId] = useState(null)
  const [todos, setTodos] = useState([
    // { id: '1', title: 'Выучить реакт нейтив' },
  ])

  let content = (
    <MainScreen
      todos={todos}
      addTodo={addTodo}
      removeTodo={removeTodo}
      openTodo={setTodoId}
    />
  )

  if (todoId) {
    const selectedTodo = todos.find((todo) => todo.id === todoId)
    content = (
      <TodoScreen
        onRemove={removeTodo}
        goBack={() => setTodoId(null)}
        todo={selectedTodo}
        onSave={updateTodo}
      />
    )
  }

  return (
    <View>
      <Navbar title='todoApp' />
      <View style={styles.container}>{content}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20,
  },
})