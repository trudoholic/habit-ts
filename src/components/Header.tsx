import {Button} from "./Button";

export function Header() {
  // return <h1 className="text-3xl font-bold underline">Hello world!</h1>
  // return <h1 className="text-red-500">Hello world!</h1>
  return (
    <header className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Habit Tracker</h1>
        <span className="text-zinc-400 text-sm">1 / 1 done today</span>
      </div>
      <div className="flex flex-col gap-1 items-end">
        <span className="text-zinc-400 text-sm">May 25 - May 31</span>
        <div className="flex items-center gap-3">
          {/*<Button text="Prev"/>*/}
          {/*<Button text="Next"/>*/}
          <Button>Prev</Button>
          <Button>Next</Button>
        </div>
      </div>
    </header>
  )
}
