import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './App';

describe('RomanNumeralConverter', () => {
  test('renders properly', () => {
    const { getByRole } = render(<App />)

    const header = getByRole('heading', { name: 'Roman Numeral Converter' })
    const numberInput = getByRole('textbox')
    const button = getByRole('button', { name: 'Convert' })
    const toggleButton = getByRole('button', { name: "☀️" })

    expect(header).toBeVisible()
    expect(button).toBeVisible()
    expect(toggleButton).toBeVisible()
    expect(numberInput).toBeVisible()
    expect(numberInput).toHaveProperty('placeholder', 'Enter a number')
  })
})
