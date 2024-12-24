import { Button, TextInput, Text, View, StyleSheet } from 'react-native'
import DatePickerComponent from './DatePicker'

type PropsType = {
  inputValue: string
  setInputValue: (inputValue: string) => void
}

export const AddTasksBlock = (props: PropsType) => {
  const { inputValue, setInputValue } = props
  return (
    <View style={styles.inputsContainer}>
      <Text style={styles.h1}> simple todo </Text>
      <View style={styles.row}>
        <View style={styles.inputBox}>
          <View style={styles.inputTitle}>
            <Text>Task Title</Text>
          </View>
          <TextInput
            style={[styles.textInput, globalStyle.border]}
            value={inputValue}
            onChangeText={setInputValue}
          />
        </View>
        <View style={styles.inputBox}>
          <View style={styles.inputTitle}>
            <Text>Task Description</Text>
          </View>
          <TextInput
            style={[styles.textInput, globalStyle.border]}
            value={inputValue}
            onChangeText={setInputValue}
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
            value={inputValue}
            onChangeText={setInputValue}
          />
        </View>
        <View style={styles.inputBox}>
          <View style={styles.inputTitle}>
            <Text>Date and Time</Text>
          </View>
          <DatePickerComponent />
        </View>
      </View>
      {/* <Button title="Add task"></Button> */}
    </View>
  )
}
const styles = StyleSheet.create({
  inputsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    height: 210,
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
