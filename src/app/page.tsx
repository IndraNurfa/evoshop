"use client";
import { Loading } from "@/components/Loading";
import { Navbar } from "@/components/Navbar";
import { Products } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card } from "../components/Card";

export default function Home() {
  const [products, setProducts] = useState<Products[] | null>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/products");
      console.log("🚀 ~ fetchData ~ response:", response);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const { data } = await response.json();
      setProducts(data || []);
    } catch (error) {
      console.error("Error:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="container mx-auto px-4">
        <Navbar />
        {loading ? (
          <div className="mx-auto flex h-screen content-center items-center justify-center">
            <Loading />
          </div>
        ) : (
          <>
            <h1 className="mt-25 mb-5 text-center text-4xl font-extrabold">
              RevoShop
            </h1>
            {error && <p className="text-center text-red-500">{error}</p>}
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products?.map((product) => (
                <Link href={`/products/${product.slug}`} key={product.id}>
                  <Card products={product} />
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
