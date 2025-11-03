"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "motion/react"
import {
  FaAward,
  FaBalanceScale,
  FaChartLine,
  FaGlobe,
  FaHandshake,
  FaShieldAlt,
  FaClock,
  FaDownload,
  FaStar,
  FaArrowRight,
} from "react-icons/fa"
import type { IconType } from "react-icons"

// Types
interface Stat {
  value: string
  label: string
  icon: IconType
}

interface Service {
  title: string
  description: string
  icon: IconType
  href: string
}

interface Publication {
  title: string
  description: string
  downloadUrl: string
  icon: IconType
}

interface Testimonial {
  quote: string
  author: string
  role: string
  company?: string
}

// Constants
const STATS: readonly Stat[] = [
  {
    value: "24/7",
    label: "Client Support",
    icon: FaClock,
  },
  {
    value: "Tier 1",
    label: "Legal 500 Ranking",
    icon: FaAward,
  },
  {
    value: "100%",
    label: "Client Satisfaction",
    icon: FaStar,
  },
  {
    value: "Top 3",
    label: "Corporate Law Firm",
    icon: FaChartLine,
  },
] as const

const SERVICES: readonly Service[] = [
  {
    title: "Mergers & Acquisitions",
    description: "Top firm for M&A deals in Ghana, advising global multinationals on complex transactions.",
    icon: FaHandshake,
    href: "/what-we-do#mergers-acquisitions",
  },
  {
    title: "Banking & Finance",
    description: "Tier 1 ranked banking and finance practice serving Fortune 500 companies.",
    icon: FaChartLine,
    href: "/what-we-do#banking-finance",
  },
  {
    title: "Energy & Infrastructure",
    description: "Leading expertise in power, oil & gas, mining, and infrastructure projects.",
    icon: FaGlobe,
    href: "/what-we-do#energy-infrastructure",
  },
  {
    title: "Dispute Resolution",
    description: "Remarkable team handling critical and complex commercial disputes and arbitration.",
    icon: FaBalanceScale,
    href: "/what-we-do#dispute-resolution",
  },
] as const

const PUBLICATIONS: readonly Publication[] = [
  {
    title: "M&A Guide 2022",
    description: "Comprehensive guide to mergers and acquisitions in Ghana",
    downloadUrl: "/document/2022/GTDT-Public-M&A-2022.pdf",
    icon: FaHandshake,
  },
  {
    title: "Electricity Regulation 2022",
    description: "Complete overview of power sector regulations",
    downloadUrl: "/document/2022/GTDT-Electricity-Regulation-2022.pdf",
    icon: FaChartLine,
  },
  {
    title: "Oil & Gas Regulation 2022",
    description: "Essential guide to oil and gas industry regulations",
    downloadUrl: "/document/2022/GTDT-Oil-Regulation-2022.pdf",
    icon: FaGlobe,
  },
] as const

const TESTIMONIALS: readonly Testimonial[] = [
  {
    quote:
      "I highly recommend Kimathi & Partners, Corporate Attorneys. Kimathi has served as our legal counsel with integrity and distinction after we completed an exhaustive search for attorneys in Ghana. His Harvard training has helped in that he understands both US and Ghanaian law. We have not been at all disappointed.",
    author: "Fortune 500 Client",
    role: "General Counsel",
  },
  {
    quote:
      "Excellent service levels. An experienced, reliable group of young legal brains that is much more responsive and enlightened than some other firms in Ghana. They have a great understanding of business and provide highly appropriate advice.",
    author: "Global Multinational",
    role: "Legal Director",
  },
  {
    quote:
      "They understand what international firms look for and what will be important for them. Highly talented, sharp and straightforward, and the kind of lawyer that everybody would like to have. Great value for money.",
    author: "International Client",
    role: "CEO",
  },
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

const fadeInVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

// Components
const StatCard = ({ stat }: { stat: Stat }) => {
  const Icon = stat.icon

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5 }}
      className="flex flex-col items-center gap-3 p-6 bg-white rounded-xl shadow-sm border border-gray-100"
    >
      <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center">
        <Icon className="w-7 h-7 text-red-600" />
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
        <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
      </div>
    </motion.div>
  )
}

const ServiceCard = ({ service }: { service: Service }) => {
  const Icon = service.icon

  return (
    <motion.div variants={itemVariants} whileHover={{ scale: 1.03 }} className="group">
      <Link
        href={service.href}
        className="block h-full p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-red-600 hover:shadow-xl transition-all duration-300"
      >
        <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-600 transition-colors duration-300">
          <Icon className="w-6 h-6 text-red-600 group-hover:text-white transition-colors duration-300" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-gray-600 mb-4">{service.description}</p>
        <div className="flex items-center gap-2 text-red-600 font-semibold group-hover:gap-3 transition-all duration-300">
          Learn More
          <FaArrowRight className="w-4 h-4" />
        </div>
      </Link>
    </motion.div>
  )
}

