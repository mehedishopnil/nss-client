import GuardsGallery from "../../components/GuardsGallery/GuardsGallery";
import QuickContact from "../../components/QuickContact/QuickContact";
import ServicesSection from "../../components/ServicesSection/ServicesSection";


const OurServices = () => {
  return (
    <div>
      <div>
        <ServicesSection />
      </div>

      <div>
        <GuardsGallery />
      </div>
       <QuickContact />

    </div>
  );
};

export default OurServices;
