import { Car, User } from "lucide-react";
import { VehicleSchema } from "../FormSheet/Vehicle/schema";
import DetailCard from "../ui/detailCard";
import { CustomerSchema } from "../FormSheet/Customer/schema";

function VehicleDetailCard({vehicle}: {vehicle?: VehicleSchema}) {
    const generateVehicleDescription = (vehicle?: VehicleSchema) => {
        if(vehicle?.brand && vehicle?.model){
            return `${vehicle.brand} ${vehicle.model} ${vehicle.year}`
        }else if(vehicle?.brand){
            return vehicle.brand
        }else{
            return 'Veículo'
        }
    }
    
    return (
        <DetailCard
            title={generateVehicleDescription(vehicle)}
            subtitle={vehicle?.plate.toLocaleUpperCase() || 'Clique aqui para adicionar'}
            ready={Boolean(vehicle?.plate)}
            fallback={vehicle?.brand ? vehicle?.brand.substring(0,1) : <Car size={"25px"}/>}
            className="min-w-[180px] min-h-[110px]"
        />
    )
}

function CustomerDetailCard({customer}: {customer?: CustomerSchema}) {
    return (
        <DetailCard
            title={customer?.name || "Cliente"}
            ready={Boolean(customer?.name)}
            subtitle={customer?.phone || "Clique aqui para adicionar"}
            fallback={customer?.name ? customer?.name.substring(0,1) : <User size={"25px"}/>}
            className="min-w-[180px] min-h-[110px]"
        />
    )
}

export { VehicleDetailCard, CustomerDetailCard }