import { getCatalogAPI } from "@/data/api/CatalogAPI"
import { useQuery } from "@tanstack/react-query"

export default function CatalogPage() {
  const {data: catalogItems, error} = useQuery({
    queryKey: ['get_catalog'],
    queryFn: getCatalogAPI,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2
  })

  if(error){
    return (
      <div>Servidor nao conectado</div>
    )
  }

  return (
    <div>
      {catalogItems?.map((item: any) => (
        <h1 key={item.id}>{item.description}</h1>
      ))}
    </div>
  )
}
