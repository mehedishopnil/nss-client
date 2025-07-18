import React from 'react';
import { FaShieldAlt, FaUserTie, FaCalendarAlt, FaHome, FaBuilding, FaUserShield, FaClipboardCheck, FaCarAlt, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import QuickContact from '../../components/QuickContact/QuickContact';

const services = [
  {
    id: 1,
    icon: <FaUserShield className="text-4xl text-orange-600" />,
    title: "Personal Security",
    content: "Providing trained and reliable security personnel for individuals requiring personal protection.",
    link: "/personal-security",
  },
  {
    id: 2,
    icon: <FaBuilding className="text-4xl text-orange-600" />,
    title: "Corporate Security",
    content: "Ensuring the safety of corporate assets and employees with professional security solutions.",
    link: "/corporate-security",
  },
  {
    id: 3,
    icon: <FaCalendarAlt className="text-4xl text-orange-600" />,
    title: "Event Security",
    content: "Offering comprehensive security for events of all sizes to ensure smooth operations.",
    link: "/event-security",
  },
  {
    id: 4,
    icon: <FaHome className="text-4xl text-orange-600" />,
    title: "Residential Security",
    content: "24/7 protection for homes and gated communities with trained security personnel.",
    link: "/residential-security",
  },
  {
    id: 5,
    icon: <FaShieldAlt className="text-4xl text-orange-600" />,
    title: "VIP Protection",
    content: "Discreet and professional protection services for high-profile individuals.",
    link: "/vip-protection",
  },
  {
    id: 6,
    icon: <FaClipboardCheck className="text-4xl text-orange-600" />,
    title: "Security Consulting",
    content: "Risk assessment and customized security solutions for your specific needs.",
    link: "/security-consulting",
  },
  {
    id: 7,
    icon: <FaCarAlt className="text-4xl text-orange-600" />,
    title: "Mobile Patrols",
    content: "Regular security patrols of your property for maximum coverage and deterrence.",
    link: "/mobile-patrols",
  },
  {
    id: 8,
    icon: <FaUserTie className="text-4xl text-orange-600" />,
    title: "Executive Protection",
    content: "Comprehensive protection services for corporate executives and their families.",
    link: "/executive-protection",
  },
];



const ServicesSection = () => {
  return (
    <div className="bg-gray-50">
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-600 mb-4">Our Security Services</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive protection solutions tailored to your specific security needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <a
              key={service.id}
              href={service.link}
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="bg-orange-50 p-4 rounded-full group-hover:bg-orange-100 transition-colors">
                    {service.icon}
                  </div>
                </div>
                <h2 className="text-xl font-bold text-center text-gray-800 mb-3 group-hover:text-orange-600 transition-colors">
                  {service.title}
                </h2>
                <p className="text-gray-600 text-center">
                  {service.content}
                </p>
                <div className="mt-6 text-center">
                  <button className="text-orange-600 font-semibold hover:underline">
                    Learn More →
                  </button>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
      
      <QuickContact />

      
      
    </div>
  );
};

const OurServices = () => {
  return (
    <div>
      <ServicesSection />
    </div>
  );
};

export default OurServices;