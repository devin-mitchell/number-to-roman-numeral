import { render, fireEvent } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { RomanNumeralConverter } from "."
import userEvent from "@testing-library/user-event"

// Mock the useFetchRomanNumeral hook
vi.mock("../../hooks/useFetchRomanNumeral.ts", () => ({
  useFetchRomanNumeral: vi.fn(), // Define the mock inline
}))

// Import the mocked module
import { useFetchRomanNumeral } from "../../hooks/useFetchRomanNumeral"

describe("RomanNumeralConverter Component", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders input, button, and title", () => {
    vi.mocked(useFetchRomanNumeral).mockReturnValue({
      result: null,
      error: null,
      fetchRomanNumeral: vi.fn(),
    })

    const { getByText, getByPlaceholderText, getByRole } = render(<RomanNumeralConverter />)

    expect(getByText(/Roman Numeral Converter/i)).toBeInTheDocument()
    expect(getByPlaceholderText(/Enter a number/i)).toBeInTheDocument()
    expect(getByRole("button", { name: /Convert/i })).toBeInTheDocument()
  })

  it("calls fetchRomanNumeral when clicking the button", async () => {
    const mockFetchRomanNumeral = vi.fn()
    vi.mocked(useFetchRomanNumeral).mockReturnValue({
      result: null,
      error: null,
      fetchRomanNumeral: mockFetchRomanNumeral,
    })

    const { getByPlaceholderText, getByRole } = render(<RomanNumeralConverter />)

    const input = getByPlaceholderText(/Enter a number/i)
    const button = getByRole("button", { name: /Convert/i })

    await userEvent.type(input, "10")
    fireEvent.click(button)

    expect(mockFetchRomanNumeral).toHaveBeenCalledWith("10")
  })

  it("displays the fetched Roman numeral result", async () => {
    vi.mocked(useFetchRomanNumeral).mockReturnValue({
      result: "CXXIII",
      error: null,
      fetchRomanNumeral: vi.fn(),
    })

    const { getByPlaceholderText, getByRole, getByText } = render(<RomanNumeralConverter />)

    const input = getByPlaceholderText(/Enter a number/i)
    const button = getByRole("button", { name: /Convert/i })

    await userEvent.type(input, "123")
    fireEvent.click(button)

    expect(getByText(/Roman Numeral:/i)).toBeInTheDocument()
    expect(getByText(/CXXIII/i)).toBeInTheDocument()
  })

  it("displays an error message when there is an error", async () => {
    vi.mocked(useFetchRomanNumeral).mockReturnValue({
      result: null,
      error: "Invalid number: choose 1 - 3999",
      fetchRomanNumeral: vi.fn(),
    })

    const { getByPlaceholderText, getByRole, getByText } = render(<RomanNumeralConverter />)

    const input = getByPlaceholderText(/Enter a number/i)
    const button = getByRole("button", { name: /Convert/i })

    await userEvent.type(input, "12345678")
    fireEvent.click(button)

    expect(getByText(/Invalid number: choose 1 - 3999/i)).toBeInTheDocument()
  })
})

