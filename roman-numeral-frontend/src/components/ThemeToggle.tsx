import { useEffect, useState } from "react"

export function ThemeSwitcher() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  )

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    localStorage.setItem("theme", theme)
  }, [theme])

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="cursor-pointer absolute top-8 right-8 py-2 px-4 border-2 border-zinc-300 rounded-md bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white dark:border-zinc-600"
    >
      {theme === "dark" ? " 🌙" : " ☀️ "}
    </button>
  )
}

