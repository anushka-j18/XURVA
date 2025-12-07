"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ShoppingBag, Star } from "lucide-react"
import type { Product } from "@/lib/cart-store"
import { useCartStore } from "@/lib/cart-store"

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { addItem } = useCartStore()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-secondary">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {product.originalPrice && (
            <span className="absolute left-3 top-3 rounded-full bg-foreground px-2.5 py-1 text-xs font-medium text-background">
              Sale
            </span>
          )}
          <motion.div
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            className="absolute inset-x-3 bottom-3"
          >
            <button
              onClick={(e) => {
                e.preventDefault()
                addItem(product)
              }}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-background/90 backdrop-blur-sm py-3 text-sm font-medium transition-colors hover:bg-background"
            >
              <ShoppingBag className="h-4 w-4" />
              Add to Cart
            </button>
          </motion.div>
        </div>
      </Link>
      <div className="mt-4 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">{product.name}</h3>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-foreground text-foreground" />
            <span className="text-xs text-muted-foreground">{product.rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
