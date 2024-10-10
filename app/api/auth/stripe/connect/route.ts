import prisma from "@/app/lib/db";
import { stripe } from "@/app/lib/stripe";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const body = await req.text();

  const signature = headers().get("Stripe-Signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_CONNECT_WEBHOOK_SECRET as string
    );
  } catch (error: unknown) {
    // You can log the error if needed
    console.error("Webhook error:", error); // Log the error for debugging
    return new Response("Webhook error", { status: 400 });
  }

  switch (event.type) {
    case "account.updated": {
      const account = event.data.object;

      const data = await prisma.user.update({
        where: {
          connectedAccount: account.id,
        },
        data: {
          stripeConnectedLinked:
            account.capabilities?.transfers === "pending" ||
            account.capabilities?.transfers === "inactive"
              ? false
              : true,
        },
      });

      // Use the error variable here for error handling
      if (!data) {
        return new Response("No Data Available", { status: 404 });
      } else {
        return new Response(JSON.stringify(data), { status: 200 });
      }
    }
    // Add additional cases as necessary
    default:
      return new Response("Unhandled event type", { status: 400 });
  }
}
