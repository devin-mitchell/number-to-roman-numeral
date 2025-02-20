import { describe, it, expect } from 'vitest'
import { romanNumeralConverter } from './romanNumeralConverter'

describe('romanNumeralConverter', () => {
  it('should convert basic numbers correctly', () => {
    expect(romanNumeralConverter(1)).toBe('I')
    expect(romanNumeralConverter(4)).toBe('IV')
    expect(romanNumeralConverter(5)).toBe('V')
    expect(romanNumeralConverter(9)).toBe('IX')
    expect(romanNumeralConverter(10)).toBe('X')
    expect(romanNumeralConverter(50)).toBe('L')
    expect(romanNumeralConverter(100)).toBe('C')
    expect(romanNumeralConverter(500)).toBe('D')
    expect(romanNumeralConverter(1000)).toBe('M')
  })

  it('should convert compound numbers correctly', () => {
    expect(romanNumeralConverter(18)).toBe('XVIII')
    expect(romanNumeralConverter(49)).toBe('XLIX')
    expect(romanNumeralConverter(99)).toBe('XCIX')
    expect(romanNumeralConverter(494)).toBe('CDXCIV')
    expect(romanNumeralConverter(999)).toBe('CMXCIX')
    expect(romanNumeralConverter(2023)).toBe('MMXXIII')
    expect(romanNumeralConverter(3999)).toBe('MMMCMXCIX')
  })

  it('should handle edge cases', () => {
    expect(romanNumeralConverter(0)).toBe('Invalid number')
    expect(romanNumeralConverter(-1)).toBe('Invalid number')
    expect(romanNumeralConverter(4000)).toBe('Invalid number')
  })
})
