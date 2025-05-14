/* eslint-disable @next/next/no-img-element */
import { Products } from "../types/index";

interface CardProps {
  products: Products;
}

export function Card({ products }: CardProps) {
  const pricePerUnit = products.price;
  const formatPrice = (num: number) => {
    return "$ " + num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="group hover:shadow-3xl min-h-[500px] overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-300 hover:ring-2 hover:ring-lime-400 sm:min-h-[400px] md:min-h-[450px] lg:min-h-[500px]">
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
            {formatPrice(pricePerUnit)}
          </span>
          {/* <div className="right-0 bottom-0 left-0 mt-3">
            <button className="mb-2 block w-full rounded-full bg-green-300 px-4 py-2 text-black sm:py-1 md:py-2 lg:py-3">
              Masukkan Keranjang
            </button>
            <button className="block w-full rounded-full bg-blue-300 px-4 py-2 text-black sm:py-1 md:py-2 lg:py-3">
              Detail Produk
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
