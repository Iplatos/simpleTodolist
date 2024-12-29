export const deadlineCorrectFormat = (isoString: string) => {
  const dateFromISO = new Date(isoString)
  return `${dateFromISO.getDate()}/${dateFromISO.getMonth() + 1}/${dateFromISO.getFullYear()} ${
    dateFromISO.getHours() < 10 ? '0' + dateFromISO.getHours() : dateFromISO.getHours()
  }:${dateFromISO.getMinutes() < 10 ? '0' + dateFromISO.getMinutes() : dateFromISO.getMinutes()}`
}

export const createId = () => {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36)
}

export const getDateForButton = (date: Date) => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${
    date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  }:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`
}
