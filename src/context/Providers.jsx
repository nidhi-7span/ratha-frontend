'use client'

import { useSyncExternalStore } from 'react'
import { subscribe, getCompareList } from '@/store/compareStore'

const EMPTY = []
const getServerSnapshot = () => EMPTY
import CompareBar from '@/components/cars/CompareBar'

export default function Providers({ children }) {
  const compareList = useSyncExternalStore(subscribe, getCompareList, getServerSnapshot)
  const hasBar = compareList.length > 0

  return (
    <>
      <div className={hasBar ? 'pb-20' : undefined}>{children}</div>
      <CompareBar />
    </>
  )
}
