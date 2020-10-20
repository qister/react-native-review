import React, { useContext, useState } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { Navbar } from './components/Navbar'
import { TodoContext } from './context/todo/todoContext'

import { THEME } from './theme'

export const MainLayout = () => {
  const {todos, addTodo, removeTodo, updateTodo} = useContext(TodoContext)
  const [todoId, setTodoId] = useState(null)
  // const [todos, setTodos] = useState([
  //   { id: '1', title: 'Выучить реакт нейтив' },
  // ])

  // const addTodo = (title) => {
  //   setTodos((prev) => [
  //     ...prev,
  //     {
  //       id: Date.now().toString(),
  //       title,
  //     },
  //   ])
  // }

  // const removeTodo = (id) => {
  //   const todo = todos.find((t) => t.id === id)
  //   Alert.alert(
  //     'Удаление элемента',
  //     `Вы уверены, что хотите удалить "${todo.title}"?`,
  //     [
  //       {
  //         text: 'Отмена',
  //         style: 'cancel',
  //       },
  //       {
  //         text: 'Удалить',
  //         style: 'destructive',
  //         onPress: () => {
  //           setTodoId(null)
  //           setTodos((prev) => prev.filter((todo) => todo.id !== id))
  //         },
  //       },
  //     ],
  //     { cancelable: false },
  //   )
  // }

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
