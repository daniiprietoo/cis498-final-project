import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'

export default async function BusinessIndex() {
  const session = await auth()

  if (!session.user) {
    console.log('User not authenticated')
    return redirect('/auth/login')
  }
  if (session.user.role !== 'BUSINESS') {
    console.log('User not a business')
    return redirect('/auth/login')
  }

  
  return redirect('/business/overview')
}
