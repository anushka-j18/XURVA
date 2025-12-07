"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, Check, ShoppingBag } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import { Button } from "@/components/ui/button"
import StripeCheckout from "@/components/stripe-checkout"
import type { CheckoutItem } from "@/app/actions/stripe"

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore()
  const [orderComplete, setOrderComplete] = useState(false)

  const checkoutItems: CheckoutItem[] = useMemo(() => {
    return items.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      size: item.selectedSize,
      color: item.selectedColor,
    }))
  }, [items])

  const subtotal = totalPrice()
  const shipping = subtotal > 100 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  if (orderComplete) {
    return (
      <main className="min-h-screen pt-20 lg:pt-24 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center px-4 py-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 rounded-full bg-foreground text-background flex items-center justify-center mx-auto mb-6"
          >
            <Check className="h-10 w-10" />
          </motion.div>
          <h1 className="font-serif text-3xl sm:text-4xl mb-4">Order Confirmed</h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Thank you for your purchase. You will receive a confirmation email shortly with your order details.
          </p>
          <Link href="/products">
            <Button className="rounded-full px-8">Continue Shopping</Button>
          </Link>
        </motion.div>
      </main>
    )
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen pt-20 lg:pt-24 flex items-center justify-center">
        <div className="text-center px-4 py-16">
          <ShoppingBag className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
          <h1 className="font-serif text-3xl sm:text-4xl mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">Add some items to your cart to proceed with checkout.</p>
          <Link href="/products">
            <Button className="rounded-full px-8">Browse Products</Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-20 lg:pt-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back link */}
        <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
        </motion.nav>

        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Stripe Checkout */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-7">
            <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-sm overflow-hidden">
              <h2 className="font-serif text-2xl mb-6">Payment</h2>
              <StripeCheckout items={checkoutItems} />
            </div>
          </motion.div>

          {/* Order summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5 mt-8 lg:mt-0"
          >
            <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-sm sticky top-28">
              <h2 className="font-serif text-xl mb-6">Order Summary</h2>

              {/* Items */}
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4">
                    <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">{item.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.selectedSize && `Size: ${item.selectedSize}`}
                        {item.selectedSize && item.selectedColor && " / "}
                        {item.selectedColor && `Color: ${item.selectedColor}`}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
                        <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-border pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium text-lg pt-3 border-t border-border">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Free shipping notice */}
              {subtotal < 100 && (
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Add ${(100 - subtotal).toFixed(2)} more for free shipping
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
