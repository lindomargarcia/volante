import { getAllCustomersAPI } from "@/data/api/CustomersAPI"
import { useQuery } from "@tanstack/react-query"

export default function CustomersPage() {
  const {data: customers} = useQuery({
    queryKey: ['get_all_customers'],
    queryFn: getAllCustomersAPI,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })

  return (
    <div>
      {customers?.map((customer: any) => (
        <h1 key={customer.id}>{customer.name}</h1>
      ))}
    </div>
  )
}
