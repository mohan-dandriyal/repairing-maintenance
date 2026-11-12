

"use client";

import {
    useCallback,
    useEffect,
    useState,
} from "react";

import Image from "next/image";
import {
    AnimatePresence,
    motion,
    useReducedMotion,
    type Variants,
} from "framer-motion";

import {
    ArrowLeft,
    ArrowRight,
} from "lucide-react";

import { home } from "@/types/templates.types";

const { slides, settings } = home;

const EASE = [0.22, 1, 0.36, 1] as const;

export default function HeroSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const reduceMotion = useReducedMotion();

    const totalSlides = slides.length;
    const activeSlide = slides[activeIndex];

    const nextSlide = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % totalSlides);
    }, [totalSlides]);

    const prevSlide = useCallback(() => {
        setActiveIndex(
            (prev) => (prev - 1 + totalSlides) % totalSlides
        );
    }, [totalSlides]);

    const goToSlide = useCallback(
        (index: number) => {
            if (index < 0 || index >= totalSlides) return;
            setActiveIndex(index);
        },
        [totalSlides]
    );

    // Auto slide
    useEffect(() => {
        if (
            !settings.autoPlay ||
            isPaused ||
            reduceMotion ||
            totalSlides <= 1
        ) {
            return;
        }

        const timer = window.setTimeout(
            nextSlide,
            settings.autoPlayDelay
        );

        return () => window.clearTimeout(timer);
    }, [
        activeIndex,
        isPaused,
        nextSlide,
        reduceMotion,
        totalSlides,
    ]);

    // Keyboard navigation
    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLElement>
    ) => {
        if (event.key === "ArrowRight") {
            event.preventDefault();
            nextSlide();
        }

        if (event.key === "ArrowLeft") {
            event.preventDefault();
            prevSlide();
        }
    };

    const contentVariants: Variants = {
        hidden: {
            opacity: 0,
            y: reduceMotion ? 0 : 35,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: reduceMotion
                    ? 0
                    : settings.animationDuration,
                ease: EASE,
                staggerChildren: reduceMotion ? 0 : 0.12,
            },
        },
        exit: {
            opacity: 0,
            y: reduceMotion ? 0 : -20,
            transition: {
                duration: reduceMotion ? 0 : 0.25,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: {
            opacity: 0,
            y: reduceMotion ? 0 : 25,
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

    if (!activeSlide) return null;

    return (
        <section
            id="home"
            aria-label="TORQIX Auto Repair Hero"
            aria-roledescription="carousel"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocusCapture={() => setIsPaused(true)}
            onBlurCapture={(event) => {
                if (
                    !event.currentTarget.contains(
                        event.relatedTarget as Node | null
                    )
                ) {
                    setIsPaused(false);
                }
            }}
            className="relative isolate flex min-h-[calc(100svh-80px)] lg:min-h-[calc(100svh-112px)] w-full items-center overflow-hidden bg-[#101113] text-white outline-none"
        >
            {/* ===================================
          BACKGROUND SLIDER
      =================================== */}
            <div className="absolute inset-0 -z-20">
                <AnimatePresence initial={false}>
                    <motion.div
                        key={activeSlide.id}
                        initial={{ opacity: 0, scale: 1.06 }}
                        animate={{
                            opacity: 1,
                            scale: reduceMotion ? 1 : 1.02,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                            opacity: {
                                duration: reduceMotion ? 0 : 0.9,
                            },
                            scale: {
                                duration: reduceMotion ? 0 : 7,
                                ease: "linear",
                            },
                        }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={activeSlide.image}
                            alt={activeSlide.imageAlt}
                            fill
                            priority={activeIndex === 0}
                            sizes="100vw"
                            className="object-cover object-center"
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* ===================================
          DARK GRADIENT OVERLAY
      =================================== */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-r from-[#090B0D]/95 via-[#090B0D]/45 to-[#090B0D]/10" />

            <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-t from-black/55 via-transparent to-transparent" />

            {/* ===================================
          MAIN CONTENT
      =================================== */}
            <div className="site-container flex items-center py-24 sm:py-28">
                <div className="w-full max-w-[850px]">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={activeSlide.id}
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="flex flex-col items-start"
                        >
                            {/* EYEBROW */}
                            <motion.div
                                variants={itemVariants}
                                className="mb-7 flex items-center gap-4 sm:mb-9"
                            >
                                <span className="h-[3px] w-8 shrink-0 bg-[#B52B2B] sm:w-[70px]" />

                                <span className="text-[10px] font uppercase tracking-[0.25em] text-white/90 sm:text-[13px] lg:text-[15px]">
                                    {activeSlide.eyebrow}
                                </span>
                            </motion.div>

                            {/* MAIN TITLE */}
                            <motion.h1
                                variants={itemVariants}
                                className="font-poppins font-semibold text-[clamp(32px,5.5vw,70px)] font-black leading-[1.1] tracking-[-0.045em] uppercase"
                            >
                                {activeSlide.title}
                            </motion.h1>

                            {/* SKEWED HIGHLIGHT TITLE */}
                            <motion.div
                                variants={itemVariants}
                                className="relative mt-3 inline-flex max-w-full"
                            >
                                <div className="absolute inset-0 -skew-x-[18deg] bg-[#B52B2B]" />

                                <div className="relative z-10 px-3 font-semibold py-2 sm:px-7 sm:py-3 lg:px-9">
                                    <h2 className="font-poppins font-semibold text-[clamp(24px,4.5vw,64px)] font-black italic leading-[1.08] tracking-[-0.04em] break-words uppercase text-white">
                                        {activeSlide.highlightTitle}
                                    </h2>
                                </div>

                                {/* DECORATIVE RED SLASHES */}
                                <div
                                    aria-hidden="true"
                                    className="absolute -right-7 top-0 flex h-full gap-[5px] sm:-right-12 sm:gap-[8px]"
                                >
                                    {[0, 1, 2].map((index) => (
                                        <span
                                            key={index}
                                            className="h-full w-[5px] -skew-x-[18deg] bg-[#B52B2B] sm:w-[9px]"
                                        />
                                    ))}
                                </div>
                            </motion.div>

                            {/* DESCRIPTION */}
                            <motion.p
                                variants={itemVariants}
                                className="mt-8 max-w-[590px] text-[15px] font-[400] leading-[1.8] text-white/85 sm:mt-10 sm:text-lg"
                            >
                                {activeSlide.description}
                            </motion.p>

                            {/* CTA BUTTON */}
                            <motion.div
                                variants={itemVariants}
                                className="mt-9 sm:mt-11"
                            >
                                <a
                                    href={activeSlide.button.href}
                                    className="group relative inline-flex items-center justify-center px-8 py-4 sm:px-11 sm:py-5"
                                >
                                    {/* SKEW BACKGROUND */}
                                    <span className="absolute inset-0 -skew-x-[18deg] bg-[#B52B2B] transition-all duration-300 group-hover:bg-[#8F2020]" />

                                    {/* BUTTON CONTENT */}
                                    <span className="relative z-10 flex items-center gap-6 text-[17px] font-bold text-white sm:text-[21px]">
                                        {activeSlide.button.text}

                                        <ArrowRight
                                            size={25}
                                            strokeWidth={1.8}
                                            className="transition-transform duration-300 group-hover:translate-x-2"
                                        />
                                    </span>
                                </a>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* ===================================
          BOTTOM CONTROLS
      =================================== */}
            <div className="absolute bottom-7 left-0 right-0 z-20 sm:bottom-12">
                <div className="site-container flex items-center justify-between gap-6">
                    {/* PAGINATION */}
                    {settings.showPagination && (
                        <div
                            className="flex items-center gap-2.5"
                            aria-label="Choose hero slide"
                        >
                            {slides.map((slide, index) => {
                                const isActive = index === activeIndex;

                                return (
                                    <button
                                        key={slide.id}
                                        type="button"
                                        onClick={() => goToSlide(index)}
                                        aria-label={`Go to slide ${index + 1}`}
                                        aria-current={isActive ? "true" : undefined}
                                        className="relative flex h-5 w-12 items-center overflow-hidden -skew-x-[20deg] sm:w-14"
                                    >
                                        <span className="absolute inset-x-0 h-[5px] rounded-sm bg-white/40" />

                                        {isActive && (
                                            <motion.span
                                                key={`${slide.id}-${activeIndex}`}
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: 1 }}
                                                transition={{
                                                    duration:
                                                        settings.autoPlay && !reduceMotion
                                                            ? settings.autoPlayDelay / 1000
                                                            : 0,
                                                    ease: "linear",
                                                }}
                                                style={{ originX: 0 }}
                                                className="absolute inset-x-0 h-[5px] rounded-sm bg-[#C4312C]"
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {/* ARROW NAVIGATION */}
                    {settings.showNavigation && (
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={prevSlide}
                                aria-label="Previous slide"
                                className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#4A5054]/85 text-white transition-all duration-300 hover:bg-[#B52B2B] sm:h-14 sm:w-14"
                            >
                                <ArrowLeft
                                    size={25}
                                    strokeWidth={1.6}
                                    className="transition-transform group-hover:-translate-x-1"
                                />
                            </button>

                            <button
                                type="button"
                                onClick={nextSlide}
                                aria-label="Next slide"
                                className="group flex h-10 w-10 items-center justify-center rounded-full bg-[#B52B2B] text-white transition-all duration-300 hover:bg-[#922020] sm:h-14 sm:w-14"
                            >
                                <ArrowRight
                                    size={25}
                                    strokeWidth={1.6}
                                    className="transition-transform group-hover:translate-x-1"
                                />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
