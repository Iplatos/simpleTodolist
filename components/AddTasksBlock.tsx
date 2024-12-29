import { TextInput, Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { DatePickerComponent } from './DatePicker'
import { useState } from 'react'
import { AddTasksBlockPropsType } from '../types/types'

import * as Yup from 'yup'
import { Formik } from 'formik'
import { globalStyle } from '../App'

export const taskValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(4, 'Title is too short!')
    .max(13, 'Title is too long!')
    .required('Title is required'),
})

export const AddTasksBlock = (props: AddTasksBlockPropsType) => {
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
  }

  return (
    <Formik
      initialValues={{ title: '' }}
      onSubmit={(values, { resetForm }) => {
        setInputTaskValue(values.title)

        createTask()
        resetForm()
      }}
      validationSchema={taskValidationSchema}
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (
        <View style={styles.inputsContainer}>
          <View style={styles.row}>
            <View style={styles.inputBox}>
              <View style={styles.inputTitle}>
                <Text style={{ color: 'white' }}>Task Title</Text>
              </View>
              <TextInput
                style={[styles.textInput, globalStyle.border]}
                onChangeText={(text) => {
                  handleChange('title')(text)
                  setInputTaskValue(text)
                }}
                value={values.title}
              />

              {touched.title && errors.title && (
                <Text style={styles.errorMessage}>{errors.title}</Text>
              )}
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
                  style={[styles.button, { flexDirection: 'row' }]}
                  onPress={sortByDate}
                >
                  <Text style={{ color: 'white' }}>Date</Text>
                  <Image
                    style={
                      sortTasks !== 'asc'
                        ? [styles.image, { transform: [{ rotate: '180deg' }] }]
                        : styles.image
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
                      style={styles.image}
                      source={require('./../assets/free-icon-dot-9383446.png')}
                    />
                  ) : sortStatusIndex === 2 ? (
                    <Image
                      style={styles.image}
                      source={require('./../assets/work-in-progress.png')}
                    />
                  ) : sortStatusIndex === 3 ? (
                    <Image
                      style={styles.image}
                      source={require('./../assets/free-icon-done-15190698.png')}
                    />
                  ) : (
                    <Image
                      style={styles.image}
                      source={require('./../assets/free-icon-cancelled-5268671.png')}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.inputBox}>
              <View style={styles.inputTitle}></View>
              <TouchableOpacity
                onPress={() => handleSubmit()}
                style={[styles.button, { margin: 19 }]}
              >
                <Text style={{ color: 'white' }}>Add task</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </Formik>
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
    backgroundColor: 'black',
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
    width: 15,
    height: 15,
  },
  errorMessage: { color: '#ae0606', position: 'absolute', top: 55, right: 10 },
})
