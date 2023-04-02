<script setup lang="ts">

import {ref} from "vue";
import {fetchStudio, fetchStudioNames} from "~/api/StudioAPI";
import {DeveloperStudioCountry} from "~/types/types";

const studioNames = ref<string[]>(await fetchStudioNames());
const selectedStudioName = ref<string>("Select Studio");
const selectedStudio = ref<DeveloperStudioCountry>({
  name: "",
  website_link: null,
  description: null,
  year_established: null,
  country: null,
  country_code: null,
  phone_number: null
});

const studioInfoVisible = ref<boolean>(false);

const fetchStudioData = async () => {
  if (selectedStudioName.value !== "Select Studio") {
    selectedStudio.value = await fetchStudio(selectedStudioName.value);
    studioInfoVisible.value = true;
  } else {
    studioInfoVisible.value = false;
  }
};

</script>

<template>
	<div id="studios-container">
    <h1>Studios</h1>
    <select id="dropdown-menu" v-model="selectedStudioName" @change="fetchStudioData">
      <option>Select Studio</option>
      <option v-for="name in studioNames" :key="name"> {{ name }} </option>
    </select>
    <div v-if="studioInfoVisible">
      <h3 id="studio-name">{{ selectedStudio.name }}</h3>
      <hr>
      <div id="info-content">
        <div class="column" id="fields">
          <dl>
            <div v-if="selectedStudio.website_link">
              <dt>Website</dt>
              <dd>
                <a :href="`https://${selectedStudio.website_link}`" target="_blank">
                  {{ selectedStudio.website_link }}
                </a>
              </dd>
            </div>
            <div v-if="selectedStudio.phone_number">
              <dt>Phone</dt>
              <dd>+{{ selectedStudio.country_code }} {{ selectedStudio.phone_number }}</dd>
            </div>
            <div v-if="selectedStudio.country_code">
              <dt>Country</dt>
              <dd>{{ selectedStudio.country }}</dd>
            </div>
            <div v-if="selectedStudio.year_established">
              <dt>Established</dt>
              <dd>{{ selectedStudio.year_established }}</dd>
            </div>
          </dl>
        </div>
        <div class="column" id="description">
          <p>{{ selectedStudio.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

#studios-container {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;
  box-sizing: border-box;
}

h1 {
  text-align: center;
  margin-bottom: 1rem;
}

#dropdown-menu {
  text-align: left;
  border: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  font-weight: bold;
  border-radius: 4px;
  transition: background-color 0.3s;
  margin-bottom: 1rem;
}

#studio-name {
  margin-top: 2rem;
  margin-bottom: 0.7rem;
}

#info-content {
  margin-top: 1.5rem;
  display: table;
  width: 100%;
}

.column {
  display: table-cell;
  padding: 1rem 1.5rem 1.3rem;
}

#fields {
  width: 38%;
  background-color: #f2f2f2;
}

#description {
  vertical-align: top;
  width: 62%;
}

dt {
  font-weight: bold;
  float: left;
  width: 35%;
}

dd {
  float: left;
  width: 65%;
}

</style>
