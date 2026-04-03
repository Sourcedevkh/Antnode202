import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/api/api'

export const fetchApiStore = defineStore('fetchApi', () => {
    const getData = ref([])


    const fetchApi = async () => {
        try {
            const res = await api.get('/')
            getData.value = res.data.data;
        } catch (error) {
            console.error('Error fetch data api');
        }
    }

    return {
        getData,
        fetchApi
    }
})
