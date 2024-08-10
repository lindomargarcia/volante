import { getCatalogAPI } from "@/data/api/CatalogAPI"
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
    <div>
        {data?.rows?.map((item: any) => (
            <h1 key={item.id}>{item.description}</h1>
        ))}
    </div>
  )
}
