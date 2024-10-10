import Link from "next/link";
import prisma from "../lib/db"; // assuming you use prisma to fetch product data
import { ProductCard } from "./ProductCard";

async function getData() {
  const data = await prisma.product.findMany({
    select: {
      price: true,
      smallDescription: true,
      category: true,
      name: true,
      id: true,
      images: true,
    },
    take: 4, // Fetch 4 latest products
    orderBy: {
      createdAr: "desc",
    },
  });
  return data;
}

export async function NewestProducts() {
  const data = await getData();

  return (
    <section className="mt-32">
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-extrabold tracking-tighter">
          Newest Products
        </h2>
        <Link
          href="#"
          className="text-sm hidden font-medium text-primary hover:text-primary/50 md:block transition-transform"
        >
          All Products <span>&rarr;</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4 gap-4">
        {data.map((product) => (
          <ProductCard
            images={product.images}
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            smallDescription={product.smallDescription as string}
            category={product.category}
          />
        ))}
      </div>
    </section>
  );
}
