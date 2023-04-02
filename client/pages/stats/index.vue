<script setup lang="ts" xmlns="http://www.w3.org/1999/html">

import {ref} from "vue";
import {AggregationGroup} from "~/types/types";
import {fetchCountByGroup, fetchExtremaByGroup, fetchMeasureOfSalesPerGroup} from "~/api/StatsAPI";

enum Menu {
  MEASURE, COUNT, EXTREMA
}


const currentMenu = ref<Menu>(Menu.MEASURE)

const groups = ["Franchise", "Rating", "Genre"];
const measurements = new Map<string, string>([["Total Sales", "sum"], ["Average Sales", "avg"]])
const selectedGroup = ref<string>("Select Group");
const selectedMeasure = ref<string>("Select Measure");
const selectedOperator = ref<string>("Select Operator");
const selectedExtrema = ref<string>("Select Extrema");
const aggregations = ref<AggregationGroup[]>([]);
const countInput = ref<string>("");

const tableVisible = ref<boolean>(false);
const warningVisible = ref<boolean>(false);

const operators = new Map<string, string>([
    ["GREATER THAN", ">"],
    ["LESS THAN", "<"],
    ["EQUAL TO", "="],
    ["NOT EQUAL TO", "!="]
])

  function changeMenu(menu: Menu) {
    currentMenu.value = menu;
  }

  async function getSalesByGroup() {
    if (selectedGroup.value !== "Select Group" && selectedMeasure.value !== "Select Measure") {
      const measure: string = measurements.get(selectedMeasure.value);
      aggregations.value = await fetchMeasureOfSalesPerGroup(selectedGroup.value, measure);
      warningVisible.value = false;
      tableVisible.value = true;
    } else {
      aggregations.value = [];
      warningVisible.value = true;
      tableVisible.value = false;
    }
  }

  async function findExtremaByGroup() {
    if (selectedGroup.value !== "Select Group" &&
        selectedMeasure.value !== "Select Measure" && selectedExtrema.value !== "Select Extrema") {
      aggregations.value = await fetchExtremaByGroup(
          selectedGroup.value, measurements.get(selectedMeasure.value), selectedExtrema.value)
      warningVisible.value = false;
      tableVisible.value = true;
    } else {
      aggregations.value = [];
      warningVisible.value = true;
      tableVisible.value = false;
    }
  }

  async function countVideoGamesByGroup() {
    let validCount;
    let count;
    try {
      count = parseInt(countInput.value)
      validCount = !isNaN(count);
    } catch (e) {
      validCount = false;
    }
    if (validCount && selectedGroup.value !== "Select Group" && selectedOperator.value !== "Select Operator") {
      aggregations.value = await fetchCountByGroup(selectedGroup.value, operators.get(selectedOperator.value), count)
      warningVisible.value = false;
      tableVisible.value = true;
    } else {
      warningVisible.value = true;
      tableVisible.value = false;
    }
  }


</script>