const PublicationCard = ({ publication }: { publication: Publication }) => {
  const Icon = publication.icon

  return (
    <motion.a
      href={publication.downloadUrl}
      target="_blank"
      rel="noopener noreferrer"
      variants={itemVariants}
      whileHover={{ scale: 1.05 }}
      className="group flex items-start gap-4 p-5 bg-gradient-to-br from-red-50 to-white rounded-xl border border-red-100 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex-shrink-0 w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
          {publication.title}
        </h4>
        <p className="text-sm text-gray-600 mb-2">{publication.description}</p>
        <div className="flex items-center gap-2 text-sm text-red-600 font-medium">
          <FaDownload className="w-3 h-3" />
          Download PDF
        </div>
      </div>
    </motion.a>
  )
}

const TestimonialCard = ({ testimonial, index }: { testimonial: Testimonial; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
    >
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className="w-5 h-5 text-yellow-400" />
        ))}
      </div>
      <p className="text-gray-700 italic mb-6 leading-relaxed">"{testimonial.quote}"</p>
      <div className="border-t border-gray-200 pt-4">
        <div className="font-semibold text-gray-900">{testimonial.author}</div>
        <div className="text-sm text-gray-600">
          {testimonial.role}
          {testimonial.company && ` • ${testimonial.company}`}
        </div>
      </div>
    </motion.div>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            }}
          />
        </div>

        <div className="container mx-auto px-6 md:px-8 py-20 md:py-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/20">
                Tier 1 Ranked by Legal 500
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Ghana's Leading
              <br />
              <span className="text-red-400">Corporate Law Firm</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl">
              Providing world-class legal services to global multinationals, Fortune 500 companies, and foreign
              governments doing business in Ghana.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 rounded-lg font-semibold text-lg shadow-xl transition-colors duration-300"
                >
                  Get Started
                  <FaArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/what-we-do"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-lg font-semibold text-lg transition-colors duration-300"
                >
                  Our Services
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 md:px-8 -mt-16 relative z-20 mb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {STATS.map(stat => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </motion.div>
      </section>

      {/* Why Choose Us Section */}
      <section className="container mx-auto px-6 md:px-8 py-20">
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Why Global Leaders Choose Us</h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            We are unquestionably one of the best law firms in Ghana and a crucible for gifted young lawyers. Ranked
            Tier 1 by Legal 500 and recognized by Chambers & Partners.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          <motion.div variants={itemVariants} className="text-center p-6">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaClock className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Availability</h3>
            <p className="text-gray-600">
              Available to our clients on weekends and after working hours. We run a true 24-hour practice.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center p-6">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaShieldAlt className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Integrity First</h3>
            <p className="text-gray-600">
              Strict anti-bribery and anti-corruption policy. We keep our word and our integrity.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center p-6">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaGlobe className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Global Standards</h3>
            <p className="text-gray-600">
              Top-notch legal service comparable to top tier law firms in New York or London.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-gradient-to-r from-red-50 to-white p-8 md:p-12 rounded-2xl border border-red-100"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">100% Client Migration Rate</h3>
            <p className="text-lg text-gray-700">
              100% of our top 40 Global Multinationals, Multilateral Agencies, Foreign Governments, and Fortune 500
              clients came from competing top tier law firms in Ghana.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Practice Areas</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are a specialized firm advising global multinationals on their most challenging legal issues and
              significant business transactions.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {SERVICES.map(service => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/what-we-do"
              className="inline-flex items-center gap-2 text-red-600 font-semibold text-lg hover:gap-3 transition-all duration-300"
            >
              View All Services
              <FaArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Publications Section */}
      <section className="container mx-auto px-6 md:px-8 py-20">
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Latest Publications</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Download our comprehensive guides on key practice areas in Ghana
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {PUBLICATIONS.map(publication => (
            <PublicationCard key={publication.title} publication={publication} />
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/publications"
            className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300 shadow-lg"
          >
            View All Publications
            <FaArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 text-white py-20">
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">What Our Clients Say</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Clients appreciate the high quality of our services
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 md:px-8 py-20">
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-gradient-to-r from-red-600 to-red-700 rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Work with Ghana's Best?</h2>
          <p className="text-xl md:text-2xl text-red-100 mb-8 max-w-3xl mx-auto">
            Join Fortune 500 companies and global multinationals who trust us with their most critical legal matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-red-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg"
              >
                Contact Us Today
                <FaArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/our-team"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors duration-300"
              >
                Meet Our Team
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
