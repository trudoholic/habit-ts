import {eachDayOfInterval, startOfWeek, endOfWeek, format, isFuture} from 'date-fns';
import {Button} from "./Button";

export type Habit = {id: string, name: string}
type HabitListProps = {
  habits: Habit[]
  deleteHabit: (id: string) => void
}

export function HabitList({habits, deleteHabit}: HabitListProps) {
  if (!habits.length) {
    return (
      <p className="text-center text-zinc-500 py-12">No habits yet.</p>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {habits.map(habit => (
        <HabitItem key={habit.id} habit={habit} deleteHabit={deleteHabit} />
      ))}
    </div>
  )
}

type HabitItemProps = {
  habit: Habit
  deleteHabit: (id: string) => void
}

function HabitItem({habit, deleteHabit}: HabitItemProps) {
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
        <Button
          onClick={() => deleteHabit(habit.id)}
          variant={"gost-destructive"}
          className="text-xs"
        >Delete</Button>
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
