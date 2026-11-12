

"use client";

import Image from "next/image";

import {
    motion,
    useReducedMotion,
    type Variants,
} from "framer-motion";

import {
    UsersRound,
    BadgeCheck,
    Timer,
    ShieldCheck,
    Wrench,
    type LucideIcon,
} from "lucide-react";


import {
    whyChooseContent,
} from "@/types/templates.types";
import { SectionDescription, SectionEyebrow, SectionTitle } from "../ui/layout";
import MainContainer from "../ui/MainContainer";

const { whyChooseUs } = whyChooseContent;

const EASE = [0.22, 1, 0.36, 1] as const;

const iconMap: Record<string, LucideIcon> = {
    users: UsersRound,
    "badge-check": BadgeCheck,
    timer: Timer,
    "shield-check": ShieldCheck,
};

export default function WhyChooseUs() {
    const reduceMotion = useReducedMotion();

    const imageVariants: Variants = {
        hidden: {
            opacity: 0,
            x: reduceMotion ? 0 : -65,
            scale: reduceMotion ? 1 : 1.05,
        },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                duration: reduceMotion ? 0 : 1,
                ease: EASE,
            },
        },
    };

    const fadeUp: Variants = {
        hidden: {
            opacity: 0,
            y: reduceMotion ? 0 : 35,
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

    const staggerContainer: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: reduceMotion ? 0 : 0.13,
                delayChildren: reduceMotion ? 0 : 0.1,
            },
        },
    };

    return (
        <section
            id={whyChooseUs.sectionId}
            className="relative isolate overflow-hidden bg-white py-16 lg:py-20"
        >
            <MainContainer className="">
            <div className="grid min-h-[650px] grid-cols-1 lg:grid-cols-[minmax(0,39fr)_minmax(0,61fr)]">
                {/* LEFT IMAGE */}
                <motion.div
                    variants={imageVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="relative min-h-[380px] overflow-hidden sm:min-h-[500px] lg:min-h-full"
                >
                    <Image
                        src={whyChooseUs.image.src}
                        alt={whyChooseUs.image.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover object-center transition-transform duration-700 hover:scale-105"
                    />
                </motion.div>

                {/* RIGHT CONTENT */}
                <div
                    className="flex flex-col justify-center min-w-0 m:py-20 lg:py-24 mt-8 sm:mt-0"
                >
                    {/* EYEBROW */}
                    <SectionEyebrow className="" right={false}>
                        {whyChooseUs.eyebrow}
                    </SectionEyebrow>

                    {/* HEADING */}
                    <div>
                        <SectionTitle className="">

                            {whyChooseUs.heading}

                            <span className="mt-1 block text-[#E21B23]">
                                {whyChooseUs.highlightHeading}
                            </span>
                        </SectionTitle>
                    </div>


                    {/* DESCRIPTION */}
                    <div>
                        <SectionDescription className="">
                            {whyChooseUs.description}
                        </SectionDescription>
                    </div>

                    {/* FEATURES GRID */}
                    <motion.div
                        variants={staggerContainer}
                        className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 lg:mt-10"
                    >
                        {whyChooseUs.features.map((feature, index) => {
                            const Icon = iconMap[feature.icon] ?? Wrench;

                            const isLeftColumn = index % 2 === 0;
                            const isSecondRow = index >= 2;

                            return (
                                <motion.div
                                    key={feature.id}
                                    variants={fadeUp}
                                    whileHover={
                                        reduceMotion
                                            ? undefined
                                            : { y: -5 }
                                    }
                                    className={`
                    group flex items-start gap-4 py-6
                    sm:gap-4 sm:px-5 lg:px-0 xl:px-5
                    xl:gap-4
                    ${isLeftColumn
                                            ? "sm:pl-0 xl:pl-0"
                                            : "sm:border-l sm:border-gray-200 lg:border-l-0 xl:border-l"
                                        }
                    ${isSecondRow
                                            ? "border-t border-gray-200"
                                            : ""
                                        }
                  `}
                                >
                                    {/* ICON */}
                                    <div className="flex shrink-0 items-center justify-center rounded-[15px] bg-gradient-to-br from-[#D10A12] to-[#8B0007] text-white shadow-[0_8px_20px_rgba(180,0,0,0.12)] transition-transform duration-300 group-hover:scale-105  h-[50px] w-[50px] sm:h-[60px] sm:w-[60px] xl:h-[60px] xl:w-[60px]">
                                        <Icon
                                            size={42}
                                            strokeWidth={1.7}
                                            className="xl:h-10 xl:w-10 sm:h-8 sm:w-8 "
                                        />
                                    </div>

                                    {/* FEATURE CONTENT */}
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-[19px] font-poppins font-bold leading-[1.25] text-[#15191D] sm:text-lg">
                                            {feature.title}
                                        </h3>

                                        <p className="mt-2 leading-[1.6] font-poppins text-[#383D42] text-sm  sm:text-[15px]">
                                            {feature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
            </MainContainer>
        </section>
    );
}
