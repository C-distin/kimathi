"use client"

import { AnimatePresence, motion } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { FaBars, FaXmark } from "react-icons/fa6"

interface NavItem {
  name: string
  href: string
}

interface NavLinkProps {
  item: NavItem
  onClick?: () => void
  className?: string
}

// Constants
const NAV_ITEMS: readonly NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Who We Are", href: "/who-we-are" },
  { name: "What We Do", href: "/what-we-do" },
  { name: "Clients", href: "/clients" },
  { name: "Transactions", href: "/transactions" },
  { name: "Our Team", href: "/our-team" },
  { name: "Publications", href: "/publications" },
  { name: "Contact Us", href: "/contact-us" },
] as const

const SCROLL_THRESHOLD = 10

const menuVariants = {
  closed: {
    opacity: 0,
    x: "100%",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
}

const menuItemVariants = {
  closed: {
    opacity: 0,
    x: 20,
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
}

// Components
const NavLink = ({ item, onClick, className = "" }: NavLinkProps) => (
  <Link
    href={item.href}
    onClick={onClick}
    className={`relative text-red-700 transition-colors duration-300 hover:text-red-900 group ${className}`}
    aria-label={`Navigate to ${item.name}`}
  >
    {item.name}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-900 transition-all duration-300 group-hover:w-full" />
  </Link>
)

const MobileMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Mobile Menu */}
        <motion.nav
          variants={{ menuVariants }}
          initial="closed"
          animate="open"
          exit="closed"
          className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-50 overflow-y-auto"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <Image
                src="https://www.kimathilegal.com/images/kimathi_logo.png"
                alt="Kimathi & Partners Logo"
                width={150}
                height={38}
                priority
              />
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <FaXmark className="w-6 h-6 text-gray-700" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-1 p-6">
              {NAV_ITEMS.map(item => (
                <motion.div key={item.name} variants={{ menuItemVariants }}>
                  <NavLink
                    item={item}
                    onClick={onClose}
                    className="block py-3 px-4 rounded-lg hover:bg-gray-50 text-lg"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.nav>
      </>
    )}
  </AnimatePresence>
)

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > SCROLL_THRESHOLD)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  return (
    <>
      <header className="sticky top-0 w-full z-50">
        <div className="container mx-auto px-6 md:px-8 py-4">
          <motion.div
            className={`relative rounded-2xl transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-2xl shadow-lg" : "bg-transparent"
              }`}
            initial={false}
            animate={{
              backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0)",
            }}
          >
            <div className="flex items-center justify-between px-6 py-4">
              {/* Logo */}
              <Link href="/" aria-label="Kimathi & Partners Home">
                <Image
                  src="https://www.kimathilegal.com/images/kimathi_logo.png"
                  alt="Kimathi & Partners Logo"
                  width={200}
                  height={50}
                  priority
                  className="h-auto w-auto"
                />
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
                {NAV_ITEMS.map(item => (
                  <NavLink key={item.name} item={item} />
                ))}
              </nav>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={toggleMenu}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                <FaBars className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  )
}
