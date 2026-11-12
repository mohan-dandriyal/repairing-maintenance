

"use client";

import Image from "next/image";

import {
    motion,
    useReducedMotion,
    type Variants,
} from "framer-motion";

import {
    Cog,
    CircleDot,
    Hammer,
    Disc3,
    BatteryCharging,
    Snowflake,
    Wrench,
    type LucideIcon,
} from "lucide-react";

import { servicesContent } from "@/types/templates.types";
import { SectionDescription, SectionEyebrow, SectionTitle } from "../ui/layout";
import MainContainer from "../ui/MainContainer";

const { services } = servicesContent;

const RED = "#B52B2B";
const EASE = [0.22, 1, 0.36, 1] as const;

const iconMap: Record<string, LucideIcon> = {
    engine: Cog,
    tire: CircleDot,
    hammer: Hammer,
    disc: Disc3,
    battery: BatteryCharging,
    snowflake: Snowflake,
};

export default function ServicesSection() {
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
                duration: reduceMotion ? 0 : 0.7,
                ease: EASE,
            },
        },
    };

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: reduceMotion ? 0 : 0.1,
                delayChildren: reduceMotion ? 0 : 0.1,
            },
        },
    };

    return (
        <section
            id={services.sectionId}
            className="relative isolate overflow-hidden bg-[#0E1215] text-white py-16 lg:py-20"
        >

            <div className="ab absolute top-0 left-0 w-full h-full -z-10">
                <Image src={services?.serviceBg?.src || ""} alt={services?.serviceBg?.alt || ""} fill sizes="100vw" className="object-cover" />
            </div>

            <MainContainer className="">
                {/* SECTION HEADER */}
                <div
                    className="mb-10 text-center lg:mb-14"
                >
                    {/* EYEBROW */}
                    <div className="mx-auto flex sm:justify-center text-white">
                        <SectionEyebrow className="text-white" right={true} >
                            <span className="text-white">
                                {services.eyebrow}
                            </span>
                        </SectionEyebrow>
                    </div>


                    <div className="">
                        <SectionTitle className="text-white text-start sm:text-center ">
                            {services.heading}{" "}
                            <span className="text-[#E21B23]">
                                {services.highlightHeading}
                            </span>

                        </SectionTitle>
                    </div>

                    <div>
                        <SectionDescription className="text-white/80 mx-auto text-start sm:text-center max-w-[1250px]  leading-[1.8] lg:text-base text-sm">
                            {services.description}
                        </SectionDescription>
                    </div>

                </div>

                {/* SERVICES GRID */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        amount: 0.12,
                    }}
                    className="grid grid-cols-1 gap-5 md:grid-cols-3 xl:grid-cols-3"
                >
                    {services.items.map((service) => {
                        const Icon = iconMap[service.icon] ?? Wrench;

                        return (
                            <motion.article
                                key={service.id}
                                variants={fadeUp}
                                whileHover={
                                    reduceMotion
                                        ? undefined
                                        : {
                                            y: -7,
                                            transition: { duration: 0.25 },
                                        }
                                }
                                className="group relative overflow-hidden rounded-[14px] border border-white/20 bg-[#111619] p-3.5 transition-colors duration-300 hover:border-[#B52B2B]/80 sm:p-4"
                            >
                                <div className="flex h-full flex-col gap-5 sm:flex-row sm:gap-5 md:flex-col xl:flex-row">
                                    {/* SERVICE IMAGE */}
                                    <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-[10px] bg-[#20272B] sm:aspect-auto sm:w-[40%] md:aspect-[4/3] md:w-full xl:aspect-auto xl:w-[35%]">
                                        <Image
                                            src={service.image}
                                            alt={service.imageAlt}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 40vw, 15vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />

                                        <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-transparent" />
                                    </div>

                                    {/* CONTENT */}
                                    <div className="flex min-w-0 flex-1 flex-col justify-center py-2">
                                        {/* ICON + TITLE */}
                                        <div className="mb-4 flex  items-center gap-3">
                                            <div
                                                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-[0_5px_20px_rgba(181,43,43,0.12)] transition-transform duration-300 group-hover:scale-105"
                                                style={{
                                                    background:
                                                        "linear-gradient(145deg,#A81E24,#5D1014)",
                                                }}
                                            >
                                                <Icon
                                                    size={29}
                                                    strokeWidth={1.7}
                                                />
                                            </div>

                                            <span
                                                className="h-12 w-[2px] shrink-0"
                                                style={{ backgroundColor: RED }}
                                            />

                                            <h3 className="text-base font-bold leading-[1.3] text-white sm:text-lg">
                                                {service.title}
                                            </h3>
                                        </div>

                                        {/* DESCRIPTION */}
                                        <p className="text-[14px] leading-[1.65] text-white/75 sm:text-[15px] 2xl:text-[17px]">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.article>
                        );
                    })}
                </motion.div>
            </MainContainer>
        </section>
    );
}
