import { HeroSection } from "@/components/hero-section"
import { CategoryTiles } from "@/components/category-tiles"
import { FeaturedProducts } from "@/components/featured-products"
import { ProductCarousel } from "@/components/product-carousel"
import { PromoBanner } from "@/components/promo-banner"

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <CategoryTiles />
      <FeaturedProducts />
      <ProductCarousel />
      <PromoBanner />
    </main>
  )
}
