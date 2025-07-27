import BannerSection from "./HomeContent/BannerSection";
import ServicesSection from "../../components/ServicesSection/ServicesSection";
import AboutNss from "../../components/AboutNss/AboutNss";
import GuardsGallery from "../../components/GuardsGallery/GuardsGallery";
import QuickContact from "../../components/QuickContact/QuickContact";


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

      <section>
        <QuickContact />
      </section>
    </div>
  );
};

export default Home;
