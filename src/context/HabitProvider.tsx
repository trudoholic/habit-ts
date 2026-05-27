import {createContext, type ReactNode} from "react"

type Context = {
  name: string
}

export const HabitContext = createContext<null | Context>(null)

type HabitProviderProps = {
  children: ReactNode
}

export function HabitProvider({children}: HabitProviderProps) {
  return <HabitContext value={{name: "Nemo"}}>{children}</HabitContext>
}
