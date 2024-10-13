import { VehicleSchema } from "./schema"
import { COLORS } from '@/data/constants/colors'
import { CAR_BRANDS, CAR_FUELS } from '@/data/constants/carBrands'
import { Input } from "@/components/ui/input"
import SelectOption from "@/components/ui/selectOptions"
import { useEffect, useState } from "react"

interface IVehicleSheetsProps {
  data?: VehicleSchema,
  onSubmit: (field: string, value: string) => void,
  onDelete: () => Promise<any>
  isPending: boolean
}

export function VehicleForm({data, onSubmit}: IVehicleSheetsProps) {
  const disabled = false
  const [plate, setPlate] = useState(data?.plate || '')
  const [model, setModel] = useState(data?.model || '')
  const [year, setYear] = useState(data?.year || '')
  const [km, setKm] = useState(data?.km || '')
  const [chassi, setChassi] = useState(data?.chassi || '')
  const OPTION_COLORS = COLORS

  const queryParams = new URLSearchParams(location.search);
  const editMode = queryParams.get('edit');

  useEffect(() => {
    if(!editMode){
      setPlate('')
      setModel('')
      setYear('')
      setKm('')
      setChassi('')
    }
  }, [])

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
    <>
      <div className="grid gap-4 py-4">
        <div className="flex gap-2">
          <Input value={plate || ''} disabled={disabled} label="Placa" placeholder="ABC-1D23"  className={'uppercase'} onChange={(e) => setPlate(e.target.value || '')} onBlur={() => onSubmit('plate', plate)}/>
          <SelectOption disabled={disabled} value={data?.brand || ''} label="Marca" placeholder="Selecione..." onChange={(value) => onSubmit('brand', value || "")} options={CAR_BRANDS} />
        </div>
        <div className="flex gap-2">
          <Input disabled={disabled} label="Modelo" value={model || ''} placeholder="Digite aqui..." onChange={(e) => setModel(e.target.value || '')} onBlur={() => onSubmit('model', model)}/>
          <Input disabled={disabled} label="Ano" value={year || ''} placeholder="2024" onChange={(e) => setYear(e.target.value || '')} onBlur={() => onSubmit('year', year)}/>
          <SelectOption disabled={disabled} value={data?.color || ''} label="Cor" placeholder="Selecione..." options={OPTION_COLORS} onChange={(value) => onSubmit('color', value || "")}/>
        </div>
        <div className="flex gap-2">
          <Input disabled={disabled} label="Km" value={km || ''} placeholder="Digite aqui..." onChange={(e) => setKm(e.target.value || '')} onBlur={() => onSubmit('km', km)}/>
          <Input disabled={disabled} label="Chassi" value={chassi || ''} placeholder="Ex: 1HGCM82633A123456" onChange={(e) => setChassi(e.target.value || '')} onBlur={() => onSubmit('chassi', chassi)}/>
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
      </div>
    </>
  )
}
