/* eslint-disable @next/next/no-img-element */
"use client";
import {
  fetchProductBySlug,
  fetchProductRelatedBySlug,
} from "@/app/services/products";
import { Card } from "@/components/Card";
import { Loading } from "@/components/Loading";
import { Products } from "@/types";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductsPages() {
  const param = useParams();
  const slug = param.slug as string;
  const [products, setProducts] = useState<Products | null>(null);
  const [relatedProduct, setRelatedProduct] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async (slug: string) => {
    try {
      setLoading(true);
      const data = await fetchProductBySlug(slug);
      setProducts(data);
      console.log("product", data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRelatedProducts = async (slug: string) => {
    try {
      const data = await fetchProductRelatedBySlug(slug);
      setRelatedProduct(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!slug) return;
    Promise.all([fetchProducts(slug), fetchRelatedProducts(slug)]);
  }, [slug]);

  console.log("related", relatedProduct);
  return (
    <div className="container mx-auto">
      {loading && <Loading />}
      <h1>{products ? products.title : ""}</h1>
      <h1>{products ? products.description : ""}</h1>
      <h1>{products ? products.category.name : ""}</h1>
      <h1>{products ? `$ ${products.price}.00` : ""}</h1>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {products?.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Product Image ${index + 1}`}
            className="h-auto w-full"
          />
        ))}
      </div>
      <hr className="my-[20px] h-px border-2 bg-gray-200 dark:bg-gray-700" />
      <div className="container">
        <h1>Related Products</h1>
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {relatedProduct.map((product) => (
            <Link key={product.id} href={`/products/${product.slug}`}>
              <Card products={product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
