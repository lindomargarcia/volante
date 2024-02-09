import carServices from './services.json'

export const getCarServicesAPI = async () => {
    return new Promise((resolve) => {
        resolve(carServices)
    })
}