import { getCars } from '@/services/carService'

const SITE_URL = 'https://ratha-frontend.vercel.app'

export default async function sitemap() {
  let cars = []

  try {
    cars = await getCars()
  } catch (error) {
    console.error('Sitemap: failed to fetch cars', error.message)
  }

  const staticPages = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/cars`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ]

  const carPages = cars.map((car) => ({
    url: `${SITE_URL}/cars/${car.id}`,
    lastModified: car.date_updated
      ? new Date(car.date_updated)
      : new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...staticPages, ...carPages]
}