import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateOrderNumber } from '@/lib/utils'
import { z } from 'zod'

const createOrderSchema = z.object({
  items: z.array(z.object({
    mediaAssetId: z.string(),
    quantity: z.number().min(1),
  })),
  customerEmail: z.string().email(),
  customerName: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, customerEmail, customerName } = createOrderSchema.parse(body)

    // Calculate total amount
    let totalAmount = 0
    const orderItems = []

    for (const item of items) {
      const mediaAsset = await prisma.mediaAsset.findUnique({
        where: { id: item.mediaAssetId },
      })

      if (!mediaAsset) {
        return NextResponse.json(
          { error: `Media asset ${item.mediaAssetId} not found` },
          { status: 404 }
        )
      }

      const itemTotal = mediaAsset.price * item.quantity
      totalAmount += itemTotal

      orderItems.push({
        mediaAssetId: item.mediaAssetId,
        quantity: item.quantity,
        unitPrice: mediaAsset.price,
        totalPrice: itemTotal,
      })
    }

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        customerEmail,
        customerName,
        totalAmount,
        items: {
          create: orderItems,
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

    return NextResponse.json({
      order,
      message: 'Order created successfully',
    })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
