import { Button, TextInput, Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import DatePickerComponent from './DatePicker'
import { Header } from './Header'

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
}

export const AddTasksBlock = (props: PropsType) => {
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
  } = props

  return (
    <View style={styles.inputsContainer}>
      <View style={styles.row}>
        <View style={styles.inputBox}>
          <View style={styles.inputTitle}>
            <Text>Task Title</Text>
          </View>
          <TextInput
            style={[styles.textInput, globalStyle.border]}
            value={inputTaskValue}
            onChangeText={setInputTaskValue}
          />
        </View>
        <View style={styles.inputBox}>
          <View style={styles.inputTitle}>
            <Text>Task Description</Text>
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
            <Text>Location </Text>
          </View>
          <TextInput
            style={[styles.textInput, globalStyle.border]}
            value={inputLocationValue}
            onChangeText={setInputLocationValue}
          />
        </View>
        <View style={styles.inputBox}>
          <View style={styles.inputTitle}>
            <Text>Date and Time</Text>
          </View>
          <DatePickerComponent date={date} setDate={setDate} />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.inputBox}>
          <View style={styles.inputTitle}>
            <Text>Sort By</Text>
          </View>
          <TextInput
            style={[styles.textInput, globalStyle.border]}
            value={'sss'}
            onChangeText={() => {}}
          />
        </View>
        <View style={styles.inputBox}>
          <View style={styles.inputTitle}></View>
          <TouchableOpacity onPress={createTask} style={[styles.button, { margin: 19 }]}>
            <Text>Add task</Text>
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
    backgroundColor: 'green',
  },
  inputBox: {
    backgroundColor: 'pink',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textInput: {
    backgroundColor: 'red',
    width: 150,
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
})

export const globalStyle = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
  },
})
