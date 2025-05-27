"use client";
import { Products } from "@/types";
import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import Link from "next/link";
import { fetchProducts } from "./services/products";
import { Loading } from "@/components/Loading";
import { Navbar } from "@/components/Navbar";
import { fetchUsers } from "./services/users";

export default function Home() {
  const [products, setProducts] = useState<Products[] | null>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data || []);
      setLoading(false);

      const user = await fetchUsers();
      console.table(user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="container mx-auto px-4">
        <Navbar />
        <h1 className="mt-25 mb-5 text-center text-4xl font-extrabold">
          RevoShop
        </h1>
        {loading && <Loading />}
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products?.map((product) => (
            <Link href={`/products/${product.slug}`} key={product.id}>
              <Card products={product} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
