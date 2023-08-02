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

const MONTH_SHORT_NAMES_EN = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Nov",
  "Dec",
];

function generateMonthDayTicks(
  start: Moment,
  stop: Moment
): TimelineTickProps[] {
  const daysFromStart = (i: number): Date => new Date(
    start.instant.getFullYear(),
    start.instant.getMonth(),
    start.instant.getDate() + i
  );
  const millisecondsPerTick = 1000 * 60 * 60 * 24;
  const firstTick = daysFromStart(0);
  const millisecondRange = stop.instant.getTime() - firstTick.getTime();
  const tickCount = Math.floor(millisecondRange / millisecondsPerTick);

  const out: TimelineTickProps[] = Array.from({length: tickCount}, (_, index) => {
    const date = daysFromStart(index);
    return {
      moment: {instant: daysFromStart(index)},
      type: date.getDate() === 1 ? "major" : "minor",
      label: date.getDate() === 1 ? MONTH_SHORT_NAMES_EN[date.getMonth()] : undefined,
    };
  });
  return out;
}

export interface TimelineTickProps {
  moment: Moment,
  type: "major" | "minor",
  label?: string
}

export const TimelineTick = (props: TimelineTickProps) => {
  const style = {
    "--tick-at": props.moment.instant.getTime(),
  };

  const classes = {
    "timeline-tick" : true,
    "tick-major" : props.type === "major",
    "tick-minor" : props.type === "minor",
    ["tick-" + props.moment.instant]: true,
  };

  return <div classList={classes} style={style}>
    <span class="tick-label">{props.label}</span> 
    <div class="tick-bar"></div>
  </div>;
};

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
      <For each={generateMonthDayTicks(props.viewStart, props.viewEnd)}>
      {
        tickProps => <TimelineTick {...tickProps}></TimelineTick>
      }
      </For>
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