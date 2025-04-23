import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'

export default async function UserIndex() {
  const session = await auth()


  if (!session?.user) {
    console.log('User not authenticated')
    return redirect('/auth/login')
  }

  if (session.user.role !== 'USER') {
    console.log('User not authorized')
    return redirect('/auth/login')
  }

  return redirect('/user/profile')
}
