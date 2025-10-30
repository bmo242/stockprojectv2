import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const opaqueDataSchema = z.object({
  dataDescriptor: z.string(),
  dataValue: z.string(),
}).optional()

const confirmOrderSchema = z.object({
  orderId: z.string(),
  transactionId: z.string().optional(),
  paymentMethod: z.string().optional(),
  opaqueData: opaqueDataSchema,
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, transactionId, paymentMethod, opaqueData } = confirmOrderSchema.parse(body)

    // Simulate server-side verification of Accept.js opaque data
    if (opaqueData) {
      // Minimal validation: ensure the descriptor matches expected format
      if (!opaqueData.dataDescriptor.startsWith('COMMON.ACCEPT')) {
        return NextResponse.json({ error: 'Invalid payment token' }, { status: 400 })
      }
    }

    // Update order status
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'COMPLETED',
        transactionId: transactionId || 'SIMULATED-TXN-ID',
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
