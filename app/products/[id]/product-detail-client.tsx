"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Minus, Plus, ChevronLeft, Check, Heart } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { cn } from "@/lib/utils"
import type { Product } from "@/data/products"

interface ProductDetailClientProps {
  product: Product
  relatedProducts: Product[]
}

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined)
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined)
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  const { addItem } = useCartStore()

  const handleAddToCart = () => {
    setIsAdding(true)
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize, selectedColor)
    }
    setTimeout(() => setIsAdding(false), 1500)
  }

  // Generate multiple images for gallery (using same image for demo)
  const images = [product.image, product.image, product.image]

  return (
    <main className="min-h-screen pt-20 lg:pt-24">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Products
          </Link>
        </motion.nav>

        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          {/* Image gallery */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-secondary">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[selectedImage] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
              {product.originalPrice && (
                <span className="absolute left-4 top-4 rounded-full bg-foreground px-3 py-1.5 text-xs font-medium text-background">
                  Sale
                </span>
              )}
              <button
                className="absolute right-4 top-4 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                aria-label="Add to wishlist"
              >
                <Heart className="h-5 w-5" />
              </button>
            </div>

            {/* Thumbnail gallery */}
            <div className="flex gap-3">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    "relative aspect-square w-20 overflow-hidden rounded-lg bg-secondary transition-all",
                    selectedImage === index ? "ring-2 ring-foreground ring-offset-2" : "opacity-70 hover:opacity-100",
                  )}
                >
                  <Image src={img || "/placeholder.svg"} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="mt-8 lg:mt-0 space-y-8">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">{product.category}</p>
              <h1 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl">{product.name}</h1>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < Math.floor(product.rating) ? "fill-foreground text-foreground" : "text-border",
                      )}
                    />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-semibold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
                )}
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Size selector */}
            {product.sizes && (
              <div>
                <h3 className="text-sm font-medium mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "min-w-12 px-4 py-2.5 rounded-full border text-sm font-medium transition-all",
                        selectedSize === size
                          ? "border-foreground bg-foreground text-background"
                          : "border-border hover:border-foreground",
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color selector */}
            {product.colors && (
              <div>
                <h3 className="text-sm font-medium mb-3">Color: {selectedColor || "Select"}</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "px-4 py-2.5 rounded-full border text-sm font-medium transition-all",
                        selectedColor === color
                          ? "border-foreground bg-foreground text-background"
                          : "border-border hover:border-foreground",
                      )}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-medium mb-3">Quantity</h3>
              <div className="inline-flex items-center gap-3 rounded-full border border-border p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Add to cart */}
            <div className="flex gap-4">
              <Button
                size="lg"
                className="flex-1 rounded-full text-base"
                onClick={handleAddToCart}
                disabled={isAdding || (product.sizes && !selectedSize) || (product.colors && !selectedColor)}
              >
                <AnimatePresence mode="wait">
                  {isAdding ? (
                    <motion.span
                      key="added"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      <Check className="h-5 w-5" />
                      Added to Cart
                    </motion.span>
                  ) : (
                    <motion.span
                      key="add"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      Add to Cart - ${(product.price * quantity).toFixed(2)}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </div>

            {/* Product details */}
            <div className="border-t border-border pt-8 space-y-4">
              <details className="group">
                <summary className="flex cursor-pointer items-center justify-between py-2 text-sm font-medium">
                  Product Details
                  <Plus className="h-4 w-4 transition-transform group-open:rotate-45" />
                </summary>
                <div className="pt-2 pb-4 text-sm text-muted-foreground">
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Premium materials sourced ethically</li>
                    <li>Handcrafted with attention to detail</li>
                    <li>Designed for longevity and timeless style</li>
                    <li>Free shipping on orders over $100</li>
                  </ul>
                </div>
              </details>
              <details className="group">
                <summary className="flex cursor-pointer items-center justify-between py-2 text-sm font-medium">
                  Shipping & Returns
                  <Plus className="h-4 w-4 transition-transform group-open:rotate-45" />
                </summary>
                <div className="pt-2 pb-4 text-sm text-muted-foreground">
                  <p>Free standard shipping on orders over $100. Express shipping available at checkout.</p>
                  <p className="mt-2">
                    30-day return policy for unworn items in original condition with tags attached.
                  </p>
                </div>
              </details>
            </div>
          </motion.div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 lg:mt-32">
            <h2 className="font-serif text-2xl sm:text-3xl mb-8">You May Also Like</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
