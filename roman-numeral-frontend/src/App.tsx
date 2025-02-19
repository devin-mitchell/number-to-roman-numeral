import { RomanNumeralConverter } from "./components/roman-numeral-converter"
import { ThemeSwitcher } from "./components/theme-toggle"

function App() {
  return (
    <div className="flex transition duration-300 items-center justify-center min-h-screen bg-zinc-100 relative dark:bg-zinc-900">
      <RomanNumeralConverter />
      <ThemeSwitcher />
    </div>
  )
}

export default App
