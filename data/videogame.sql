CREATE TABLE role
  (
     role                    CHAR(20),
     post_permission         BIT NOT NULL,
     remove_post_permission  BIT NOT NULL,
     change_roles_permission BIT NOT NULL,
     PRIMARY KEY(role)
  );

CREATE TABLE user
  (
     username CHAR(50),
     email    CHAR(50) UNIQUE NOT NULL,
     password CHAR(50) NOT NULL,
     role     CHAR(20) NOT NULL,
     PRIMARY KEY(username),
     FOREIGN KEY(role) REFERENCES role(role)
  );

CREATE TABLE country
  (
     country      CHAR(50),
     country_code CHAR(4) NOT NULL,
     PRIMARY KEY (country)
  );

CREATE TABLE developer
  (
     developer_id INT,
     name         CHAR(50) UNIQUE NOT NULL,
     website_link CHAR(50) UNIQUE,
     description  TEXT,
     PRIMARY KEY (developer_id)
  );

CREATE TABLE franchise
  (
     franchise_id INT,
     name         CHAR(50) UNIQUE NOT NULL,
     description  TEXT,
     PRIMARY KEY (franchise_id)
  );

CREATE TABLE studio
  (
     developer_id     INT,
     year_established INT,
     country          CHAR(50),
     phone_number     CHAR(15),
     PRIMARY KEY (developer_id),
     FOREIGN KEY (developer_id) REFERENCES developer(developer_id),
     FOREIGN KEY (country) REFERENCES country(country)
  );

CREATE TABLE individualdeveloper
  (
     developer_id INT,
     birthdate    DATE,
     PRIMARY KEY (developer_id),
     FOREIGN KEY (developer_id) REFERENCES developer(developer_id)
  );

CREATE TABLE `character`
  (
     character_id INT,
     name         CHAR(50) NOT NULL,
     description  TEXT,
     history      TEXT,
     PRIMARY KEY (character_id)
  );

CREATE TABLE voiceactor
  (
     actor_id  INT,
     name      CHAR(50) NOT NULL,
     biography TEXT,
     birthdate DATE,
     PRIMARY KEY (actor_id)
  );

CREATE TABLE videogame
  (
     game_id      INT,
     name         CHAR(50) UNIQUE NOT NULL,
     release_date DATE,
     genre        CHAR(50),
     synopsis     TEXT,
     rating       CHAR(4),
     sales        INT,
     developer_id INT,
     start_date   INT,
     end_date     INT,
     franchise_id INT,
     PRIMARY KEY (game_id),
     FOREIGN KEY (developer_id) REFERENCES developer(developer_id),
     FOREIGN KEY (franchise_id) REFERENCES franchise(franchise_id)
  );

CREATE TABLE videogamehascharacter
  (
     game_id      INT,
     character_id INT,
     actor_id     INT,
     role         CHAR(20) NOT NULL,
     PRIMARY KEY (game_id, character_id),
     FOREIGN KEY (game_id) REFERENCES videogame(game_id),
     FOREIGN KEY (character_id) REFERENCES `character`(character_id),
     FOREIGN KEY (actor_id) REFERENCES voiceactor(actor_id)
  );

CREATE TABLE post
  (
     post_id      INT,
     title        CHAR(50) NOT NULL,
     body         TEXT NOT NULL,
     views        INT NOT NULL,
     username     CHAR(50) NOT NULL,
     time_created DATETIME NOT NULL,
     PRIMARY KEY(post_id),
     FOREIGN KEY(username) REFERENCES user(username) ON UPDATE CASCADE
  );

CREATE TABLE posttagsvideogame
  (
     post_id INT,
     game_id INT,
     PRIMARY KEY(post_id, game_id),
     FOREIGN KEY(post_id) REFERENCES post(post_id),
     FOREIGN KEY(game_id) REFERENCES videogame(game_id)
  );

CREATE TABLE comment
  (
     comment_id   INT,
     body         TEXT NOT NULL,
     username     CHAR(50) NOT NULL,
     time_created DATETIME NOT NULL,
     post_id      INT,
     PRIMARY KEY(comment_id, post_id),
     FOREIGN KEY(username) REFERENCES user(username) ON UPDATE CASCADE,
     FOREIGN KEY(post_id) REFERENCES post(post_id) ON DELETE CASCADE
  );