import React, { useContext, useReducer } from 'react'
import { Alert } from 'react-native'
import { ScreenContext } from '../screen/screenContext'
import {
  ADD_TODO,
  CLEAR_ERROR,
  FETCH_TODOS,
  HIDE_LOADER,
  REMOVE_TODO,
  SHOW_ERROR,
  SHOW_LOADER,
  UPDATE_TODO,
} from '../types'
import { TodoContext } from './todoContext'
import { todoReducer } from './todoReducer'

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null,
  }

  const { changeScreen } = useContext(ScreenContext)
  const [state, dispatch] = useReducer(todoReducer, initialState)

  const addTodo = async (title) => {
    const response = await fetch(
      'https://react-native-todo-app-5db5e.firebaseio.com/todos.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      },
    )
    const data = await response.json()
    console.log('ID: ', data.name)
    dispatch({ type: ADD_TODO, title, id: data.name })
  }

  const removeTodo = (id) => {
    const todo = state.todos.find((t) => t.id === id)
    Alert.alert(
      'Удаление элемента',
      `Вы уверены, что хотите удалить "${todo.title}"?`,
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: () => {
            changeScreen(null)
            dispatch({ type: REMOVE_TODO, id })
          },
        },
      ],
      { cancelable: false },
    )
  }

  const updateTodo = async (id, title) => {
    clearError()
    try {
      await fetch(
        `https://react-native-todo-app-5db5e.firebaseio.com/todos/${id}.json`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title }),
        },
      )
      dispatch({ type: UPDATE_TODO, id, title })
    } catch (e) {
      showError('Что-то пошло не так...')
    }
  }

  const showLoader = () => dispatch({ type: SHOW_LOADER })

  const hideLoader = () => dispatch({ type: HIDE_LOADER })

  const showError = (error) => dispatch({ type: SHOW_ERROR, error })

  const clearError = () => dispatch({ type: CLEAR_ERROR })

  const fetchTodos = async () => {
    showLoader()
    clearError()
    try {
      const response = await fetch(
        'https://react-native-todo-app-5db5e.firebaseio.com/todos.json',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      const data = await response.json()
      // console.log('Fetch Data: ', data)
      const todos = Object.keys(data).map((key) => ({ ...data[key], id: key }))
      dispatch({ type: FETCH_TODOS, todos })
    } catch (e) {
      showError('Что-то пошло не так, попробуйте снова')
      console.log(e)
    } finally {
      hideLoader()
    }
  }

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}
