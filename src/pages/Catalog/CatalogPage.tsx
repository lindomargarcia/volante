import Card from "@/components/Card";
import { Button } from "@/components/ui/button";
import { getCatalogAPI } from "@/data/api/CatalogAPI";
import { currencyFormat, isToday } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";

export default function CatalogPage() {
    const { data, error, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['get_catalog'],
        queryFn: ({ pageParam = 1 }) => getCatalogAPI(pageParam),
        getNextPageParam: (lastPage) => {
            const nextPage = lastPage.page + 1;
            return nextPage <= lastPage.totalPages ? nextPage : undefined;
        },
        initialPageParam: 1,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: 2
    });

    if (error) return <div>Servidor não conectado</div>;

    const catalogData = data?.pages.flatMap((page) => page.rows) || [];

    return (
        <div className="flex h-full flex-col">
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
                    disabled={isLoading} 
                    onClick={() => fetchNextPage()} 
                    className="self-center" 
                    variant={'default'}>
                    {isFetchingNextPage && <Loader2Icon className="animate-spin mr-2 transition" size={18} />}
                    Carregar mais
                </Button>
            </div>}
        </div>
    );
}