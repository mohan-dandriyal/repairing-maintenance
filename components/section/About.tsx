

"use client";

import Image from "next/image";

import {
    motion,
    useReducedMotion,
    type Variants,
} from "framer-motion";

import {
    Wrench,
    CarFront,
    Handshake,
    ShieldCheck,
    Settings,
    type LucideIcon,
} from "lucide-react";

import { aboutContent } from "@/types/templates.types";
import { SectionDescription, SectionEyebrow, SectionTitle } from "../ui/layout";
import MainContainer from "../ui/MainContainer";

const { about } = aboutContent;

const iconMap: Record<string, LucideIcon> = {
    wrench: Wrench,
    "car-front": CarFront,
    handshake: Handshake,
    "shield-check": ShieldCheck,
    settings: Settings,
};

const EASE = [0.22, 1, 0.36, 1] as const;

export default function AboutSection() {
    const reduceMotion = useReducedMotion();

    const fadeUp: Variants = {
        hidden: {
            opacity: 0,
            y: reduceMotion ? 0 : 35,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: reduceMotion ? 0 : 0.75,
                ease: EASE,
            },
        },
    };

    const imageAnimation: Variants = {
        hidden: {
            opacity: 0,
            x: reduceMotion ? 0 : -65,
            scale: reduceMotion ? 1 : 1.04,
        },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                duration: reduceMotion ? 0 : 0.95,
                ease: EASE,
            },
        },
    };

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: reduceMotion ? 0 : 0.15,
            },
        },
    };

    return (
        <section
            id={about.sectionId}
            className="relative isolate overflow-hidden bg-white py-16 lg:py-20 mb-10"
        >
            <div>
                <Image src={about.aboutBg.src} alt={about.aboutBg.alt} fill />
            </div>

            {/* TIRE TRACK DECORATION */}
            {about.decoration.enabled && (
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 right-0 -z-10 h-[220px] w-[450px] opacity-[0.07] sm:h-[320px] sm:w-[650px] lg:h-[420px] lg:w-[850px]"
                    style={{
                        backgroundImage: `url("${about.decoration.image}")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right bottom",
                        backgroundSize: "contain",
                    }}
                />
            )}
                <MainContainer className="">
            <div className="mx-auto w-full">
                <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 xl:gap-16">
                    {/* LEFT IMAGE */}
                    <motion.div
                        variants={imageAnimation}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                            amount: 0.2,
                        }}
                        className="relative"
                    >
                        <div className="relative aspect-[1/1] w-full overflow-hidden bg-gray-100 sm:aspect-[1.12/1] lg:aspect-[0.98/1]">
                            <Image
                                src={about.image.src}
                                alt={about.image.alt}
                                fill
                                sizes="(max-width: 1024px) 100vw, 45vw"
                                className="object-cover object-center transition-transform duration-700 hover:scale-105"
                            />
                        </div>
                    </motion.div>

                    {/* RIGHT CONTENT */}
                    <div
                        className="relative z-10 flex flex-col"
                    >
                        <div className="">
                            <SectionEyebrow className="" right={false} >
                                {about.eyebrow}
                            </SectionEyebrow>
                        </div>

                        {/* HEADING */}
                        <div>
                            <SectionTitle className="">
                                {about.heading}

                                <span className="mt-1 block text-[#B52B2B]">
                                    {about.highlightHeading}
                                </span>
                            </SectionTitle>
                        </div>


                        <div>
                            <SectionDescription className="">
                                {about.description}
                            </SectionDescription>
                        </div>



                        {/* FEATURE ROW */}
                        <motion.div
                            variants={containerVariants}
                            className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-0 lg:grid-cols-1 lg:gap-3 xl:grid-cols-3 xl:gap-0 lg:mt-14 xl:mt-16"
                        >
                            {about.features.map((feature, index) => {
                                const Icon =
                                    iconMap[feature.icon] ?? Wrench;

                                return (
                                    <motion.div
                                        key={feature.id}
                                        variants={fadeUp}
                                        whileHover={
                                            reduceMotion
                                                ? undefined
                                                : { y: -5 }
                                        }
                                        className={`group flex items-center gap-4 py-3 sm:gap-3 sm:px-4 lg:px-0 xl:gap-3 xl:px-4 ${index === 0
                                            ? "sm:pl-0 xl:pl-0"
                                            : "border-t border-gray-200 sm:border-l sm:border-t-0 sm:border-gray-300 lg:border-l-0 lg:border-t xl:border-l xl:border-t-0"
                                            }`}
                                    >
                                        {/* ICON */}
                                        <div className="flex shrink-0 items-center justify-center text-[#B52B2B]">
                                            <Icon
                                                size={38}
                                                strokeWidth={2}
                                                className="transition-transform duration-300 group-hover:scale-110 sm:h-9 sm:w-9 xl:h-12 xl:w-12"
                                            />
                                        </div>

                                        {/* TITLE */}
                                        <h3 className="max-w-[190px] text-[16px] font-bold leading-[1.35] text-[#292D33] sm:text-[15px] lg:text-[16px] xl:text-[16px]">
                                            {feature.title}
                                        </h3>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>
            </div>
                </MainContainer>
        </section>
    );
}
