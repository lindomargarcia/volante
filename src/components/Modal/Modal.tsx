import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ReactElement, useState } from "react"
 
interface ModalProps{
    title: string,
    subtitle: string,
    trigger: ReactElement,
    children: any,
    className: string,
    async?: boolean
}

export function Modal({title, subtitle, trigger, children, className, async}: ModalProps) {
  const [isOpen, setIsOpen] = useState(false)

    return (
    <Dialog onOpenChange={state => setTimeout(() => setIsOpen(state), async ? 500 : 0)}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{subtitle}</DialogDescription>
        </DialogHeader>
        <div className={`flex items-center space-x-2 ${className}`}>
          {isOpen && children}
        </div>
        {/* <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}