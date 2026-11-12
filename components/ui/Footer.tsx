
"use client";

import Image from "next/image";
import React from "react";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import {
  ChevronRight,
  ArrowUp,
  Phone,
  Mail,
  MapPin,
  type LucideIcon,
} from "lucide-react";

import MainContainer from "../ui/MainContainer";
import { footerContent } from "@/types/templates.types";
import Link from "next/link";

// ========================================
// FOOTER DATA
// ========================================

const {
  sectionId,
  background,
  brand,
  quickLinks,
  contact,
  copyright,
} = footerContent.footer;

const icons: Record<string, LucideIcon> = {
  phone: Phone,
  mail: Mail,
  pin: MapPin,
};

const EASE = [0.22, 1, 0.36, 1] as const;

// ========================================
// SECTION HEADING
// ========================================

function FooterHeading({
  children,
  variants,
}: {
  children: React.ReactNode;
  variants: Variants;
}) {
  return (
    <div className="mb-7">
      <h3 className="text-base font-semibold leading-tight text-white  sm:text-[22px] font-poppins">
        {children}
      </h3>

      <motion.div
        variants={variants}
        className="mt-4 h-[5px] w-[100px] origin-left rounded-full bg-[#E60012]"
      />
    </div>
  );
}

// ========================================
// FOOTER COMPONENT
// ========================================

export default function Footer() {
  const reduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.15,
      },
    },
  };

  const columnVariants: Variants = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 35,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.7,
        ease: EASE,
      },
    },
  };

  const rowVariants: Variants = {
    hidden: {
      opacity: 0,
      x: reduceMotion ? 0 : -15,
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.5,
        ease: EASE,
      },
    },
  };

  const barVariants: Variants = {
    hidden: {
      scaleX: reduceMotion ? 1 : 0,
    },
    show: {
      scaleX: 1,
      transition: {
        duration: reduceMotion ? 0 : 0.65,
        ease: EASE,
      },
    },
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "instant" : "smooth",
    });
  };

  return (
    <footer
      id={sectionId}
      className="relative isolate w-full overflow-hidden bg-[#101518] text-white"
    >
      {/* =====================================
          BACKGROUND IMAGE
      ===================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20"
      >
        <Image
          src={background.image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          style={{
            objectPosition: background.position,
          }}
        />
      </div>

      {/* DARK OVERLAY */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundColor: background.overlay,
        }}
      />

      {/* LEFT GRADIENT FOR TEXT READABILITY */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#101518]/95 via-[#101518]/85 to-transparent"
      />

      <MainContainer>
        {/* =====================================
            MAIN FOOTER GRID
        ===================================== */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="grid gap-12 pb-14 pt-16 md:grid-cols-2 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.8fr)_minmax(0,1.15fr)] lg:gap-8 lg:pb-20 lg:pt-20 xl:gap-12"
        >
          {/* =====================================
              BRAND COLUMN
          ===================================== */}

          <motion.div
            variants={columnVariants}
            className="relative min-w-0 lg:border-r lg:border-white/30 lg:pr-6"
          >
            <a href="/" className="relative block max-w-full h-[70px] sm:h-[85px] w-[165px]  sm:w-[200px] 2xl:w-[240px]">
              <Image
                src={brand.logo}
                alt={brand.logoAlt}
                fill
                sizes="(max-width: 640px) 165px, (max-width: 1536px) 200px, 240px"
                className="object-contain object-left"
              />
            </a>

            <motion.p
              variants={rowVariants}
              className="mt-7 max-w-[600px] font-poppins text-[16px] leading-[1.8] text-white/85 sm:text-[18px]"
            >
              {brand.description}
            </motion.p>
          </motion.div>

          {/* =====================================
              QUICK LINKS COLUMN
          ===================================== */}

          <motion.nav
            variants={columnVariants}
            aria-label={quickLinks.title}
            className="relative min-w-0 lg:border-r lg:border-white/30 lg:pr-8"
          >
            <FooterHeading variants={barVariants}>
              {quickLinks.title}
            </FooterHeading>

            <motion.ul
              variants={containerVariants}
              className="space-y-4"
            >
              {quickLinks.items.map((item) => (
                <motion.li
                  key={item.href}
                  variants={rowVariants}
                >
                  <Link
                    href={item.href}
                    className="group font-poppins inline-flex items-center gap-4 rounded-sm text-sm sm:text-base  text-white/85 transition-colors duration-300 hover:text-[#FF2633] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E60012] "
                  >
                    <ChevronRight
                      size={22}
                      strokeWidth={2.5}
                      className="shrink-0 transition-transform duration-300 group-hover:translate-x-1.5"
                    />

                    <span>{item.label}</span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.nav>

          {/* =====================================
              CONTACT INFO COLUMN
          ===================================== */}

          <motion.div
            variants={columnVariants}
            className="relative min-w-0"
          >
            <FooterHeading variants={barVariants}>
              {contact.title}
            </FooterHeading>

            <motion.ul
              variants={containerVariants}
              className="space-y-5"
            >
              {contact.items.map((item, index) => {
                const Icon =
                  icons[item.icon] ?? Phone;

                return (
                  <motion.li
                    key={index}
                    variants={rowVariants}
                  >
                    <a
                      href={item.href}
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
                      className="group flex items-center gap-3 rounded-md"
                    >
                      {/* ICON BOX */}
                      <motion.span
                        whileHover={
                          reduceMotion
                            ? undefined
                            : {
                              scale: 1.08,
                              rotate: -4,
                            }
                        }
                        className="flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#F0000D] to-[#B50009] text-white shadow-[0_6px_18px_rgba(220,0,0,0.15)]"
                      >
                        <Icon
                          size={20}
                          //   strokeWidth={1}
                          fill={
                            item.icon === "phone" ||
                              item.icon === "mail"
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </motion.span>

                      {/* CONTACT TEXT */}
                      <span className="min-w-0  text-sm sm:text-base  leading-[1.6] text-white/90 transition-colors duration-300 group-hover:text-[#FF2633]">
                        {item.lines.map((line, i) => (
                          <span
                            key={i}
                            className="block break-words"
                          >
                            {line}
                          </span>
                        ))}
                      </span>
                    </a>
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>
        </motion.div>

        {/* =====================================
            COPYRIGHT
        ===================================== */}

        <div className="border-t-[4px] border-[#E60012]">
          <div className="flex flex-wrap items-center justify-between gap-5 py-7">
            <p className="text-sm font-poppins leading-relaxed text-white/85 sm:text-[15px]">
              © {copyright.copyYear}{" "}
              {copyright.copyrightText}
            </p>

            {/* BACK TO TOP */}
            <motion.button
              type="button"
              aria-label="Back to top"
              onClick={scrollToTop}
              whileHover={
                reduceMotion
                  ? undefined
                  : { y: -4 }
              }
              whileTap={
                reduceMotion
                  ? undefined
                  : { scale: 0.92 }
              }
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E60012] bg-[#E60012] text-white shadow-md transition-colors hover:bg-[#B9000A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <ArrowUp size={22} />
            </motion.button>
          </div>
        </div>
      </MainContainer>
    </footer>
  );
}
