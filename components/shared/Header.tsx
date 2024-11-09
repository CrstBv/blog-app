import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/mode-toggle";
import { SheetSide } from "./MobileNav";
import AuthNavItems from "./NavItems";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl h-16 flex items-center">
        <div className="mr-4 hidden md:flex">
          <SignedIn>
            <nav className="flex items-center gap-6 text-sm">
              <AuthNavItems />
            </nav>
          </SignedIn>
          <SignedOut>
            <Link href="/" className="pl-9 hover:text-cyan-300">Home</Link>
          </SignedOut>
        </div>

        <div className="md:hidden">
          <SignedIn>
            <SheetSide />
          </SignedIn>
          <SignedOut>
            <Link href="/" className="px-8 hover:text-cyan-300">Home</Link>
          </SignedOut>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2 md:justify-end">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Button asChild variant="ghost" className="rounded-lg" size="sm">
              <Link href="/sign-in">LogIn</Link>
            </Button>
          </SignedOut>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
