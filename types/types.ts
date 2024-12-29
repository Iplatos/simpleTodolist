export type TaskType = {
  id: string
  title: string
  description: string
  taskStatus: 'inProgress' | 'Completed' | 'Cancelled'
  deadLine: string
  location: string
}
export type AddTasksBlockPropsType = {
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
export type HeaderPropsType = {
  showAddTaskBlock: boolean
  setShowAddTaskBlock: (showAddTaskBlock: boolean) => void
}
export type DatePickerPropsType = {
  date: Date
  setDate: (date: Date) => void
}
