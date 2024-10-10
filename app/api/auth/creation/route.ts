import prisma from "@/app/lib/db";
import { stripe } from "@/app/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user === null || !user.id) {
    throw new Error("Something went wrong...");
  }

  // Find user in the database
  let dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  // If the user doesn't exist, create a new one
  if (!dbUser) {
    const account = await stripe.accounts.create({
      email: user.email as string,
      controller: {
        losses: {
          payments: "application",
        },
        fees: {
          payer: "application",
        },
        stripe_dashboard: {
          type: "express",
        },
      },
    });

    // const profileImage =
    // user.picture ??
    // `https://avatar.vercel.sh/${user.given_name}.svg?text=${user.given_name}`;

    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        firstName: user.given_name ?? "", // Fixed typo
        lastName: user.family_name ?? "",
        email: user.email ?? "",
        profileImage:
          user.picture ??
          `https://avatar.vercel.sh/${user.given_name}.svg?text=${user.given_name}`,
        connectedAccount: account.id,
      },
    });
  }

  // Redirect to the homepage
  return NextResponse.redirect(new URL("/", "http://localhost:3000"));
}
