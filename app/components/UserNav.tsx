import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";

interface iAppProps {
  email: string;
  name: string;
  userImage: string | undefined;
}
export function UserNav({ email, name, userImage }: iAppProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-12 h-12 rounded-full bg-black">
          <Avatar className="text-white">
            <AvatarImage
              src={userImage}
              alt="User Image"
              className="scale-[3.5] rounded-full "
            />
            <AvatarFallback className="align-middle flex flex-col bottom-5 ">
              {name.slice(1, 5)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/my-products">My Products</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/sell">Sell Product</Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link href={"/settings"}>Settings</Link>{" "}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link href="https://github.com/mihirDP/codecor.git">GitHub</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={"/billing"}>Billing</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <LogoutLink>Log Out</LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
