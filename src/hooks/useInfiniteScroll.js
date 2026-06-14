'use client'

import { useEffect, useRef } from 'react'


export function useInfiniteScroll(onIntersect, enabled = true) {
  const sentinelRef = useRef(null)
  const callbackRef = useRef(onIntersect)
  callbackRef.current = onIntersect

  useEffect(() => {
    const node = sentinelRef.current
    if (!node || !enabled) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) callbackRef.current()
      },
      { rootMargin: '400px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [enabled])

  return sentinelRef
}
