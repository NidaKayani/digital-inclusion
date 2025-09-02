export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-xl text-white mb-4">Digital Inclusion</h3>
          <p>Empowering students through accessible and intelligent learning systems.</p>
        </div>
        <div>
          <h3 className="font-bold text-xl text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Our Mission</a></li>
            <li><a href="#" className="hover:text-white transition-colors">The System</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-xl text-white mb-4">Contact</h3>
          <p>123 Education Drive</p>
          <p>Digital City, DC 12345</p>
          <p className="mt-4">Email: contact@digi-incl.com</p>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
        &copy; 2024 Digital Inclusion. All rights reserved.
      </div>
    </footer>
  );
}
