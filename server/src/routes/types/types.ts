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
	developer_id: number;
	name: string;
	website_link: string | null;
	description: string | null;
};

export type Franchise = {
	franchise_id: number;
	name: string;
	description: string | null;
};

export type Studio = {
	developer_id: number;
	year_established: number | null;
	country: string | null;
	phone_number: string | null;
};

export type IndividualDeveloper = {
	developer_id: number;
	birthdate: string | null;
};

export type Character = {
	character_id: number;
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
	game_id: number;
	name: string;
	release_date: string | null;
	genre: string | null;
	synopsis: string | null;
	rating: string | null;
	sales: number | null;
	developer_id: number | null;
	start_date: number | null;
	end_date: number | null;
	franchise_id: number | null;
};

export type VideoGameHasCharacter = {
	game_id: number;
	character_id: number;
	actor_id: number | null;
	user_role: string;
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
	game_id: number;
};

export type Comment = {
	comment_id: number;
	body: string;
	username: string;
	time_created: string;
	post_id: number;
};
