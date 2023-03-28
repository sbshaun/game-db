<script setup lang="ts">
  import {ref} from "vue";
  import {Franchise} from "~/types/types";
  import {fetchFranchiseProjection} from "~/api/FranchiseAPI";

  const franchises = ref([] as Franchise[]);
  const franchise_names = ref<string[]>(await fetchFranchiseNames());
  const columns = ref(["name", "description"]);
  const selectedColumns = ref<string[]>([]);

  const fetched = ref(false);

  async function fetchFranchiseNames(): Promise<string[]> {
    const res = await fetchFranchiseProjection(["name"])
    return res.map((franchise) => franchise.name);
  }

  async function fetchSelectedColumns() {
    if (selectedColumns.value.length > 0) {
      franchises.value = await fetchFranchiseProjection(selectedColumns.value);
    } else {
      franchises.value = [];
    }
    console.log(franchises.value);
    fetched.value = true;
  }


</script>

<template>
	<div class="franchisesContainer">
    <h1>Franchises</h1>
    <div class="projection-row">
      <div class="column-select">
        <label v-for="column in columns" :key="column"> {{ column }}
          <input
              type="checkbox"
              :value="column"
              v-model="selectedColumns"
          />
        </label>
      </div>
      <div class="select-buttons">
        <button @click="fetchSelectedColumns">Fetch Franchises</button>
      </div>
    </div>
    <table>
      <thead>
        <th v-for="column in selectedColumns" :key="column">{{ column }}</th>
      </thead>
      <tbody>
        <tr v-for="franchise in franchises" :key = "franchise.name">
          <td v-if="selectedColumns.includes('name')">{{ franchise.name }}</td>
          <td v-if="selectedColumns.includes('description')">{{ franchise.description }}</td>
        </tr>
      </tbody>
    </table>
<!--    <h3>Characters In All</h3>-->
<!--    <div class="franchise-dropdown">-->
<!--    </div>-->
  </div>
</template>

<style scoped>

.franchisesContainer {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;
  box-sizing: border-box;
}

.projection-row {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.select-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

h1 {
  text-align: center;
}

h3 {
  text-align: center;
  padding-top: 50px;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.column-select {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.column-select label {
  cursor: pointer;
}

table {
  width: 100%;
  margin-left: -10%;
  border-collapse: collapse;
}

th, td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #ccc;
  word-wrap: break-word;
  max-height: 150px;
  overflow-y: auto;
}

th {
  font-weight: bold;
  color: #2c3e50;
}

</style>