<template>
	<div class="statsContainer">
    <h1>Stats</h1>
    <div class="menu">
      <ul @click="warningVisible=false; tableVisible=false;">
        <li @click="changeMenu(Menu.MEASURE)" :class="{active: currentMenu===Menu.MEASURE}">Measure Sales</li>
        <li @click="changeMenu(Menu.COUNT)" :class="{active: currentMenu===Menu.COUNT}">Count Groups</li>
        <li @click="changeMenu(Menu.EXTREMA)" :class="{active: currentMenu===Menu.EXTREMA}">Sales Extrema</li>
      </ul>
    </div>

    <div class="aggregation-tab" v-if="currentMenu===Menu.MEASURE">
      <h3>Measure Sales</h3>
      <select class="dropdown-menu" v-model="selectedGroup" @change="tableVisible = false">
        <option selected="selected">Select Group</option>
        <option v-for="group in groups">{{ group }}</option>
      </select>
      <select v-model="selectedMeasure" @change="tableVisible=false">
        <option selected="selected">Select Measure</option>
        <option v-for="measure in measurements.keys()">{{ measure }}</option>
      </select>
      <input type="submit" class="submitbtn" value="Query" @click="getSalesByGroup">
      <table v-if="tableVisible">
        <tr>
          <th>{{ selectedGroup }}</th>
          <th>{{ selectedMeasure }} ($)</th>
        </tr>
        <tbody>
        <tr v-for="aggregation in aggregations" :key="aggregation.category">
          <td>{{ aggregation.category }}</td>
          <td>{{ aggregation.result }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="aggregation-tab" v-if="currentMenu===Menu.COUNT">
      <h3>Count Number of Video Games Per Group</h3>
      Video Games By
      <select class="dropdown-menu" v-model="selectedGroup" @change="tableVisible = false">
        <option selected="selected">Select Group</option>
        <option v-for="group in groups">{{ group }}</option>
      </select>
      With Count
      <select v-model="selectedOperator" @change="tableVisible=false">
        <option selected="selected">Select Operator</option>
        <option v-for="op in operators.keys()">{{ op }}</option>
      </select>
      <input type="text" class="text-input" v-model="countInput">
      <input type="submit" class="submitbtn" value="Query" @click="countVideoGamesByGroup">
      <table v-if="tableVisible">
        <tr>
          <th>{{ selectedGroup }}</th>
          <th>Count</th>
        </tr>
        <tbody>
        <tr v-for="aggregation in aggregations" :key="aggregation.category">
          <td>{{ aggregation.category }}</td>
          <td>{{ aggregation.result }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="aggregation-tab" v-if="currentMenu===Menu.EXTREMA">
      <h3>Find Max/Min Sales</h3>
      <select class="dropdown-menu" v-model="selectedGroup" @change="tableVisible=false">
        <option selected="selected">Select Group</option>
        <option v-for="group in groups">{{ group }}</option>
      </select>
      <select v-model="selectedMeasure" @change="tableVisible=false">
        <option selected="selected">Select Measure</option>
        <option v-for="measure in measurements.keys()">{{ measure }}</option>
      </select>
      <select v-model="selectedExtrema" @change="tableVisible=false">
        <option selected="selected">Select Extrema</option>
        <option>MAX</option>
        <option>MIN</option>
      </select>
      <input class="submitbtn" type="submit" value="Query" @click="findExtremaByGroup">
      <table  v-if="tableVisible">
        <tr>
          <th>{{ selectedGroup }}</th>
          <th> {{ selectedExtrema }} {{ selectedMeasure }} ($)</th>
        </tr>
        <tbody>
        <tr v-for="aggregation in aggregations" :key="aggregation.category">
          <td>{{ aggregation.category }}</td>
          <td>{{ aggregation.result }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="alert" v-if="warningVisible">
      <span class="closebtn" @click="warningVisible=false">&times;</span>
      <strong>Invalid input selected (っ °Д °;)っ</strong>
    </div>

  </div>
</template>

<style scoped>

.dropdown-menu {
  text-align: left;
}

.statsContainer {
  justify-content: center;
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
  border-collapse: collapse;
  text-align: center;
  margin: 0 auto;
}

.alert {
  padding: 15px;
  width: 50%;
  background-color: #f44336;
  color: white;
  margin: 0 auto;
}

.closebtn:hover {
  color: black;
}

.aggregation-tab {
  margin: 0 auto;
  text-align: center;
  padding-bottom: 10px;
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

h1 {
  text-align: center;
}

h3 {
  margin-bottom: 10px;
}

strong {
  font-weight: bold;
}

.submitbtn {
  border-radius: 10px;
  padding: 7px;
  border: none;
  background-color: aquamarine;
  text-align: center;
  cursor: pointer;
  color: black;
  font-weight: bold;
}

.text-input {
  width: 10%;
  margin-right: 10px;
  padding: 5px;
  border-radius: 4px;
  border: none;
}

.menu {
  padding-top: 30px;
  padding-bottom: 30px;
  cursor: pointer;
  margin: 0 auto;
}

.menu ul {
  list-style: none;
  text-align: center;
}

.menu li {
  color: white;
  padding: 10px;
  display: inline;
  background-color: #2c3e50;
  text-align: center;
}

.menu li:not(:last-child) {
  border-right:2px solid black;
}

.menu li:hover {
  background-color: #537596;
}

.menu li.active{
  background-color: #537596;
}


</style>
