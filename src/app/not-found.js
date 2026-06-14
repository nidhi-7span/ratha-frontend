import Link from 'next/link'

export const metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="text-8xl font-bold text-gray-200">404</div>
      <h1 className="text-2xl font-bold text-gray-900">Page Not Found</h1>
      <p className="text-gray-500 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Try browsing our cars instead.
      </p>
      <Link
        href="/cars"
        className="bg-gray-900 text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
      >
        Browse Used Cars
      </Link>
    </main>
  )
}
