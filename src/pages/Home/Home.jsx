import React from "react";
import BannerSection from "./HomeContent/BannerSection";
import ServicesSection from "../../components/ServicesSection/ServicesSection";
import AboutNss from "../../components/AboutNss/AboutNss";
import GuardsGallery from "../../components/GuardsGallery/GuardsGallery";

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

      <section>
        <GuardsGallery />
      </section>
    </div>
  );
};

export default Home;
