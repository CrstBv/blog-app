import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import NavItems from "./NavItems";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/mode-toggle";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="max-w-7xl lg:mx-auto p-7 md:px-10 xl:px-0 w-full max-h-16 flex items-center justify-between">
        <Button variant="link">
          <Link href={"/"}>Header</Link>
        </Button>
        <div className="flex w-32 justify-end gap-8">
          <SignedIn>
            <NavItems />
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Button asChild variant="ghost" className="rounded-lg">
              <Link href={"/sign-in"}>LogIn</Link>
            </Button>
          </SignedOut>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
