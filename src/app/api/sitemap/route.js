import { getCars } from '@/services/carService'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ratha.in'

export async function GET() {
  const staticPages = [
    { loc: SITE_URL, changefreq: 'daily', priority: '1.0' },
    { loc: `${SITE_URL}/cars`, changefreq: 'daily', priority: '0.9' },
  ]

  let carPages = []
  try {
    const cars = await getCars()
    carPages = cars.map((car) => ({
      loc: `${SITE_URL}/cars/${car.id}`,
      changefreq: 'weekly',
      priority: '0.8',
      lastmod: car.date_updated
        ? new Date(car.date_updated).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
    }))
  } catch (error) {
    console.error('Sitemap: failed to fetch cars', error.message)
  }

  const allPages = [...staticPages, ...carPages]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${page.loc}</loc>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
