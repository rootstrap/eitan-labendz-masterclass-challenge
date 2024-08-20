export type ErrorBoundary = {
  error: Error & { digest?: string }
  reset: () => void
}
