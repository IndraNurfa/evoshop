import {
  fetchProductBySlug,
  fetchProductRelatedBySlug,
} from "@/app/services/products";
import { Card } from "@/components/Card";
import { Navbar } from "@/components/Navbar";
import { ProductDetail } from "@/components/ProductDetail";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  if (!product) {
    return {
      title: "Product Not Found",
      description: "This product does not exist.",
    };
  }
  return {
    title: product.title,
    description: product.description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!slug) return notFound();

  const [product, relatedProducts] = await Promise.all([
    fetchProductBySlug(slug),
    fetchProductRelatedBySlug(slug),
  ]);

  if (!product) return notFound();

  return (
    <div className="container mx-auto">
      <Navbar />

      <ProductDetail products={product} />

      <hr className="my-4 border-gray-300" />
      <h1 className="my-4 text-lg leading-tight font-extrabold md:text-xl">
        Related Products
      </h1>
      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {relatedProducts?.map((product) => (
          <Link key={product.id} href={`/products/${product.slug}`}>
            <Card products={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}
