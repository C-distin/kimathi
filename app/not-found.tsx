"use client"

import { motion } from "motion/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FaArrowLeft, FaEnvelope, FaHome, FaPhoneVolume, FaSearch } from "react-icons/fa"

// Types
interface QuickLink {
  name: string
  href: string
  icon: typeof FaHome
  description: string
}

// Constants
const QUICK_LINKS: readonly QuickLink[] = [
  {
    name: "Home",
    href: "/",
    icon: FaHome,
    description: "Return to homepage",
  },
  {
    name: "What We Do",
    href: "/what-we-do",
    icon: FaSearch,
    description: "Explore our services",
  },
  {
    name: "Contact Us",
    href: "/contact-us",
    icon: FaPhoneVolume,
    description: "Get in touch",
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

const floatVariants = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
}

const pulseVariants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
}

// Components
const QuickLinkCard = ({ link }: { link: QuickLink }) => {
  const Icon = link.icon

  return (
    <motion.div variants={{ itemVariants }} whileHover={{ scale: 1.05 }}>
      <Link
        href={link.href}
        className="group flex flex-col items-center gap-3 p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-red-600 shadow-sm hover:shadow-lg transition-all duration-300"
      >
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center group-hover:bg-red-600 transition-colors duration-300">
          <Icon className="w-6 h-6 text-red-600 group-hover:text-white transition-colors duration-300" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors duration-300">
          {link.name}
        </h3>
        <p className="text-sm text-gray-500 text-center">{link.description}</p>
      </Link>
    </motion.div>
  )
}

const AnimatedNumber = () => {
  return (
    <div className="relative">
      {/* Background decorative elements */}
      <motion.div
        className="absolute -inset-20 opacity-10"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="w-full h-full border-4 border-red-600 rounded-full" />
      </motion.div>

      {/* 404 Text */}
      <motion.div variants={{ floatVariants }} animate="animate" className="relative">
        <h1 className="text-[200px] md:text-[300px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800 leading-none select-none">
          404
        </h1>

        {/* Glowing effect */}
        <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-red-600/30 to-red-800/30 -z-10" />
      </motion.div>
    </div>
  )
}

export default function NotFound() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(10)
  const [isAutoRedirect, setIsAutoRedirect] = useState(true)

  useEffect(() => {
    if (!isAutoRedirect) return

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push("/")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router, isAutoRedirect])

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 flex items-center justify-center px-6 py-12">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-6xl w-full">
        {/* Animated 404 Number */}
        <motion.div variants={{ itemVariants }} className="flex justify-center mb-8">
          <AnimatedNumber />
        </motion.div>

        {/* Main Content */}
        <div className="text-center space-y-6 mb-12">
          <motion.div variants={{ itemVariants }}>
            <motion.h2
              variants={{ pulseVariants }}
              animate="animate"
              className="text-3xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              Oops! Page Not Found
            </motion.h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              The page you're looking for seems to have wandered off. Don't worry, even the best legal minds sometimes
              take a wrong turn.
            </p>
          </motion.div>

          {/* Auto-redirect notice */}
          {isAutoRedirect && (
            <motion.div
              variants={{ itemVariants }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-full text-sm"
            >
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <title>Loading...</title>
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Redirecting to home in {countdown} seconds
              <button
                type="button"
                onClick={() => setIsAutoRedirect(false)}
                className="ml-2 underline hover:no-underline"
              >
                Cancel
              </button>
            </motion.div>
          )}
        </div>

        {/* Action Buttons */}
        <motion.div variants={{ itemVariants }} className="flex flex-col sm:flex-row gap-4 justify-center mt-12 mb-16">
          <motion.button
            onClick={() => router.back()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-300"
          >
            <FaArrowLeft className="w-4 h-4" />
            Go Back
          </motion.button>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300 shadow-lg"
            >
              <FaHome className="w-4 h-4" />
              Go to Homepage
            </Link>
          </motion.div>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={{ itemVariants }} className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Or try these popular pages</h3>
          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {QUICK_LINKS.map(link => (
              <QuickLinkCard key={link.href} link={link} />
            ))}
          </motion.div>
        </motion.div>

        {/* Help Section */}
        <motion.div
          variants={{ itemVariants }}
          className="max-w-2xl mx-auto bg-gradient-to-r from-red-50 to-white rounded-2xl p-8 border border-red-100 shadow-sm"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
            Still can't find what you're looking for?
          </h3>
          <p className="text-gray-600 text-center mb-6">
            Our team is here to help. Reach out to us and we'll point you in the right direction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300"
            >
              <FaEnvelope className="w-4 h-4" />
              Contact Support
            </Link>
            <a
              href="tel:+233577651394"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-red-600 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition-colors duration-300"
            >
              <FaPhoneVolume className="w-4 h-4" />
              Call Us
            </a>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.p variants={{ itemVariants }} className="text-center text-sm text-gray-500 mt-12">
          Error Code: 404 | Page Not Found
        </motion.p>
      </motion.div>
    </main>
  )
}
