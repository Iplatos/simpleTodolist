import React, { useState } from 'react'
import { View, Platform, StyleSheet, Text, TouchableOpacity } from 'react-native'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'

type PropsType = {
  date: Date
  setDate: (date: Date) => void
}

const DatePickerComponent: React.FC<PropsType> = ({ date, setDate }) => {
  const [show, setShow] = useState(false)
  const [mode, setMode] = useState<'date' | 'time'>('date')

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date | undefined) => {
    const currentDate = selectedDate || date
    if (mode === 'date') {
      setMode('time')
    } else {
      setShow(false)
    }
    setDate(currentDate)
  }

  const showDateTimePicker = () => {
    setShow(true)
    setMode('date')
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={showDateTimePicker}>
        <Text style={{ fontSize: 16, color: 'white' }}>
          {date
            ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${
                date.getHours() < 10 && '0' + date.getHours()
              }:${date.getMinutes()}`
            : 'Выберите дату и время'}
        </Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
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
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'left',
    width: '100%',
  },
  button: {
    backgroundColor: 'rgb(107, 79, 187)',
    width: 150,
    height: 40,
    borderRadius: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default DatePickerComponent
