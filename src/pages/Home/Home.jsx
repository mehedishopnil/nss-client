import React from "react";
import BannerSection from "./HomeContent/BannerSection";
import ServicesSection from "../../components/ServicesSection/ServicesSection";
import AboutNss from "../../components/AboutNss/AboutNss";

const Home = () => {
  return (
    <div>
      <BannerSection />

      {/* About Us Section */}
      <section >
        <AboutNss/>
      </section>

        {/* Service Section */}

      <section>
        <ServicesSection/>
      </section>
    </div>
  );
};

export default Home;
