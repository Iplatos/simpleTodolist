import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, Text, View, TouchableOpacity, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Header } from './components/Header'
import { AddTasksBlock } from './components/AddTasksBlock'
import { TaskType } from './types/types'
import { createId, deadlineCorrectFormat } from './helpers/dateHelpers'
import { readTasks, storeTasks } from './tasks/asynkStorage'

export default function App() {
  const [inputTaskValue, setInputTaskValue] = useState('')
  const [inputDescriptionValue, setInputDescriptionValue] = useState('')
  const [inputLocationValue, setInputLocationValue] = useState('')
  const [date, setDate] = useState(new Date())
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [taskIdDescription, setTaskIdDescription] = useState('')
  const [showAddTaskBlock, setShowAddTaskBlock] = useState(false)

  const showDescription = (id: string) => {
    id === taskIdDescription ? hideDescription() : setTaskIdDescription(id)
  }

  const hideDescription = () => {
    setTaskIdDescription('')
  }

  const sortTasksByDate = (sort: 'asc' | 'desc') => {
    sort === 'asc'
      ? setTasks([
          ...tasks.sort((a, b) => new Date(a.deadLine).getTime() - new Date(b.deadLine).getTime()),
        ])
      : setTasks([
          ...tasks.sort((a, b) => new Date(b.deadLine).getTime() - new Date(a.deadLine).getTime()),
        ])
  }

  useEffect(() => {
    const initializeTasks = async () => {
      const storedTasks = await readTasks()
      if (storedTasks) {
        setTasks(storedTasks)
      }
    }
    initializeTasks()
  }, [])

  const createTask = () => {
    const newTask: TaskType = {
      id: createId(),
      title: inputTaskValue,
      description: inputDescriptionValue,
      taskStatus: 'inProgress',
      deadLine: date.toISOString(),
      location: inputLocationValue,
    }
    const updatedTasks = [newTask, ...tasks]
    setTasks(updatedTasks)
    storeTasks(updatedTasks)
    setInputTaskValue('')
    setInputDescriptionValue('')
    setInputLocationValue('')
    setDate(new Date())
    setTaskIdDescription('')
  }

  const changeTaskStatus = (id: string, status: 'inProgress' | 'Completed' | 'Cancelled') => {
    const statusArray: Array<'inProgress' | 'Completed' | 'Cancelled'> = [
      'inProgress',
      'Completed',
      'Cancelled',
    ]
    const index = statusArray.findIndex((currentStatus) => currentStatus === status)
    const statusNumber = index === 2 ? 0 : index + 1
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, taskStatus: statusArray[statusNumber] } : task
    )
    setTasks(newTasks)
    storeTasks(newTasks)
  }
  const deleteTask = (taskId: string) => {
    const newTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(newTasks)
    storeTasks(newTasks)
  }

  const sortByStatus = (status: string | null) => {
    if (!status) {
      sortTasksByDate('asc')
    }
    const sortedTasks = tasks.filter((task) => task.taskStatus === status)
    const sortedRestTasks = tasks.filter((task) => task.taskStatus !== status)
    setTasks([...sortedTasks, ...sortedRestTasks])
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
            sortTasksByDate={sortTasksByDate}
            sortByStatus={sortByStatus}
          />
        )}
        <View>
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={[styles.tasksList, globalStyle.border]} key={item.id}>
                <View>
                  <Text
                    style={
                      item.taskStatus === 'Cancelled' && {
                        textDecorationLine: 'line-through',
                        color: 'grey',
                      }
                    }
                  >
                    {item.title}
                  </Text>
                </View>
                <View style={styles.statusDateBlock}>
                  <TouchableOpacity onPress={() => changeTaskStatus(item.id, item.taskStatus)}>
                    {item.taskStatus === 'Cancelled' ? (
                      <Image
                        style={styles.image}
                        source={require('./assets/free-icon-cancelled-5268671.png')}
                      />
                    ) : item.taskStatus === 'inProgress' ? (
                      <Image
                        style={styles.image}
                        source={require('./assets/work-in-progress.png')}
                      />
                    ) : (
                      <Image
                        style={styles.image}
                        source={require('./assets/free-icon-done-15190698.png')}
                      />
                    )}
                  </TouchableOpacity>
                  <View>
                    <Text>{deadlineCorrectFormat(item.deadLine)}</Text>
                    <TouchableOpacity
                      style={styles.showMoreButton}
                      onPress={() => showDescription(item.id)}
                    >
                      <View style={styles.showMoreOrLessBlock}>
                        <Image
                          style={
                            item.id !== taskIdDescription
                              ? styles.showDescriptionImage
                              : [styles.showDescriptionImage, styles.reverseImage]
                          }
                          source={require('./assets/free-icon-down-arrow-5772127.png')}
                        />
                        <Text>{item.id === taskIdDescription ? 'show less ' : 'show more'}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  {item.id === taskIdDescription && (
                    <View style={styles.description}>
                      <Text onPress={hideDescription}>description:{item.description}</Text>
                      <Text onPress={hideDescription}>location:{item.location}</Text>
                    </View>
                  )}
                  <TouchableOpacity
                    style={{ position: 'absolute', left: 165 }}
                    onPress={() => deleteTask(item.id)}
                  >
                    <Image
                      style={styles.image}
                      source={require('./assets/close-cross-in-circular-outlined-interface-button-58253.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
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
  showMoreOrLessBlock: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tasksContainer: {
    width: '100%',
    alignItems: 'flex-start',
    marginLeft: 32,
  },
  showDescriptionImage: {
    width: 10,
    height: 10,
    marginTop: 3,
  },
  showMoreButton: {
    backgroundColor: 'rgb(0, 115, 230)',
    borderRadius: 20,
  },
  statusDateBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 7,
  },

  tasksList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '88%',
    height: 40,
    marginVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  description: {
    backgroundColor: '#f2f2f2f1',
    position: 'absolute',
    zIndex: 1,
    width: 240,
    right: 10,
    top: 39,
    padding: 10,
  },
  image: {
    width: 35,
    height: 35,
    marginTop: 2,
  },
  reverseImage: {
    transform: [{ rotate: '180deg' }],
  },
})

export const globalStyle = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
  },
})
