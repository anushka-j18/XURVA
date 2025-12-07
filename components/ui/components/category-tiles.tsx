"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const categories = [
  {
    name: "Clothing",
    description: "Timeless wardrobe essentials",
    image: "/luxury-minimal-clothing-rack-fashion.jpg",
    href: "/products?category=clothing",
  },
  {
    name: "Home",
    description: "Curated living spaces",
    image: "/modern-minimal-home-decor-interior.jpg",
    href: "/products?category=home",
  },
  {
    name: "Accessories",
    description: "Finishing touches",
    image: "/luxury-accessories-watches-jewelry-minimal.jpg",
    href: "/products?category=accessories",
  },
]

export function CategoryTiles() {
  return (
    <section className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl">Shop by Category</h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <Link href={category.href} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-secondary">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/0 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-background">{category.name}</h3>
                        <p className="text-sm text-background/70 mt-1">{category.description}</p>
                      </div>
                      <motion.div
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm"
                        whileHover={{ scale: 1.1 }}
                      >
                        <ArrowUpRight className="h-5 w-5 text-background transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
