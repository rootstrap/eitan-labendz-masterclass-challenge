'use client'

import { ErrorBoundary } from '@/types/nextjs'
import { useEffect } from 'react'
export default function GlobalErrorBoundary({ error, reset }: ErrorBoundary) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div>
      <h1>Content unavailable at the moment</h1>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
