import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { StyleSheet, Image, Text, TextInput, View, TouchableOpacity, Button } from 'react-native'
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage'
type TaskType = {
  id: string
  title: string
  description: string
  taskStatus: 'inProgress' | 'Completed' | 'Cancelled'
}
// [
//   { id: '1', title: 'hel1asd2l1o', description: 'some description1', taskStatus: 'inProgress' },
//   { id: '2', title: 'hello2', description: 'some description2', taskStatus: 'Completed' },
//   { id: '3', title: 'hello3', description: 'some description3', taskStatus: 'Cancelled' },
//   {
//     id: '4',
//     title: 'hello4',
//     description:
//       'some descriptsome description4some description4some description4some descripti on4some descript ion4some descrip tion4some descript ion4ion4',
//     taskStatus: 'Completed',
//   },
// ]
export default function App() {
  const [inputValue, setInputValue] = useState('')

  const [tasks, setTasks] = useState<TaskType[]>([])
  const [taskIdDescription, setTaskIdDescription] = useState('')

  const showDescription = (id: string) => {
    console.log(id)
    id === taskIdDescription ? hideDescription() : setTaskIdDescription(id)
  }
  const hideDescription = () => {
    setTaskIdDescription('0')
  }
  const storeTasks = async (tasks: TaskType[]) => {
    try {
      const jsonValue = JSON.stringify(tasks)
      await AsyncStorage.setItem('tasks', jsonValue)
    } catch (error) {
      console.error('Ошибка при сохранении задач', error)
    }
  }
  const readTasks = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('tasks')
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (error) {
      console.error('Ошибка при чтении задач', error)
    }
  }
  useEffect(() => {
    const initializeTasks = async () => {
      const storedTasks = await readTasks()
      console.log(storedTasks)
      if (storedTasks) {
        setTasks(storedTasks)
      } else {
        console.log('error cant find tasks')
      }
    }
    initializeTasks()
  }, [])
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={[styles.textInput, globalStyle.border]}
          value={inputValue}
          onChangeText={setInputValue}
        />
        <Button title="Add task"></Button>
      </View>
      {/* <TouchableOpacity onPress={() => storeTasks(tasks)}>
        <Text>Click</Text>
      </TouchableOpacity> */}
      <View style={styles.tasksContainer}>
        {tasks.map((task) => (
          <View style={[styles.tasksList, globalStyle.border]} key={task.id}>
            <View>
              <Text>{task.title}</Text>
            </View>
            {/* подумать как это сделать */}
            <TouchableOpacity onPress={() => showDescription(task.id)}>
              <Image
                style={
                  task.id !== taskIdDescription ? styles.image : [styles.image, styles.reverseImage]
                }
                source={require('./assets/free-icon-down-arrow-5772127.png')}
              />
            </TouchableOpacity>
            <Image style={styles.image} source={require('./assets/work-in-progress.png')} />
            {task.id === taskIdDescription && (
              <View style={styles.description}>
                <Text onPress={hideDescription}>{task.description}</Text>
              </View>
            )}
          </View>
        ))}
      </View>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tasksContainer: {
    width: '80%',
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: 'red',
    width: 200,
    fontSize: 18,
    padding: 10,
  },
  tasksList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'yellow',
    width: '60%',
    marginVertical: 3,
  },
  description: {
    backgroundColor: 'green',
    position: 'absolute',
    zIndex: 1,
    width: 120,
    top: 19,
    left: 25,
  },
  image: {
    width: 16,
    height: 16,
  },
  reverseImage: {
    transform: [{ rotate: '180deg' }],
  },
})

const globalStyle = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
  },
})
