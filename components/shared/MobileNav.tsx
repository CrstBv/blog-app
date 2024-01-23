"use client"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


export function SheetSide() {
  return (
    <div className="grid grid-cols-2 gap-2 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open</Button>
          </SheetTrigger>
          <SheetContent side="left">
              <a className="flex items-center" href="/">
                <span className="font-bold">Home</span>
              </a>
            <div className="grid gap-4 py-4">
            </div>
            <SheetFooter>
            </SheetFooter>
          </SheetContent>
        </Sheet>
    </div>
  )
}
