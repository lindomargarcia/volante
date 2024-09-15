import Card from "@/components/Card";
import CarServiceSelector from "@/components/CarPartsSelector";
import { DEFAULT_SELECTION } from "@/components/CarPartsSelector/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone } from "lucide-react";
import customerIcon from '../../assets/customer-icon.png'
export default function ServiceOrderPage() {
  return (
    <div>
        <header className="flex gap-8 flex-1">
            <div className="flex items-center">
                <Avatar className="w-[60px] h-[60px]">
                    <AvatarImage src={customerIcon}></AvatarImage>
                </Avatar>
                <div className="items-center justify-center">
                    <p className="text-lg font-bold">Thailon Lucas Silva Garcia Cardoso</p>
                    <p>422.092.308-02</p>
                </div>
            </div>
            <div className="flex items-center">
                <Avatar className="w-[60px] h-[60px]">
                    <AvatarImage src={customerIcon}></AvatarImage>
                </Avatar>
                <div className="items-center justify-center">
                    <p className="text-lg font-bold">Thailon Lucas Silva Garcia Cardoso</p>
                    <p>422.092.308-02</p>
                </div>
            </div>
        </header>
        <CarServiceSelector color='#00ff00' value={DEFAULT_SELECTION} onChange={() => {}}/>
    </div>
  )
}
