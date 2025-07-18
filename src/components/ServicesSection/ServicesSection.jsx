import { FaCalendarAlt, FaHome, FaBuilding, FaUserShield } from 'react-icons/fa';

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
  
];



const ServicesSection = () => {
  return (
    <div className="bg-gray-50">
      <section className=" container w-1/2 mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-600 mb-4">Our Security Services</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive protection solutions tailored to your specific security needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  gap-4">
          {services.map((service) => (
            <div key={service.id} className="flex justify-center">
              <a
                href={service.link}
                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-full max-w-sm"
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
            </div>
          ))}
        </div>
      </section>
      
    </div>
  );
};
export default ServicesSection;
