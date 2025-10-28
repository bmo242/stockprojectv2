'use client'

import { useState } from 'react'
import { Layout } from '@/components/layout/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatPrice } from '@/lib/utils'
import { Trash2, Plus, Minus, ShoppingCart, CreditCard } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Mock cart data
const mockCartItems = [
  {
    id: '1',
    mediaAsset: {
      id: '1',
      title: 'Beautiful Mountain Landscape',
      type: 'IMAGE',
      thumbnailUrl: 'https://res.cloudinary.com/demo/image/upload/w_400/sample1.jpg',
      price: 25.00,
      licenseType: 'STANDARD',
      user: {
        name: 'John Photographer',
      },
    },
    quantity: 1,
    licenseType: 'STANDARD',
  },
  {
    id: '2',
    mediaAsset: {
      id: '2',
      title: 'Modern Office Space',
      type: 'IMAGE',
      thumbnailUrl: 'https://res.cloudinary.com/demo/image/upload/w_400/sample2.jpg',
      price: 35.00,
      licenseType: 'EXTENDED',
      user: {
        name: 'Sarah Designer',
      },
    },
    quantity: 1,
    licenseType: 'EXTENDED',
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(mockCartItems)
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId)
      return
    }
    
    setCartItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (itemId: string) => {
    setCartItems(items => items.filter(item => item.id !== itemId))
  }

  const updateLicense = (itemId: string, newLicenseType: string) => {
    setCartItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, licenseType: newLicenseType } : item
      )
    )
  }

  const getLicensePrice = (basePrice: number, licenseType: string) => {
    switch (licenseType) {
      case 'EXTENDED':
        return basePrice * 2
      case 'PREMIUM':
        return basePrice * 3
      default:
        return basePrice
    }
  }

  const subtotal = cartItems.reduce((total, item) => {
    const licensePrice = getLicensePrice(item.mediaAsset.price, item.licenseType)
    return total + (licensePrice * item.quantity)
  }, 0)

  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + tax

  const handleCheckout = () => {
    setIsCheckingOut(true)
    // In real app, redirect to checkout page or payment processor
    setTimeout(() => {
      setIsCheckingOut(false)
      alert('Redirecting to checkout...')
    }, 1000)
  }

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto text-center py-16">
          <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Start browsing our collection to find amazing content</p>
          <Button asChild>
            <Link href="/browse">Browse Collection</Link>
          </Button>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Thumbnail */}
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={item.mediaAsset.thumbnailUrl}
                            alt={item.mediaAsset.title}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900 mb-1">
                              <Link 
                                href={`/asset/${item.mediaAsset.id}`}
                                className="hover:text-blue-600"
                              >
                                {item.mediaAsset.title}
                              </Link>
                            </h3>
                            <p className="text-sm text-gray-500 mb-2">
                              by {item.mediaAsset.user.name}
                            </p>
                            
                            {/* License Selection */}
                            <div className="mb-3">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                License Type
                              </label>
                              <select
                                value={item.licenseType}
                                onChange={(e) => updateLicense(item.id, e.target.value)}
                                className="text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                              >
                                <option value="STANDARD">Standard License - {formatPrice(item.mediaAsset.price)}</option>
                                <option value="EXTENDED">Extended License - {formatPrice(item.mediaAsset.price * 2)}</option>
                                <option value="PREMIUM">Premium License - {formatPrice(item.mediaAsset.price * 3)}</option>
                              </select>
                            </div>

                            {/* Quantity */}
                            <div className="flex items-center space-x-3">
                              <label className="text-sm font-medium text-gray-700">Quantity:</label>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center text-sm font-medium">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>

                          {/* Price and Actions */}
                          <div className="flex flex-col items-end space-y-2">
                            <div className="text-right">
                              <p className="text-lg font-bold text-gray-900">
                                {formatPrice(getLicensePrice(item.mediaAsset.price, item.licenseType) * item.quantity)}
                              </p>
                              <p className="text-sm text-gray-500">
                                {formatPrice(getLicensePrice(item.mediaAsset.price, item.licenseType))} each
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span className="font-medium">{formatPrice(tax)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-medium text-gray-900">Total</span>
                      <span className="text-xl font-bold text-blue-600">{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
                  </Button>
                  
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/browse">Continue Shopping</Link>
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-medium text-gray-900 mb-2">What's included:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• High-resolution downloads</li>
                    <li>• Commercial use rights</li>
                    <li>• Lifetime access</li>
                    <li>• 30-day money-back guarantee</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
}
