"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import AuthNavItems from "./NavItems";

export function SheetSide() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">CBlog</Button>
        </SheetTrigger>
        <SheetContent side="left">
          <a className="flex items-center" href="/">
            <span className="font-bold">Cosmic Horizons Blog</span>
          </a>
          <div className="grid gap-4 py-4"></div>
          <AuthNavItems />
          <SheetFooter></SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
