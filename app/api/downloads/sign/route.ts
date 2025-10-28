import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCloudinaryUrl } from '@/lib/cloudinary'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

const downloadSchema = z.object({
  mediaAssetId: z.string(),
  orderId: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { mediaAssetId, orderId } = downloadSchema.parse(body)

    // Verify order exists and is completed
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        status: 'COMPLETED',
        items: {
          some: {
            mediaAssetId,
          },
        },
      },
      include: {
        items: {
          include: {
            mediaAsset: true,
          },
        },
      },
    })

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found or not completed' },
        { status: 404 }
      )
    }

    // Find the specific media asset
    const orderItem = order.items.find(item => item.mediaAssetId === mediaAssetId)
    if (!orderItem) {
      return NextResponse.json(
        { error: 'Media asset not found in order' },
        { status: 404 }
      )
    }

    const mediaAsset = orderItem.mediaAsset

    // Generate signed URL for download (expires in 1 hour)
    const token = jwt.sign(
      {
        mediaAssetId: mediaAsset.id,
        cloudinaryId: mediaAsset.cloudinaryId,
        orderId: order.id,
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour
      },
      process.env.JWT_SECRET!
    )

    // Generate Cloudinary download URL
    const downloadUrl = getCloudinaryUrl(mediaAsset.cloudinaryId, {
      resource_type: mediaAsset.type.toLowerCase(),
      flags: 'attachment',
      expires_at: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour
    })

    return NextResponse.json({
      downloadUrl,
      token,
      expiresIn: 3600, // 1 hour in seconds
      mediaAsset: {
        id: mediaAsset.id,
        title: mediaAsset.title,
        type: mediaAsset.type,
        format: mediaAsset.format,
        fileSize: mediaAsset.fileSize,
      },
    })
  } catch (error) {
    console.error('Error generating download URL:', error)
    return NextResponse.json(
      { error: 'Failed to generate download URL' },
      { status: 500 }
    )
  }
}
