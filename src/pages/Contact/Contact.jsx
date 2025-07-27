import React from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
} from "react-icons/fa";
import { motion } from "framer-motion";  




const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-600 to-blue-500 py-12 md:py-16"
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto">
            We're here to help and answer any questions you might have.
          </p>
        </div>
      </motion.div>

      {/* Quick Contact Buttons - Sticky on mobile */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50 flex flex-col space-y-2">
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="tel:+01848306085"
          className="bg-green-500 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
        >
          <FaPhone className="text-xl" />
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="mailto:nssbd24@gmail.com"
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
        >
          <FaEnvelope className="text-xl" />
        </motion.a>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Our Contact Details
              </h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <FaMapMarkerAlt className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Address</h3>
                    <p className="text-gray-600 mt-1">
                     House 52, Road 1, Lane 3, Block A, South Khulshi Residential Area, Chattogram, Bangladesh
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <FaPhone className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Phone</h3>
                    <a
                      href="tel:+01848306085"
                      className="text-blue-500 hover:underline block mt-1"
                    >
                      01848306085
                    </a>
                    <a
                      href="tel:+01848306085"
                      className="text-blue-500 hover:underline block mt-1"
                    >
                      01848306085
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-red-100 p-3 rounded-lg mr-4">
                    <FaEnvelope className="text-red-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Email</h3>
                    <a
                      href="mailto:nssbd24@gmail.com"
                      className="text-blue-500 hover:underline block mt-1"
                    >
                      nssbd24@gmail.com
                    </a>
                    
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                    <FaClock className="text-yellow-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Business Hours
                    </h3>
                    <p className="text-gray-600 mt-1">
                      Saturday - Thursday: 9am - 5pm
                    </p>
                    <p className="text-gray-600 mt-1">Friday: Closed</p>
                  </div>
                </div>
              </div>

              {/* Quick Contact - Desktop */}
              <div className="hidden lg:flex space-x-4 mt-8">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="tel:+01848306085"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center transition-all"
                >
                  <FaPhone className="mr-2" /> Call Now
                </motion.a>


                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="mailto:nssbd24@gmail.com"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center transition-all"
                >
                  <FaEnvelope className="mr-2" /> Email Us
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl shadow-md overflow-hidden lg:col-span-2"
          >
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Send Us a Message
              </h2>

              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Your Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="+123 456 7890"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    required
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-all"
                >
                  <FaPaperPlane className="mr-2" /> Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="h-64 md:h-96 w-full">
  <iframe
    title="Our Location"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.790236271491!2d91.82251231488346!3d22.36202748529056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd8ff79af67f9%3A0x31b6f58bcf353aff!2sHouse%2052%2C%20Road%201%2C%20Lane%203%2C%20Block%20A%2C%20South%20Khulshi%2C%20Chattogram!5e0!3m2!1sen!2sbd!4v1722076123456!5m2!1sen!2sbd"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    className="rounded-lg"
  ></iframe>
</div>

        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
