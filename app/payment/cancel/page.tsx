import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function CancelRoute() {
  return (
    <section className="w-full min-h-[80vh] flex items-center justify-center">
      <Card className="w-[450px] h-[300px]">
        <div className="w-full flex justify-center">
          <XCircle
            className=" w-[4rem] h-[4rem]
          mt-5 -mb-2 rounded-full bg-red-50/30 text-red-500 p-2"
          />
        </div>
        <div className=" mt-3 text-center sm:mt-5 w-full">
          <h3 className=" text-lg leading-6 font-medium">Payment Cancelled</h3>
          <p className="mt-2 tex-sm text-muted-foreground">
            Something went wrong, you havent been charged.
          </p>
          <p className="mt-2 tex-sm text-muted-foreground">Please try again.</p>

          <Button className="mt-5 sm:mt-6 w-[80%]" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </Card>
    </section>
  );
}
