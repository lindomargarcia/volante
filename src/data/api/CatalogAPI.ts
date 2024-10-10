import { BASE_URL } from "@/routes/const";

export const getCatalogAPI = (searchValue = '', page = 1) => fetch(`${BASE_URL}catalog/search?page=${page}&searchValue=${searchValue}`).then(res => res.json())