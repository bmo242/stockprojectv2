import { MediaAsset } from '@/types'
import { MediaCard } from './media-card'

interface MediaGridProps {
  mediaAssets: MediaAsset[]
  isLoading?: boolean
}

export function MediaGrid({ mediaAssets, isLoading = false }: MediaGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-video rounded-lg bg-gray-200"></div>
            <div className="mt-4 space-y-2">
              <div className="h-4 rounded bg-gray-200"></div>
              <div className="h-3 w-3/4 rounded bg-gray-200"></div>
              <div className="h-3 w-1/2 rounded bg-gray-200"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (mediaAssets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900">No media found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search criteria or browse our collection.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {mediaAssets.map((mediaAsset) => (
        <MediaCard key={mediaAsset.id} mediaAsset={mediaAsset} />
      ))}
    </div>
  )
}
