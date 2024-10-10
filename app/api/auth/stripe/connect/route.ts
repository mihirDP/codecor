import prisma from "@/app/lib/db";
import { stripe } from "@/app/lib/stripe";
import { headers } from "next/headers";
import { toast } from "sonner";

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
    return new Response("webhook error", { status: 400 });
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
      {
        !data ? <p>No Data Available</p> : <p>{data}</p>;
      }

      break;
    }
    default: {
      console.log("Unhandled");
    }
  }
  return new Response(null, { status: 200 });
}
