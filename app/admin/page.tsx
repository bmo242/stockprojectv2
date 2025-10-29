'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Layout } from '@/components/layout/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatPrice } from '@/lib/utils'
import { 
  Users, 
  Upload, 
  DollarSign, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock, 
  TrendingUp,
  Settings,
  Shield
} from 'lucide-react'
import Image from 'next/image'

// Mock data
const mockStats = {
  totalUsers: 1250,
  totalContributors: 45,
  totalCustomers: 1205,
  totalRevenue: 15750.00,
  monthlyRevenue: 3200.00,
  pendingApprovals: 8,
  totalUploads: 125,
  approvedUploads: 117,
}

const mockPendingApprovals = [
  {
    id: '1',
    title: 'City Skyline at Night',
    thumbnailUrl: 'https://res.cloudinary.com/demo/image/upload/w_400/sample3.jpg',
    contributor: 'Jane Photographer',
    uploadedAt: new Date('2024-01-20'),
    price: 30.00,
    tags: ['city', 'night', 'skyline'],
  },
  {
    id: '2',
    title: 'Abstract Art Background',
    thumbnailUrl: 'https://res.cloudinary.com/demo/image/upload/w_400/sample4.jpg',
    contributor: 'Mike Designer',
    uploadedAt: new Date('2024-01-19'),
    price: 25.00,
    tags: ['abstract', 'art', 'background'],
  },
]

const mockRecentUsers = [
  {
    id: '1',
    name: 'John Photographer',
    email: 'john@example.com',
    role: 'CONTRIBUTOR',
    joinedAt: new Date('2024-01-15'),
    uploads: 12,
    earnings: 1250.00,
  },
  {
    id: '2',
    name: 'Sarah Customer',
    email: 'sarah@example.com',
    role: 'CUSTOMER',
    joinedAt: new Date('2024-01-18'),
    purchases: 3,
    totalSpent: 150.00,
  },
]

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'approvals' | 'users' | 'analytics'>('overview')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'approvals', label: 'Pending Approvals', icon: Clock },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: Eye },
  ]

  const handleApproval = (id: string, approved: boolean) => {
    // In real app, make API call to approve/reject
    console.log(`${approved ? 'Approved' : 'Rejected'} upload ${id}`)
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your platform and content</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" asChild>
                <Link href="/admin/settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/admin/users">
                  <Shield className="h-4 w-4 mr-2" />
                  User Management
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
                    {tab.id === 'approvals' && mockStats.pendingApprovals > 0 && (
                      <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                        {mockStats.pendingApprovals}
                      </span>
                    )}
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
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Users</p>
                      <p className="text-2xl font-bold text-gray-900">{mockStats.totalUsers}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">{formatPrice(mockStats.totalRevenue)}</p>
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

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <Clock className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                      <p className="text-2xl font-bold text-gray-900">{mockStats.pendingApprovals}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex-col" asChild>
                    <Link href="/admin/approvals">
                      <Clock className="h-6 w-6 mb-2" />
                      Review Pending Content
                    </Link>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col" asChild>
                    <Link href="/admin/users">
                      <Users className="h-6 w-6 mb-2" />
                      Manage Users
                    </Link>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col" asChild>
                    <Link href="/admin/analytics">
                      <TrendingUp className="h-6 w-6 mb-2" />
                      View Analytics
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Approvals Tab */}
        {activeTab === 'approvals' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Pending Approvals</h2>
              <p className="text-gray-600">{mockPendingApprovals.length} items pending review</p>
            </div>

            <div className="space-y-4">
              {mockPendingApprovals.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={item.thumbnailUrl}
                          alt={item.title}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-2">{item.title}</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                          <div>
                            <p><span className="font-medium">Contributor:</span> {item.contributor}</p>
                            <p><span className="font-medium">Price:</span> {formatPrice(item.price)}</p>
                          </div>
                          <div>
                            <p><span className="font-medium">Uploaded:</span> {item.uploadedAt.toLocaleDateString()}</p>
                            <p><span className="font-medium">Tags:</span> {item.tags.join(', ')}</p>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleApproval(item.id, true)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleApproval(item.id, false)}
                            className="border-red-300 text-red-600 hover:bg-red-50"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Export Users
                </Button>
                <Button size="sm">
                  Add User
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockRecentUsers.map((user) => (
                <Card key={user.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-lg font-medium text-gray-600">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-xs text-gray-500">
                          Joined {user.joinedAt.toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          user.role === 'CONTRIBUTOR' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {user.role}
                        </span>
                        {user.role === 'CONTRIBUTOR' && (
                          <div className="mt-1 text-sm text-gray-600">
                            <p>{user.uploads} uploads</p>
                            <p>{formatPrice(user.earnings)} earned</p>
                          </div>
                        )}
                        {user.role === 'CUSTOMER' && (
                          <div className="mt-1 text-sm text-gray-600">
                            <p>{user.purchases} purchases</p>
                            <p>{formatPrice(user.totalSpent)} spent</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Platform Analytics</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Revenue</span>
                      <span className="font-medium">{formatPrice(mockStats.totalRevenue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Revenue</span>
                      <span className="font-medium">{formatPrice(mockStats.monthlyRevenue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Average Order Value</span>
                      <span className="font-medium">{formatPrice(mockStats.totalRevenue / 100)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Uploads</span>
                      <span className="font-medium">{mockStats.totalUploads}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Approved Uploads</span>
                      <span className="font-medium">{mockStats.approvedUploads}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Approval Rate</span>
                      <span className="font-medium">
                        {Math.round((mockStats.approvedUploads / mockStats.totalUploads) * 100)}%
                      </span>
                    </div>
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
