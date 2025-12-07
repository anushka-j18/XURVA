"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { featuredProducts } from "@/data/products"
import { ProductCard } from "@/components/product-card"

export function FeaturedProducts() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="featured" className="py-20 lg:py-32 bg-card" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl">Featured Collection</h2>
            <p className="mt-2 text-muted-foreground">Handpicked favorites from our latest arrivals</p>
          </div>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
