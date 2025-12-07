import { ProductDetailClient } from "./product-detail-client"
import { products } from "@/data/products"
import { notFound } from "next/navigation"

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const productId = resolvedParams.id

  const product = products.find((p) => p.id === productId)

  if (!product) {
    notFound()
  }

  // Get related products from same category, excluding current product
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />
}
