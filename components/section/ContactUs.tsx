

"use client";

import {
    useState,
    type ChangeEvent,
    type FormEvent,
} from "react";

import {
    motion,
    useReducedMotion,
    type Variants,
} from "framer-motion";

import {
    Phone,
    Mail,
    MapPin,
    ArrowRight,
    ChevronDown,
    Loader2,
    CheckCircle2,
    AlertCircle,
    type LucideIcon,
} from "lucide-react";

import { contactContent } from "@/types/templates.types";
import { SectionDescription, SectionEyebrow, SectionTitle } from "../ui/layout";

const { contact } = contactContent;

const EASE = [0.22, 1, 0.36, 1] as const;

const iconMap: Record<string, LucideIcon> = {
    phone: Phone,
    mail: Mail,
    "map-pin": MapPin,
};

type ContactFormValues = {
    name: string;
    phone: string;
    email: string;
    service: string;
    message: string;
};

const initialValues: ContactFormValues = {
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
};

type SubmitStatus = "idle" | "success" | "error";

export default function ContactSection() {
    const reduceMotion = useReducedMotion();

    const [formValues, setFormValues] =
        useState<ContactFormValues>(initialValues);

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    const [status, setStatus] =
        useState<SubmitStatus>("idle");

    const fadeUp: Variants = {
        hidden: {
            opacity: 0,
            y: reduceMotion ? 0 : 30,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: reduceMotion ? 0 : 0.7,
                ease: EASE,
            },
        },
    };

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: reduceMotion ? 0 : 0.12,
            },
        },
    };

    const handleChange = (
        event: ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) => {
        const { name, value } = event.target;

        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));

        setStatus("idle");
    };

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (isSubmitting) return;

        setIsSubmitting(true);
        setStatus("idle");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formValues),
            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            setStatus("success");
            setFormValues(initialValues);
        } catch (error) {
            console.error("Contact form error:", error);
            setStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClass =
        "w-full rounded-[10px] border border-[#D9DDE2] " +
        "bg-white px-5 py-4 text-[16px] text-[#1D252C] " +
        "outline-none transition-all duration-300 " +
        "placeholder:text-[#333940] " +
        "focus:border-[#D0000D] " +
        "focus:ring-2 focus:ring-[#D0000D]/10";

    return (
        <section
            id={contact.sectionId}
            className="relative overflow-hidden bg-white py-16 lg:py-20"
        >
            <div className="site-container">
                <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10 xl:gap-14">

                    {/* LEFT CONTENT */}
                    <div >
                        {/* EYEBROW */}
                        <div>
                            <SectionEyebrow className="" right={false}>
                                {contact.eyebrow}

                            </SectionEyebrow>
                        </div>

                        {/* HEADING */}
                        <div>
                            <SectionTitle className="">

                                {contact.heading}
                                <span className="mt-1 block text-[#D6000D]">
                                    {contact.highlightHeading}
                                </span>

                            </SectionTitle>
                        </div>

                        {/* DESCRIPTION */}
                        <SectionDescription className="">
                            {contact.description}
                        </SectionDescription>

                        {/* CONTACT CARDS */}
                        <motion.div
                            variants={containerVariants}
                            className="mt-10 space-y-5 lg:mt-12"
                        >
                            {contact.contactInfo.map((item) => {
                                const Icon =
                                    iconMap[item.icon] ?? Phone;

                                return (
                                    item.href ?
                                        <motion.a
                                            key={item.id}
                                            href={item.href}
                                            variants={fadeUp}
                                            whileHover={
                                                reduceMotion
                                                    ? undefined
                                                    : { x: 6 }
                                            }
                                            target={
                                                item.href.startsWith("http")
                                                    ? "_blank"
                                                    : undefined
                                            }
                                            rel={
                                                item.href.startsWith("http")
                                                    ? "noopener noreferrer"
                                                    : undefined
                                            }
                                            className="group flex items-center gap-3 rounded-[18px] bg-gradient-to-r from-[#F8F8FA] to-[#F1F1F3] p-3 transition-shadow duration-300 hover:shadow-lg sm:gap-5"
                                        >
                                            {/* ICON */}
                                            <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#F0000C] to-[#AF0009] text-white shadow-[0_8px_20px_rgba(220,0,0,0.12)] sm:h-[65px] sm:w-[65px]">
                                                <Icon
                                                    size={30}
                                                    strokeWidth={1.7}
                                                />
                                            </div>

                                            {/* RED DIVIDER */}
                                            <span className="h-14 w-[2px] shrink-0 bg-[#E21B23]/70" />

                                            {/* TEXT */}
                                            <div className="min-w-0">
                                                <h3 className="text-base font-poppins font-bold text-[#111A21] sm:text-[20px]">
                                                    {item.title}
                                                </h3>

                                                <p className="mt-1 break-words text-sm sm:text-base leading-[1.5] text-[#29323A] ">
                                                    {item.value}
                                                </p>
                                            </div>
                                        </motion.a> :
                                        <motion.div
                                            key={item.id}
                                            variants={fadeUp}
                                            whileHover={
                                                reduceMotion
                                                    ? undefined
                                                    : { x: 6 }
                                            }
                                            rel={
                                                item.href.startsWith("http")
                                                    ? "noopener noreferrer"
                                                    : undefined
                                            }
                                            className="group flex items-center gap-3 rounded-[18px] bg-gradient-to-r from-[#F8F8FA] to-[#F1F1F3] p-3 transition-shadow duration-300 hover:shadow-lg sm:gap-5"
                                        >
                                            {/* ICON */}
                                            <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#F0000C] to-[#AF0009] text-white shadow-[0_8px_20px_rgba(220,0,0,0.12)] sm:h-[65px] sm:w-[65px]">
                                                <Icon
                                                    size={30}
                                                    strokeWidth={1.7}
                                                />
                                            </div>

                                            {/* RED DIVIDER */}
                                            <span className="h-14 w-[2px] shrink-0 bg-[#E21B23]/70" />

                                            {/* TEXT */}
                                            <div className="min-w-0">
                                                <h3 className="text-base font-poppins font-bold text-[#111A21] sm:text-[20px]">
                                                    {item.title}
                                                </h3>

                                                <p className="mt-1 break-words text-sm sm:text-base leading-[1.5] text-[#29323A] ">
                                                    {item.value}
                                                </p>
                                            </div>
                                        </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>

                    {/* RIGHT FORM */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            x: reduceMotion ? 0 : 50,
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                        }}
                        viewport={{
                            once: true,
                            amount: 0.15,
                        }}
                        transition={{
                            duration: reduceMotion ? 0 : 0.85,
                            ease: EASE,
                        }}
                        className="rounded-[22px] border border-[#E0E3E8] bg-white p-5 shadow-[0_12px_35px_rgba(0,0,0,0.07)] sm:p-6 lg:p-7"
                    >
                        <h3 className="mb-7 text-[28px] font-poppins font-bold tracking-[-0.04em] text-[#141D25] sm:text-[36px]">
                            {contact.form.title}
                        </h3>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >
                            {/* NAME + PHONE */}
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="contact-name"
                                        className="sr-only"
                                    >
                                        {contact.form.fields.name}
                                    </label>

                                    <input
                                        id="contact-name"
                                        name="name"
                                        type="text"
                                        required
                                        minLength={2}
                                        maxLength={100}
                                        autoComplete="name"
                                        placeholder={`${contact.form.fields.name} *`}
                                        value={formValues.name}
                                        onChange={handleChange}
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="contact-phone"
                                        className="sr-only"
                                    >
                                        {contact.form.fields.phone}
                                    </label>

                                    <input
                                        id="contact-phone"
                                        name="phone"
                                        type="tel"
                                        required
                                        pattern="[0-9+()\s-]{10,20}"
                                        autoComplete="tel"
                                        placeholder={`${contact.form.fields.phone} *`}
                                        value={formValues.phone}
                                        onChange={handleChange}
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            {/* EMAIL */}
                            <div>
                                <label
                                    htmlFor="contact-email"
                                    className="sr-only"
                                >
                                    {contact.form.fields.email}
                                </label>

                                <input
                                    id="contact-email"
                                    name="email"
                                    type="email"
                                    required
                                    maxLength={254}
                                    autoComplete="email"
                                    placeholder={`${contact.form.fields.email} *`}
                                    value={formValues.email}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>

                            {/* SERVICE SELECT */}
                            <div className="relative">
                                <label
                                    htmlFor="contact-service"
                                    className="sr-only"
                                >
                                    {contact.form.fields.service}
                                </label>

                                <select
                                    id="contact-service"
                                    name="service"
                                    required
                                    value={formValues.service}
                                    onChange={handleChange}
                                    className={`${inputClass} appearance-none pr-12 ${!formValues.service
                                        ? "text-[#333940]"
                                        : ""
                                        }`}
                                >
                                    <option value="" disabled>
                                        {contact.form.fields.service} *
                                    </option>

                                    {contact.form.services.map(
                                        (service) => (
                                            <option
                                                key={service.id}
                                                value={service.id}
                                            >
                                                {service.label}
                                            </option>
                                        )
                                    )}
                                </select>

                                <ChevronDown
                                    size={24}
                                    className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[#1D252C]"
                                />
                            </div>

                            {/* MESSAGE */}
                            <div>
                                <label
                                    htmlFor="contact-message"
                                    className="sr-only"
                                >
                                    {contact.form.fields.message}
                                </label>

                                <textarea
                                    id="contact-message"
                                    name="message"
                                    rows={5}
                                    maxLength={2000}
                                    placeholder={contact.form.fields.message}
                                    value={formValues.message}
                                    onChange={handleChange}
                                    className={`${inputClass} min-h-[155px] resize-y`}
                                />
                            </div>

                            {/* STATUS MESSAGE */}
                            {status === "success" && (
                                <div
                                    role="status"
                                    className="flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-700"
                                >
                                    <CheckCircle2 size={20} />
                                    {contact.form.successMessage}
                                </div>
                            )}

                            {status === "error" && (
                                <div
                                    role="alert"
                                    className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700"
                                >
                                    <AlertCircle size={20} />
                                    {contact.form.errorMessage}
                                </div>
                            )}

                            {/* SUBMIT BUTTON */}
                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                whileHover={
                                    reduceMotion || isSubmitting
                                        ? undefined
                                        : { scale: 1.01 }
                                }
                                whileTap={
                                    reduceMotion || isSubmitting
                                        ? undefined
                                        : { scale: 0.98 }
                                }
                                className="group font-poppins flex w-full items-center justify-center gap-5 rounded-[10px] bg-linear-to-r from-[#E60012] to-[#BF000A] px-6 py-5 text-[19px] font-semibold text-white transition-shadow duration-300 hover:shadow-[0_10px_25px_rgba(220,0,0,0.22)] disabled:cursor-not-allowed disabled:opacity-60 sm:text-[20px]"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2
                                            size={24}
                                            className="animate-spin"
                                        />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        {contact.form.submitText}

                                        <ArrowRight
                                            size={27}
                                            strokeWidth={1.8}
                                            className="transition-transform duration-300 group-hover:translate-x-2"
                                        />
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
