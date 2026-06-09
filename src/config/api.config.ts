import { ref } from "vue";

const DEFAULT_BASE_URL =
    "https://crudcrud.com/api/f82b07c8cf124e34a5906aab2a934389";

const saved = localStorage.getItem("API_BASE_URL");

export const apiConfig = {
    baseURL: ref<string>(saved || DEFAULT_BASE_URL),
};