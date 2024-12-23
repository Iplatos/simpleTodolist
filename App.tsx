import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { StyleSheet, Image, Text, TextInput, View } from 'react-native'

type TaskType = {
  id: string
  title: string
  description: string
  taskStatus: 'inProgress' | 'Completed' | 'Cancelled'
}

export default function App() {
  const [inputValue, setInputValue] = useState('')
  const [showTaskIdDescription, SetShowTaskIdDescription] = useState('')
  const [tasks, setTasks] = useState<TaskType[]>([
    { id: '1', title: 'hello', description: 'some description1', taskStatus: 'inProgress' },
    { id: '2', title: 'hello2', description: 'some description2', taskStatus: 'Completed' },
    { id: '3', title: 'hello3', description: 'some description3', taskStatus: 'Cancelled' },
    {
      id: '4',
      title: 'hello4',
      description:
        'some descriptsome description4some description4some description4some descripti on4some descript ion4some descrip tion4some descript ion4ion4',
      taskStatus: 'Completed',
    },
  ])
  const showDescription = (id: string) => {
    SetShowTaskIdDescription(id)
  }
  const hideDescription = () => {
    SetShowTaskIdDescription('0')
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.textInput, globalStyle.border]}
        value={inputValue}
        onChangeText={setInputValue}
      />
      <View style={styles.tasksContainer}>
        {tasks.map((task) => (
          <View style={[styles.tasksList, globalStyle.border]} key={task.id}>
            <Text onPress={() => showDescription(task.id)}>{task.title}</Text>
            <Image style={styles.image} source={require('./assets/favicon.png')} />
            {task.id === showTaskIdDescription && (
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
})

const globalStyle = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
  },
})
