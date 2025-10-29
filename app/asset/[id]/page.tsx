'use client'

import { useState } from 'react'
import { Layout } from '@/components/layout/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatPrice, formatFileSize, formatDuration } from '@/lib/utils'
import { Download, Heart, Share, Plus, Minus, ShoppingCart, Play, Pause } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Mock data
const mockAsset = {
  id: '1',
  title: 'Beautiful Mountain Landscape',
  description: 'Stunning mountain view with clear blue sky and dramatic clouds. Perfect for nature-themed projects, travel blogs, and outdoor adventure content.',
  type: 'IMAGE',
  tags: ['nature', 'mountain', 'landscape', 'sky', 'outdoor'],
  category: 'Nature',
  cloudinaryId: 'sample1',
  originalUrl: 'https://res.cloudinary.com/demo/image/upload/sample1.jpg',
  thumbnailUrl: 'https://res.cloudinary.com/demo/image/upload/w_400/sample1.jpg',
  previewUrl: 'https://res.cloudinary.com/demo/image/upload/w_800/sample1.jpg',
  watermarkedUrl: 'https://res.cloudinary.com/demo/image/upload/w_800/l_watermark/sample1.jpg',
  width: 1920,
  height: 1080,
  duration: undefined as number | undefined,
  fileSize: 2048000,
  format: 'jpg',
  price: 25.00,
  licenseType: 'STANDARD',
  isActive: true,
  isApproved: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: 'user1',
  user: {
    id: 'user1',
    email: 'photographer@example.com',
    name: 'John Photographer',
    role: 'CONTRIBUTOR',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
}

export default function AssetDetailPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedLicense, setSelectedLicense] = useState('STANDARD')

  const asset = mockAsset // In real app, fetch from API using params.id

  const licenseOptions = [
    {
      type: 'STANDARD',
      name: 'Standard License',
      price: asset.price,
      description: 'Perfect for personal projects, blogs, and small business use.',
      features: ['Personal use', 'Small business use', 'Web use', 'Social media'],
    },
    {
      type: 'EXTENDED',
      name: 'Extended License',
      price: asset.price * 2,
      description: 'Ideal for larger commercial projects and marketing campaigns.',
      features: ['All Standard features', 'Large commercial use', 'Print advertising', 'Unlimited prints'],
    },
    {
      type: 'PREMIUM',
      name: 'Premium License',
      price: asset.price * 3,
      description: 'Complete commercial rights for maximum flexibility.',
      features: ['All Extended features', 'Resale rights', 'White-label use', 'Priority support'],
    },
  ]

  const selectedLicenseOption = licenseOptions.find(opt => opt.type === selectedLicense)

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-gray-700">Home</Link></li>
            <li>/</li>
            <li><Link href="/browse" className="hover:text-gray-700">Browse</Link></li>
            <li>/</li>
            <li><Link href={`/browse?category=${asset.category}`} className="hover:text-gray-700">{asset.category}</Link></li>
            <li>/</li>
            <li className="text-gray-900">{asset.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Media Display */}
            <Card className="mb-6">
              <CardContent className="p-0">
                <div className="aspect-video relative bg-gray-100">
                  {asset.type === 'IMAGE' ? (
                    <Image
                      src={asset.previewUrl}
                      alt={asset.title}
                      fill
                      className="object-contain"
                    />
                  ) : (
                    <div className="relative h-full">
                      <video
                        src={asset.previewUrl}
                        className="w-full h-full object-contain"
                        controls
                        poster={asset.thumbnailUrl}
                      />
                    </div>
                  )}
                  
                  {/* Watermark overlay */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 px-3 py-1 rounded text-sm font-medium text-gray-700">
                      StockPlatform
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Asset Details */}
            <Card>
              <CardHeader>
                <CardTitle>{asset.title}</CardTitle>
                <p className="text-gray-600">{asset.description}</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Details</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>Dimensions: {asset.width} × {asset.height}</p>
                      <p>Format: {asset.format?.toUpperCase()}</p>
                      <p>File Size: {formatFileSize(asset.fileSize || 0)}</p>
                      {asset.duration && <p>Duration: {formatDuration(asset.duration)}</p>}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {asset.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-medium text-gray-900 mb-2">Contributor</h4>
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {asset.user.name?.charAt(0) || asset.user.email.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{asset.user.name || asset.user.email}</p>
                      <p className="text-sm text-gray-500">Contributor</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            {/* Purchase Card */}
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Purchase Options</CardTitle>
              </CardHeader>
              <CardContent>
                {/* License Selection */}
                <div className="space-y-3 mb-6">
                  {licenseOptions.map((license) => (
                    <div
                      key={license.type}
                      className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                        selectedLicense === license.type
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedLicense(license.type)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{license.name}</h4>
                        <span className="font-bold text-blue-600">{formatPrice(license.price)}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{license.description}</p>
                      <ul className="text-xs text-gray-500 space-y-1">
                        {license.features.map((feature) => (
                          <li key={feature}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Quantity */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t pt-4 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-medium text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {formatPrice((selectedLicenseOption?.price || 0) * quantity)}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <Button className="w-full" size="lg">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Heart className="h-4 w-4 mr-2" />
                      Save to Favorites
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Share className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>

                {/* Download Preview */}
                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Preview Download</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Download a watermarked preview to test before purchase
                  </p>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
}
