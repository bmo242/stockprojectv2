import { Layout } from '@/components/layout/layout'
import { AuthForm } from '@/components/auth/auth-form'

export default function SignInPage() {
  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <AuthForm />
      </div>
    </Layout>
  )
}
