import { VehicleSchema } from "./schema"

export const generateVehicleDescription = (vehicle?: VehicleSchema) => {
    if(vehicle?.brand && vehicle?.model){
      return `${vehicle.brand} ${vehicle.model} ${vehicle.year}`
    }else if(vehicle?.brand){
      return vehicle.brand
    }else{
      return 'Veículo'
    }
  }