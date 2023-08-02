import { For } from "solid-js";
import "./Timeline.css"

export interface TimelineSpanProps {
  event: CalendarEvent
}

export const TimelineSpan = (props: TimelineSpanProps) => {
  const style = {
    "--event-start" : props.event.start.instant.getTime(),
    "--event-end"   : props.event.end.instant.getTime()
  };

  return <div class="timeline-span" style={style}>
    <span>{props.event.title}</span>
  </div>
}

////////////////////////////////////////////////////////////

export interface TimelineProps {
  events: CalendarEvent[],
  viewStart: Moment,
  viewEnd: Moment
}

export const Timeline = (props: TimelineProps) => {
  const style = {
    "--timeline-start": props.viewStart.instant.getTime(),
    "--millisecond-size": 10 / (1000 * 60 * 60 * 24) + "px",
  };
  return <div class="timeline">
    <div class="timeline-shift" style={style}>
      <For each={props.events}>
      {
        (event) => {
          return <TimelineSpan event={event} />;
        }
      }
      </For>
    </div>
  </div>
}