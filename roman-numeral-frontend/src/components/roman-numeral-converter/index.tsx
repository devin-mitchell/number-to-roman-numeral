import { useState } from "react"
import { useFetchRomanNumeral } from "../../hooks/useFetchRomanNumeral"

export function RomanNumeralConverter() {
  const [number, setNumber] = useState<string>("")
  const { fetchRomanNumeral, result, error } = useFetchRomanNumeral()

  return (
    <div className="max-w-md h-54 mx-auto p-6 transition duration-300 bg-white shadow-md rounded-lg dark:bg-zinc-800">
      <h1 className="text-xl font-bold mb-4 dark:text-zinc-100">
        Roman Numeral Converter
      </h1>
      <input
        type="text"
        className="border p-2 w-full rounded dark:border-zinc-100 dark:text-zinc-100"
        placeholder="Enter a number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <button
        onClick={() => fetchRomanNumeral(number)}
        className="mt-4 bg-blue-500 cursor-pointer text-white p-2 w-full rounded hover:bg-blue-600"
      >
        Convert
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {result && (
        <p className="mt-2 text-green-500">
          <strong>Roman Numeral:</strong> {result}
        </p>
      )}
    </div>
  )
}

