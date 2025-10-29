import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { supabaseAdmin } from '@/lib/supabase'
import { z } from 'zod'

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  supabaseId: z.string(),
  role: z.enum(['ADMIN', 'CONTRIBUTOR', 'CUSTOMER']).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, supabaseId, role = 'CUSTOMER' } = createUserSchema.parse(body)

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { supabaseId },
        ],
      },
    })

    if (existingUser) {
      return NextResponse.json({
        user: existingUser,
        message: 'User already exists',
      })
    }

    // Create user in database
    const user = await prisma.user.create({
      data: {
        email,
        name,
        supabaseId,
        role: role as any,
      },
    })

    return NextResponse.json({
      user,
      message: 'User created successfully',
    })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    const supabaseId = searchParams.get('supabaseId')

    if (!email && !supabaseId) {
      return NextResponse.json(
        { error: 'Email or Supabase ID required' },
        { status: 400 }
      )
    }

    const orConditions: any[] = []
    if (email) orConditions.push({ email })
    if (supabaseId) orConditions.push({ supabaseId })

    const user = await prisma.user.findFirst({
      where: {
        OR: orConditions.length > 0 ? orConditions : undefined,
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}
