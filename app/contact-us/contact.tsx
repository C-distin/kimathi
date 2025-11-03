"use client"

import { ContactForm } from "./form"
import { FaMapLocationDot, FaWhatsapp, FaPhoneVolume, FaEnvelope } from "react-icons/fa6"
import { motion } from "motion/react"
import type { IconType } from "react-icons"

// Types
interface ContactInfo {
  icon: IconType
  label: string
  value: string
  href: string
  description: string
}

// Constants
const CONTACT_INFO: readonly ContactInfo[] = [
  {
    icon: FaMapLocationDot,
    label: "Office Location",
    value: "No 6, Airport Road, Airport Residential, Accra",
    href: "https://maps.app.goo.gl/RDVTUUUS5GHEEKY87",
    description: "Visit our office",
  },
  {
    icon: FaPhoneVolume,
    label: "Phone",
    value: "+233 57 765 1394",
    href: "tel:+233577651394",
    description: "Call us directly",
  },
  {
    icon: FaEnvelope,
    label: "Email",
    value: "kimathi@kimathilegal.com",
    href: "mailto:kimathi@kimathilegal.com",
    description: "Send us an email",
  },
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    value: "+233 24 796 0465",
    href: "https://wa.me/233247960465",
    description: "Chat with us on WhatsApp",
  },
] as const

const OFFICE_HOURS = [
  { day: "Monday - Friday", hours: "8:00 AM - 5:00 PM" },
  { day: "Saturday", hours: "9:00 AM - 1:00 PM" },
  { day: "Sunday", hours: "Closed" },
] as const

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

// Components
const ContactInfoCard = ({ info }: { info: ContactInfo }) => {
  const Icon = info.icon

  return (
    <motion.a
      href={info.href}
      target={info.href.startsWith("http") ? "_blank" : undefined}
      rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group relative flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-200 hover:border-red-600 hover:shadow-lg transition-all duration-300"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Icon Container */}
      <div className="shrink-0 w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center group-hover:bg-red-600 transition-colors duration-300">
        <Icon className="w-6 h-6 text-red-600 group-hover:text-white transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-500 mb-1">{info.label}</h3>
        <p className="text-base font-semibold text-gray-900 wrap-break-word">{info.value}</p>
        <p className="text-xs text-gray-500 mt-1 group-hover:text-red-600 transition-colors duration-300">
          {info.description} →
        </p>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 rounded-xl bg-linear-to-br from-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
    </motion.a>
  )
}

const OfficeHoursCard = () => (
  <motion.div
    variants={{ cardVariants }}
    className="bg-linear-to-br from-red-50 to-white p-6 rounded-xl border border-red-100 shadow-sm"
  >
    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <title>Office Hours</title>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      Office Hours
    </h3>
    <div className="space-y-3">
      {OFFICE_HOURS.map((schedule, index) => (
        <div key={index} className="flex justify-between items-center py-2 border-b border-red-100 last:border-0">
          <span className="text-sm font-medium text-gray-700">{schedule.day}</span>
          <span className="text-sm text-gray-600">{schedule.hours}</span>
        </div>
      ))}
    </div>
  </motion.div>
)

const MapEmbed = () => (
  <motion.div
    variants={{ cardVariants }}
    className="relative w-full h-64 rounded-xl overflow-hidden shadow-lg border border-gray-200"
  >
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.6809655208144!2d-0.175862921067863!3d5.614043461403993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9b1a8242d6a7%3A0xacfb2d00aa108015!2sKimathi%20%26%20Partners%2C%20Corporate%20Attorneys!5e0!3m2!1sen!2sgh!4v1762153086323!5m2!1sen!2sgh"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Kimathi & Partners Office Location"
      className="grayscale hover:grayscale-0 transition-all duration-500"
    />
  </motion.div>
)

export function ContactPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-6 md:px-8 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold">Get In Touch</span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Contact Us</h1>

          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            We'd love to hear from you! Whether you have questions about our services or need legal assistance, our team
            is here to help.
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-6 md:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact Form - Takes up 3 columns */}
            <motion.div
              variants={{ itemVariants }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">Send us a Message</h2>
                  <p className="text-gray-600">Fill out the form below and we'll get back to you within 24 hours.</p>
                </div>
                <ContactForm />
              </div>
            </motion.div>

            {/* Contact Info Sidebar - Takes up 2 columns */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Contact Information */}
              <motion.div variants={{ itemVariants }}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
                <p className="text-gray-600 mb-6">Reach out to us through any of these channels.</p>
                <div className="space-y-3">
                  {CONTACT_INFO.map(info => (
                    <ContactInfoCard key={info.label} info={info} />
                  ))}
                </div>
              </motion.div>

              {/* Office Hours */}
              <OfficeHoursCard />

              {/* Map */}
              <MapEmbed />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-linear-to-r from-red-900 to-red-700 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-6 md:px-8 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Need Immediate Legal Assistance?</h2>
          <p className="text-red-100 text-lg mb-8 max-w-2xl mx-auto">
            For urgent matters, please call us directly or visit our office during business hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="tel:+233577651394"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-red-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            >
              <FaPhoneVolume className="w-5 h-5" />
              Call Now
            </motion.a>
            <motion.a
              href="https://wa.me/233247960465"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300 shadow-lg"
            >
              <FaWhatsapp className="w-5 h-5" />
              WhatsApp Us
            </motion.a>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
