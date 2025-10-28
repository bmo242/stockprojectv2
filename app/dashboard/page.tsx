'use client'

import { useState } from 'react'
import { Layout } from '@/components/layout/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatPrice } from '@/lib/utils'
import { Upload, Download, DollarSign, Eye, TrendingUp, Calendar, Settings, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Mock data
const mockUser = {
  id: 'user1',
  name: 'John Photographer',
  email: 'john@example.com',
  role: 'CONTRIBUTOR',
  avatar: null,
  createdAt: new Date(),
}

const mockStats = {
  totalEarnings: 1250.00,
  totalDownloads: 45,
  totalViews: 1250,
  totalUploads: 12,
  monthlyEarnings: 320.00,
  monthlyDownloads: 8,
}

const mockUploads = [
  {
    id: '1',
    title: 'Beautiful Mountain Landscape',
    thumbnailUrl: 'https://res.cloudinary.com/demo/image/upload/w_400/sample1.jpg',
    price: 25.00,
    downloads: 12,
    earnings: 300.00,
    status: 'approved',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'Modern Office Space',
    thumbnailUrl: 'https://res.cloudinary.com/demo/image/upload/w_400/sample2.jpg',
    price: 35.00,
    downloads: 8,
    earnings: 280.00,
    status: 'approved',
    createdAt: new Date('2024-01-10'),
  },
  {
    id: '3',
    title: 'City Skyline at Night',
    thumbnailUrl: 'https://res.cloudinary.com/demo/image/upload/w_400/sample3.jpg',
    price: 30.00,
    downloads: 0,
    earnings: 0.00,
    status: 'pending',
    createdAt: new Date('2024-01-20'),
  },
]

const mockPurchases = [
  {
    id: '1',
    title: 'Business Meeting Video',
    thumbnailUrl: 'https://res.cloudinary.com/demo/video/upload/w_400/sample4.jpg',
    price: 75.00,
    purchasedAt: new Date('2024-01-18'),
    downloadUrl: '#',
  },
  {
    id: '2',
    title: 'Abstract Background',
    thumbnailUrl: 'https://res.cloudinary.com/demo/image/upload/w_400/sample5.jpg',
    price: 20.00,
    purchasedAt: new Date('2024-01-12'),
    downloadUrl: '#',
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'uploads' | 'purchases' | 'earnings'>('overview')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'uploads', label: 'My Uploads', icon: Upload },
    { id: 'purchases', label: 'My Purchases', icon: Download },
    { id: 'earnings', label: 'Earnings', icon: DollarSign },
  ]

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
              <p className="text-gray-600">Welcome back, {mockUser.name}!</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" asChild>
                <Link href="/upload">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Content
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                      <p className="text-2xl font-bold text-gray-900">{formatPrice(mockStats.totalEarnings)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Download className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Downloads</p>
                      <p className="text-2xl font-bold text-gray-900">{mockStats.totalDownloads}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Eye className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Views</p>
                      <p className="text-2xl font-bold text-gray-900">{mockStats.totalViews}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Upload className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Uploads</p>
                      <p className="text-2xl font-bold text-gray-900">{mockStats.totalUploads}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Uploads</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockUploads.slice(0, 3).map((upload) => (
                      <div key={upload.id} className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={upload.thumbnailUrl}
                            alt={upload.title}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{upload.title}</p>
                          <p className="text-xs text-gray-500">{upload.downloads} downloads</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{formatPrice(upload.earnings)}</p>
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            upload.status === 'approved' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {upload.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Purchases</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockPurchases.map((purchase) => (
                      <div key={purchase.id} className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={purchase.thumbnailUrl}
                            alt={purchase.title}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{purchase.title}</p>
                          <p className="text-xs text-gray-500">
                            {purchase.purchasedAt.toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{formatPrice(purchase.price)}</p>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={purchase.downloadUrl}>Download</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Uploads Tab */}
        {activeTab === 'uploads' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">My Uploads</h2>
              <Button asChild>
                <Link href="/upload">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload New Content
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockUploads.map((upload) => (
                <Card key={upload.id}>
                  <CardContent className="p-0">
                    <div className="aspect-video relative bg-gray-100">
                      <Image
                        src={upload.thumbnailUrl}
                        alt={upload.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          upload.status === 'approved' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {upload.status}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 mb-2">{upload.title}</h3>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{upload.downloads} downloads</span>
                        <span className="font-medium">{formatPrice(upload.earnings)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Purchases Tab */}
        {activeTab === 'purchases' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">My Purchases</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockPurchases.map((purchase) => (
                <Card key={purchase.id}>
                  <CardContent className="p-0">
                    <div className="aspect-video relative bg-gray-100">
                      <Image
                        src={purchase.thumbnailUrl}
                        alt={purchase.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 mb-2">{purchase.title}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          {purchase.purchasedAt.toLocaleDateString()}
                        </span>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={purchase.downloadUrl}>
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Earnings Tab */}
        {activeTab === 'earnings' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Earnings Overview</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Earnings Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Earnings</span>
                      <span className="font-medium">{formatPrice(mockStats.totalEarnings)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">This Month</span>
                      <span className="font-medium">{formatPrice(mockStats.monthlyEarnings)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Downloads</span>
                      <span className="font-medium">{mockStats.totalDownloads}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">This Month</span>
                      <span className="font-medium">{mockStats.monthlyDownloads}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payout Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      Configure your payout preferences and payment methods.
                    </p>
                    <Button variant="outline" className="w-full">
                      <Settings className="h-4 w-4 mr-2" />
                      Manage Payout Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
