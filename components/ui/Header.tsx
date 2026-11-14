
"use client";

import {
  useCallback,
  useEffect,
  useState,
  type MouseEvent,
} from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ChevronDown,
  ArrowUpRight,
  Menu,
  Phone,
  X,
} from "lucide-react";

import { headerContent } from "@/types/templates.types";
import MainContainer from "./MainContainer";

const { header } = headerContent;

const RED = "#B52B2B";
const ease = [0.22, 1, 0.36, 1] as const;

export default function Header() {
  const { logo, navigation, mobile, settings, helpline } = header;

  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(
    navigation.navItems[0]?.href || "#home"
  );

  const reduceMotion = useReducedMotion();

  const phoneNumber = helpline.href;
  const phoneDisplay = helpline.number;

  const scrollToHash = useCallback((href: string) => {
    if (!href.startsWith("#") || href === "#") return false;

    const target = document.getElementById(href.slice(1));
    if (!target) return false;

    const offset = document.querySelector("header")?.getBoundingClientRect().height ?? 112;
    const position =
      target.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: href === "#home" ? 0 : Math.max(0, position - offset),
      behavior: reduceMotion ? "instant" : "smooth",
    });

    window.history.pushState(null, "", href);
    return true;
  }, [reduceMotion]);

  const handleNavClick = (
    e: MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (scrollToHash(href)) {
      e.preventDefault();
      setActiveLink(href);
    }

    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > settings.scrollThreshold);

      if (!settings.showActiveLink) return;

      let current = navigation.navItems[0]?.href || "#home";

      navigation.navItems.forEach((item) => {
        const href = item.href;
        if (!href?.startsWith("#")) return;

        const section = document.getElementById(
          href.slice(1)
        );

        if (
          section &&
          section.getBoundingClientRect().top <= 160
        ) {
          current = href;
        }
      });

      setActiveLink(current);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, [navigation.navItems, settings]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", handleEscape);

    return () =>
      window.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <motion.header
      initial={{
        opacity: 0,
        y: reduceMotion ? 0 : -20,
      }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.5,
        ease,
      }}
      className={`sticky top-0 z-50 w-full bg-white transition-all duration-300 ${isScrolled
        ? "shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
        : "border-b border-gray-100"
        }`}
    >
      <MainContainer className="">
        <div
          className={`flex items-center justify-between gap-5 transition-all duration-300 ${isScrolled
            ? "h-[80px] lg:h-[86px]"
            : "h-[80px] sm:h-[100px] lg:h-[112px]"
            }`}
        >
          {/* LOGO */}
          <div className="flex shrink-0 items-center">
            <a
              href={navigation.navItems[0]?.href || "#home"}
              onClick={(e) =>
                handleNavClick(
                  e,
                  navigation.navItems[0]?.href || "#home"
                )
              }
              aria-label={logo.ariaLabel}
              className="flex items-center"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                priority
                className="h-auto w-[165px] object-contain sm:w-[200px] 2xl:w-[200px]"
              />
            </a>
          </div>

          {/* LEFT DIVIDER */}
          <div className="hidden h-12 w-px shrink-0 bg-gray-300 2xl:block" />

          {/* DESKTOP NAVIGATION */}
          <nav
            aria-label={navigation.ariaLabel}
            className="hidden flex-1 items-center justify-center gap-0.5 xl:flex 2xl:gap-1"
          >
            {navigation.navItems.map((item, index) => {
              const isActive = activeLink === item.href;
              const hasDropdown =
                item.label.toLowerCase() === "services";

              return (
                <a
                  key={index + 1}
                  href={item.href}
                  onClick={(e) =>
                    handleNavClick(e, item.href ?? "#home")
                  }
                  aria-current={isActive ? "page" : undefined}
                  className="group relative shrink-0 px-1 py-1"
                >
                  {/* SKEWED ACTIVE BACKGROUND */}
                  <span
                    className={`absolute inset-x-1 inset-y-0 -skew-x-[18deg] rounded-[2px] transition-all duration-500 ${isActive
                      ? "bg-[#B52B2B]"
                      : "bg-transparent group-hover:bg-[#B52B2B]"
                      }`}
                  />

                  {/* LINK CONTENT */}
                  <span
                    className={`relative z-10 flex items-center gap-1 px-2.5 py-2 text-sm font-semibold whitespace-nowrap transition-colors duration-300 2xl:px-2.5 2xl:text-[15px] ${isActive
                      ? "text-white"
                      : "text-[#20252B] group-hover:text-white"
                      }`}
                  >
                    {item.label}

                    {hasDropdown && (
                      <ChevronDown
                        size={15}
                        strokeWidth={2.5}
                        className="transition-transform duration-300 group-hover:rotate-180"
                      />
                    )}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* RIGHT CONTACT */}
          <div className=" shrink-0 items-center gap-10 md:flex">
            <div className="hidden h-12 w-px bg-gray-300 2xl:block" />

            <a
              href={helpline.href}
              className="group hidden md:flex items-center gap-3"
              aria-label={`Call us at ${phoneDisplay}`}
            >
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white shadow-[0_4px_12px_rgba(181,43,43,0.2)] transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: RED }}
              >
                <Phone size={21} fill="currentColor" />
              </span>

              <span className="flex flex-col">
                <span className="text-[14px] font-medium text-[#222]">
                  {helpline?.label}
                </span>
                <span className="text-[16px] font-bold whitespace-nowrap text-[#1C2228] transition-colors group-hover:text-[#B52B2B] 2xl:text-[16px]">
                  {helpline?.number}
                </span>
              </span>
            </a>

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={
                menuOpen ? mobile.closeLabel : mobile.menuLabel
              }
              aria-expanded={menuOpen}
              aria-controls="torqix-mobile-menu"
              className="relative z-[70] flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#B52B2B] text-white transition-colors hover:bg-[#922020] xl:hidden"
            >
              {menuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>

        </div>
      </MainContainer>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* OVERLAY */}
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation menu"
              className="fixed inset-0 z-[55] bg-black/50 xl:hidden"
            />

            {/* DRAWER */}
            <motion.div
              id="torqix-mobile-menu"
              initial={{
                opacity: 0,
                x: reduceMotion ? 0 : "-100%",
              }}
              animate={{ opacity: 1, x: 0 }}
              exit={{
                opacity: 0,
                x: reduceMotion ? 0 : "-100%",
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.35,
                ease,
              }}
              className="fixed left-0 top-0 z-[60] flex h-dvh w-[75%] max-w-[380px] flex-col overflow-y-auto bg-white sm:px-6 px-2 pb-10 pt-3 shadow-2xl xl:hidden"
            >
              {/* LOGO */}
              <div className="flex mb-10 shrink-0 items-center">
                <a
                  href={navigation.navItems[0]?.href || "#home"}
                  onClick={(e) =>
                    handleNavClick(
                      e,
                      navigation.navItems[0]?.href || "#home"
                    )
                  }
                  aria-label={logo.ariaLabel}
                  className="flex items-center"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    priority
                    className="h-auto w-[165px] object-contain sm:w-[200px] 2xl:w-[200px]"
                  />
                </a>
              </div>

              {/* MOBILE LINKS */}
              <nav className="flex flex-col">
                {navigation.navItems.map((item, index) => {
                  const isActive = activeLink === item.href;

                  return (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={(e) =>
                        handleNavClick(e, item.href || "")
                      }
                      initial={{
                        opacity: 0,
                        x: reduceMotion ? 0 : 20,
                      }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: reduceMotion ? 0 : index * 0.045,
                      }}
                      className={`group flex items-center justify-between border-b border-gray-100 px-3 py-4 sm:text-[16px] text-sm font-semibold transition-all ${isActive
                        ? "border-l-[3px] border-l-[#B52B2B] bg-red-50 text-[#B52B2B]"
                        : "text-[#20252B] hover:text-[#B52B2B]"
                        }`}
                    >
                      {item.label}

                      <ArrowUpRight
                        size={18}
                        className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                      />
                    </motion.a>
                  );
                })}
              </nav>

              {/* MOBILE CONTACT */}
              <div className="mt-8 rounded-lg bg-[#F8F8F8] p-5">
                <a
                  href={phoneNumber}
                  className="flex items-center gap-3"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#B52B2B] text-white">
                    <Phone size={15} />
                  </span>

                  <span className="flex flex-col">
                    <span className="text-[10px] text-gray-500">
                      {helpline?.label}
                    </span>
                    <span className="text-sm font-bold text-[#20252B]">
                      {phoneDisplay}
                    </span>
                  </span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
