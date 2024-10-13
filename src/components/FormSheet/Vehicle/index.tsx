import { VehicleSchema } from "./schema"
import { COLORS } from '@/data/constants/colors'
import { CAR_BRANDS, CAR_FUELS } from '@/data/constants/carBrands'
import { Input } from "@/components/ui/input"
import SelectOption from "@/components/ui/selectOptions"
import { Controller, useForm } from "react-hook-form"
import { SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

interface IVehicleSheetsProps {
  data?: VehicleSchema,
  disabled?: boolean,
  onFormSubmit?: (field: string, value: string) => void,
  onDelete: () => Promise<any>
  isPending: boolean
}

export function VehicleForm({data, onFormSubmit, disabled = false}: IVehicleSheetsProps) {
  const {  register, handleSubmit, control } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 py-4">
        <div className="flex gap-2">
          <Input {...register('plate', {required: true})} disabled={disabled} label="Placa" placeholder="ABC-1D23"  className={'uppercase'} />
          <Controller 
            name='brand'
            control={control}
            render={({field}) => (
              <SelectOption disabled={disabled} label="Marca" placeholder="Selecione..." options={CAR_BRANDS} {...field}/>
            )}  
          />
        </div>
        <div className="flex gap-2">
          <Input disabled={disabled} {...register('model')} label="Modelo" placeholder="Digite aqui..." />
          <Input disabled={disabled} {...register('year')} label="Ano" placeholder="2024"/>
          <Controller
            name="color"
            control={control}
            render={({field}) => (
              <SelectOption {...field} disabled={disabled}label="Cor" placeholder="Selecione..." options={COLORS}/>
            )}
          />
        </div>
        <div className="flex gap-2">
          <Input disabled={disabled} label="Km" {...register('km')}  placeholder="Digite aqui..."/>
          <Input disabled={disabled} label="Chassi" {...register('chassi')} placeholder="Ex: 1HGCM82633A123456" />
          <Controller
            name="fuel"
            control={control}
            render={({field}) => (
              <SelectOption {...field} disabled={disabled} label="Combustível" placeholder="Selecione..." options={CAR_FUELS} />
            )}
          />
        </div>
        <SheetFooter className="mt-4 justify-between">
          {!(data?.id) && <Button type="submit" disabled={false}>Salvar</Button>}
          {/* {data?.plate && <ConfirmButton
              onConfirm={() => handleOnDelete()}
              variant={"destructive"}
              disabled={isPending}
              title="Remover veículo"
              message="Deseja realmente remover o veículo desse orçamento?">
                Remover
            </ConfirmButton>} */}
        </SheetFooter>
      </div>
    </form>
  )
}
