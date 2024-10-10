import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ProductCard } from "../components/ProductCard";
import prisma from "../lib/db";
import { Card, CardContent } from "@/components/ui/card";
import emptyList from "@/app/undraw_programming_re_kg9v.svg";
import Image from "next/image"; // Import Image component for the empty state image

async function getData(userId: string) {
  const data = await prisma.product.findMany({
    where: {
      userId: userId,
    },
    select: {
      name: true,
      images: true,
      discription: true,
      price: true,
      category: true,
      smallDescription: true,
      id: true,
    },
  });
  return data;
}

export default async function MyProductRoute() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const data = await getData(user.id);

  return (
    <>
      {/* Header Card */}
      <Card className="max-w-7xl mx-auto px-4 md:px-8 lg:mt-36 h-[6.2rem] bg-primary/10 rounded-sm grid grid-cols-5 gap-6 ">
        <div></div>
        <div></div>
        <h1 className="text-2xl font-semibold col-span-1 text-center my-auto text-gray-800">
          My Products
        </h1>
      </Card>

      {/* Product List or Empty State */}
      {data.length > 0 ? (
        <Card>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 sm:grid-cols-2 mt-4">
              {data.map((item) => (
                <ProductCard
                  key={item.id}
                  id={item.id}
                  images={item.images}
                  name={item.name}
                  price={item.price}
                  smallDescription={item.smallDescription as string}
                  category={item.category}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="max-w-7xl mx-auto mt-16 px-6 py-12 text-center">
          <CardContent className="flex flex-col items-center justify-center">
            <Image
              src={emptyList}
              alt="No Products Found"
              className="w-64 h-64 object-contain mb-6"
            />
            <h2 className="text-2xl font-semibold text-gray-500">
              No Products Found
            </h2>
            <p className="text-gray-400">
              You have not created any products yet.
            </p>
          </CardContent>
        </Card>
      )}
    </>
  );
}
