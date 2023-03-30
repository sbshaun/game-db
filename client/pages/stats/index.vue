<script setup lang="ts" xmlns="http://www.w3.org/1999/html">

import {ref} from "vue";
import {AggregationGroup} from "~/types/types";
import {fetchMeasureOfSalesPerGroup} from "~/api/StatsAPI";

const groups = ["Franchise", "Rating", "Genre"];
const measurements = new Map<string, string>([["Total Sales", "sum"], ["Average Sales", "avg"]])
const selectedGroup = ref<string>("Select Group");
const selectedMeasure = ref<string>("Select Measure");
const aggregations = ref<AggregationGroup[]>([]);

const tableVisible = ref<boolean>(false);
const warningVisible = ref<boolean>(false);

  async function getSalesByGroup() {
    if (validInput()) {
      const measure: string = measurements.get(selectedMeasure.value);
      aggregations.value = await fetchMeasureOfSalesPerGroup(selectedGroup.value.toLowerCase(), measure);
      warningVisible.value = false;
    } else {
      aggregations.value = [];
      warningVisible.value = true;
    }
    tableVisible.value = true;
  }

  function validInput(): boolean {
    return selectedGroup.value !== "Select Group" && selectedMeasure.value !== "Select Measure";
  }


</script>

<template>
	<div class="statsContainer">
    <h1>Stats</h1>
    <h3>Sales</h3>
    <div class="aggregation-tabs">
      <select class="dropdown-menu" v-model="selectedGroup" @change="tableVisible = false">
        <option selected="selected">Select Group</option>
        <option v-for="group in groups">{{ group }}</option>
      </select>
      <select v-model="selectedMeasure" @change="tableVisible=false">
        <option selected="selected">Select Measure</option>
        <option v-for="measure in measurements.keys()">{{ measure }}</option>
      </select>
      <input type="submit" value="Query" @click="getSalesByGroup">
      <table>
        <tr>
          <th>{{ selectedGroup }}</th>
          <th>{{ selectedMeasure }} ($)</th>
        </tr>
        <tbody v-if="tableVisible">
        <tr v-for="aggregation in aggregations" :key="aggregation.category">
          <td>{{ aggregation.category }}</td>
          <td>{{ aggregation.result }}</td>
        </tr>
        </tbody>
      </table>

      <div class="alert" v-if="warningVisible">
        <span class="closebtn" @click="warningVisible=false">&times;</span>
        <strong>Invalid input selected (っ °Д °;)っ</strong>
      </div>

    </div>
  </div>
</template>

<style scoped>

.dropdown-menu {
  text-align: left;
}

.statsContainer {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;
  box-sizing: border-box;
}

select {
  border: none;
  cursor: pointer;
  padding: 0.2rem 0.5rem;
  background-color: #007bff;
  color: #fff;
  font-weight: bold;
  border-radius: 4px;
  transition: background-color 0.3s;
  margin-right: 10px;
}

th {
  font-weight: bold;
  color: #2c3e50;
}

th, td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #ccc;
  word-wrap: break-word;
  max-height: 150px;
  overflow-y: auto;
}

table {
  width: 50%;
  /*margin-left: -10%;*/
  border-collapse: collapse;
}

.alert {
  padding: 15px;
  /*margin-left: -10%;*/
  width: 50%;
  background-color: #f44336;
  color: white;
  margin-bottom: 15px;
  align-self: flex-start;
}

.closebtn:hover {
  color: black;
}

.closebtn {
  margin-left: 15px;
  color: white;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
}

strong {
  font-weight: bold;
}

</style>
