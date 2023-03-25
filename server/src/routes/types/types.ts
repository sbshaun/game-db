export type Role = {
	user_role: string;
	post_permission: boolean;
	remove_post_permission: boolean;
	change_roles_permission: boolean;
};

export type User = {
	username: string;
	email: string;
	user_password: string;
	user_role: string;
};

export type Country = {
	country: string;
	country_code: string;
};

export type Developer = {
	name: string;
	website_link: string | null;
	description: string | null;
};

export type Franchise = {
	name: string;
	description: string | null;
};

export type Studio = {
	name: string;
	year_established: number | null;
	country: string | null;
	phone_number: string | null;
};

export type IndividualDeveloper = {
	name: string;
	birthdate: string | null;
};

export type Character = {
	name: string;
	description: string | null;
	history: string | null;
};

export type VoiceActor = {
	actor_id: number;
	name: string;
	biography: string | null;
	birthdate: string | null;
};

export type VideoGame = {
	name: string;
	release_date: string | null;
	genre: string | null;
	synopsis: string | null;
	rating: string | null;
	sales: number | null;
	developer_name: string | null;
	start_date: number | null;
	end_date: number | null;
	franchise_name: string | null;
};

export type VideoGameHasCharacter = {
	game_name: string;
	character_name: string;
	actor_id: number | null;
	character_role: string;
};

export type Post = {
	post_id: number;
	title: string;
	body: string;
	views: number;
	username: string;
	time_created: string;
};

export type PostTagsVideoGame = {
	post_id: number;
	game_name: string;
};

export type Comment = {
	comment_id: number;
	body: string;
	username: string;
	time_created: string;
	post_id: number;
};
