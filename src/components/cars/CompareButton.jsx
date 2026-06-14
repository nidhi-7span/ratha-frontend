'use client'

import { GitCompare, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCompare } from '@/context/CompareContext'

export default function CompareButton({ car }) {
  const { addToCompare, removeFromCompare, isInCompare, compareList } = useCompare()
  const checked = isInCompare(car.id)
  const atMax = compareList.length >= 5 && !checked

  const handleClick = () => {
    if (checked) removeFromCompare(car.id)
    else addToCompare(car)
  }

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      disabled={atMax}
      className={checked ? 'border-amber-400 bg-amber-50 text-amber-700' : undefined}
    >
      {checked ? <Check className="w-4 h-4" /> : <GitCompare className="w-4 h-4" />}
      {checked ? 'Added' : 'Compare'}
    </Button>
  )
}
