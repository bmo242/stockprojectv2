import Link from 'next/link'
import { Layout } from '@/components/layout/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, Upload, Download, Users, Award, Zap } from 'lucide-react'

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl">
          Premium Stock Photos & Videos
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Discover high-quality stock photos and videos from our curated collection. 
          Perfect for your creative projects, marketing campaigns, and business needs.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/browse">Browse Collection</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/upload">Start Selling</Link>
          </Button>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search photos and videos..."
              className="w-full rounded-lg border border-gray-300 bg-white py-4 pl-12 pr-4 text-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {['Business', 'Nature', 'Technology', 'People', 'Food', 'Travel'].map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 hover:bg-gray-200 cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose StockPlatform?</h2>
          <p className="mt-4 text-lg text-gray-600">
            We provide everything you need for your creative projects
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Award className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>High Quality</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                All our content is professionally curated and meets the highest quality standards.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>Instant Download</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Download your purchased content immediately after payment confirmation.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>Global Community</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Join thousands of contributors and customers from around the world.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Upload className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>Easy Upload</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Upload your content easily and start earning from your creative work.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Download className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>Multiple Formats</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Download in various formats and sizes to fit your project needs.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Award className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>Licensed Content</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                All content comes with proper licensing for commercial and personal use.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 rounded-lg text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-lg mb-8 opacity-90">
          Join our platform today and discover amazing content or start selling your own.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="secondary" size="lg" asChild>
            <Link href="/browse">Browse Content</Link>
          </Button>
          <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
            <Link href="/upload">Start Selling</Link>
          </Button>
        </div>
      </section>
    </Layout>
  )
}
