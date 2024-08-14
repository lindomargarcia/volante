import Card from "@/components/Card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getSquadAPI } from "@/data/api/SquadAPI"
import { USE_QUERY_CONFIGS } from "@/data/constants/utils"
import useDebounce from "@/hooks/useDebounce"
import { isToday } from "@/lib/utils"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Mail, Phone } from "lucide-react"


export default function SquadPage() {
  const [searchValue, setSearchValue] = useDebounce({timeout: 200})

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
    <div className="flex flex-col h-full">
      <h1 className="text-xl font-bold">Minha Equipe</h1>
      <div className='flex my-4'>
        <Input type="text"  className="flex-1 p-6" placeholder="Pesquise os membros da sua equipe aqui..." onChange={(e) => {setSearchValue(e.target.value)}}/>
      </div>
      <Card.Container>
        {squadData.map((customer: any) => (
          <Card className="min-h-[110px]" key={customer.id}>
            {isToday(new Date(customer.createdAt)) && <Card.Badge>Novo</Card.Badge>}
            <Card.Header fallback={customer?.name?.substring(0,1)} title={customer.name} description={customer.cpf || customer.phone || customer.email}>
              <Card.HeaderActions>
                <Card.Action icon={<Mail size={18}/>}/>
                <Card.Action icon={<Phone size={18}/>}/>
              </Card.HeaderActions>
            </Card.Header>
          </Card>
        ))}
        </Card.Container>
        {hasNextPage && <div className="flex justify-center">
          <Button  
              loading={isFetchingNextPage}
              onClick={() => fetchNextPage()} 
              variant={'default'}>
              Ver mais
          </Button>
        </div>
        }
      </div>
  )
}
