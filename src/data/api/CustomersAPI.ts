import { BASE_URL } from "@/routes/const";

export const getCustomersAPI = (searchValue = '', page = 1) => fetch(BASE_URL + 'customers/search?searchValue=' + searchValue + '&page=' + page).then(res => res.json());