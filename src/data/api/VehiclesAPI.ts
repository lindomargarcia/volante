import { BASE_URL } from "@/routes/const";

export const getVehiclesAPI = (searchValue = '', page = 1) => fetch(BASE_URL + 'vehicles/search?page=' + page + '&searchValue=' + searchValue).then(res => res.json())