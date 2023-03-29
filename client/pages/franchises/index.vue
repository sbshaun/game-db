<script setup lang="ts">
  import {ref} from "vue";
  import {Franchise, Character} from "~/types/types";
  import {fetchCharactersInEntireFranchise, fetchFranchiseProjection} from "~/api/FranchiseAPI";

  const franchises = ref<Franchise[]>([]);
  const franchiseNames = ref<string[]>(await fetchFranchiseNames());
  const franchiseColumns = ref(["name", "description"]);
  const selectedColumns = ref<string[]>([]);

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
  }

  const characters = ref<Character[]>([]);
  const characterColumns = ref<string[]>(["name", "description", "history"])
  const selectedDropdown = ref<string>("Select Franchise");

  async function fetchCharactersInAll() {
    if (selectedDropdown.value !== "Select Franchise") {
      characters.value = await fetchCharactersInEntireFranchise(selectedDropdown.value)
    }
  }

</script>

<template>
	<div class="franchisesContainer">
    <h1>Franchises</h1>
    <div class="projection-row">
      <div class="column-select">
        <label v-for="column in franchiseColumns" :key="column"> {{ column }}
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
    <h3>Characters In All</h3>
    <div class="charactersAll">
      <select class="dropdown-menu" v-model="selectedDropdown" @change="fetchCharactersInAll">
        <option selected="selected">Select Franchise</option>
        <option v-for="name in franchiseNames" :key="name"> {{ name }} </option>
      </select>
      <table>
        <thead>
          <th v-for="column in characterColumns" :key="column">{{ column }}</th>
        </thead>
        <tbody>
        <tr v-for="character in characters" :key = "character.name">
          <td>{{ character.name }}</td>
          <td>{{ character.description }}</td>
          <td>{{ character.history }}</td>
        </tr>
        </tbody>
      </table>
    </div>
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

.dropdown-menu {
  text-align: left;
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
