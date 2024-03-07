import { ChangeEvent, useRef, useState } from "react";
import { Input } from "./input";
import { Label } from "./label";
import { FilePlus2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./button";

interface FileSelectProps {
    label: string
}
 
const FileSelect = ({label}: FileSelectProps) => {
    const [fileList, setFileList] = useState<any>([])
    const fileInput = useRef<any>()

    const onInputChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        const newFiles = Object.values(e.target?.files || {})
        const allFiles = [...fileList, ...newFiles]

        if(allFiles.length > 12){
            toast.error('Máximo de 12 arquivos.')
        }else{
            setFileList(allFiles)
        }
    }

    const onCleanHandle = (e:any) => {
        e.preventDefault()
        setFileList([])
    }

    const dispatchClick = (e: any) => {
        e.preventDefault()
        fileInput.current.click()
    }
    return ( 
        <span>
            <Label htmlFor="file" className="font-bold">{label} <span className="text-muted-foreground">{`${fileList.length}/12`}</span></Label>
            <Input ref={e => fileInput.current = e} className="hidden" id="file" type="file" multiple onChange={e => onInputChangeHandle(e)} accept=".png,.jpeg"/>
            <span className="flex flex-wrap gap-2 mt-2">
                {fileList && fileList.map((file:any) => {
                    return (
                        <img key={file.name} src={URL.createObjectURL(file)} className="w-[86px] h-[86px] border object-cover rounded-lg hover:scale-95"/>
                    )
                })}
                <button onClick={dispatchClick} className="w-[86px] h-[86px] border-dashed hover:border-[--theme-highlight] hover:text-[--theme-highlight] flex items-center justify-center border object-cover rounded-lg border-zinc-400 text-zinc-400">
                    <FilePlus2 size={21}/>
                </button>
            </span>
            <Button onClick={onCleanHandle} size={"sm"} variant={"outline"} className="mt-3">Limpar</Button>
        </span>
    );
}
 
export default FileSelect;