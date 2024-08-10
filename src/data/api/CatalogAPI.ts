import { PAGE_LIMIT } from "../constants/utils";

export const getCatalogAPI = (page?: number, limit = PAGE_LIMIT) => fetch(`http://localhost:2000/catalog?page=${page}&limit=${limit}`).then(res => res.json())