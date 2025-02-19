import { renderHook, act } from '@testing-library/react'
import { useFetchRomanNumeral } from './useFetchRomanNumeral'
import { describe, it, expect, afterEach, vi } from 'vitest'

describe('useFetchRomanNumeral', () => {
  const mockFetch = vi.fn()
  window.fetch = mockFetch
  console.error = vi.fn() // Mock console.error to avoid noise in test output

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize with null result and error', () => {
    const { result } = renderHook(() => useFetchRomanNumeral())

    expect(result.current.result).toBeNull()
    expect(result.current.error).toBeNull()
  })

  it('should handle successful conversion', async () => {
    const mockResponse = { output: 'IV' }
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const { result } = renderHook(() => useFetchRomanNumeral())

    await act(async () => {
      await result.current.fetchRomanNumeral('4')
    })

    expect(window.fetch).toHaveBeenCalledWith('http://localhost:8080/romannumeral?query=4')
    expect(result.current.result).toBe('IV')
    expect(result.current.error).toBeNull()
  })

  it('should handle invalid input', async () => {
    const { result } = renderHook(() => useFetchRomanNumeral())

    await act(async () => {
      await result.current.fetchRomanNumeral('abc')
    })

    expect(result.current.error).toBe('Please enter a valid number.')
    expect(result.current.result).toBeNull()
    expect(window.fetch).not.toHaveBeenCalled()
  })

  it('should handle server error response', async () => {
    const mockResponse = { output: 'Invalid number' }
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const { result } = renderHook(() => useFetchRomanNumeral())

    await act(async () => {
      await result.current.fetchRomanNumeral('4000')
    })

    expect(result.current.error).toBe('Invalid number: choose 1 - 3999')
    expect(result.current.result).toBeNull()
  })

  it('should handle network error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'))

    const { result } = renderHook(() => useFetchRomanNumeral())

    await act(async () => {
      await result.current.fetchRomanNumeral('4')
    })

    expect(result.current.error).toBe('Failed to fetch Roman numeral.')
    expect(result.current.result).toBeNull()
    expect(console.error).toHaveBeenCalled()
  })

  it('should handle non-ok response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
    })

    const { result } = renderHook(() => useFetchRomanNumeral())

    await act(async () => {
      await result.current.fetchRomanNumeral('4')
    })

    expect(result.current.error).toBe('Failed to fetch Roman numeral.')
    expect(result.current.result).toBeNull()
  })

  it('should reset error and result states before new fetch', async () => {
    const mockResponse = { output: 'IV' }
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const { result } = renderHook(() => useFetchRomanNumeral())

    // First set an error
    await act(async () => {
      await result.current.fetchRomanNumeral('abc')
    })

    expect(result.current.error).toBe('Please enter a valid number.')

    // Then make a successful call
    await act(async () => {
      await result.current.fetchRomanNumeral('4')
    })

    expect(result.current.error).toBeNull()
    expect(result.current.result).toBe('IV')
  })
})
