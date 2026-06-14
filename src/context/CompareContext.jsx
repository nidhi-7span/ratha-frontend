'use client'

import { useSyncExternalStore } from 'react'
import {
  subscribe,
  getCompareList,
  addToCompare,
  removeFromCompare,
  isInCompare,
  clearCompare,
} from '@/store/compareStore'

const EMPTY = []
const getServerSnapshot = () => EMPTY

export function useCompare() {
  const compareList = useSyncExternalStore(subscribe, getCompareList, getServerSnapshot)
  return { compareList, addToCompare, removeFromCompare, isInCompare, clearCompare }
}
