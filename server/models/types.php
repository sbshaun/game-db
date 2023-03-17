<?php 


class Role {
    public string $user_role;
    public bool $post_permission;
    public bool $remove_post_permission;
    public bool $change_roles_permission;
}

class User {
    public string $username;
    public string $email;
    public string $user_password;
    public string $user_role;
}

class Country {
    public string $country;
    public string $country_code;
}

class Developer {
    public int $developer_id;
    public string $name;
    public ?string $website_link;
    public ?string $description;
}

class Franchise {
    public int $franchise_id;
    public string $name;
    public ?string $description;
}

class Studio {
    public int $developer_id;
    public ?int $year_established;
    public ?string $country;
    public ?string $phone_number;
}

class IndividualDeveloper {
    public int $developer_id;
    public ?string $birthdate;
}

class Character {
    public int $character_id;
    public string $name;
    public ?string $description;
    public ?string $history;
}

class VoiceActor {
    public int $actor_id;
    public string $name;
    public ?string $biography;
    public ?string $birthdate;
}

class VideoGame {
    public int $game_id;
    public string $name;
    public ?string $release_date;
    public ?string $genre;
    public ?string $synopsis;
    public ?string $rating;
    public ?int $sales;
    public ?int $developer_id;
    public ?int $start_date;
    public ?int $end_date;
    public ?int $franchise_id;
}

class VideoGameHasCharacter {
    public int $game_id;
    public int $character_id;
    public ?int $actor_id;
    public string $user_role;
}

class Post {
    public int $post_id;
    public string $title;
    public string $body;
    public int $views;
    public string $username;
    public string $time_created;
}

class PostTagsVideoGame {
    public int $post_id;
    public int $game_id;
}

class Comment {
    public int $comment_id;
    public string $body;
    public string $username;
    public string $time_created;
    public int $post_id;
}
?>