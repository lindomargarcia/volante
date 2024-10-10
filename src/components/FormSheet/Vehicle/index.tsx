import { Form } from "../../ui/form"
import { useForm } from "react-hook-form"
import { VehicleSchema, DEFAULT_VEHICLE_VALUES } from "./schema"
import { COLORS } from '@/data/constants/colors'
import { CAR_BRANDS, CAR_FUELS } from '@/data/constants/carBrands'
import { Input } from "@/components/ui/input"
import SelectOption from "@/components/ui/selectOptions"

interface IVehicleSheetsProps {
  data?: VehicleSchema,
  onSubmit: (field: string, value: string) => void,
  onDelete: () => Promise<any>
  isPending: boolean
}

export function VehicleForm({data, onSubmit}: IVehicleSheetsProps) {
  const disabled = false
  const form = useForm<VehicleSchema>({
    // resolver: zodResolver(vehicleSchema),
    defaultValues: data || DEFAULT_VEHICLE_VALUES
  })

  // const handleOnSubmit = (data: VehicleSchema) => {onSubmit(data)}

  // const handleOnDelete = () => {
  //   form.clearErrors()
  //   form.setValue('plate','')
  //   form.setValue('brand','')
  //   form.setValue('model','')
  //   form.setValue('year','')
  //   form.setValue('color','black')
  //   onDelete()
  // }

  return (
    <Form {...form}>
      <form className="grid gap-4 py-4">
        <div className="flex gap-2">
          <Input value={data?.plate || ''} disabled={disabled} label="Placa" placeholder="ABC-1D23"  className={'uppercase'} onChange={(e) => onSubmit('plate', e?.target?.value || '')}/>
          <SelectOption disabled={disabled} value={data?.brand || ''} label="Marca" placeholder="Selecione..." onChange={(value) => onSubmit('brand', value || "")} options={CAR_BRANDS} />
        </div>
        <div className="flex gap-2">
          <Input disabled={disabled} label="Modelo" value={data?.model || ''} placeholder="Digite aqui..." onChange={(e) => onSubmit('model', e?.target?.value || '')}/>
          <Input disabled={disabled} label="Ano" value={data?.year || ''} placeholder="2024" onChange={(e) => onSubmit('year', e?.target?.value || '')}/>
          <SelectOption disabled={disabled} value={data?.color || ''} label="Cor" placeholder="Selecione..." options={COLORS} onChange={(value) => onSubmit('color', value || "")}/>
        </div>
        <div className="flex gap-2">
          <Input disabled={disabled} label="Km" value={data?.km || ''} placeholder="Digite aqui..." onChange={(e) => onSubmit('km', e?.target?.value || '')}/>
          <Input disabled={disabled} label="Chassi" value={data?.chassi || ''} placeholder="Ex: 1HGCM82633A123456" onChange={(e) => onSubmit('chassi', e?.target?.value || '')}/>
          <SelectOption disabled={disabled} value={data?.fuel || ''} label="Combustível" placeholder="Selecione..." options={CAR_FUELS} onChange={(value) => onSubmit('fuel', value || "")}/>
        </div>
        {/* <SheetFooter className="mt-4 justify-between">
          {!(data?.id) && <Button type="submit" disabled={isPending}>Salvar</Button>}
          {data?.plate && <ConfirmButton
              onConfirm={() => handleOnDelete()}
              variant={"destructive"}
              disabled={isPending}
              title="Remover veículo"
              message="Deseja realmente remover o veículo desse orçamento?">
                Remover
            </ConfirmButton>}
        </SheetFooter> */}
      </form>
    </Form>
  )
}
