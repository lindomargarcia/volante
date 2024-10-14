import { Button } from "@/components/ui/button"
import { Input, InputProps } from "@/components/ui/input"


export default function SearchPage({children}: any) {
  return (
    <div className="flex flex-col h-full">
      {children}
    </div>
  )
}

SearchPage.Title = ({children}: {children: string}) => {
    return (
        <h1 className="text-2xl font-bold">{children}</h1>
    )
}

SearchPage.SearchBar = ({className,...props}: InputProps) => {
    return (
        <div className='flex my-4'>
            <Input type="text" className={"flex-1 p-6 " + className} {...props} />
        </div>
    )
}

interface LoadMoreProps {
    loading: boolean,
    visible: boolean,
    onClick: () => void,
    children: string
}

SearchPage.LoadMore = ({loading, visible, onClick, children}: LoadMoreProps) => {
    if(!visible){
        return null
    }
    return(
        <div className="flex justify-center">
            <Button  
                loading={loading}
                onClick={onClick} 
                variant={'default'}>
                {children}
            </Button>
        </div>
    )
}