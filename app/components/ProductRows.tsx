import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "../lib/db";
import { LoadingProductCard, ProductCard } from "./ProductCard";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface iAppProps {
  category: "newest" | "template" | "ui" | "icons" | "fonts";
}

async function getData({ category }: iAppProps) {
  switch (category) {
    case "icons": {
      const data = await prisma.product.findMany({
        where: {
          category: "icons",
        },
        select: {
          price: true,
          name: true,
          smallDescription: true,
          id: true,
          images: true,
          category: true,
        },
        take: 3,
      });
      return {
        data: data,
        title: "Icons",
        link: "/products/icons",
      };
    }

    case "newest": {
      const data = await prisma.product.findMany({
        select: {
          price: true,
          name: true,
          smallDescription: true,
          id: true,
          images: true,
          category: true,
        },
        orderBy: {
          createdAr: "desc",
        },
        take: 3,
      });

      return {
        data: data,
        title: "Newest Products",
        link: "/products/all",
      };
    }
    case "template": {
      const data = await prisma.product.findMany({
        where: {
          category: "template",
        },
        select: {
          id: true,
          name: true,
          price: true,
          smallDescription: true,
          images: true,
        },
        take: 3,
      });

      return {
        title: "Templates",
        data: data,
        link: "/products/template",
      };
    }
    case "ui": {
      const data = await prisma.product.findMany({
        where: {
          category: "ui",
        },
        select: {
          id: true,
          name: true,
          price: true,
          smallDescription: true,
          images: true,
        },
        take: 3,
      });
      return {
        title: "UI",
        data: data,
        link: "/products/ui",
      };
    }
    case "fonts": {
      const data = await prisma.product.findMany({
        where: {
          category: "fonts",
        },
        select: {
          id: true,
          name: true,
          price: true,
          smallDescription: true,
          images: true,
          category: true,
        },
        take: 3,
      });
      return {
        title: "Fonts",
        data: data,
        link: "/products/fonts",
      };
    }
    default: {
      return notFound();
    }
  }
}
export function ProductRow({ category }: iAppProps) {
  return (
    <>
      <section className="mt-32">
        <Suspense fallback={<LoadingState />}>
          <LoadRows category={category} />
        </Suspense>
      </section>
    </>
  );
}

async function LoadRows({ category }: iAppProps) {
  const data = await getData({ category: category });
  return (
    <>
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-extrabold tracking-tighter">
          {data.title}
        </h2>
        <Link
          href={data.link}
          className="text-sm hidden font-medium text-primary hover:text-primary/50 md:block transition-transform"
        >
          All Products <span>&rarr;</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4 gap-4">
        {data.data.map((product) => (
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
    </>
  );
}

function LoadingState() {
  return (
    <div>
      <Skeleton className="h-8 w-56" />
      <div className=" grid grid-cols-1 sm:grid-cols-2 m-4 gap-10 lg:grid-cols-3">
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
      </div>
    </div>
  );
}
