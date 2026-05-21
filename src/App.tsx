// import './__App.css'

function App() {
  return (
    <div>
      <Header/>
    </div>
  )
}

function Header() {
  // return <h1 className="text-3xl font-bold underline">Hello world!</h1>
  // return <h1 className="text-red-500">Hello world!</h1>
  return (
    <header className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Habit Tracker</h1>
        <span className="text-zinc-400 text-sm">1 / 1 done today</span>
      </div>
      <div>
        {/*<Header/>*/}
      </div>
    </header>
  )
}

export default App
