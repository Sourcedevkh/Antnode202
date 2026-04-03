<template>
  <div class="home">
    <h1>Products</h1>
    <table border="1" cellpadding="8" cellspacing="0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in crudStore.products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>${{ product.price }}</td>
          <td>{{ product.description }}</td>
          <td>
            <button @click="selectForEdit(product)">Update</button>
            <button @click="handleDelete(product.id)" style="margin-left:8px; background-color:#ef4444;">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <hr>
    <br>
    <!-- Edit Form -->
    <div v-if="editingId !== null">
      <h2>Edit Product</h2>
      <form @submit.prevent="handleUpdate" style="margin-bottom: 16px;">
        <input v-model="editForm.name" placeholder="Name" required /><br>
        <input v-model="editForm.price" placeholder="Price" type="number" step="0.01" required /><br>
        <input v-model="editForm.description" placeholder="Description" required /><br>
        <button type="submit">Save Update</button>
        <button type="button" @click="cancelEdit" style="margin-left:8px; background-color:#64748b;">Cancel</button>
      </form>
    </div>

    <!-- Create Form -->
     <h2>Create Product</h2>
    <form @submit.prevent="handleCreate" style="margin-bottom: 16px;">
      <input v-model="form.name" placeholder="Name" required /><br>
      <input v-model="form.price" placeholder="Price" type="number" step="0.01" required /><br>
      <input v-model="form.description" placeholder="Description" required /><br>
      <button type="submit">Add Product</button>
    </form>
  </div>
</template>

<script setup>
import { useCrudStore } from '@/stores/Crud';
import { onMounted, reactive, ref } from 'vue';

const crudStore = useCrudStore();
const form = reactive({ name: '', price: '', description: '' });

const editingId = ref(null);
const editForm = reactive({ name: '', price: '', description: '' });

onMounted(() => {
  crudStore.getProducts();
});

const selectForEdit = (product) => {
  editingId.value = product.id;
  editForm.name = product.name;
  editForm.price = product.price;
  editForm.description = product.description;
};

const cancelEdit = () => {
  editingId.value = null;
};

const handleUpdate = async () => {
  await crudStore.updateProduct(editingId.value, editForm);
  editingId.value = null;
};

const handleDelete = async (id) => {
  const confirmed = window.confirm('Are you sure you want to delete this product?');
  if (!confirmed) return;
  await crudStore.deleteProduct(id);
  if (editingId.value === id) {
    editingId.value = null;
  }
};

const handleCreate = () => {
  crudStore.createProduct({ ...form, price: Number(form.price) });
  form.name = '';
  form.price = '';
  form.description = '';
};

</script>

<style scoped>
.home {
  padding: 40px;
  max-width: 900px;
  margin: 0 auto;
  font-family: 'Inter', system-ui, sans-serif;
  color: #334155;
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 24px;
}

/* Table Styling */
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  border: 1px solid #e2e8f0;
  margin-bottom: 40px;
}

th {
  background-color: #f8fafc;
  padding: 16px;
  text-align: left;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 2px solid #e2e8f0;
}

td {
  padding: 16px;
  border-bottom: 1px solid #e2e8f0;
  font-size: 0.95rem;
}

tr:last-child td {
  border-bottom: none;
}

tr:hover {
  background-color: #f1f5f9;
}

/* Form Styling */
form {
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
}

input {
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-size: 1rem;
  transition: border-color 0.2s;
}

input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

button {
  background-color: #3b82f6;
  color: white;
  padding: 12px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background-color: #2563eb;
}
</style>
