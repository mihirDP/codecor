import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CircleCheckBig } from "lucide-react";
import Link from "next/link";

export default function ReturnUrlStripe() {
  return (
    <section className="w-full min-h-[80vh] flex items-center justify-center">
      <Card className="w-[450px] h-[300px]">
        <div className="w-full flex justify-center">
          <CircleCheckBig
            className=" w-[4rem] h-[4rem]
          mt-5 -mb-2 rounded-full bg-green-50/30 text-green-500 p-2"
          />
        </div>
        <div className=" mt-3 text-center sm:mt-5 w-full">
          <h3 className=" text-lg leading-6 font-medium">Linking Successful</h3>
          <p className="mt-2 tex-sm text-muted-foreground">
            Congratulations! Your account has been linked!!!
          </p>
          <p className="mt-2 tex-sm text-muted-foreground">
            You can now start selling your products!
          </p>

          <Button className="mt-5 m-5 sm:mt-6 w-[80%] " asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </Card>
    </section>
  );
}
