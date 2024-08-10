import { getAllCustomersAPI } from "@/data/api/CustomersAPI"
import { useQuery } from "@tanstack/react-query"

export default function CustomersPage() {
  const {data: customers, error} = useQuery({
    queryKey: ['get_all_customers'],
    queryFn: getAllCustomersAPI,
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
      {customers?.map((customer: any) => (
        <h1 key={customer.id}>{customer.name}</h1>
      ))}
    </div>
  )
}
