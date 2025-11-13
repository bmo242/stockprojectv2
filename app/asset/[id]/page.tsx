'use client'

import { Layout } from '@/components/layout/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatFileSize, formatDuration } from '@/lib/utils'
import { Download, Share, Play } from 'lucide-react'
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
  price: 25.0,
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
  const asset = mockAsset // In real app, fetch from API using params.id

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
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Download</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Licensing and payments are currently paused. You can download the media directly for internal reviews or comps.
                </p>

                <div className="space-y-3">
                  {(asset.watermarkedUrl || asset.previewUrl) && (
                    <Button asChild variant="outline" className="w-full">
                      <a
                        href={asset.watermarkedUrl || asset.previewUrl}
                        download
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Preview
                      </a>
                    </Button>
                  )}
                  <Button asChild className="w-full">
                    <a
                      href={asset.originalUrl}
                      download
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Original {asset.type === 'VIDEO' ? 'Video' : 'Image'}
                    </a>
                  </Button>
                </div>

                <div className="mt-6 border-t pt-4 text-xs text-gray-500">
                  <p>
                    Please credit <strong>{asset.user.name || asset.user.email}</strong> when using this media. For commercial licensing, contact us.
                  </p>
                  <div className="mt-3 flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Share className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
}
