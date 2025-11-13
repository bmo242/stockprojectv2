import { MediaAsset } from '@/types'
import { formatFileSize, formatDuration } from '@/lib/utils'
import { Play, Download, Heart, Eye } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface MediaCardProps {
  mediaAsset: MediaAsset
  showActions?: boolean
}

export function MediaCard({ mediaAsset, showActions = true }: MediaCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/asset/${mediaAsset.id}`}>
        <div className="aspect-video relative overflow-hidden bg-gray-100">
          {mediaAsset.type === 'IMAGE' ? (
            <Image
              src={mediaAsset.thumbnailUrl}
              alt={mediaAsset.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="relative h-full">
              <Image
                src={mediaAsset.thumbnailUrl}
                alt={mediaAsset.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full bg-black/50 p-3">
                  <Play className="h-6 w-6 text-white" />
                </div>
              </div>
              {mediaAsset.duration && (
                <div className="absolute bottom-2 right-2 rounded bg-black/75 px-2 py-1 text-xs text-white">
                  {formatDuration(mediaAsset.duration)}
                </div>
              )}
            </div>
          )}
          
          {/* Overlay actions */}
          {showActions && (
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20">
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between opacity-0 transition-opacity group-hover:opacity-100">
                <div className="flex items-center space-x-2">
                  <button className="rounded-full bg-white/90 p-2 text-gray-700 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </button>
                  <button className="rounded-full bg-white/90 p-2 text-gray-700 hover:bg-white">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
                <button className="rounded-full bg-white/90 p-2 text-gray-700 hover:bg-white">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <h3 className="font-medium text-gray-900 line-clamp-2">{mediaAsset.title}</h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-1">{mediaAsset.description}</p>
        
        <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
          <span>by {mediaAsset.user.name || mediaAsset.user.email}</span>
          {mediaAsset.fileSize ? (
            <span>{formatFileSize(mediaAsset.fileSize)}</span>
          ) : null}
        </div>
      </div>
    </div>
  )
}
