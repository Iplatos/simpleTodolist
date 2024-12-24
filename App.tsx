import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AddTasksBlock } from './components/AddTasksBlock'
import { Header } from './components/Header'

type TaskType = {
  id: string
  title: string
  description: string
  taskStatus: 'inProgress' | 'Completed' | 'Cancelled'
  deadLine: string
  location: string
}

export default function App() {
  const [inputTaskValue, setInputTaskValue] = useState('')
  const [inputDescriptionValue, setInputDescriptionValue] = useState('')
  const [inputLocationValue, setInputLocationValue] = useState('')
  const [date, setDate] = useState(new Date())
  const [tasks, setTasks] = useState<TaskType[]>([
    // { id: '1', title: 'hel1asd2l1o', description: 'some description1', taskStatus: 'inProgress' },
    // { id: '2', title: 'hello2', description: 'some description2', taskStatus: 'Completed' },
    // { id: '3', title: 'hello3', description: 'some description3', taskStatus: 'Cancelled' },
    // {
    //   id: '4',
    //   title: 'hello4',
    //   description:
    //     'some descriptsome description4some description4some description4some descripti on4some descript ion4some descrip tion4some descript ion4ion4',
    //   taskStatus: 'Completed',
    // },
  ])
  const [taskIdDescription, setTaskIdDescription] = useState('')
  const [showAddTaskBlock, setShowAddTaskBlock] = useState(false)

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

  const createTask = () => {
    const newTask: TaskType = {
      id: new Date().toISOString(),
      title: inputTaskValue,
      description: inputDescriptionValue,
      taskStatus: 'inProgress',
      deadLine: date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear(),
      location: inputLocationValue,
    }
    setTasks([newTask, ...tasks])
    storeTasks(tasks)
  }
  const deleteTask = (taskId: string) => {
    const newTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(newTasks)
    storeTasks(tasks)
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header setShowAddTaskBlock={setShowAddTaskBlock} showAddTaskBlock={showAddTaskBlock} />
        {showAddTaskBlock && (
          <AddTasksBlock
            inputTaskValue={inputTaskValue}
            setInputTaskValue={setInputTaskValue}
            inputDescriptionValue={inputDescriptionValue}
            setInputDescriptionValue={setInputDescriptionValue}
            inputLocationValue={inputLocationValue}
            setInputLocationValue={setInputLocationValue}
            date={date}
            setDate={setDate}
            createTask={createTask}
          />
        )}
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
                    task.id !== taskIdDescription
                      ? styles.image
                      : [styles.image, styles.reverseImage]
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
              <TouchableOpacity onPress={() => deleteTask(task.id)}>
                <Image
                  style={[styles.image, { position: 'relative', left: 25 }]}
                  source={require('./assets/close-cross-in-circular-outlined-interface-button-58253.png')}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f5f5f5' },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  tasksContainer: {
    width: '100%',
    alignItems: 'flex-start',
    marginLeft: 32,
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
    width: '85%',
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
