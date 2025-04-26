import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { BUSINESS_QUERIES } from '@/lib/db/actions'
import BusinessInfo from '@/components/business/business-info'
import ProductCard from '@/components/products/product-card'
import NewSupportPage from '@/(routes)/user/support/request/page'

export default async function BusinessIndex({ params }) {
  const session = await auth()
  if (!session?.user) {
    console.log('User not authenticated')
    return redirect('/auth/login')
  }

  const { sellerId } = params
  const business = await BUSINESS_QUERIES.getAllBusinessInfo(sellerId)
  if (!business) {
    console.log('Business not found')
    return redirect('/404')
  }

  // pull products out of the business object
  const products = business.products || []

  return (
    <div className="container mx-auto px-4 py-8 bg-[#F8F8F8]">
      <BusinessInfo business={business} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {products.map((tool) => (
          <ProductCard key={tool.id} tool={tool} />
        ))}
      </div>

      <div className="mt-8">
        <NewSupportPage />
      </div>
    </div>
  )
}

