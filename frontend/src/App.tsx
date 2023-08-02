import { createSignal } from 'solid-js'
import './App.css'
import { Timeline } from './components/Timeline/Timeline';

////////////////////////////////////////////////////////////

/** Generates a random integer in the range [a, b) */
const randomInt = (a: number, b: number): number => {
  a = Math.ceil(a);
  b = Math.floor(b);
  return Math.floor(a + (Math.random() * (b-a)));
}

const randomMultiDayEvent = (): CalendarEvent => {
  const year = 2023;
  
  const month = randomInt(0, 12);
  const day = randomInt(0, 31);
  const startDate = new Date(year, month, day);

  const length = randomInt(1, 10);
  const endDate = new Date(year, month, day + length);

  return {
    title: "",
    start: { instant: startDate },
    end: { instant: endDate }
  };
}

////////////////////////////////////////////////////////////

const events: CalendarEvent[] = Array.from({ length: 10 }, (v,i) => randomMultiDayEvent());

console.log(events);

////////////////////////////////////////////////////////////

function App() {
  return (
    <div>
      <Timeline events={events} />
    </div>
  )
}

export default App
