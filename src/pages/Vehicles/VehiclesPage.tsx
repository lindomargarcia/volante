import { getAllVehiclesAPI } from "@/data/api/VehiclesAPI"
import { useQuery } from "@tanstack/react-query"

export default function VehiclesPage() {
  const {data: vehicles} = useQuery({
    queryKey: ['get_all_vehicles'],
    queryFn: getAllVehiclesAPI,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })

  return (
    <div>
      {vehicles?.map((vehicle: any) => (
        <h1 key={vehicle.id}>{vehicle.plate}</h1>
      ))}
    </div>
  )
}
