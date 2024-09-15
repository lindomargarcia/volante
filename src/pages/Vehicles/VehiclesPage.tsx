import Card from "@/components/Card"
import SearchPage from "@/components/SearchPage"
import { getVehiclesAPI } from "@/data/api/VehiclesAPI"
import { USE_QUERY_CONFIGS } from "@/data/constants/utils"
import useDebounce from "@/hooks/useDebounce"
import { isToday } from "@/lib/utils"
import { useInfiniteQuery } from "@tanstack/react-query"

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
              title={vehicle.brand + ' ' + vehicle.model + ' ' + vehicle.year}
              description={String(vehicle.plate).toUpperCase()}
              fallback={vehicle?.brand?.substring(0,1)}
            />
            {isToday(new Date(vehicle.createdAt)) && <Card.Badge>Novo</Card.Badge>}
          </Card>
        ))}
      </Card.Container>
      <SearchPage.LoadMore visible={hasNextPage} loading={isFetchingNextPage} onClick={() => fetchNextPage()} >Ver mais</SearchPage.LoadMore>
    </SearchPage>
  )
}
