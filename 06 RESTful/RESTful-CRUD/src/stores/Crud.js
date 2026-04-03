import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api/api'

export const useCrudStore = defineStore('crud', () => {
  const products = ref([])

  const getProducts = async ()=>{
    try {
      const res = await api.get('/products');
      products.value = res.data.data;
      console.log(products.value);
      
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const createProduct = async (productData) =>{
    try {
      const res = await api.post('/products', productData);
      products.value.push(res.data.data);
      return res.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  const updateProduct = async (id, productData) => {
    try {
      const res = await api.put('/products/' + id, productData);
      const index = products.value.findIndex(p => p.id === id);
      if (index !== -1) products.value[index] = res.data.data;
      return res.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  const deleteProduct = async (id) => {
    try {
      await api.delete('/products/' + id);
      products.value = products.value.filter(p => p.id !== id);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
  
  

  return {
    products,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
  }
})
