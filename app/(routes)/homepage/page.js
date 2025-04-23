import SearchBar from "@/components/ui/search-bar";
import FeaturedProducts from "@/components/products/featured-components";
import {
  FiChevronRight as ChevronRight,
  FiCode as Code,
  FiPackage as Package,
  FiLayers as Layers,
  FiUsers as Users,
  FiLock as Lock,
  FiTag as Tag,
  FiBarChart2 as BarChart,
} from "react-icons/fi";
import { Suspense } from "react";

export default function HomePage() {
  const categories = [
    { id: "all", name: "All Tools" },
    { id: "plugins", name: "Plugins" },
    { id: "themes", name: "Themes" },
    { id: "extensions", name: "Extensions" },
    { id: "libraries", name: "Libraries" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F8F8]">
      {/* Hero Section */}
      <section className="bg-orange-200 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-mono font-extrabold text-[#FF4500] mb-4">
              EMPOWERING DEVELOPERS, SIMPLIFYING WORKFLOWS.
              </h1>
              <p className="text-xl mb-6 text-[#666666]">
                Discover premium plugins, themes, and extensions to supercharge
                your development workflow
              </p>
              <div className="flex flex-col sm:flex-row gap-4 text-xl">
                <a
                  href="/products"
                  className="bg-[#FF4500] font-bold text-white px-6 py-3 rounded-lg hover:bg-[#e03f00] transition"
                >
                  Browse Tools
                </a>
                <a
                  href="/auth/register"
                  className="bg-[#000000] border-white px-6 py-3 rounded-lg font-bold hover:bg-[#808080] transition"
                >
                  Become a Seller
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-[#FF4500] backdrop-blur-lg p-6 rounded-xl border border-[#FF4500] shadow-xl">
                <Code size={160} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="container mx-auto px-4 mt-8 text-center">
            Loading…
          </div>
        }
      >
        <SearchBar />
      </Suspense>

      {/* Featured Tools */}
      <section className="py-8 ">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12 text-[#000000]">
            Featured Products
          </h2>
          <FeaturedProducts />
          <div className="flex justify-between items-center mt-6">
            <a
              href="/products"
              className="text-[#ff4500] hover:text-[#e03f00] flex items-center"
            >
              View all <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-[#F8F8F8]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12 text-[#000000] ">
            Why DevTools?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Package className="h-6 w-6 text-[#ff4500]" />
              </div>
              <h3 className="text-xl font-bold mb-2 ">Curated Tools</h3>
              <p className="text-[#666666]">
                Handpicked, high-quality developer tools that meet strict
                quality standards.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-[#ff4500]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
              <p className="text-[#666666]">
                Secure payment processing and immediate access to purchased
                tools.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-[#ff4500]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Developer Community</h3>
              <p className="text-[#666666]">
                Join a community of developers sharing and discovering quality
                tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seller Section */}
      <section className="py-16 bg-[#F8F8F8] text-[#ff4500]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4 text-[#ff4500]">Become a Seller</h2>
              <p className="text-lg mb-6 text-[#666666]">
                Share your developer tools with a global audience of developers<br/>
                and earn money for your creations.
              </p>
              <button className="bg-[#ff4500] border-white px-6 py-3 rounded-lg font-bold hover:bg-[#e03f00] transition text-white">
                Start Selling
              </button>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              <div className="bg-orange-100 p-4 rounded-lg backdrop-blur-sm border ">
                <div className="flex items-center mb-2">
                  <Tag className="h-5 w-5 mr-2" />
                  <span className="font-medium">Competitive Pricing</span>
                </div>
                <p className="text-sm text-[#666666]">
                  Set your own prices and keep a high percentage of sales.
                </p>
              </div>
              <div className="bg-orange-100 p-4 rounded-lg backdrop-blur-sm border ">
                <div className="flex items-center mb-2">
                  <Layers className="h-5 w-5 mr-2" />
                  <span className="font-medium">Easy Distribution</span>
                </div>
                <p className="text-sm text-[#666666]">
                  We handle hosting, distribution and payment processing.
                </p>
              </div>
              <div className="bg-orange-100 p-4 rounded-lg backdrop-blur-sm border">
                <div className="flex items-center mb-2">
                  <BarChart className="h-5 w-5 mr-2" />
                  <span className="font-medium">Sales Analytics</span>
                </div>
                <p className="text-sm text-[#666666]">
                  Detailed analytics and insights about your sales.
                </p>
              </div>
              <div className="bg-orange-100 p-4 rounded-lg backdrop-blur-sm border ">
                <div className="flex items-center mb-2">
                  <Users className="h-5 w-5 mr-2" />
                  <span className="font-medium">Global Audience</span>
                </div>
                <p className="text-sm text-[#666666]">
                  Reach developers worldwide with your tools.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
