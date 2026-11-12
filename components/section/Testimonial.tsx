

"use client";

import { Suspense, useCallback, useRef, useState } from "react";
import Image from "next/image";

import {
    motion,
    useReducedMotion,
} from "framer-motion";

import {
    ChevronLeft,
    ChevronRight,
    Star,
    Quote,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import {
    Autoplay,
    A11y,
} from "swiper/modules";

import type { Swiper as SwiperType } from "swiper";

import "swiper/css";

import { testimonialsContent } from "@/types/templates.types";
import { SectionDescription, SectionEyebrow, SectionTitle } from "../ui/layout";


const { testimonials } = testimonialsContent;

const { reviews, settings } = testimonials;

const EASE = [0.22, 1, 0.36, 1] as const;

export default function TestimonialsSection() {
    const swiperRef = useRef<SwiperType | null>(null);
    const reduceMotion = useReducedMotion();

    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [snapCount, setSnapCount] = useState(1);
    const [currentSnap, setCurrentSnap] = useState(0);

    const updateSwiperState = useCallback(
        (swiper: SwiperType) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
            setSnapCount(swiper.snapGrid.length);
            setCurrentSnap(swiper.snapIndex);
        },
        []
    );

    const goPrev = () => {
        swiperRef.current?.slidePrev();
    };

    const goNext = () => {
        swiperRef.current?.slideNext();
    };

    const goToPage = (index: number) => {
        const swiper = swiperRef.current;
        if (!swiper) return;

        const targetIndex = swiper.snapGrid[index];
        if (targetIndex === undefined) return;

        swiper.slideTo(index);
    };

    return (
        <section
            id={testimonials.sectionId}
            className="relative isolate overflow-hidden bg-[#0D1216] text-white py-16 lg:py-20"
        >
            {/* BACKGROUND IMAGE */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-20 bg-cover bg-center"
                style={{
                    backgroundImage: `url("${testimonials.backgroundImage}")`,
                }}
            />

            {/* DARK OVERLAY */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-[#0D1216]/75"
            />

            <div className="site-container">
                {/* SECTION HEADING */}
                <div
                    className="mb-12 text-center lg:mb-16"
                >
                    {/* EYEBROW */}
                    <div className="flex sm:justify-center">
                        <SectionEyebrow className="" right={true}>
                            <span className="text-white">
                                {testimonials.highlightHeading}
                            </span>
                        </SectionEyebrow>
                    </div>

                    <div>
                        <SectionTitle className=" text-start sm:text-center">
                            <span className="text-white">
                                {testimonials.heading}
                            </span>
                            {" "}

                            <span className="text-[#E51B23]">
                                {testimonials?.highlightHeading}
                            </span>
                        </SectionTitle>
                    </div>

                    {/* DESCRIPTION */}
                    <SectionDescription className="text-white/85 text-start sm:text-center">
                        {testimonials.description}
                    </SectionDescription>
                </div>

                {/* SLIDER */}
                <div className="relative px-0 lg:px-14">
                    {/* PREVIOUS BUTTON */}
                    {settings.showNavigation && (
                        <button
                            type="button"
                            onClick={goPrev}
                            disabled={isBeginning}
                            aria-label="Previous testimonials"
                            className="absolute left-0 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/80 text-white transition-all duration-300 hover:border-[#E21B23] hover:bg-[#E21B23] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/80 disabled:hover:bg-transparent lg:flex"
                        >
                            <ChevronLeft size={28} />
                        </button>
                    )}

                    <Suspense fallback={<div className="min-h-[400px]" aria-label="Loading customer reviews" />}><Swiper
                        modules={[Autoplay, A11y]}
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                            updateSwiperState(swiper);
                        }}
                        onSlideChange={updateSwiperState}
                        onSnapGridLengthChange={updateSwiperState}
                        onResize={updateSwiperState}
                        slidesPerView={1}
                        spaceBetween={20}
                        speed={reduceMotion ? 0 : settings.speed}
                        loop={settings.loop}
                        watchOverflow
                        autoplay={
                            settings.autoplay && !reduceMotion
                                ? {
                                    delay: settings.autoplayDelay,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true,
                                    stopOnLastSlide: !settings.loop,
                                }
                                : false
                        }
                        breakpoints={{
                            640: {
                                slidesPerView: 1.4,
                                spaceBetween: 20,
                            },
                            900: {
                                slidesPerView: 2,
                                spaceBetween: 24,
                            },
                            1440: {
                                slidesPerView: 3,
                                spaceBetween: 28,
                            },
                        }}
                        className="!py-3"
                    >
                        {reviews.map((review) => (
                            <SwiperSlide
                                key={review.id}
                                className="!h-auto"
                            >
                                <TestimonialCard
                                    review={review}
                                    reduceMotion={Boolean(reduceMotion)}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper></Suspense>

                    {/* NEXT BUTTON */}
                    {settings.showNavigation && (
                        <button
                            type="button"
                            onClick={goNext}
                            disabled={isEnd}
                            aria-label="Next testimonials"
                            className="absolute right-0 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/80 text-white transition-all duration-300 hover:border-[#E21B23] hover:bg-[#E21B23] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/80 disabled:hover:bg-transparent lg:flex"
                        >
                            <ChevronRight size={28} />
                        </button>
                    )}
                </div>

                {/* MOBILE NAVIGATION */}
                {settings.showNavigation && (
                    <div className="mt-6 flex items-center justify-center gap-4 lg:hidden">
                        <button
                            type="button"
                            onClick={goPrev}
                            disabled={isBeginning}
                            aria-label="Previous testimonials"
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 text-white disabled:opacity-30"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        <button
                            type="button"
                            onClick={goNext}
                            disabled={isEnd}
                            aria-label="Next testimonials"
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 text-white disabled:opacity-30"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                )}

                {/* PAGINATION DOTS */}
                {settings.showPagination && snapCount > 1 && (
                    <div
                        className="mt-10 flex items-center justify-center gap-3"
                        aria-label="Testimonial pagination"
                    >
                        {Array.from(
                            { length: snapCount },
                            (_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => goToPage(index)}
                                    aria-label={`Go to testimonial page ${index + 1}`}
                                    aria-current={
                                        currentSnap === index ? "true" : undefined
                                    }
                                    className={`h-3.5 w-3.5 rounded-full transition-all duration-300 ${currentSnap === index
                                        ? "scale-110 bg-[#E21B23]"
                                        : "bg-gray-400 hover:bg-white"
                                        }`}
                                />
                            )
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}

// ========================================
// TESTIMONIAL CARD
// ========================================



function TestimonialCard({
    review,
    reduceMotion,
}: {
    review: (typeof reviews)[number];
    reduceMotion: boolean;
}) {
    return (
        <motion.article
            initial={{
                opacity: 0,
                y: reduceMotion ? 0 : 30,
            }}
            whileInView={{
                opacity: 1,
                y: 0,
            }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
                duration: reduceMotion ? 0 : 0.6,
                ease: EASE,
            }}
            whileHover={
                reduceMotion ? undefined : { y: -6 }
            }
            className="group relative flex h-full min-h-[360px] flex-col overflow-hidden rounded-[20px] border border-white/25 bg-[#11171B]/90 p-6 transition-colors duration-300 hover:border-[#E21B23]/70 sm:p-8"
        >
            {/* TOP ROW */}
            <div className="mb-5 flex items-start justify-between gap-3">
                <Quote
                    size={55}
                    fill="currentColor"
                    strokeWidth={0}
                    className="rotate-180 text-[#E21B23]"
                />

                {/* STARS */}
                <div
                    className="flex items-center gap-0.5 text-[#FFB800]"
                    aria-label={`${review.rating} out of 5 stars`}
                >
                    {Array.from({ length: 5 }, (_, index) => (
                        <Star
                            key={index}
                            size={19}
                            fill={
                                index < review.rating
                                    ? "currentColor"
                                    : "none"
                            }
                            strokeWidth={1.5}
                        />
                    ))}
                </div>
            </div>

            {/* REVIEW TEXT */}
            <p className="mb-7 flex-1 text-[16px] italic leading-[1.8] text-white/90 sm:text-[17px]">
                {review.review}
            </p>

            {/* DIVIDER */}
            <div className="mb-5 h-px w-full bg-white/15" />

            {/* CUSTOMER */}
            <div className="relative z-10 flex items-center gap-3 sm:gap-4">
                {/* AVATAR */}
                <div className="relative h-[56px] w-[56px] sm:h-[64px] sm:w-[64px] shrink-0 overflow-hidden rounded-full border-2 border-[#E21B23] bg-gray-700">
                    <Image
                        src={review.image}
                        alt={review.name}
                        fill
                        sizes="75px"
                        className="object-cover"
                    />
                </div>

                {/* RED DIVIDER */}
                <span className="h-14 w-[2px] bg-[#E21B23]" />

                {/* NAME */}
                <div>
                    <h3 className="text-[19px] font-bold text-white">
                        {review.name}
                    </h3>

                    <p className="mt-1 text-[15px] text-gray-400">
                        {review.location}
                    </p>
                </div>
            </div>

            {/* RED CORNER DECORATION */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-[1px] -right-[1px] h-20 w-28 overflow-hidden"
            >
                <div className="absolute -bottom-18 -right-18 h-30 w-30 rotate-[-38deg] rounded-[65%] bg-[#E21B23]" >
                    {/* <div className="absolute top-0 left-0 w-100 h-20 bg-blue-400 "></div> */}
                    </div>
            </div>
        </motion.article>
    );
}
