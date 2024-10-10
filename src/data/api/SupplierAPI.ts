import { BASE_URL } from "@/routes/const";

export const getSupplierAPI = (searchValue = '', page = 1) => fetch(BASE_URL + 'suppliers/search?searchValue=' + searchValue + '&page=' + page).then(res => res.json());