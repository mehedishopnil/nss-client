import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Agency Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">
              <span className="text-orange-500">NSS</span> Security
            </h2>
            <p className="text-gray-400">
              National Security Services provides premium protection solutions with 
              highly trained professionals ensuring your safety 24/7.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <FaPhoneAlt className="text-orange-500" />
              <span>Emergency: +8801848306085</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-gray-700">
              Our Services
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-orange-500 transition">Armed Security</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Event Security</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Residential Security</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Corporate Protection</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">VIP Security</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-gray-700">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-orange-500 transition">About Us</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Our Team</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Careers</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Testimonials</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-gray-700">
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-orange-500 mt-1 mr-3 flex-shrink-0" />
                <span>123 Security Plaza, Dhaka 1207, Bangladesh</span>
              </div>
              <div className="flex items-center">
                <FaPhoneAlt className="text-orange-500 mr-3" />
                <span>+880 01848306085</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-orange-500 mr-3" />
                <span>contact@nss-security.com</span>
              </div>
              <div className="flex space-x-4 pt-2">
                <a href="#" className="text-gray-400 hover:text-orange-500 transition">
                  <FaFacebook size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition">
                  <FaTwitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition">
                  <FaLinkedin size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition">
                  <FaYoutube size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} National Security Services. All Rights Reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-orange-500 text-sm transition">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-orange-500 text-sm transition">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-orange-500 text-sm transition">Sitemap</a>
            </div>
          </div>
          <p className="text-gray-600 text-xs mt-4 text-center md:text-left">
            Licensed and Regulated by the Bangladesh Security Regulatory Authority
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;