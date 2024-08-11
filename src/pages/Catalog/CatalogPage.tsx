import Card from "@/components/Card"
import { getCatalogAPI } from "@/data/api/CatalogAPI"
import { currencyFormat, isToday } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

export default function CatalogPage() {
    const [page, setPage] = useState(1)

    const {data, error} = useQuery({
        queryKey: ['get_catalog', page],
        queryFn: () => getCatalogAPI(page),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: 2
    })

  if(error)return (<div>Servidor nao conectado</div>)

  return (
    <Card.Container>
        {data?.rows?.map((item: any) => (
            <Card className={'min-w-[300px]'}>
                {isToday(new Date(item.createdAt)) && <Card.Badge>Novo</Card.Badge>}
                <Card.Header title={item.description} description={item.sku || 'sem código'}/>
                <Card.Content>
                    <p className="text-right font-medium">{currencyFormat(item.value, 'currency')}</p>
                </Card.Content>
            </Card>
        ))}
    </Card.Container>
  )
}
