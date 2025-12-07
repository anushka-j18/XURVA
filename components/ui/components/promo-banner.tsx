"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PromoBanner() {
  return (
    <section className="py-20 lg:py-32 bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="text-sm uppercase tracking-widest text-background/60">Limited Time</span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl">
              Season Sale
              <br />
              <span className="italic">Up to 40% off</span>
            </h2>
            <p className="text-background/70 max-w-md leading-relaxed">
              Discover exceptional savings on select items from our latest collection. Quality never goes out of style.
            </p>
            <Link href="/products">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 gap-2 group border-background/30 text-background hover:bg-background hover:text-foreground bg-transparent"
              >
                Shop Sale
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-square"
          >
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <img src="/luxury-fashion-editorial-minimal-aesthetic.jpg" alt="Season sale" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
