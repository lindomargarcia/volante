import Card from "@/components/Card"
import SearchPage from "@/components/SearchPage"
import { getVehiclesAPI } from "@/data/api/VehiclesAPI"
import { CAR_FUELS } from "@/data/constants/carBrands"
import { COLORS } from "@/data/constants/colors"
import { USE_QUERY_CONFIGS } from "@/data/constants/utils"
import useDebounce from "@/hooks/useDebounce"
import { isToday } from "@/lib/utils"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Fuel, Palette } from "lucide-react"

export default function VehiclesPage() {
  const [searchValue, setSearchValue] = useDebounce({timeout: 200})

  const {data: vehicles, isFetchingNextPage, hasNextPage, fetchNextPage} = useInfiniteQuery({
    queryKey: ['get_all_vehicles', {searchValue}],
    queryFn: ({pageParam = 1}) => getVehiclesAPI(searchValue, pageParam),
    ...USE_QUERY_CONFIGS,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.meta.page + 1
      return nextPage <= lastPage.meta.totalPages ? nextPage : undefined
    },
    initialPageParam: 1
  })

  const vehiclesData = vehicles?.pages.flatMap(page => page.data)  || []

  return (
    <SearchPage>
      <SearchPage.Title>Veículos cadastrados</SearchPage.Title>
      <SearchPage.SearchBar placeholder="Pesquise os veículos aqui..." onChange={(e) => {setSearchValue(e.target.value)}}/>
      <Card.Container>
        {vehiclesData?.map((vehicle: any) => (
          <Card key={vehicle.id}>
            <Card.Header
              title={(vehicle.brand || vehicle.model) ? `${vehicle.brand} ${vehicle.model}` : 'Sem Veículo'}
              description={String(vehicle.plate || 'Sem placa').toUpperCase()}
              fallback={vehicle?.brand?.substring(0,1) || vehicle?.model?.substring(0,1)}
            />
            {isToday(new Date(vehicle.createdAt)) && <Card.Badge>Novo</Card.Badge>}
            <Card.Content>
              <p className="flex gap-2 text-sm mb-1"><Palette size={18}/>{COLORS.find(i => i.value === vehicle.color)?.label || 'Cor não informada'}</p>
              <p className="flex gap-2 text-sm"><Fuel size={18}/>{CAR_FUELS.find(i => i.value === vehicle.fuel)?.label || 'Combustível não informado'}</p>
              {/* <p className="flex gap-2 text-sm mt-1"><Car size={18}/>{vehicle.chassi || 'Chassi não informado'}</p> */}
            </Card.Content>
          </Card>
        ))}
      </Card.Container>
      <SearchPage.LoadMore visible={hasNextPage} loading={isFetchingNextPage} onClick={() => fetchNextPage()} >Ver mais</SearchPage.LoadMore>
    </SearchPage>
  )
}
