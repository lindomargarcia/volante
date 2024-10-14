const CarPlate = ({plate}: {plate: string}) => {

    if(plate){
        return (<p className="uppercase text-md border font-plateFont rounded border-blue-500 font-bold px-2 p-[3px]">{plate.substring(0,3) + '-' +  plate.substring(3,7)}</p>)
    } else{
        return (<p className="uppercase text-md border text-gray-400 font-plateFont rounded border-gray-400 font-bold px-2 pt-[3px]">sem placa</p>)
    }
    

}

export default CarPlate