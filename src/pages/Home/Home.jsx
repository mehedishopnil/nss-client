import React from "react";
import BannerSection from "./HomeContent/BannerSection";

const Home = () => {
  return (
    <div>
      <BannerSection />

      {/* About Us Section */}
      <section className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center gap-8">
        {/* Left Image */}
        <div className="w-full md:w-1/2">
          <img
            src="https://st5.depositphotos.com/2274151/68402/v/450/depositphotos_684022980-stock-illustration-police-officer-silhouette-police-officer.jpg"
            alt="About NSS"
            className="rounded-lg shadow-md w-full"
          />
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl md:text-4xl font-bold text-orange-500 mb-4">
            About NSS
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
            Trusted Security Solutions in Bangladesh
          </h2>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            At NSS, we specialize in delivering comprehensive security services
            across Bangladesh. With a focus on professionalism, reliability, and
            excellence, we ensure the safety of businesses, institutions, and
            individuals. Our team of highly trained security personnel is
            committed to providing round-the-clock support and ensuring peace of
            mind for our clients.
          </p>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed mt-4">
            From guarding your assets to maintaining a secure environment, NSS
            stands as a trusted name in the industry. We aim to support and
            supply security solutions that meet the unique needs of every client
            we serve.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
