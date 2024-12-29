import AsyncStorage from '@react-native-async-storage/async-storage'
import { TaskType } from '../types/types'

export const readTasks = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('tasks')
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch (error) {
    console.error('Ошибка при чтении задач', error)
  }
}

export const storeTasks = async (tasks: TaskType[]) => {
  try {
    const jsonValue = JSON.stringify(tasks)
    await AsyncStorage.setItem('tasks', jsonValue)
  } catch (error) {
    console.error('Ошибка при сохранении задач', error)
  }
}
