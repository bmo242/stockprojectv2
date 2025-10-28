import { Layout } from '@/components/layout/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Standard License',
    price: 25,
    description: 'Perfect for personal projects and small business use',
    features: [
      'Personal use',
      'Small business use',
      'Web use',
      'Social media',
      'Standard resolution',
    ],
    restrictions: [
      'No resale',
      'No large commercial use',
      'No print advertising',
    ],
  },
  {
    name: 'Extended License',
    price: 50,
    description: 'Ideal for larger commercial projects',
    features: [
      'All Standard features',
      'Large commercial use',
      'Print advertising',
      'Unlimited prints',
      'High resolution',
    ],
    restrictions: [
      'No resale',
      'No white-label use',
    ],
  },
  {
    name: 'Premium License',
    price: 75,
    description: 'Complete commercial rights',
    features: [
      'All Extended features',
      'Resale rights',
      'White-label use',
      'Priority support',
      'Ultra high resolution',
    ],
    restrictions: [],
  },
]

export default function PricingPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Pricing Plans</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the perfect license for your project. All plans include lifetime access and commercial use rights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card key={plan.name} className="relative">
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="text-3xl font-bold text-blue-600">${plan.price}</div>
                <p className="text-gray-600">{plan.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {plan.restrictions.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">Restrictions:</h4>
                    <ul className="space-y-1">
                      {plan.restrictions.map((restriction) => (
                        <li key={restriction} className="text-sm text-gray-600">
                          • {restriction}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Button className="w-full">
                  Choose {plan.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need a Custom License?</h2>
          <p className="text-gray-600 mb-6">
            Contact us for enterprise licensing and custom agreements.
          </p>
          <Button variant="outline" size="lg">
            Contact Sales
          </Button>
        </div>
      </div>
    </Layout>
  )
}
