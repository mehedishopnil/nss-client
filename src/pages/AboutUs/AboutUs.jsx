import React from "react";
import {
  FaShieldAlt,
  FaUserCheck,
  FaHeadset,
  FaClock,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaBuilding,
  FaHome,
  FaUserShield,
  FaClipboardCheck,
  FaCarAlt,
} from "react-icons/fa";
import AllGards from "../../assets/image/BannerImg/AllGards-wide-range.jpg";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Banner */}
      <div
        className="relative h-[40vh] bg-cover bg-top flex items-center justify-center"
        style={{ backgroundImage: `url(${AllGards})` }}
      >
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-2">All About Us</h1>
          <p className="text-xl md:text-2xl font-medium opacity-90">
            Your Trusted Security Partner
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Who We Are */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-orange-600 mb-4">Who We Are</h2>
          <div className="bg-base-200 rounded-2xl p-8 shadow-md text-lg leading-relaxed">
            We are a premier security service agency committed to providing
            top-tier protection solutions for businesses and individuals. With
            years of experience in the industry, our team of highly trained
            professionals delivers unmatched security services tailored to your
            specific needs.
          </div>
        </section>

        {/* Our Mission */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-orange-600 mb-4">Our Mission</h2>
          <div className="bg-base-200 rounded-2xl p-8 shadow-md text-lg leading-relaxed">
            To deliver exceptional security services through innovation,
            integrity, and vigilance. We aim to create safe environments that
            allow our clients to focus on what matters most to them, knowing
            their security is in expert hands.
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-20 text-center">
          <h2 className="text-3xl font-bold text-orange-600 mb-10">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
              Icon: FaShieldAlt,
              title: "Comprehensive Protection",
              text: "End-to-end security solutions covering all aspects of your safety needs."
            }, {
              Icon: FaUserCheck,
              title: "Certified Professionals",
              text: "All our security personnel undergo rigorous training and background checks."
            }, {
              Icon: FaHeadset,
              title: "24/7 Support",
              text: "Round-the-clock monitoring and immediate response to any security concerns."
            }].map(({ Icon, title, text }, i) => (
              <div
                key={i}
                className="rounded-xl flex flex-col items-center bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center"
              >
                <Icon className="text-5xl text-orange-600 text-center mb-4" />
                <h3 className="text-2xl font-semibold mb-2">{title}</h3>
                <p className="text-base opacity-80">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services Section */}
<section className="mb-20">
  <h2 className="text-3xl font-bold text-orange-600 mb-8 text-center">Our Security Services</h2>
  <div className="bg-base-100 rounded-2xl p-6 shadow-lg">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        {
          title: "Armed Security Guards",
          icon: <FaShieldAlt className="text-2xl " />,
          desc: "Highly trained armed personnel for high-risk environments"
        },
        {
          title: "Unarmed Security Guards",
          icon: <FaUserCheck className="text-2xl" />,
          desc: "Professional security officers for general protection needs"
        },
        {
          title: "Event Security",
          icon: <FaCalendarAlt className="text-2xl" />,
          desc: "Crowd management and safety for all types of events"
        },
        {
          title: "Corporate Security",
          icon: <FaBuilding className="text-2xl" />,
          desc: "Comprehensive protection for businesses and offices"
        },
        {
          title: "Residential Security",
          icon: <FaHome className="text-2xl" />,
          desc: "24/7 protection for homes and residential communities"
        },
        {
          title: "VIP Protection",
          icon: <FaUserShield className="text-2xl" />,
          desc: "Discreet executive protection services"
        },
        {
          title: "Security Consulting",
          icon: <FaClipboardCheck className="text-2xl" />,
          desc: "Risk assessment and security strategy development"
        },
        {
          title: "Mobile Patrols",
          icon: <FaCarAlt className="text-2xl" />,
          desc: "Regular patrols of your property for maximum coverage"
        }
      ].map((service, idx) => (
        <button
          key={idx}
          className="btn btn-outline border-gray-200 h-auto min-h-0 py-6 px-4 rounded-xl transition-all hover:shadow-lg hover:transform hover:-translate-y-1 hover:bg-white hover:text-gray-800 hover:border  group"
        >
          <div className="flex flex-col items-start text-left hover:text-orange-600 w-full">
            <div className="flex items-center mb-3 ">
              <span className="mr-3 p-2 rounded-lg bg-white/10 text-orange-600 group-hover:bg-white/20 group-hover:text-orange-500">
                {service.icon}
              </span>
              <h3 className="text-lg font-bold ">{service.title}</h3>
            </div>
            <p className="text-sm opacity-80 group-hover:opacity-100">{service.desc}</p>
          </div>
        </button>
      ))}
    </div>
  </div>
</section>

        {/* Quick Contact */}
        <section className="mb-20 text-center">
          <h2 className="text-3xl font-bold text-orange-600 mb-8">Quick Contact</h2>
          <div className="bg-base-200 rounded-2xl shadow-md p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[{
                Icon: FaPhoneAlt,
                label: "Phone",
                value: "+1 (123) 456-7890"
              }, {
                Icon: FaEnvelope,
                label: "Email",
                value: "info@securityagency.com"
              }, {
                Icon: FaMapMarkerAlt,
                label: "Address",
                value: "123 Security Plaza, Safe City, SC 12345"
              }, {
                Icon: FaClock,
                label: "Availability",
                value: "24/7 Emergency Service"
              }].map(({ Icon, label, value }, idx) => (
                <div key={idx} className="flex items-center space-x-4">
                  <div className="p-4 rounded-full bg-white text-gray-600">
                    <Icon className="text-2xl" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold">{label}</h3>
                    <p className="text-base opacity-80">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-white text-gray-800 p-10 rounded-2xl shadow-md">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Secure Your Property?
            </h2>
            <p className="text-lg mb-6">
              Contact us today for a free security consultation
            </p>
            <button className="btn  btn-lg">Get a Free Quote</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
