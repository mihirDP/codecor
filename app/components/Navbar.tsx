// import "../components/Navbar.css";
import Link from "next/link";
import { NavbarLinks } from "./NavbarLinks";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./MobileMenu";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserNav } from "./UserNav";

export async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <>
      <nav className="backdrop-blur-md bg-white/30 max-w-8xl w-full flex md:grid md:grid-cols-12 items-center px-4 md:px-8 mx-auto py-7 fixed top-0 left-0 right-0   z-20">
        <div className="md:col-span-3 ">
          <Link href="/">
            <h1 className="text-2xl font-bold ">
              <span className="text-primary  font-bold">CODE</span>
              COR
            </h1>
          </Link>
        </div>
        <NavbarLinks />

        <div className="flex items-center gap-x-2 ms-auto md:col-span-3  ">
          {user ? (
            <UserNav
              email={user.email as string}
              name={user.given_name as string}
              userImage={
                user.picture ??
                `https://avatar.vercel.sh/rauchg.svg?text=${user.given_name}`
              }
            />
          ) : (
            <div className="flex items-center gap-x-2">
              <Button asChild>
                <LoginLink>Login</LoginLink>
              </Button>
              <Button variant="secondary" asChild>
                <RegisterLink>Register</RegisterLink>
              </Button>
            </div>
          )}

          <div className="md:hidden">
            <MobileMenu />
          </div>
        </div>
      </nav>
    </>
  );
}
