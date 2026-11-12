"use client";

import { ReactNode } from "react"
import { motion, useReducedMotion, type Variants } from 'framer-motion'

interface PropsType {
    children: ReactNode, className?: string
}

export const Paragraph = ({ children, className = "" }: PropsType) => {
    return (
        <p className={`${className}`}>
            {children}
        </p>
    )
}

const ease = [0.22, 1, 0.36, 1] as const

export const SectionTitle = ({ children, className = "" }: PropsType) => {
    const reduce = useReducedMotion()

    const fadeUp: Variants = {
        hidden: reduce ? {} : { opacity: 0, y: 28 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
    }
    return (
        <motion.h2
            variants={fadeUp}
            className={`font-poppins mt-4 mb-4 text-[clamp(28px,3.6vw,52px)] font-bold  leading-[1.15] tracking-[-0.045em] text-[#292D33] ${className}`}
        >
            {children}
        </motion.h2>
    );
}

export const SectionEyebrow = ({ children, className = '', align = 'left', right = false }: PropsType & { align?: 'left' | 'center', right?: boolean }) => {
    const reduce = useReducedMotion()

    const fadeUp: Variants = {
        hidden: reduce ? {} : { opacity: 0, y: 28 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
    }

    const lineGrow: Variants = {
        hidden: reduce ? {} : { scaleX: 0 },
        show: { scaleX: 1, transition: { duration: 0.8, ease } },
    }

    const line = 'h-[4px] shrink-0 w-8 bg-[#B52B2B] sm:w-20'

    return (
        <motion.div
            variants={fadeUp}
            className={`flex items-center gap-3 sm:gap-5 ${align === 'center' ? 'justify-center' : ''} ${className}`}
        >
            {align === 'left' && (
                <motion.span variants={lineGrow} className={`origin-right  ${line} sm:block hidden`} />
            )}


            <p className='text-sm font-bold uppercase tracking-[0.22em] text-[#292D33] sm:text-base'>
                {children}
            </p>

            {
                right &&
                <motion.span variants={lineGrow} className={`origin-left hidden sm:flex ${line}`} />
            }
            <motion.span variants={lineGrow} className={`origin-left ${line} sm:hidden blobk`} />
        </motion.div>
    )
}

export const SectionSubTitle = ({ children, className = "" }: PropsType) => {

    const reduce = useReducedMotion()

    const fadeUp: Variants = {
        hidden: reduce ? {} : { opacity: 0, y: 28 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
    }
    return (
        <motion.p
            variants={fadeUp}
            className={`font-poppins font-semibold text-[#9c5a12] text-base sm:text-2xl leading-snug mt-3 sm:mt-6 ${className}`}
        >
            {children}
        </motion.p>
    )
}

export const SectionDescription = ({ children, className = "" }: PropsType) => {

    const reduce = useReducedMotion()

    const fadeUp: Variants = {
        hidden: reduce ? {} : { opacity: 0, y: 28 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
    }
    return (
        <motion.p
            variants={fadeUp}
            className={`font-poppins leading-[1.85] text-[#3E434A] text-sm sm:text-base lg:text-lg ${className}`}
        >
            {children}
        </motion.p>
    )
}