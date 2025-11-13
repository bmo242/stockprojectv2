'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search, Upload, User, LogIn, LogOut } from 'lucide-react'
import { useAuth } from '@/components/auth/auth-provider'

export function Header() {
  const { user, signOut } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded bg-blue-600"></div>
          <span className="text-xl font-bold text-gray-900">StockPlatform</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/browse" className="text-gray-600 hover:text-gray-900">
            Browse
          </Link>
          <Link href="/discover" className="text-gray-900 font-medium">
            Discover
          </Link>
          <Link href="/categories" className="text-gray-600 hover:text-gray-900">
            Categories
          </Link>
        </nav>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search photos and videos..."
              className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          {user ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/upload">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">
                  <User className="h-4 w-4 mr-2" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={signOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="primary" size="sm" className="shadow-sm" asChild>
                <Link href="/auth/signin">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
