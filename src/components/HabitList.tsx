import {useContext} from "react";
import {eachDayOfInterval, startOfWeek, endOfWeek, format, isFuture, isSameDay, subDays} from 'date-fns';
import {Button} from "./Button";
import {HabitContext} from "../context/HabitProvider";

export type Habit = {id: string, name: string, completions: Date[]}

type HabitListProps = {
  habits: Habit[]
  deleteHabit: (id: string) => void
  toggleHabit: (id: string, date: Date) => void
}

export function HabitList({habits, deleteHabit, toggleHabit}: HabitListProps) {
  if (!habits.length) {
    return (
      <p className="text-center text-zinc-500 py-12">No habits yet.</p>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {habits.map(habit => (
        <HabitItem key={habit.id} habit={habit} deleteHabit={deleteHabit} toggleHabit={toggleHabit} />
      ))}
    </div>
  )
}

type HabitItemProps = {
  habit: Habit
  deleteHabit: (id: string) => void
  toggleHabit: (id: string, date: Date) => void
}

function HabitItem({habit, deleteHabit, toggleHabit}: HabitItemProps) {
  const habitContext = useContext(HabitContext)
  console.log('habitContext:', habitContext?.name)

  const visibleDates = eachDayOfInterval({
    start: startOfWeek(new Date(), {weekStartsOn: 1}),
    end: endOfWeek(new Date(), {weekStartsOn: 1})
  })

  const streak = getStreak(habit.completions)

  return (
    <div className="rounded-xl bg-zinc-800 p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <span className="font-medium">{habit.name}</span>
          {streak > 0 && (
            <span className="font-sm text-amber-400">{streak}</span>
          )}
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
            variant={habit.completions.some(d => isSameDay(date, d))? "primary": "secondary"}
            onClick={() => toggleHabit(habit.id, date)}
          >
            <span className="font-medium">{format(date, "EEE")}</span>
            <span className="font-medium">{format(date, "d")}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}

function getStreak(completions: Date[]) {
  let streak = 0
  let date = new Date()
  while (completions.some(c => isSameDay(c, date))) {
    ++streak
    date = subDays(date, 1)
  }
  return streak
}
