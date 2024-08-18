import Card from "@/components/Card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getSupplierAPI } from "@/data/api/SupplierAPI"
import { USE_QUERY_CONFIGS } from "@/data/constants/utils"
import useDebounce from "@/hooks/useDebounce"
import { isToday } from "@/lib/utils"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Mail, Phone } from "lucide-react"


export default function SupplierPage() {
  const [searchValue, setSearchValue] = useDebounce({timeout: 200})

  const {data: squad, fetchNextPage, isFetchingNextPage, hasNextPage} = useInfiniteQuery({
    queryKey: ['get_supplier', {searchValue}],
    queryFn: ({pageParam = 1}) => getSupplierAPI(searchValue, pageParam),
    ...USE_QUERY_CONFIGS,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.meta.page + 1;
      return nextPage <= lastPage.meta.totalPages ? nextPage : undefined;
    }
  })
  const supplierData = squad?.pages.flatMap((page) => page.data) || [];

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-xl font-bold">Meus Fornecedores</h1>
      <div className='flex my-4'>
        <Input type="text"  className="flex-1 p-6" placeholder="Pesquise os fornecedores aqui..." onChange={(e) => {setSearchValue(e.target.value)}}/>
      </div>
      <Card.Container>
        {supplierData.map((supplier: any) => (
          <Card className="min-h-[110px]" key={supplier.id}>
            {isToday(new Date(supplier.createdAt)) && <Card.Badge>Novo</Card.Badge>}
            <Card.Header fallback={supplier?.name?.substring(0,1)} title={supplier.name} description={supplier.cnpj || supplier.phone || supplier.email}>
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
