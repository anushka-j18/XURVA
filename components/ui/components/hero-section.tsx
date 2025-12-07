"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-secondary/30">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <motion.h1
            className="font-serif text-5xl font-normal tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Optimal organization
            <br />
            <span className="italic">meets exquisite design</span>
          </motion.h1>

          <motion.p
            className="mx-auto max-w-xl text-base text-muted-foreground sm:text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Transform your everyday with curated essentials. Premium craftsmanship meets timeless design for modern
            living.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="/products">
              <Button size="lg" className="rounded-full px-8 gap-2 group">
                Shop Collection
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="#featured">
              <Button variant="outline" size="lg" className="rounded-full px-8 bg-transparent">
                View Featured
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Decorative image at bottom */}
        <motion.div
          className="mt-16 mx-auto max-w-md"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-card shadow-2xl">
            <img
              src="/luxury-modern-furniture-interior-design-minimal.jpg"
              alt="Featured collection preview"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* Side CTAs */}
      <motion.div
        className="absolute left-8 bottom-24 hidden lg:block"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="text-center space-y-2">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Learn Our</p>
          <p className="text-xs uppercase tracking-widest font-medium">Untold Story</p>
          <Link
            href="#"
            className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors mt-2"
          >
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>

      <motion.div
        className="absolute right-8 bottom-24 hidden lg:block"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="text-center space-y-2">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Purchase Our</p>
          <p className="text-xs uppercase tracking-widest font-medium">Stellar Products</p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors mt-2"
          >
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
