'use client'

import { useEffect, useRef, useState } from 'react'
import { Layout } from '@/components/layout/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

declare global {
  interface Window {
    Accept?: any
  }
}

export default function CheckoutPage() {
  const formRef = useRef<HTMLFormElement>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const paymentsEnabled = (process.env.NEXT_PUBLIC_ENABLE_PAYMENTS || 'false') === 'true'

  useEffect(() => {
    if (!paymentsEnabled) return
    const script = document.createElement('script')
    script.src = 'https://js.authorize.net/v3/AcceptUI.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [paymentsEnabled])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!paymentsEnabled) return
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // Minimal example: simulate having an opaqueData (token) from Accept.js
      // In real flow, Accept.js will POST back a response with opaqueData
      const fakeOpaqueData = { dataDescriptor: 'COMMON.ACCEPT.INAPP.PAYMENT', dataValue: 'opaque-token-demo' }

      const res = await fetch('/api/checkout/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: 'demo-order-id',
          transactionId: 'demo-txn-id',
          paymentMethod: 'Credit Card',
          opaqueData: fakeOpaqueData,
        }),
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Payment failed')
      setSuccess('Payment confirmed. Your order is complete!')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Checkout</CardTitle>
          </CardHeader>
          <CardContent>
            {!paymentsEnabled ? (
              <div className="rounded-md border border-amber-200 bg-amber-50 p-6 text-sm text-amber-800">
                Payments are currently disabled. Please contact us to license media or request an invoice.
              </div>
            ) : (
              <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input className="w-full rounded-lg border border-gray-300 px-3 py-2" placeholder="4111 1111 1111 1111" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                    <input className="w-full rounded-lg border border-gray-300 px-3 py-2" placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input className="w-full rounded-lg border border-gray-300 px-3 py-2" placeholder="123" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP</label>
                    <input className="w-full rounded-lg border border-gray-300 px-3 py-2" placeholder="10001" />
                  </div>
                </div>

                {error && <div className="text-sm text-red-600">{error}</div>}
                {success && <div className="text-sm text-green-600">{success}</div>}

                <Button type="submit" disabled={loading}>{loading ? 'Processing…' : 'Pay now'}</Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}


