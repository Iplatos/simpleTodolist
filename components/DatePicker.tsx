import React, { useState } from 'react'
import { View, Button, Platform, StyleSheet, Text } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
const DatePickerComponent = () => {
  const [date, setDate] = useState(new Date())
  const [show, setShow] = useState(false)
  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === 'ios')
    setDate(currentDate)
  }
  return (
    <View style={styles.container}>
      {' '}
      <Text style={styles.label}>Выберите дату:</Text>{' '}
      <Button title="Открыть выбор даты" onPress={() => setShow(true)} />{' '}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}{' '}
      <Text>{date.getDate()}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  label: { fontSize: 18, marginBottom: 10, textAlign: 'left', width: '100%' },
})
export default DatePickerComponent
