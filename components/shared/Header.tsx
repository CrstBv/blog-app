import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import AuthNavItems from "./NavItems";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/mode-toggle";
import { SheetSide } from "./MobileNav";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl h-16 flex items-center">
        <div className="mr-4 hidden md:flex">
          <Button variant="link">
          <Link href={"/"}>Header</Link>
        </Button>
        <SignedIn>
          <nav className="flex items-center gap-6 text-sm">
          <AuthNavItems />
        </nav>
        </SignedIn>
        </div>

        <SheetSide>
        </SheetSide>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <SignedIn>
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
