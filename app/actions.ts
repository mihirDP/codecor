"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { type CategoryTypes } from "@prisma/client";
import { redirect } from "next/navigation";
import { z } from "zod";
import prisma from "./lib/db";
import { stripe } from "./lib/stripe";

export type State = {
  status: "error" | "success" | undefined;
  errors?: {
    [key: string]: string[];
  };
  message?: string | null;
};

// Schema for product validation
const productSchema = z.object({
  name: z
    .string()
    .min(3, { message: "There must be atleast 3 character length there!" }),
  category: z.string().min(1, { message: "Atleast one must be selected!" }),
  price: z.number().min(1, { message: "Price must be greater than 1 INR " }),
  smallDiscription: z
    .string()
    .min(10, { message: "Please summerize your product more" }),
  discription: z.string().min(5, { message: "Discription is required" }),
  images: z.array(z.string(), { message: "Images are required" }),
  productFile: z.string().min(10, { message: "Please upload zip file" }),
});

const userSettingsSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Minimum length of 2 is required" })
    .or(z.literal("")), // Allow an empty string if the user leaves it blank
  lastName: z
    .string()
    .min(2, { message: "Minimum length of 2 is required" })
    .or(z.literal("")), // Same for the last name
});

export async function SellProduct(prevState: unknown, formData: FormData) {
  const { getUser } = await getKindeServerSession();

  const user = await getUser(); // Ensure getUser is defined

  if (!user) {
    throw new Error("Something's not right");
  }

  const validateFields = productSchema.safeParse({
    name: formData.get("name"),
    category: formData.get("category"),
    price: Number(formData.get("price")), // Ensure price is treated as a number
    smallDiscription: formData.get("smallDiscription"),
    discription: formData.get("discription"),
    images: JSON.parse(formData.get("images") as string), // Ensure images are parsed correctly
    productFile: formData.get("productFile"),
  });

  if (!validateFields.success) {
    const state: State = {
      status: "error",
      errors: validateFields.error.flatten().fieldErrors,
      message: "Oops, I think that is a piss with your inputs.",
    };

    return state;
  }

  await prisma.product.create({
    data: {
      name: validateFields.data.name,
      category: validateFields.data.category as CategoryTypes,
      smallDescription: validateFields.data.smallDiscription,
      price: validateFields.data.price,
      images: validateFields.data.images,
      productFile: validateFields.data.productFile,
      userId: user.id,
      discription: JSON.parse(validateFields.data.discription),
    },
  });

  // If everything passes, return success
  const state: State = {
    status: "success",
    message: "Your product has been created!!",
  };

  return state;
}

export async function UpdateUserSettings(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prevState: any,
  formData: FormData
) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Somethings not right!");
  }

  const validateFields = userSettingsSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
  });

  if (!validateFields.success) {
    const state: State = {
      status: "error",
      errors: validateFields.error.flatten().fieldErrors,
      message: "Oops, I think that is a mistake with your inputs.",
    };

    return state;
  }

  const data = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      firstName: validateFields.data.firstName,
      lastName: validateFields.data.lastName,
    },
  });

  const state: State = {
    status: "success",
    message: "Setting updated",
  };

  return state;
}

export async function BuyProduct(formData: FormData) {
  const id = formData.get("id") as string;
  const data = await prisma.product.findUnique({
    where: {
      id: id,
    },
    select: {
      name: true,
      smallDescription: true,
      price: true,
      images: true,
    },
  });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "INR",
          unit_amount: Math.round(data?.price as number) * 100,
          product_data: {
            name: data?.name as string,
            description: data?.smallDescription,
            images: data.images,
          },
        },
        quantity: 1,
      },
    ],
    success_url: "http://localhost:3000/payment/success",
    cancel_url: "http://localhost:3000/payment/cancel",
  });

  return redirect(session.url as string);
}

export async function CreateStripeAccountLink() {
  const { getUser } = getKindeServerSession();

  const user = await getUser();
  if (!user) {
    throw new Error();
  }

  const data = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      connectedAccount: true,
    },
  });

  const accountLink = await stripe.accountLinks.create({
    account: data?.connectedAccount as string,
    refresh_url: `http://localhost:3000/billing`,
    return_url: `http://localhost:3000/return/${data?.connectedAccount}`,
    type: "account_onboarding",
  });

  return redirect(accountLink.url);
}
