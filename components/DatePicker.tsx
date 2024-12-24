import React, { useState } from 'react'
import { View, Button, Platform, StyleSheet, Text, TouchableOpacity } from 'react-native'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'

type PropsType = {
  date: Date
  setDate: (date: Date) => void
}
type Mode = 'date' | 'time' | 'datetime'

const DatePickerComponent = (props: PropsType) => {
  const { date, setDate } = props
  const [show, setShow] = useState(false)

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date | undefined) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === 'ios')
    setDate(currentDate)
  }

  const showMode = (currentMode: Mode) => {
    setShow(true)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => showMode('date')}>
        <Text>
          {date ? date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() : 'select date'}
        </Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
          minimumDate={new Date()}
          locale="ru"
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'left',
    width: '100%',
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
})

export default DatePickerComponent
