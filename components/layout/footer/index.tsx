"use client"

import { motion } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import type { IconType } from "react-icons"
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationDot,
  FaPhoneVolume,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6"

// Types
interface SocialLink {
  icon: IconType
  href: string
  label: string
  color: string
}

interface QuickLink {
  name: string
  href: string
}

interface ContactInfo {
  icon: IconType
  label: string
  value: string
  href?: string
}

// Constants
const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    icon: FaFacebook,
    href: "https://facebook.com/kimathilegal",
    label: "Visit our Facebook page",
    color: "text-blue-600 hover:text-blue-500",
  },
  {
    icon: FaInstagram,
    href: "https://instagram.com/kimathilegal",
    label: "Visit our Instagram profile",
    color: "text-pink-500 hover:text-pink-400",
  },
  {
    icon: FaXTwitter,
    href: "https://twitter.com/kimathilegal",
    label: "Visit our X (Twitter) profile",
    color: "text-gray-400 hover:text-gray-300",
  },
  {
    icon: FaLinkedin,
    href: "https://linkedin.com/company/kimathilegal",
    label: "Visit our LinkedIn page",
    color: "text-blue-500 hover:text-blue-400",
  },
] as const

const QUICK_LINKS: readonly QuickLink[] = [
  { name: "Home", href: "/" },
  { name: "Who We Are", href: "/who-we-are" },
  { name: "What We Do", href: "/what-we-do" },
  { name: "Our Team", href: "/our-team" },
  { name: "Publications", href: "/publications" },
  { name: "Careers", href: "/careers" },
] as const

const PRACTICE_AREAS: readonly QuickLink[] = [
  { name: "Corporate Law", href: "/what-we-do#corporate" },
  { name: "Commercial Litigation", href: "/what-we-do#litigation" },
  { name: "Real Estate", href: "/what-we-do#real-estate" },
  { name: "Employment Law", href: "/what-we-do#employment" },
  { name: "Intellectual Property", href: "/what-we-do#ip" },
  { name: "Tax Advisory", href: "/what-we-do#tax" },
] as const

const CONTACT_INFO: readonly ContactInfo[] = [
  {
    icon: FaLocationDot,
    label: "Office Location",
    value: "No 6, Airport Road, Airport Residential, Accra",
  },
  {
    icon: FaPhoneVolume,
    label: "Phone Number",
    value: "+233 57 765 1394",
    href: "tel:+233577651394",
  },
  {
    icon: FaEnvelope,
    label: "Email Address",
    value: "kimathi@kimathilegal.com",
    href: "mailto:kimathi@kimathilegal.com",
  },
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    value: "+233 24 796 0465",
    href: "https://wa.me/233247960465",
  },
] as const

// Animation variants
const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

// Components
const SocialLinkButton = ({ link }: { link: SocialLink }) => (
  <motion.a
    href={link.href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={link.label}
    className={`${link.color} transition-all duration-300 hover:scale-110`}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    <link.icon className="w-6 h-6" aria-hidden="true" />
  </motion.a>
)

const FooterLink = ({ link }: { link: QuickLink }) => (
  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors duration-300 text-sm group">
    <span className="relative">
      {link.name}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
    </span>
  </Link>
)

const ContactItem = ({ info }: { info: ContactInfo }) => {
  const Icon = info.icon
  const content = (
    <>
      <Icon className="w-5 h-5 text-red-600 shrink-0" aria-hidden="true" />
      <span className="text-sm text-gray-400">{info.value}</span>
    </>
  )

  if (info.href) {
    return (
      <a
        href={info.href}
        className="flex items-center gap-3 hover:text-white transition-colors duration-300 group"
        aria-label={info.label}
      >
        {content}
      </a>
    )
  }

  return <div className="flex items-center gap-3">{content}</div>
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-linear-to-b from-gray-900 to-black text-gray-300">
      <motion.div
        className="container mx-auto px-6 md:px-8 py-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{ footerVariants }}
      >
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="flex flex-col gap-6">
            <Link href="/" aria-label="Kimathi & Partners Home">
              <Image
                src="https://www.kimathilegal.com/images/kimathi_logo.png"
                alt="Kimathi & Partners Logo"
                width={200}
                height={50}
                className="h-auto w-auto"
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Leading law firm providing comprehensive legal services with excellence, integrity, and innovation.
            </p>
            <ol className="flex gap-4" aria-label="Social media links">
              {SOCIAL_LINKS.map(link => (
                <li key={link.href}>
                  <SocialLinkButton link={link} />
                </li>
              ))}
            </ol>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <nav className="flex flex-col gap-3" aria-label="Quick links">
              {QUICK_LINKS.map(link => (
                <FooterLink key={link.href} link={link} />
              ))}
            </nav>
          </div>

          {/* Practice Areas */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Practice Areas</h3>
            <nav className="flex flex-col gap-3" aria-label="Practice areas">
              {PRACTICE_AREAS.map(link => (
                <FooterLink key={link.href} link={link} />
              ))}
            </nav>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <address className="flex flex-col gap-4 not-italic">
              {CONTACT_INFO.map(info => (
                <ContactItem key={info.value} info={info} />
              ))}
            </address>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>&copy; {currentYear} Kimathi & Partners, Corporate Attorneys. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors duration-300">
              Terms of Service
            </Link>
            <Link href="/cookie-policy" className="hover:text-white transition-colors duration-300">
              Cookie Policy
            </Link>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}
