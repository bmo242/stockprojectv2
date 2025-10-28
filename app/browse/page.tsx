'use client'

import { useState, useEffect } from 'react'
import { Layout } from '@/components/layout/layout'
import { MediaGrid } from '@/components/media/media-grid'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Filter, Grid, List, Search } from 'lucide-react'
import { MediaAsset } from '@/types'

// Mock data for development
const mockMediaAssets: MediaAsset[] = [
  {
    id: '1',
    title: 'Beautiful Mountain Landscape',
    description: 'Stunning mountain view with clear blue sky',
    type: 'IMAGE' as any,
    tags: ['nature', 'mountain', 'landscape'],
    category: 'Nature',
    cloudinaryId: 'sample1',
    originalUrl: 'https://res.cloudinary.com/demo/image/upload/sample1.jpg',
    thumbnailUrl: 'https://res.cloudinary.com/demo/image/upload/w_400/sample1.jpg',
    previewUrl: 'https://res.cloudinary.com/demo/image/upload/w_800/sample1.jpg',
    watermarkedUrl: 'https://res.cloudinary.com/demo/image/upload/w_800/l_watermark/sample1.jpg',
    width: 1920,
    height: 1080,
    fileSize: 2048000,
    format: 'jpg',
    price: 25.00,
    licenseType: 'STANDARD' as any,
    isActive: true,
    isApproved: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 'user1',
    user: {
      id: 'user1',
      email: 'photographer@example.com',
      name: 'John Photographer',
      role: 'CONTRIBUTOR' as any,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  {
    id: '2',
    title: 'Modern Office Space',
    description: 'Clean and modern office interior design',
    type: 'IMAGE' as any,
    tags: ['business', 'office', 'interior'],
    category: 'Business',
    cloudinaryId: 'sample2',
    originalUrl: 'https://res.cloudinary.com/demo/image/upload/sample2.jpg',
    thumbnailUrl: 'https://res.cloudinary.com/demo/image/upload/w_400/sample2.jpg',
    previewUrl: 'https://res.cloudinary.com/demo/image/upload/w_800/sample2.jpg',
    watermarkedUrl: 'https://res.cloudinary.com/demo/image/upload/w_800/l_watermark/sample2.jpg',
    width: 1920,
    height: 1080,
    fileSize: 1800000,
    format: 'jpg',
    price: 35.00,
    licenseType: 'EXTENDED' as any,
    isActive: true,
    isApproved: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 'user2',
    user: {
      id: 'user2',
      email: 'designer@example.com',
      name: 'Sarah Designer',
      role: 'CONTRIBUTOR' as any,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  {
    id: '3',
    title: 'Product Demo Video',
    description: 'Professional product demonstration video',
    type: 'VIDEO' as any,
    tags: ['product', 'demo', 'marketing'],
    category: 'Technology',
    cloudinaryId: 'sample3',
    originalUrl: 'https://res.cloudinary.com/demo/video/upload/sample3.mp4',
    thumbnailUrl: 'https://res.cloudinary.com/demo/video/upload/w_400/sample3.jpg',
    previewUrl: 'https://res.cloudinary.com/demo/video/upload/w_800/sample3.mp4',
    watermarkedUrl: 'https://res.cloudinary.com/demo/video/upload/w_800/l_watermark/sample3.mp4',
    width: 1920,
    height: 1080,
    duration: 30,
    fileSize: 15728640,
    format: 'mp4',
    price: 75.00,
    licenseType: 'PREMIUM' as any,
    isActive: true,
    isApproved: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 'user3',
    user: {
      id: 'user3',
      email: 'videographer@example.com',
      name: 'Mike Videographer',
      role: 'CONTRIBUTOR' as any,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
]

export default function BrowsePage() {
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMediaAssets(mockMediaAssets)
      setIsLoading(false)
    }, 1000)
  }, [])

  const categories = ['All', 'Nature', 'Business', 'Technology', 'People', 'Food', 'Travel']
  const types = ['All', 'Images', 'Videos']

  const filteredAssets = mediaAssets.filter(asset => {
    const matchesSearch = !searchQuery || 
      asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = !selectedCategory || selectedCategory === 'All' || asset.category === selectedCategory
    const matchesType = !selectedType || selectedType === 'All' || 
      (selectedType === 'Images' && asset.type === 'IMAGE') ||
      (selectedType === 'Videos' && asset.type === 'VIDEO')
    
    return matchesSearch && matchesCategory && matchesType
  })

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Collection</h1>
          <p className="text-gray-600">Discover amazing photos and videos for your projects</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search photos and videos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="rounded-lg border border-gray-300 bg-white px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>

                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="rounded-lg border border-gray-300 bg-white px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {types.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>

                <div className="flex border border-gray-300 rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-600">
            {isLoading ? 'Loading...' : `${filteredAssets.length} results found`}
          </p>
        </div>

        <MediaGrid mediaAssets={filteredAssets} isLoading={isLoading} />
      </div>
    </Layout>
  )
}
