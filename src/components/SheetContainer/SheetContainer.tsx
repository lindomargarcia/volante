import { Sheet,SheetContent,SheetDescription,SheetFooter,SheetHeader,SheetTitle,SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

interface SheetContainerProps {
  title: string,
  description: string,
  icon: React.ReactElement,
  trigger: React.ReactElement,
  children: React.ReactElement
}

export function SheetContainer({title, description,icon, trigger, children}: SheetContainerProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="flex-1"  onClick={() => setIsOpen(true)}>
        {trigger}
      </SheetTrigger>
      <SheetContent side={'left'}>
        <SheetHeader>
          <SheetTitle className="flex">{icon}{title}</SheetTitle>
          <SheetDescription>
            {description}
          </SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  )
}
