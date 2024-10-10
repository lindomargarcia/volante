import Card from "@/components/Card"
import SearchPage from "@/components/SearchPage"
import { getCustomersAPI } from "@/data/api/CustomersAPI"
import { USE_QUERY_CONFIGS } from "@/data/constants/utils"
import useDebounce from "@/hooks/useDebounce"
import { isToday } from "@/lib/utils"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Home, Mail, Phone } from "lucide-react"


export default function CustomersPage() {
  const [searchValue, setSearchValue] = useDebounce({timeout: 800})

  const {data: customers, fetchNextPage, isFetchingNextPage, hasNextPage} = useInfiniteQuery({
    queryKey: ['get_customers', {searchValue}],
    queryFn: ({pageParam = 1}) => getCustomersAPI(searchValue, pageParam),
    ...USE_QUERY_CONFIGS,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.meta.page + 1;
      return nextPage <= lastPage.meta.totalPages ? nextPage : undefined;
    }
  })
  const customersData = customers?.pages.flatMap((page) => page.data) || [];

  return (
    <SearchPage>
      <SearchPage.Title>Meus Clientes</SearchPage.Title>
      <SearchPage.SearchBar placeholder="Pesquise seus clientes aqui..." onChange={(e) => {setSearchValue(e.target.value)}}/>
      <Card.Container>
        {customersData.map((customer: any) => (
          <Card className="min-h-[110px]" key={customer.id}>
            {isToday(new Date(customer.createdAt)) && <Card.Badge>Novo</Card.Badge>}
            <Card.Header fallback={customer?.name?.substring(0,1) || '?'} title={customer.name || 'Nome não informado'} description={customer.cpf || 'CPF não informado'}>
              {/* <Card.HeaderActions>
                <Card.Action icon={<Mail size={18}/>}/>
                <Card.Action icon={<Phone size={18}/>}/>
              </Card.HeaderActions> */}
            </Card.Header>
            <Card.Content>
              <p className="flex gap-2 text-sm mb-1"><Phone size={18}/>{customer.phone || '(00) 00000000'}</p>
              <p className="flex gap-2 text-sm"><Mail size={18}/>{customer.email || 'não@informado.com'}</p>
              <p className="flex gap-2 text-sm mt-1"><Home size={18}/>{customer.address || 'não informado'}</p>
            </Card.Content>
          </Card>
        ))}
        </Card.Container>
        <SearchPage.LoadMore visible={hasNextPage} loading={isFetchingNextPage} onClick={() => fetchNextPage()} >Ver mais</SearchPage.LoadMore>
    </SearchPage>
  )
}
