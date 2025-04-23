import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'

export default async function AdminIndex() {
  const session = await auth()

  if (!session?.user) {
    console.log('User not authenticated')
    return redirect('/auth/login')
  }
  
  return redirect('/admin/profile')
}
