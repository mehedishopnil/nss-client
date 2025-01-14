import React from 'react';

const Contact = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Contact Section */}
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
          Contact Us
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Address and Contact Info */}
          <div className="bg-white shadow-lg rounded-lg p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-600 mb-6">
              We’d love to hear from you! Here’s how you can reach us.
            </p>
            <ul className="space-y-4 text-sm md:text-base">
              <li>
                <span className="font-semibold text-gray-700">Address:</span> 123
                Main Street, City, Country
              </li>
              <li>
                <span className="font-semibold text-gray-700">Phone:</span>{' '}
                <a
                  href="tel:+1234567890"
                  className="text-blue-500 hover:underline"
                >
                  +123 456 7890
                </a>
              </li>
              <li>
                <span className="font-semibold text-gray-700">Email:</span>{' '}
                <a
                  href="mailto:info@example.com"
                  className="text-blue-500 hover:underline"
                >
                  info@example.com
                </a>
              </li>
              <li>
                <span className="font-semibold text-gray-700">Business Hours:</span>{' '}
                Mon - Fri, 9am - 5pm
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <div className="bg-white shadow-lg rounded-lg p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4">
              Send Us a Message
            </h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-600 font-medium mb-1"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-600 font-medium mb-1"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-600 font-medium mb-1"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  placeholder="Write your message"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition text-sm md:text-base"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
