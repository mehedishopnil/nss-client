import React from "react";

const services = [
  {
    id: 1,
    image: "https://png.pngtree.com/png-vector/20220611/ourmid/pngtree-security-management-icon-flat-design-security-services-technology-security-vector-png-image_22298144.png",
    title: "Personal Security",
    content: "Providing trained and reliable security personnel for individuals requiring personal protection.",
  },
  {
    id: 2,
    image: "https://png.pngtree.com/png-vector/20220611/ourmid/pngtree-security-management-icon-flat-design-security-services-technology-security-vector-png-image_22298144.png",
    title: "Corporate Security",
    content: "Ensuring the safety of corporate assets and employees with professional security solutions.",
  },
  {
    id: 3,
    image: "https://png.pngtree.com/png-vector/20220611/ourmid/pngtree-security-management-icon-flat-design-security-services-technology-security-vector-png-image_22298144.png",
    title: "Event Security",
    content: "Offering comprehensive security for events of all sizes to ensure smooth operations.",
  },
];

const ServicesSection = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-orange-500 mb-8">
        Our Services
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* Image */}
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-48 object-cover"
            />
            {/* Title */}
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {service.title}
              </h2>
              {/* Content */}
              <p className="text-gray-600 text-base leading-relaxed">
                {service.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
