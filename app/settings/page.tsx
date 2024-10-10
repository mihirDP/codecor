import { Card } from "@/components/ui/card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { SettingsForm } from "../components/form/SettingsForm";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      firstName: true,
      id: true,
      lastName: true,
      email: true,
    },
  });
  return data;
}

export default async function SettingsPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error("Not Authorized");
  }

  const data = await getData(user.id);

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 pt-28 md:px-8">
        <Card>
          <SettingsForm
            firstName={data?.firstName as string}
            lastName={data?.lastName as string}
            email={data?.email as string}
          />
        </Card>
      </section>
    </>
  );
}
