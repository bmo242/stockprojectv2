import { NextRequest, NextResponse } from 'next/server'
import { generateCloudinarySignature } from '@/lib/cloudinary'
import { z } from 'zod'

const uploadSchema = z.object({
  folder: z.string().optional(),
  resource_type: z.enum(['image', 'video']).optional(),
  transformation: z.string().optional(),
  // Optional role hint from client; middleware protects UI, this adds basic defense-in-depth.
  role: z.enum(['ADMIN', 'CONTRIBUTOR', 'CUSTOMER']).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { folder, resource_type, transformation, role } = uploadSchema.parse(body)

    // Basic guard: only contributors/admins may request upload signatures
    const cookieNames = request.cookies.getAll().map(c => c.name)
    const hasSupabaseSession = cookieNames.some(n => n.includes('access-token'))
    const isAllowedRole = role === 'CONTRIBUTOR' || role === 'ADMIN'
    if (!hasSupabaseSession || !isAllowedRole) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const params = {
      folder: folder || 'stock-platform/uploads',
      resource_type: resource_type || 'auto',
      transformation: transformation,
    }

    const { signature, timestamp } = generateCloudinarySignature(params)

    return NextResponse.json({
      signature,
      timestamp,
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET || null,
    })
  } catch (error) {
    console.error('Error generating Cloudinary signature:', error)
    return NextResponse.json(
      { error: 'Failed to generate upload signature' },
      { status: 500 }
    )
  }
}
