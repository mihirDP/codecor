import { BuyProduct } from "@/app/actions";
import { ProductDescription } from "@/app/components/ProductDescription";
import { BuyButton } from "@/app/components/Submitbutton";
import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { JSONContent } from "@tiptap/react";
import Image from "next/image";
async function getData(id: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: id,
    },
    select: {
      category: true,
      discription: true,
      smallDescription: true,
      name: true,
      id: true,
      images: true,
      price: true,
      createdAr: true,
      User: {
        select: {
          profileImage: true,
          firstName: true,
        },
      },
    },
  });
  return data;
}
export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);
  return (
    <>
      {/* <section className="empty max-w-7xl mx-auto px-4 lg:px-8 lg:grid lg:grid-rows-1 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16 lg:mt-40"></section> */}

      <section className=" max-w-7xl mx-auto px-4 lg:px-8 lg:grid lg:grid-rows-1 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16 ">
        <Carousel className="lg:row-end-1 lg:col-span-4">
          <CarouselContent>
            {data?.images.map((item, index) => (
              <CarouselItem key={index} className="mt-[3rem]">
                <div className="mt-48 aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden">
                  <Image
                    src={item as string}
                    alt="product images"
                    // width={2048}
                    fill
                    // height={}
                    className="object-cover  w-full h-full rounded-xl "
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-16 mt-[7rem]" />

          <CarouselNext className="mr-16 mt-[7rem]" />
        </Carousel>

        <div className="max-w-2xl mx-auto lg:max-w-none lg:row-span-2 lg:row-end-2 lg:col-span-3 lg:mt-[1.5rem]">
          <h1 className="text-3xl font-extrabold tracking-tighter text-gray-900 sm:text-3xl lg:mt-[15rem]">
            {data?.name}
          </h1>

          <p
            className="mt6 mt-2 text-muted-foreground
          "
          >
            {data?.smallDescription}
          </p>
          <form action={BuyProduct}>
            <input type="hidden" name="id" value={data?.id} />
            <BuyButton price={data?.price as number} />
          </form>

          <div className="border-t border-gray-200 mt-10 pt-10 ">
            <div className="grid grid-cols-2 w-full gap-y-3 ">
              <h3 className="text-sm font-medium text-muted-foreground col-span-1  ">
                Released:
              </h3>
              <h3 className="text-sm font-medium col-span-1 ml-auto ">
                {new Intl.DateTimeFormat("en-IN", { dateStyle: "long" }).format(
                  data?.createdAr
                )}
              </h3>
              <h3 className="text-sm font-medium text-muted-foreground   col-span-1">
                Category:
              </h3>
              <h3 className="ml-auto text-sm font-medium col-span-1 ">
                {data?.category}
              </h3>
            </div>
          </div>
          <div className="border-t border-gray-200  mt-10">
            <div className="w-full max-w-2xl mx-auto mt-16 lg:max-w-none lg:mt-0 sm:mt-10 lg:col-span-4">
              <ProductDescription
                content={data?.discription as unknown as JSONContent}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
