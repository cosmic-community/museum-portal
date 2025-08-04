import Link from 'next/link'
import { getNavigationPages } from '@/lib/cosmic'
import Navigation from '@/components/Navigation'

export default async function Header() {
  const navigationPages = await getNavigationPages()

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="font-serif font-bold text-xl text-gray-900">
                Museum Portal
              </span>
            </Link>
          </div>
          
          <Navigation pages={navigationPages} />
        </div>
      </div>
    </header>
  )
}