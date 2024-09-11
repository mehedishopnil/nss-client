import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-100 text-base-content py-10">
      <div className="container mx-auto px-4">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <h2 className="text-2xl font-bold text-primary">Your Company</h2>
            <p className="mt-4 text-base">
              We provide the best services for your travel needs. Let's explore the world together!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#services" className="hover:text-primary">Our Services</a></li>
              <li><a href="#about" className="hover:text-primary">About Us</a></li>
              <li><a href="#contact" className="hover:text-primary">Contact Us</a></li>
              <li><a href="#blog" className="hover:text-primary">Blog</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#facebook" className="hover:text-primary">
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a href="#twitter" className="hover:text-primary">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a href="#instagram" className="hover:text-primary">
                <i className="fab fa-instagram fa-lg"></i>
              </a>
              <a href="#linkedin" className="hover:text-primary">
                <i className="fab fa-linkedin fa-lg"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="text-center mt-10 border-t pt-6">
          <p className="text-sm">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
