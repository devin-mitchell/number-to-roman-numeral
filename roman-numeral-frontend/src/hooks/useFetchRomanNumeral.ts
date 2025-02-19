import { useState } from "react"

const ROMAN_NUMERAL_URL = `http://localhost:8080/romannumeral`

export function useFetchRomanNumeral() {
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchRomanNumeral = async (number: string) => {
    setError(null)
    setResult(null)

    if (!number || isNaN(Number(number))) {
      setError("Please enter a valid number.")
      return
    }

    try {
      const response = await fetch(`${ROMAN_NUMERAL_URL}?query=${number}`)
      if (!response.ok) {
        throw new Error("Invalid input or server error.")
      }
      const data = await response.json()

      if (data.output === "Invalid number") {
        setError(`${data.output}: choose 1 - 3999`)
      } else {
        setResult(data.output)
      }
    } catch (err) {
      console.error(err)
      setError("Failed to fetch Roman numeral.")
    }
  }

  return { fetchRomanNumeral, result, error }
}

