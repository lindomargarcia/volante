import Card from "@/components/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCatalogAPI } from "@/data/api/CatalogAPI";
import { USE_QUERY_CONFIGS } from "@/data/constants/utils";
import useDebounce from "@/hooks/useDebounce";
import { currencyFormat, isToday } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function CatalogPage() {
    const [searchValue, setSearchValue] = useDebounce({timeout: 200})
    const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['get_catalog', searchValue],
        queryFn: ({ pageParam = 1 }) => getCatalogAPI(searchValue, pageParam),
        getNextPageParam: (lastPage) => {
            const nextPage = lastPage.page + 1;
            return nextPage <= lastPage.totalPages ? nextPage : undefined;
        },
        ...USE_QUERY_CONFIGS
    });

    const catalogData = data?.pages.flatMap((page) => page.data) || [];

    return (
        <div className="flex h-full flex-col">
            <h1 className="text-xl font-bold">Meu Catálogo</h1>
            <div className='flex my-4'>
                <Input type="text"  className="flex-1 p-6" placeholder="Pesquise suas peças e serviços aqui..." onChange={(e) => {setSearchValue(e.target.value)}}/>
            </div>
            <Card.Container>
                {catalogData.map((item: any) => (
                    <Card className="min-w-[300px]" key={item.id}>
                        {isToday(new Date(item.createdAt)) && <Card.Badge>Novo</Card.Badge>}
                        <Card.Header title={item.description} description={item.sku || 'sem código'} />
                        <Card.Content>
                            <p className="text-right font-medium">{currencyFormat(item.value, 'currency')}</p>
                        </Card.Content>
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
            </div>}
        </div>
    );
}