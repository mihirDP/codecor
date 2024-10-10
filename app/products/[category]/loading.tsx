import { LoadingProductCard } from "@/app/components/ProductCard";

export default function LoadingFile() {
  return (
    <>
      <div
        className="max-w7xl mx-auto ox4
     md:px-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:grid-cols-3 mt-4">
          <LoadingProductCard />
          <LoadingProductCard />
          <LoadingProductCard />
          <LoadingProductCard />
          <LoadingProductCard />
          <LoadingProductCard />
          <LoadingProductCard />
          <LoadingProductCard />
          <LoadingProductCard />
          <LoadingProductCard />
          <LoadingProductCard />
          <LoadingProductCard />
          <LoadingProductCard />
          <LoadingProductCard />
          <LoadingProductCard />
        </div>
      </div>
    </>
  );
}
