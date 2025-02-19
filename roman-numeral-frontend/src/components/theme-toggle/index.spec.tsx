import { render, screen, fireEvent } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { ThemeSwitcher } from "."

describe("ThemeSwitcher Component", () => {
  beforeEach(() => {
    vi.resetAllMocks()
    localStorage.clear()
    document.documentElement.classList.remove("dark")
  })

  it("renders the theme switcher button", () => {
    render(<ThemeSwitcher />)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("reads the initial theme from localStorage", () => {
    localStorage.setItem("theme", "dark")

    render(<ThemeSwitcher />)

    expect(document.documentElement.classList.contains("dark")).toBe(true)
    expect(screen.getByRole("button")).toHaveTextContent("🌙")
  })

  it("toggles the theme when clicked", () => {
    render(<ThemeSwitcher />)

    const button = screen.getByRole("button")
    expect(button).toHaveTextContent("☀️")

    fireEvent.click(button)

    expect(document.documentElement.classList.contains("dark")).toBe(true)
    expect(localStorage.getItem("theme")).toBe("dark")
    expect(button).toHaveTextContent("🌙")

    fireEvent.click(button)

    expect(document.documentElement.classList.contains("dark")).toBe(false)
    expect(localStorage.getItem("theme")).toBe("light")
    expect(button).toHaveTextContent("☀️")
  })
})

