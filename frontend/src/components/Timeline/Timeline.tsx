import { For } from "solid-js";
import "./Timeline.css"

export interface TimelineSpanProps {
  event: CalendarEvent
}

export const TimelineSpan = (props: TimelineSpanProps) => {
  const eventX = props.event.start.instant.getTime() / 1000 / 60 / 60 / 24;
  const style = {
    "--event-x" : `${eventX}px`
  };

  return <div class="timeline-span" style={style}>
    <span>{props.event.title}</span>
  </div>
}

////////////////////////////////////////////////////////////

export interface TimelineProps {
  events: CalendarEvent[],
}

export const Timeline = (props: TimelineProps) => {
  return <div class="timeline">
    <For each={props.events}>
    {
      (event) => {
        return <TimelineSpan event={event} />
      }
    }
    </For>
  </div>
}