/* eslint-disable @next/next/no-img-element */
import { formatPrice } from "@/utils/utils";
import { Products } from "../types/index";

interface CardProps {
  products: Products;
}

export function Card({ products }: CardProps) {
  return (
    <>
      <div
        className="group hover:shadow-3xl min-h-[500px] overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-300 hover:ring-2 hover:ring-lime-400 sm:min-h-[400px] md:min-h-[450px] lg:min-h-[500px]"
        data-testid="product-list"
      >
        <div className="relative" style={{ height: "66.666%" }}>
          <img
            src={products.images[0]}
            alt="Product"
            className="h-full min-h-[200px] w-full object-cover sm:min-h-[250px] md:min-h-[300px] lg:min-h-[369px]"
          />
        </div>
        <div className="p-4" style={{ height: "33.333%" }}>
          <h3 className="overflow-hidden text-lg font-semibold text-ellipsis whitespace-nowrap text-black group-hover:underline sm:text-base md:text-lg lg:text-xl">
            {products.title}
          </h3>
          <p className="mt-2 text-black group-hover:underline sm:text-sm md:text-base lg:text-lg">
            {products.category.name}
          </p>
          <div className="mt-4">
            <span className="mb-4 block text-xl font-bold text-black group-hover:underline sm:text-lg md:text-xl lg:text-2xl">
              {formatPrice(products.price)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
