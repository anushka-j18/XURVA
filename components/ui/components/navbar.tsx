"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ShoppingBag, Menu, X } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { openCart, totalItems } = useCartStore()
  const itemCount = totalItems()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm" : "bg-transparent",
        )}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* Left nav */}
            <div className="hidden lg:flex lg:items-center lg:gap-8">
              <Link
                href="/products"
                className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
              >
                Shop
              </Link>
              <Link
                href="/products?category=clothing"
                className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
              >
                Clothing
              </Link>
              <Link
                href="/products?category=home"
                className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
              >
                Home
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 -ml-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {/* Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              <motion.span className="text-xl font-semibold tracking-tight" whileHover={{ scale: 1.02 }}>
                XURVA
              </motion.span>
            </Link>

            {/* Right nav */}
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-foreground/70 transition-colors hover:text-foreground"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openCart}
                className="relative p-2 text-foreground/70 transition-colors hover:text-foreground"
                aria-label="Open cart"
              >
                <ShoppingBag className="h-5 w-5" />
                <AnimatePresence>
                  {itemCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-xs font-medium text-background"
                    >
                      {itemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </nav>

        {/* Search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-border bg-background/95 backdrop-blur-xl overflow-hidden"
            >
              <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full rounded-full border border-border bg-secondary/50 py-3 pl-12 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
                    autoFocus
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background lg:hidden"
          >
            <div className="flex flex-col gap-6 p-8 pt-24">
              <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium">
                Shop All
              </Link>
              <Link
                href="/products?category=clothing"
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-medium"
              >
                Clothing
              </Link>
              <Link
                href="/products?category=bags"
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-medium"
              >
                Bags
              </Link>
              <Link
                href="/products?category=home"
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-medium"
              >
                Home
              </Link>
              <Link
                href="/products?category=accessories"
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-medium"
              >
                Accessories
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
