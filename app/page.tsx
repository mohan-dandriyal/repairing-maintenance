import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

import AboutSection from "@/components/section/About";
import ContactSection from "@/components/section/ContactUs";
import FAQSection from "@/components/section/Faqs";
import HeroSection from "@/components/section/Home";
import ServicesSection from "@/components/section/Services";
import TestimonialsSection from "@/components/section/Testimonial";
import WhyChooseUs from "@/components/section/WhyChooseUs";

import { homeComponents } from "@/types/templates.types";

const componentRegistry = {
  TorqixHero2: HeroSection,
  TorqixAboutUs2: AboutSection,
  TorqixServices2: ServicesSection,
  TorqixWhyChooseUs2: WhyChooseUs,
  TorqixTestimonials2: TestimonialsSection,
  TorqixFaq2: FAQSection,
  TorqixContact2: ContactSection,
};

function getComponent(name: string) {
  if (!Object.prototype.hasOwnProperty.call(componentRegistry, name)) {
    throw new Error(`Unknown home template component: ${name}`);
  }
  return componentRegistry[name as keyof typeof componentRegistry];
}

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-w-0 flex-1">
        {homeComponents.map(({ key, component }) => {
          const Component = getComponent(component);
          return <Component key={key} />;
        })}
      </main>
      <Footer />
    </>
  );
}
