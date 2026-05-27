import {type ReactNode, useState} from "react";
import {type Habit, HabitContext} from "./useHabits";
import {isSameDay} from "date-fns";

export function HabitProvider({children}: { children: ReactNode }) {
  const [habits, setHabits] = useState<Habit[]>([])

  function addHabit(name: string) {
    setHabits(curr => [...curr, {id: crypto.randomUUID(), name, completions: []}])
  }

  function deleteHabit(id: string) {
    setHabits(curr => curr.filter(h => h.id !== id))
  }

  function toggleHabit(id: string, date: Date) {
    setHabits(curr => curr.map(h => {
      if (h.id !== id) return h
      const alreadyDone = h.completions.some(c => isSameDay(c, date))
      const completions = alreadyDone? h.completions.filter(c => !isSameDay(c, date)): [...h.completions, date]
      return {...h, completions}
    }))
  }

  return <HabitContext value={{
    habits,
    addHabit,
    deleteHabit,
    toggleHabit,
  }}>
    {children}
  </HabitContext>
}
