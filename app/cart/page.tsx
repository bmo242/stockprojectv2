'use client'

import { Layout } from '@/components/layout/layout'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'

export default function CartPage() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-16 text-center">
        <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Cart Disabled</h1>
        <p className="text-gray-600 mb-6">
          Licensing and checkout are paused for this demo build. You can download media directly from each asset page.
        </p>
        <Button asChild>
          <Link href="/discover">Browse Discover Feed</Link>
        </Button>
      </div>
    </Layout>
  )
}
