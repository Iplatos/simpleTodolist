import { Button, TextInput, Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Header } from './Header'
import DatePickerComponent from './DatePicker'
import { useState } from 'react'

type PropsType = {
  inputTaskValue: string
  setInputTaskValue: (inputValue: string) => void
  inputDescriptionValue: string
  setInputDescriptionValue: (inputDescriptionValue: string) => void
  inputLocationValue: string
  setInputLocationValue: (inputLocationValue: string) => void
  setDate: (date: Date) => void
  date: Date
  createTask: () => void
  sortTasksByDate: (sort: 'asc' | 'desc') => void
  sortByStatus: (status: string | null) => void
}

export const AddTasksBlock = (props: PropsType) => {
  const [sortTasks, setSortTasks] = useState<'asc' | 'desc'>('asc')
  const [sortStatusIndex, setSortStatusIndex] = useState(0)
  const {
    inputTaskValue,
    setInputTaskValue,
    inputDescriptionValue,
    setInputDescriptionValue,
    inputLocationValue,
    setInputLocationValue,
    setDate,
    date,
    createTask,
    sortTasksByDate,
    sortByStatus,
  } = props
  const sortArray = [null, 'inProgress', 'Completed', 'Cancelled']
  const sortByDate = () => {
    sortTasksByDate(sortTasks)
    setSortTasks(sortTasks === 'asc' ? 'desc' : 'asc')
  }
  const changeTasksStatusFilter = () => {
    sortStatusIndex >= 3 ? setSortStatusIndex(0) : setSortStatusIndex(sortStatusIndex + 1)
    sortArray[sortStatusIndex]
    sortByStatus(sortArray[sortStatusIndex])
    console.log(sortStatusIndex)
  }
  return (
    <View style={styles.inputsContainer}>
      <View style={styles.row}>
        <View style={styles.inputBox}>
          <View style={styles.inputTitle}>
            <Text style={{ color: 'white' }}>Task Title</Text>
          </View>
          <TextInput
            style={[styles.textInput, globalStyle.border]}
            value={inputTaskValue}
            onChangeText={setInputTaskValue}
          />
        </View>
        <View style={styles.inputBox}>
          <View style={styles.inputTitle}>
            <Text style={{ color: 'white' }}>Task Description</Text>
          </View>
          <TextInput
            style={[styles.textInput, globalStyle.border]}
            value={inputDescriptionValue}
            onChangeText={setInputDescriptionValue}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.inputBox}>
          <View style={styles.inputTitle}>
            <Text style={{ color: 'white' }}>Location </Text>
          </View>
          <TextInput
            style={[styles.textInput, globalStyle.border]}
            value={inputLocationValue}
            onChangeText={setInputLocationValue}
          />
        </View>
        <View style={styles.inputBox}>
          <View style={styles.inputTitle}>
            <Text style={{ color: 'white' }}>Date and Time</Text>
          </View>
          <DatePickerComponent date={date} setDate={setDate} />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.inputBox}>
          <Text style={{ color: 'white' }}>Sort By</Text>
          <View style={styles.sortBlock}>
            <TouchableOpacity
              style={[styles.button, { flexDirection: 'row', backgroundColor: 'red' }]}
              onPress={sortByDate}
            >
              <Text style={{ color: 'white' }}>Date</Text>
              <Image
                style={
                  sortTasks !== 'asc'
                    ? { width: 15, height: 15, transform: [{ rotate: '180deg' }] }
                    : { width: 15, height: 15 }
                }
                source={require('./../assets/free-icon-down-arrow-5772127.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={changeTasksStatusFilter}
              style={[styles.button, { flexDirection: 'row' }]}
            >
              <Text style={{ color: 'white' }}>Status</Text>

              {sortStatusIndex === 1 ? (
                <Image
                  style={{ width: 15, height: 15 }}
                  source={require('./../assets/free-icon-dot-9383446.png')}
                />
              ) : sortStatusIndex === 2 ? (
                <Image
                  style={{ width: 15, height: 15 }}
                  source={require('./../assets/work-in-progress.png')}
                />
              ) : sortStatusIndex === 3 ? (
                <Image
                  style={{ width: 15, height: 15 }}
                  source={require('./../assets/free-icon-done-15190698.png')}
                />
              ) : (
                <Image
                  style={{ width: 15, height: 15 }}
                  source={require('./../assets/free-icon-cancelled-5268671.png')}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputBox}>
          <View style={styles.inputTitle}></View>
          <TouchableOpacity onPress={createTask} style={[styles.button, { margin: 19 }]}>
            <Text style={{ color: 'white' }}>Add task</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  inputsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    height: 250,
    backgroundColor: 'rgb(0, 115, 230)',
  },
  sortBlock: {
    flexDirection: 'row',
    width: 150,
  },
  inputBox: {
    backgroundColor: 'rgb(0, 115, 230)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textInput: {
    backgroundColor: 'white',
    width: 150,
    borderRadius: 10,
    fontSize: 18,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    padding: 0,
  },
  inputTitle: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    width: '100%',
    marginLeft: 15,
  },
  button: {
    backgroundColor: 'red',
    borderRadius: 10,
    width: 150,
    height: 40,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: { flex: 1, justifyContent: 'space-between', flexDirection: 'row' },
  h1: { fontSize: 30, fontWeight: 'bold', marginBottom: 10 },
  image: {
    width: 35,
    height: 35,
    marginTop: 2,
  },
})

export const globalStyle = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
  },
})
