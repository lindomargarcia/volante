import Card from "@/components/Card"
import { getAllVehiclesAPI } from "@/data/api/VehiclesAPI"
import { isToday } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"

export default function VehiclesPage() {
  const {data: vehicles} = useQuery({
    queryKey: ['get_all_vehicles'],
    queryFn: getAllVehiclesAPI,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })

  return (
    <div className="flex h-full">
      <Card.Container>
        {vehicles?.map((vehicle: any) => (
          <Card className="max-w-[250px]" key={vehicle.id}>
            <Card.Header
              title={vehicle.brand + ' ' + vehicle.model + ' ' + vehicle.year}
              description={String(vehicle.plate).toUpperCase()}
              fallback={vehicle?.brand?.substring(0,1)}
            />
            {isToday(new Date(vehicle.createdAt)) && <Card.Badge>Novo</Card.Badge>}
          </Card>
        ))}
      </Card.Container>
    </div>
  )
}
