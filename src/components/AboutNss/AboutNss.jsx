import React from 'react';
import Guard1 from '../../assets/image/Guard-1.png';

const AboutNss = () => {
  return (
    <div className="container mx-auto px-4 py-24 flex flex-col md:flex-row items-center gap-8 lg:gap-12">
      {/* Left Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="relative w-full max-w-lg h-[600px] rounded-lg shadow-md  overflow-hidden">
          <img
            src={Guard1}
            alt="NSS Security Guard"
            className="w-full h-[600px] object-cover object-top "
            loading="lazy"
          />
        </div>
      </div>

      {/* Right Content */}
      <div className="w-full md:w-1/2 space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">
          About NSS
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
          Trusted Security Solutions in Bangladesh
        </h2>
        <div className="space-y-4">
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            At NSS, we specialize in delivering comprehensive security services
            across Bangladesh. With a focus on professionalism, reliability, and
            excellence, we ensure the safety of businesses, institutions, and
            individuals. Our team of highly trained security personnel is
            committed to providing round-the-clock support and ensuring peace of
            mind for our clients.
          </p>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            From guarding your assets to maintaining a secure environment, NSS
            stands as a trusted name in the industry. We aim to support and
            supply security solutions that meet the unique needs of every client
            we serve.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutNss;