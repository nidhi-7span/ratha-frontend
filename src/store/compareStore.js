let compareList = []
let listeners = []

function emit() {
  listeners.forEach((l) => l())
}

export function subscribe(listener) {
  listeners.push(listener)
  return () => {
    listeners = listeners.filter((l) => l !== listener)
  }
}

export function getCompareList() {
  return compareList
}

export function addToCompare(car) {
  if (compareList.length >= 5) return
  if (compareList.find((c) => c.id === car.id)) return
  compareList = [...compareList, car]
  emit()
}

export function removeFromCompare(carId) {
  compareList = compareList.filter((c) => c.id !== carId)
  emit()
}

export function isInCompare(carId) {
  return compareList.some((c) => c.id === carId)
}

export function clearCompare() {
  compareList = []
  emit()
}
