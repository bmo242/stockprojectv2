import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const confirmOrderSchema = z.object({
  orderId: z.string(),
  transactionId: z.string(),
  paymentMethod: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, transactionId, paymentMethod } = confirmOrderSchema.parse(body)

    // Update order status
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'COMPLETED',
        transactionId,
        paymentMethod,
        completedAt: new Date(),
      },
      include: {
        items: {
          include: {
            mediaAsset: true,
          },
        },
      },
    })

    // TODO: Send confirmation email
    // TODO: Generate download links
    // TODO: Update contributor earnings

    return NextResponse.json({
      order,
      message: 'Order confirmed successfully',
    })
  } catch (error) {
    console.error('Error confirming order:', error)
    return NextResponse.json(
      { error: 'Failed to confirm order' },
      { status: 500 }
    )
  }
}

// Webhook endpoint for Authorize.net notifications
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    
    // TODO: Verify webhook signature
    // TODO: Process webhook payload
    // TODO: Update order status based on webhook data

    console.log('Received webhook:', body)

    return NextResponse.json({ message: 'Webhook processed' })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    )
  }
}
