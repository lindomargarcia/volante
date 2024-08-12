import Card from "@/components/Card"
import { getAllCustomersAPI } from "@/data/api/CustomersAPI"
import { isToday } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { Mail, Phone } from "lucide-react"

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
    <div className="flex h-full">
      <Card.Container>
        {customers?.map((customer: any) => (
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
      </div>
  )
}
