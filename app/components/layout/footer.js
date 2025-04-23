export default function Footer() {
  return (
    <footer className="bg-orange-200 text-[#ff4500] py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 ">Dev Tools Platform</h3>
            <p className="text-[#000000]">The marketplace for premium developer tools, plugins, and themes.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Products</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-[#000000] hover:text-white transition">Plugins</a></li>
              <li><a href="#" className="text-[#000000] hover:text-white transition">Themes</a></li>
              <li><a href="#" className="text-[#000000] hover:text-white transition">Extensions</a></li>
              <li><a href="#" className="text-[#000000] hover:text-white transition">Libraries</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-[#000000] hover:text-white transition">Documentation</a></li>
              <li><a href="#" className="text-[#000000] hover:text-white transition">Blog</a></li>
              <li><a href="#" className="text-[#000000] hover:text-white transition">Support</a></li>
              <li><a href="#" className="text-[#000000] hover:text-white transition">API</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-[#000000] hover:text-white transition">About</a></li>
              <li><a href="#" className="text-[#000000] hover:text-white transition">Careers</a></li>
              <li><a href="#" className="text-[#000000] hover:text-white transition">Privacy</a></li>
              <li><a href="#" className="text-[#000000] hover:text-white transition">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-black mt-8 pt-8">
          <p className="text-[#000000] text-center">© 2025 Developer Tools Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}