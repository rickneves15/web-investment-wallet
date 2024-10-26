import { isAfter } from 'date-fns'

export function isDateEqualOrAfterToday(date: Date) {
  const today = new Date().toDateString()

  return isAfter(date, today)
}
