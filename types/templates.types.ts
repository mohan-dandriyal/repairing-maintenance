import data from "@/data/templates.json";

export const template = data.categories.TORQIX;
export const globalUI = data.common.globalUI;
export const homeComponents = template.templateComponents.pages.home.components;

// Check names from JSON without losing the inferred types of variant content.
function resolveVariant<T extends object>(variants: T, name: string): T[keyof T] {
    if (!Object.prototype.hasOwnProperty.call(variants, name)) {
        throw new Error(`Unknown TORQIX template variant: ${name}`);
    }
    return variants[name as keyof T];
}

function pageVariant(key: string) {
    const entry = homeComponents.find((item) => item.key === key);
    if (!entry) throw new Error(`Missing TORQIX home component: ${key}`);
    return entry.component;
}

const { sections, templateComponents } = template;
export const headerContent = {
    header: resolveVariant(sections.Header.variants, templateComponents.shared.Header),
};
export const footerContent = {
    footer: resolveVariant(sections.Footer.variants, templateComponents.shared.Footer),
};
export const home = resolveVariant(sections.Hero.variants, pageVariant("HeroSection"));
export const aboutContent = {
    about: resolveVariant(sections.AboutUs.variants, pageVariant("AboutUs")),
};
export const servicesContent = {
    services: resolveVariant(sections.Services.variants, pageVariant("Services")),
};
export const whyChooseContent = {
    whyChooseUs: resolveVariant(sections.WhyChooseUs.variants, pageVariant("WhyChooseUs")),
};
export const testimonialsContent = {
    testimonials: resolveVariant(sections.Testimonials.variants, pageVariant("Testimonials")),
};
export const faqsContent = {
    faq: resolveVariant(sections.Faq.variants, pageVariant("Faq")),
};
export const contactContent = {
    contact: resolveVariant(sections.Contact.variants, pageVariant("Contact")),
};

export type TemplateData = typeof data;
export type HeaderData = typeof headerContent.header;
export type FooterData = typeof footerContent.footer;
export type HomeData = typeof home;
export type AboutData = typeof aboutContent.about;
export type ServicesData = typeof servicesContent.services;
export type WhyChooseData = typeof whyChooseContent.whyChooseUs;
export type TestimonialsData = typeof testimonialsContent.testimonials;
export type FaqData = typeof faqsContent.faq;
export type ContactData = typeof contactContent.contact;
