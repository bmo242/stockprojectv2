import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createMediaSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  type: z.enum(['IMAGE', 'VIDEO']),
  tags: z.array(z.string()),
  category: z.string().optional(),
  cloudinaryId: z.string(),
  originalUrl: z.string(),
  thumbnailUrl: z.string(),
  previewUrl: z.string(),
  watermarkedUrl: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  duration: z.number().optional(),
  fileSize: z.number().optional(),
  format: z.string().optional(),
  price: z.number(),
  licenseType: z.enum(['STANDARD', 'EXTENDED', 'PREMIUM']).optional(),
  userId: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = createMediaSchema.parse(body)

    const mediaAsset = await prisma.mediaAsset.create({
      data: {
        ...data,
        licenseType: data.licenseType || 'STANDARD',
        isActive: true,
        isApproved: false, // Requires admin approval
      },
      include: {
        user: true,
      },
    })

    return NextResponse.json({
      mediaAsset,
      message: 'Media asset created successfully',
    })
  } catch (error) {
    console.error('Error creating media asset:', error)
    return NextResponse.json(
      { error: 'Failed to create media asset' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const category = searchParams.get('category')
    const tags = searchParams.get('tags')
    const type = searchParams.get('type')
    const search = searchParams.get('search')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')

    const where: any = {
      isActive: true,
      isApproved: true,
    }

    if (category) {
      where.category = category
    }

    if (type) {
      where.type = type
    }

    if (tags) {
      where.tags = {
        hasSome: tags.split(','),
      }
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { tags: { hasSome: [search] } },
      ]
    }

    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.gte = parseFloat(minPrice)
      if (maxPrice) where.price.lte = parseFloat(maxPrice)
    }

    const [mediaAssets, total] = await Promise.all([
      prisma.mediaAsset.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.mediaAsset.count({ where }),
    ])

    return NextResponse.json({
      mediaAssets,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching media assets:', error)
    return NextResponse.json(
      { error: 'Failed to fetch media assets' },
      { status: 500 }
    )
  }
}
