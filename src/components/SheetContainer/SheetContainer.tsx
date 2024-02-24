import { Sheet,SheetContent,SheetDescription,SheetHeader,SheetTitle,SheetTrigger } from "@/components/ui/sheet"

interface SheetContainerProps {
  title: string,
  description: string,
  icon: React.ReactElement,
  trigger: React.ReactElement,
  children: React.ReactElement,
  isOpen?: boolean,
  side?: 'right' | 'left'
  onIsOpenChange: (state: boolean) => void
}

export function SheetContainer({title, description, icon, side = 'left', trigger, isOpen, onIsOpenChange,  children}: SheetContainerProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onIsOpenChange}>
      <SheetTrigger className="flex-1"  onClick={() => onIsOpenChange(true)}>
        {trigger}
      </SheetTrigger>
      <SheetContent side={side}>
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