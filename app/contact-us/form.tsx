"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { contactSchema, type ContactData } from "@/lib/validation/contact"
import { toast } from "sonner"
import { useState } from "react"
import { motion } from "motion/react"

// Types
interface ContactFormProps {
  onSuccess?: () => void
  className?: string
}

// Animation variants
const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
}

const fieldVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
}

export function ContactForm({ onSuccess, className = "" }: ContactFormProps) {
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
    mode: "onBlur", // Validate on blur for better UX
  })

  const onSubmit = async (data: ContactData) => {
    try {
      // Validate data (already validated by zod, but extra safety)
      const validatedData = contactSchema.parse(data)

      // Send to API endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to send message")
      }

      const result = await response.json()

      // Success handling
      toast.success("Message sent successfully!", {
        description: "We'll get back to you within 24 hours.",
        duration: 5000,
      })

      setIsSuccess(true)
      reset() // Clear form

      // Call success callback if provided
      onSuccess?.()

      // Reset success state after animation
      setTimeout(() => setIsSuccess(false), 3000)
    } catch (error) {
      console.error("Contact form error:", error)

      // Error handling with specific messages
      if (error instanceof Error) {
        toast.error("Failed to send message", {
          description: error.message,
          duration: 5000,
        })
      } else {
        toast.error("Something went wrong!", {
          description: "Please try again later or contact us directly.",
          duration: 5000,
        })
      }
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className={`space-y-6 ${className}`}
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Name Field */}
      <motion.div variants={fieldVariants}>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Full Name <span className="text-red-600">*</span>
        </label>
        <input
          {...register("name")}
          id="name"
          type="text"
          placeholder="John Doe"
          disabled={isSubmitting}
          className={`w-full px-4 py-3 border rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-600 disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300"
            }`}
          aria-invalid={errors.name ? "true" : "false"}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.name.message}
          </p>
        )}
      </motion.div>

      {/* Email Field */}
      <motion.div variants={fieldVariants}>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address <span className="text-red-600">*</span>
        </label>
        <input
          {...register("email")}
          id="email"
          type="email"
          placeholder="john@example.com"
          disabled={isSubmitting}
          className={`w-full px-4 py-3 border rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-600 disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300"
            }`}
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.email.message}
          </p>
        )}
      </motion.div>

      {/* Phone Field */}
      <motion.div variants={fieldVariants}>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number <span className="text-red-600">*</span>
        </label>
        <input
          {...register("phone")}
          id="phone"
          type="tel"
          placeholder="0244847464"
          disabled={isSubmitting}
          className={`w-full px-4 py-3 border rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-600 disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.phone ? "border-red-500 focus:ring-red-500" : "border-gray-300"
            }`}
          aria-invalid={errors.phone ? "true" : "false"}
          aria-describedby={errors.phone ? "phone-error" : undefined}
        />
        {errors.phone && (
          <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.phone.message}
          </p>
        )}
      </motion.div>

      {/* Subject Field */}
      <motion.div variants={fieldVariants}>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
          Subject <span className="text-red-600">*</span>
        </label>
        <input
          {...register("subject")}
          id="subject"
          type="text"
          placeholder="How can we help you?"
          disabled={isSubmitting}
          className={`w-full px-4 py-3 border rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-600 disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.subject ? "border-red-500 focus:ring-red-500" : "border-gray-300"
            }`}
          aria-invalid={errors.subject ? "true" : "false"}
          aria-describedby={errors.subject ? "subject-error" : undefined}
        />
        {errors.subject && (
          <p id="subject-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.subject.message}
          </p>
        )}
      </motion.div>

      {/* Message Field */}
      <motion.div variants={fieldVariants}>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Message <span className="text-red-600">*</span>
        </label>
        <textarea
          {...register("message")}
          id="message"
          rows={6}
          placeholder="Tell us more about your inquiry..."
          disabled={isSubmitting}
          className={`w-full px-4 py-3 border rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-600 disabled:bg-gray-100 disabled:cursor-not-allowed resize-none ${errors.message ? "border-red-500 focus:ring-red-500" : "border-gray-300"
            }`}
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.message.message}
          </p>
        )}
      </motion.div>

      {/* Submit Button */}
      <motion.div variants={fieldVariants}>
        <button
          type="submit"
          disabled={isSubmitting || isSuccess}
          className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 ${isSuccess ? "bg-green-600 hover:bg-green-700" : "bg-red-700 hover:bg-red-800"
            } disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <title>Loading...</title>
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Sending...
            </span>
          ) : isSuccess ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <title>Success</title>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Message Sent!
            </span>
          ) : (
            "Send Message"
          )}
        </button>
      </motion.div>

      {/* Privacy Notice */}
      <motion.p variants={fieldVariants} className="text-xs text-gray-500 text-center">
        By submitting this form, you agree to our{" "}
        <a href="/privacy-policy" className="text-red-700 hover:underline">
          Privacy Policy
        </a>
        .
      </motion.p>
    </motion.form>
  )
}
