import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";

interface iAppProps {
  images: string[];
  name: string;
  price: number;
  smallDescription: string;
  id: string;
  category: string;
}
export function ProductCard({
  images,
  id,
  price,
  category,
  smallDescription,
  // category,
  name,
}: iAppProps) {
  return (
    <div className="rounded-lg bg-gray-200 px-4 py-4 shadow-none  hover:scale-[101%] transition-all">
      <Carousel className="w-full mx-auto ">
        <CarouselContent>
          {images.map((item, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[230px]">
                <Image
                  alt="Product image"
                  src={item}
                  className="w-full h-full rounded-lg object-cover "
                  fill
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-16 " />
        <CarouselNext className="mr-16" />
      </Carousel>

      {/*  */}
      <div className="flex justify-between items-center mt-2 ">
        <h1 className="font-semibold text-xl ">{name}</h1>
        <h1 className="inline-flex items-center rounded-md bg-secondary/50 px-2 py-[5px] ml-[.4rem] mr-[.1rem] text-xs font-medium text-slate-500 ring-1 ring-inset ring-primary/10 ">
          {category}
        </h1>
        <h3 className="inline-flex items-center rounded-md bg-primary/30 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/10">
          ₹{price}
        </h3>
      </div>
      <p className="text-gray-600 text-sm  line-clamp-2 normal-case mt-6">
        {smallDescription}
      </p>

      <Button asChild className="w-full mt-5 hover:scale-[101%] transition-all">
        <Link href={`/product/${id}`}>Learn more</Link>
      </Button>
    </div>
  );
}

export function LoadingProductCard() {
  return (
    <div className="flex flex-col">
      <Skeleton className="w-full h-[230px]" />
      <div className="flex flex-col mt-2 gap-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
      <Skeleton className="h-10 mt-5 w-full" />
    </div>
  );
}
