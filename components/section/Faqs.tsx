
"use client";

import { useState } from "react";
import Image from "next/image";

import {
    AnimatePresence,
    motion,
    useReducedMotion,
    type Variants,
} from "framer-motion";

import { Plus, Minus } from "lucide-react";

import { faqsContent } from "@/types/templates.types";
import { SectionDescription, SectionEyebrow, SectionTitle } from "../ui/layout";

const { faq } = faqsContent;

const EASE = [0.22, 1, 0.36, 1] as const;

export default function FAQSection() {
    const [activeId, setActiveId] = useState<number | null>(
        faq.items[0]?.id ?? null
    );

    const reduceMotion = useReducedMotion();

    const fadeUp: Variants = {
        hidden: {
            opacity: 0,
            y: reduceMotion ? 0 : 30,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: reduceMotion ? 0 : 0.65,
                ease: EASE,
            },
        },
    };

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: reduceMotion ? 0 : 0.1,
            },
        },
    };

    const toggleFAQ = (id: number) => {
        setActiveId((current) =>
            current === id ? null : id
        );
    };

    return (
        <section
            id={faq.sectionId}
            className="relative isolate overflow-hidden bg-white  pt-16 lg:pt-20"
        >
            {/* TOP LEFT DECORATION */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 overflow-hidden sm:h-36 sm:w-36"
            >
                <div className="absolute -left-16 -top-20 h-40 w-28 rotate-[35deg] bg-[#E60012] sm:h-56" />
                <div className="absolute left-24 -top-20 after:absolute after:bottom-0 after:-rotate-40 after after:h-8 overflow-hidden  after:w-12 after:-left-2  after:bg-white border-white  h-40 w-5 rotate-[35deg] bg-[#1C252C]" />
            </div>

            {/* BOTTOM RIGHT DECORATION */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 right-0 h-32 w-32 overflow-hidden sm:h-40 sm:w-40"
            >
                <div className="absolute -bottom-20 -right-14 h-48 w-24 rotate-[35deg] bg-[#E60012]" />
                <div className="absolute overflow-hidden -bottom-18 right-19 h-36 w-5 rotate-[35deg] bg-[#1C252C] after:absolute after:w-full after:h-10 after:bg-white after:rotate-40 after:-top-3 after:-left-1" />
            </div>

            <div className="site-container relative z-10">
                <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,42fr)_minmax(0,58fr)] lg:gap-0">
                    {/* LEFT CONTENT */}
                    <div
                        className="lg:pr-10 xl:pr-12"
                    >
                        {/* EYEBROW */}
                        <SectionEyebrow className="" right={false}>
                            <span className="text-[#1D242A]">
                                {faq.eyebrow}
                            </span>
                        </SectionEyebrow>

                        {/* HEADING */}
                        <SectionTitle className="">

                            {faq.heading}

                            <span className="mt-1 block text-[#D9000D]">
                                {faq.highlightHeading}
                            </span>
                        </SectionTitle>


                        {/* DESCRIPTION */}
                        <SectionDescription className="">
                            {faq.description}
                        </SectionDescription>


                        {/* MECHANIC IMAGE */}
                        <div
                            className="relative mt-10"
                        >
                            {/* RED DIAGONAL DECORATION */}
                            {/* <div
                                aria-hidden="true"
                                className="absolute -left-5 top-4 h-[90%] w-20 -skew-x-[28deg] bg-[#E60012] sm:-left-8"
                            /> */}

                            <div className="relative aspect-[1.18/1] w-full overflow-hidden bg-gray-100">
                                <Image
                                    src={faq.image.src}
                                    alt={faq.image.alt}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 42vw"
                                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                                />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT FAQ ACCORDION */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                            amount: 0.1,
                        }}
                        className="space-y-4 lg:pl-10 xl:pl-12"
                    >
                        {faq.items.map((item) => {
                            const isActive = activeId === item.id;
                            const panelId = `faq-panel-${item.id}`;
                            const buttonId = `faq-button-${item.id}`;

                            return (
                                <motion.div
                                    key={item.id}
                                    variants={fadeUp}
                                    className="overflow-hidden rounded-[14px] border border-[#E0E2E5] bg-gradient-to-b from-[#F8F9FA] to-[#F0F1F3]"
                                >
                                    {/* QUESTION BUTTON */}
                                    <button
                                        type="button"
                                        id={buttonId}
                                        onClick={() => toggleFAQ(item.id)}
                                        aria-expanded={isActive}
                                        aria-controls={panelId}
                                        className={`flex w-full font-poppins items-center justify-between gap-5 px-5 py-5 text-left transition-colors duration-300 sm:px-8 sm:py-6 ${isActive
                                                ? "bg-gradient-to-r from-[#E60012] to-[#C9000C] text-white"
                                                : "text-[#1D2329] hover:bg-[#E9EAED]"
                                            }`}
                                    >
                                        <span className="text-base font-semibold leading-[1.4] sm:text-[19px]">
                                            {item.question}
                                        </span>

                                        <span className="shrink-0">
                                            {isActive ? (
                                                <Minus
                                                    size={30}
                                                    strokeWidth={3}
                                                />
                                            ) : (
                                                <Plus
                                                    size={30}
                                                    strokeWidth={3}
                                                />
                                            )}
                                        </span>
                                    </button>

                                    {/* ANSWER */}
                                    <AnimatePresence initial={false}>
                                        {isActive && (
                                            <motion.div
                                                key="answer"
                                                id={panelId}
                                                role="region"
                                                aria-labelledby={buttonId}
                                                initial={{
                                                    height: 0,
                                                    opacity: 0,
                                                }}
                                                animate={{
                                                    height: "auto",
                                                    opacity: 1,
                                                }}
                                                exit={{
                                                    height: 0,
                                                    opacity: 0,
                                                }}
                                                transition={{
                                                    duration: reduceMotion ? 0 : 0.35,
                                                    ease: EASE,
                                                }}
                                                className="overflow-hidden"
                                            >
                                                <p className="px-5 py-5 text-sm sm:text-base leading-[1.8] text-[#292F35] sm:px-8 sm:py-6 ">
                                                    {item.answer}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
