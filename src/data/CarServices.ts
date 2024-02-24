import carServices from '@/data/json/services.json'

export const getCarServicesAPI = async () => {
    return new Promise((resolve) => {
        resolve(carServices)
    })
}