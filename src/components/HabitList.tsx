import {eachDayOfInterval, startOfWeek, endOfWeek, format, isFuture} from 'date-fns';
import {Button} from "./Button";

export function HabitList() {
  const habits = [{id: '1', name: "111"}, {id: '2', name: "222"}, {id: '3', name: "333"}]

  if (!habits.length) {
    return (
      <p className="text-center text-zinc-500 py-12">No habits yet.</p>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {habits.map(habit => (
        <HabitItem key={habit.id} habit={habit}/>
      ))}
    </div>
  )
}

type HabitItemProps = {
  habit: {id: string, name: string}
}

function HabitItem({habit}: HabitItemProps) {
  const visibleDates = eachDayOfInterval({
    start: startOfWeek(new Date(), {weekStartsOn: 1}),
    end: endOfWeek(new Date(), {weekStartsOn: 1})
  })

  return (
    <div className="rounded-xl bg-zinc-800 p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <span className="font-medium">{habit.name}</span>
          <span className="font-sm text-amber-400">{habit.id}</span>
        </div>
        <Button variant={"gost-destructive"} className="text-xs">Delete</Button>
      </div>

      <div className="flex gap-1.5">
        {visibleDates.map(date => (
          <Button
            className="flex flex-1 flex-col items-center gap-0.5 rounded-lg text-xs"
            key={date.toISOString()}
            disabled={isFuture(date)}
          >
            <span className="font-medium">{format(date, "EEE")}</span>
            <span className="font-medium">{format(date, "d")}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
