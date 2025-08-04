'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Page } from '@/types'
import { useState } from 'react'

interface NavigationProps {
  pages: Page[]
}

export default function Navigation({ pages }: NavigationProps) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigationItems = [
    { href: '/exhibits', label: 'Exhibitions' },
    { href: '/events', label: 'Events' },
    { href: '/staff', label: 'Our Team' },
    ...pages.map(page => ({
      href: `/${page.slug}`,
      label: page.metadata?.title || page.title
    }))
  ]

  const isActiveLink = (href: string) => {
    if (href === '/' && pathname === '/') return true
    if (href !== '/' && pathname.startsWith(href)) return true
    return false
  }

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navigationItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`text-sm font-medium transition-colors duration-200 ${
            isActiveLink(item.href)
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-600 hover:text-primary'
          }`}
        >
          {item.label}
        </Link>
      ))}
      
      {/* Mobile menu button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-600 hover:text-primary focus:outline-none focus:text-primary"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg md:hidden">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                  isActiveLink(item.href)
                    ? 'text-primary bg-primary-50'
                    : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}