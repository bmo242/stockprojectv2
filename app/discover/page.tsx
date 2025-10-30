'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Layout } from '@/components/layout/layout'

type MediaCard = {
  id: string
  title: string
  type: 'IMAGE' | 'VIDEO'
  thumbnailUrl: string
}

type ApiPage = {
  mediaAssets: Array<{
    id: string
    title: string
    type: 'IMAGE' | 'VIDEO'
    thumbnailUrl: string
  }>
  pagination: { page: number; pages: number }
}

export default function DiscoverPage() {
  const [items, setItems] = useState<MediaCard[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const loadRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const fetchPage = async () => {
      if (loading || !hasMore) return
      setLoading(true)
      try {
        const res = await fetch(`/api/media?page=${page}&limit=24`)
        if (!res.ok) {
          setHasMore(false)
          return
        }
        const json = (await res.json()) as Partial<ApiPage> | any
        const mediaAssets = Array.isArray(json?.mediaAssets) ? json.mediaAssets : []
        const mapped = mediaAssets.map((a: any) => ({
          id: a.id,
          title: a.title,
          type: a.type,
          thumbnailUrl: a.thumbnailUrl,
        }))
        setItems((prev) => [...prev, ...mapped])
        const totalPages = json?.pagination?.pages ?? page
        setHasMore(page < totalPages)
      } catch (_e) {
        // ignore for MVP
      } finally {
        setLoading(false)
      }
    }
    fetchPage()
  }, [page])

  useEffect(() => {
    const el = loadRef.current
    if (!el) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasMore && !loading) {
          setPage((p) => p + 1)
        }
      })
    }, { rootMargin: '1200px 0px 1200px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [hasMore, loading])

  const skeletons = useMemo(() => Array.from({ length: 12 }), [])

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Discover</h1>
          <p className="text-gray-600">A clean, Pinterest-style feed of photos and videos.</p>
        </div>

        {/* Masonry using CSS multi-column layout for simplicity */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 [column-fill:_balance]"><div className="contents">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/asset/${item.id}`}
              className="mb-4 block break-inside-avoid rounded-lg overflow-hidden border bg-white group"
            >
              <div className="relative w-full">
                <div className="w-full h-auto">
                  {/* Use next/image for optimization; object-cover within auto height via intrinsic sizing */}
                  <Image
                    src={item.thumbnailUrl}
                    alt={item.title}
                    width={1200}
                    height={800}
                    className="w-full h-auto transition-transform group-hover:scale-[1.02]"
                  />
                </div>
                <div className="absolute top-2 left-2 rounded-full bg-black/60 text-white text-[10px] px-2 py-0.5">
                  {item.type === 'VIDEO' ? 'VIDEO' : 'IMAGE'}
                </div>
              </div>
              <div className="px-3 py-2">
                <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.title}</p>
              </div>
            </Link>
          ))}

          {loading && items.length === 0 && (
            <>
              {skeletons.map((_, i) => (
                <div key={i} className="mb-4 break-inside-avoid rounded-lg overflow-hidden border bg-white">
                  <div className="animate-pulse aspect-[3/2] bg-gray-200" />
                  <div className="p-3"><div className="animate-pulse h-4 w-2/3 bg-gray-200 rounded" /></div>
                </div>
              ))}
            </>
          )}
        </div></div>

        {/* Sentinel for infinite loading */}
        <div ref={loadRef} className="h-10" />
        {!hasMore && items.length > 0 && (
          <div className="py-8 text-center text-sm text-gray-500">You\'re all caught up ✨</div>
        )}
      </div>
    </Layout>
  )
}


