interface Moment {
  instant: Date
}

interface CalendarEvent {
  title: string,
  start: Moment,
  end: Moment
}