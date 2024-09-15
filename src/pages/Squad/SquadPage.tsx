import Card from "@/components/Card"
import SearchPage from "@/components/SearchPage"
import { getSquadAPI } from "@/data/api/SquadAPI"
import { USE_QUERY_CONFIGS } from "@/data/constants/utils"
import useDebounce from "@/hooks/useDebounce"
import { isToday } from "@/lib/utils"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Mail, Phone } from "lucide-react"


export default function SquadPage() {
  const [searchValue, setSearchValue] = useDebounce({timeout: 800})

  const {data: squad, fetchNextPage, isFetchingNextPage, hasNextPage} = useInfiniteQuery({
    queryKey: ['get_squad', {searchValue}],
    queryFn: ({pageParam = 1}) => getSquadAPI(searchValue, pageParam),
    ...USE_QUERY_CONFIGS,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.meta.page + 1;
      return nextPage <= lastPage.meta.totalPages ? nextPage : undefined;
    }
  })
  const squadData = squad?.pages.flatMap((page) => page.data) || [];

  return (
    <SearchPage>
      <SearchPage.Title>Minha Equipe</SearchPage.Title>
      <SearchPage.SearchBar placeholder="Pesquise os membros da sua equipe aqui..." onChange={(e) => {setSearchValue(e.target.value)}}/>
      <Card.Container>
        {squadData.map((squadMember: any) => (
          <Card className="min-h-[110px]" key={squadMember.id}>
            {isToday(new Date(squadMember.createdAt)) && <Card.Badge>Novo</Card.Badge>}
            <Card.Header fallback={squadMember?.name?.substring(0,1)} title={squadMember.name} description={squadMember.cpf || squadMember.phone || squadMember.email}>
              <Card.HeaderActions>
                <Card.Action icon={<Mail size={18}/>}/>
                <Card.Action icon={<Phone size={18}/>}/>
              </Card.HeaderActions>
            </Card.Header>
          </Card>
        ))}
        </Card.Container>
        <SearchPage.LoadMore visible={hasNextPage} loading={isFetchingNextPage} onClick={fetchNextPage}>Ver mais</SearchPage.LoadMore>
    </SearchPage>
  )
}
