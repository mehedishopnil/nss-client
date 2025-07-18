import React from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaWhatsapp,
  FaLinkedin,
  FaFacebook,
} from "react-icons/fa";
import { HiOutlineChatAlt2 } from "react-icons/hi";

const QuickContact = () => {
  const contactMethods = [
    {
      icon: <FaPhone className="text-2xl" />,
      title: "Call Us",
      info: "01848306085",
      link: "tel:+8801848306085",
      description: "Available 24/7 for emergencies",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <FaEnvelope className="text-2xl" />,
      title: "Email Us",
      info: "nssbd@gmail.com",
      link: "mailto:nssbd@gmail.com",
      description: "Response within 2 hours",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl" />,
      title: "Visit Us",
      info: "Khulshi, Chattogram",
      link: "https://www.google.com/maps/place/Khulshi,+Chattogram/@22.3583828,91.8127239,15z/data=!3m1!4b1!4m6!3m5!1s0x30acd89b5cfdf4a9:0x1f7e0a3a1a1a1a1a!8m2!3d22.3583828!4d91.8127239!16s%2Fg%2F1pty9y9f5",
      description: "Our office location",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <FaClock className="text-2xl" />,
      title: "Working Hours",
      info: "Mon-Sun: 24/7",
      description: "Emergency services always available",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  const socialLinks = [
    {
      icon: <FaWhatsapp className="text-xl" />,
      name: "WhatsApp",
      link: "https://wa.me/+8801848306085",
      color: "bg-green-500",
    },
    {
      icon: <FaLinkedin className="text-xl" />,
      name: "LinkedIn",
      link: "https://linkedin.com/company/securitypro",
      color: "bg-blue-600",
    },
    {
      icon: <FaFacebook className="text-xl" />,
      name: "Facebook",
      link: "https://facebook.com/securitypro",
      color: "bg-blue-700",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're here to help and answer any questions you might have.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6  mb-12">
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.link}
              className="flex flex-col items-center group justify-center bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100"
            >
              <div
                className={`w-12 h-12 ${method.color} rounded-full flex items-center justify-center mb-4`}
              >
                {method.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {method.title}
              </h3>
              <p className="text-gray-600 mb-2 group-hover:text-gray-800 transition-colors">
                {method.description}
              </p>
              <p className="text-lg font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                {method.info}
              </p>
            </a>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8 max-w-4xl mx-auto border border-gray-100">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Connect With Us
              </h3>
              <p className="text-gray-600">
                Follow us on social media for updates and news
              </p>
            </div>

            <div className="flex  space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  className={`${social.color} text-white w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:-translate-y-1 hover:shadow-md`}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Need immediate assistance? Call our emergency line:
            <a
              href="tel:+8801848306085"
              className="text-orange-600 font-medium ml-1 hover:underline"
            >
              +88 01848306085
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default QuickContact;
