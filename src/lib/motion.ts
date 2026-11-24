/** True when the visitor asked the OS for less motion. */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/** Scroll behavior that respects prefers-reduced-motion. */
export function scrollBehavior(): ScrollBehavior {
  return prefersReducedMotion() ? 'auto' : 'smooth'
}

/** Trailing-edge throttle: runs at most once per `wait` ms. */
export function throttle<A extends unknown[]>(fn: (...args: A) => void, wait: number) {
  let last = 0
  let timer: ReturnType<typeof setTimeout> | undefined
  return (...args: A) => {
    const now = Date.now()
    const remaining = wait - (now - last)
    if (remaining <= 0) {
      last = now
      fn(...args)
    } else if (!timer) {
      timer = setTimeout(() => {
        timer = undefined
        last = Date.now()
        fn(...args)
      }, remaining)
    }
  }
}
