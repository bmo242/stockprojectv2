import { NextRequest, NextResponse } from 'next/server'
import { generateCloudinarySignature } from '@/lib/cloudinary'
import { z } from 'zod'

const uploadSchema = z.object({
  folder: z.string().optional(),
  resource_type: z.enum(['image', 'video']).optional(),
  transformation: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { folder, resource_type, transformation } = uploadSchema.parse(body)

    const params = {
      folder: folder || 'stock-platform',
      resource_type: resource_type || 'auto',
      transformation: transformation,
    }

    const { signature, timestamp } = generateCloudinarySignature(params)

    return NextResponse.json({
      signature,
      timestamp,
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
    })
  } catch (error) {
    console.error('Error generating Cloudinary signature:', error)
    return NextResponse.json(
      { error: 'Failed to generate upload signature' },
      { status: 500 }
    )
  }
}
