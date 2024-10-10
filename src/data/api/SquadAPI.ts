import { BASE_URL } from "@/routes/const";

export const getSquadAPI = (searchValue = '', page = 1) => fetch(BASE_URL + 'employees/search?searchValue=' + searchValue + '&page=' + page).then(res => res.json());