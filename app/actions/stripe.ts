"use server"

import { stripe } from "@/lib/stripe"
import { products } from "@/data/products"

export interface CheckoutItem {
  productId: string
  quantity: number
  size?: string
  color?: string
}

export async function createCheckoutSession(items: CheckoutItem[]) {
  // Validate and build line items from server-side product data
  const lineItems = items.map((item) => {
    const product = products.find((p) => p.id === item.productId)
    if (!product) {
      throw new Error(`Product with id "${item.productId}" not found`)
    }

    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          description: [
            product.description,
            item.size ? `Size: ${item.size}` : null,
            item.color ? `Color: ${item.color}` : null,
          ]
            .filter(Boolean)
            .join(" | "),
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: item.quantity,
    }
  })

  // Create Checkout Session with embedded mode
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    redirect_on_completion: "never",
    line_items: lineItems,
    mode: "payment",
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "GB"],
    },
  })

  return session.client_secret
}
