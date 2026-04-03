<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { fetchApiStore } from '@/stores/fetchapi'

const store = fetchApiStore()
const { getData } = storeToRefs(store)

onMounted(() => {
	store.fetchApi()
})
</script>

<template>
	<div class="container py-4">
		<h2 class="mb-3">Products from Fake Store API</h2>

		<div class="table-responsive">
			<table class="table table-striped table-bordered align-middle">
				<thead class="table-dark">
					<tr>
						<th style="width: 110px">Image</th>
						<th>Title</th>
						<th style="width: 120px">Price</th>
						<th style="width: 140px">Category</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in getData" :key="item.id">
						<td>
							<img :src="item.image" :alt="item.title" class="img-thumbnail" style="width: 72px; height: 72px; object-fit: contain" />
						</td>
						<td>{{ item.title }}</td>
						<td>${{ item.price }}</td>
						<td>{{ item.category }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
