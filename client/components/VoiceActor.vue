<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import {
	deleteVoiceActorById,
	fetchVoiceActors,
	insertVoiceActor,
	updateVoiceActorById,
} from '~~/api/voiceActorAPI';
import { VoiceActor } from '../types/types';

const biographyComputed = computed({
	get: () => selectedVoiceActor.biography || '',
	set: (value: string) => (selectedVoiceActor.biography = value || null),
});

const birthdateComputed = computed({
	get: () => selectedVoiceActor.birthdate || '',
	set: (value: string) => (selectedVoiceActor.birthdate = value || null),
});

const selectedVoiceActor = reactive<VoiceActor>({
	actor_id: 0,
	name: '',
	biography: '',
	birthdate: '',
});

const voiceActors = ref<VoiceActor[]>([]);
const formVisible = ref(false);
const formMode = ref('add');

onMounted(async () => {
	let allVoiceActors = await fetchVoiceActors();
	voiceActors.value = allVoiceActors;
});

async function addVoiceActor() {
	const newVoiceActor = await insertVoiceActor(selectedVoiceActor);
	if (newVoiceActor) {
		voiceActors.value.push(newVoiceActor);
	}
}

async function deleteVoiceActor(actor_id: number) {
	const { success, message } = await deleteVoiceActorById(actor_id);
	if (success) {
		voiceActors.value = voiceActors.value.filter(
			va => va.actor_id !== actor_id
		);
	} else {
		alert(`Error: ${message}`);
	}
}

async function editVoiceActor(actor_id: number) {
	const updatedVoiceActor = await updateVoiceActorById(
		actor_id,
		selectedVoiceActor
	);
	if (updatedVoiceActor) {
		const index = voiceActors.value.findIndex(va => va.actor_id === actor_id);
		if (index !== -1) {
			voiceActors.value[index] = updatedVoiceActor;
		}
	}
}

function showEditForm(voiceActor: VoiceActor) {
	formMode.value = 'edit';
	formVisible.value = true;
	selectedVoiceActor.actor_id = voiceActor.actor_id;
	selectedVoiceActor.name = voiceActor.name;
	selectedVoiceActor.biography = voiceActor.biography;
	selectedVoiceActor.birthdate = voiceActor.birthdate;
}

async function cancelEdit() {
	formVisible.value = false;
	selectedVoiceActor.actor_id = 0;
	selectedVoiceActor.name = '';
	selectedVoiceActor.biography = '';
	selectedVoiceActor.birthdate = '';
}

async function submitForm() {
	if (formMode.value === 'add') {
		await addVoiceActor();
	} else {
		await editVoiceActor(selectedVoiceActor.actor_id);
	}
	formVisible.value = false;
}
</script>

<template>
	<div class="container">
		<h1>Voice Actor</h1>
		<button
			@click="
				formVisible = !formVisible;
				formMode = 'add';
			"
			v-if="!formVisible"
		>
			Add Voice Actor
		</button>
		<form @submit.prevent="submitForm" v-if="formVisible">
			<div>
				<label for="name">Name:</label>
				<input
					type="text"
					id="name"
					v-model="selectedVoiceActor.name"
					required
				/>
			</div>
			<div>
				<label for="biography">Biography:</label>
				<textarea id="biography" v-model="biographyComputed"></textarea>
			</div>
			<div>
				<label for="birthdate">Birthdate:</label>
				<input type="date" id="birthdate" v-model="birthdateComputed" />
			</div>
			<button type="submit">
				{{ formMode === 'add' ? 'Add Voice Actor' : 'Submit' }}
			</button>
			<button type="button" @click="cancelEdit" class="cancel-button">
				Cancel
			</button>
		</form>

		<table>
			<thead>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Biography</th>
					<th class="birthdate">Birthdate</th>
					<th>Delete</th>
					<th>Edit</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="voiceActor in voiceActors" :key="voiceActor.actor_id">
					<td>{{ voiceActor.actor_id }}</td>
					<td>{{ voiceActor.name }}</td>
					<td>{{ voiceActor.biography }}</td>
					<td>{{ voiceActor.birthdate }}</td>
					<td>
						<button @click="showEditForm(voiceActor)">Edit</button>
					</td>
					<td>
						<button @click="deleteVoiceActor(voiceActor.actor_id)">
							Delete
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<style scoped>
.container {
	width: 100%;
	max-width: 1000px;
	margin: 0 auto;
	padding: 1rem;
	box-sizing: border-box;
}

h1 {
	text-align: center;
	margin-bottom: 1.5rem;
}

form {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

label {
	font-weight: bold;
	margin-bottom: 0.5rem;
}

input,
textarea {
	min-width: 100%;
	max-width: 100%;
	padding: 0.5rem;
	border: 1px solid #ccc;
	border-radius: 4px;
}

button {
	cursor: pointer;
	padding: 0.5rem 1rem;
	background-color: #007bff;
	color: #fff;
	font-weight: bold;
	border: none;
	border-radius: 4px;
	transition: background-color 0.3s;
}

button:hover {
	background-color: #0056b3;
}

.cancel-button {
	background-color: #e26262;
	color: #fff;
}

.cancel-button:hover {
	background-color: #ff4949;
}

table {
	width: 100%;
	border-collapse: collapse;
	margin-top: 2rem;
}

th,
td {
	padding: 1rem;
	text-align: left;
	border-bottom: 1px solid #ccc;
}

th {
	font-weight: bold;
}

th.birthdate {
	width: 150px;
}
</style>
