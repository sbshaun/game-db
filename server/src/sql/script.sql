DROP TABLE comment;
DROP TABLE posttagsvideogame;
DROP TABLE post;
DROP TABLE videogamehascharacter;
DROP TABLE videogame;
DROP TABLE voiceactor;
DROP TABLE characters;
DROP TABLE individualdeveloper;
DROP TABLE studio;
DROP TABLE franchise;
DROP TABLE developer;
DROP TABLE country;
DROP TABLE users;
DROP TABLE roles;


CREATE TABLE IF NOT EXISTS roles
(
	user_role CHAR(20),
    post_permission BIT NOT NULL,
	remove_post_permission BIT NOT NULL,
    change_roles_permission BIT NOT NULL,
	PRIMARY KEY(user_role)
);

CREATE TABLE IF NOT EXISTS users
(
	username CHAR(50),
    email CHAR(50) UNIQUE NOT NULL,
	user_password CHAR(50) NOT NULL,
    user_role CHAR(20) NOT NULL,
	PRIMARY KEY(username),
	FOREIGN KEY(user_role) REFERENCES roles(user_role)
);

CREATE TABLE IF NOT EXISTS country
(
	country CHAR(50),
    country_code CHAR(4) NOT NULL,
	PRIMARY KEY (country)
);

CREATE TABLE IF NOT EXISTS developer
(
	name CHAR(50),
    website_link CHAR(50) UNIQUE,
    description TEXT,
	PRIMARY KEY (name)
);

CREATE TABLE IF NOT EXISTS franchise
(
	name CHAR(50),
    description TEXT,
	PRIMARY KEY (name)
);

CREATE TABLE IF NOT EXISTS studio
(
	name CHAR(50),
	year_established INT,
    country CHAR(50),
	phone_number CHAR(15),
	PRIMARY KEY (name),
	FOREIGN KEY (name) REFERENCES developer(name) ON DELETE CASCADE,
	FOREIGN KEY (country) REFERENCES country(country)
);

CREATE TABLE IF NOT EXISTS individualdeveloper
(
	name CHAR(50),
	birthdate DATE,
	PRIMARY KEY (name),
	FOREIGN KEY (name) REFERENCES developer(name) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS characters
(
	name CHAR(50),
    description TEXT,
    history TEXT,
	PRIMARY KEY (name)
);

CREATE TABLE IF NOT EXISTS voiceactor
(
	actor_id INT AUTO_INCREMENT,
	name CHAR(50) NOT NULL,
    biography TEXT,
    birthdate DATE,
	PRIMARY KEY (actor_id)
);

CREATE TABLE IF NOT EXISTS videogame
(
	name CHAR(50),
    release_date DATE,genre CHAR(50),
	synopsis TEXT,rating CHAR(4),
    sales INT,
    developer_name CHAR(50),
    start_date INT,
	end_date INT,
    franchise_name CHAR(50),
	PRIMARY KEY (name),
	FOREIGN KEY (developer_name) REFERENCES developer(name) ON DELETE SET NULL,
	FOREIGN KEY (franchise_name) REFERENCES franchise(name)
);

CREATE TABLE IF NOT EXISTS videogamehascharacter
(
	game_name CHAR(50),
	character_name CHAR(50),
	actor_id INT,
	character_role CHAR(20) NOT NULL,
	PRIMARY KEY (game_name, character_name),
	FOREIGN KEY (game_name) REFERENCES videogame(name),
	FOREIGN KEY (character_name) REFERENCES characters(name),
	FOREIGN KEY (actor_id) REFERENCES voiceactor(actor_id)
);

CREATE TABLE IF NOT EXISTS post
(
	post_id INT AUTO_INCREMENT,
	title CHAR(50) NOT NULL,
    body TEXT NOT NULL,
    views INT NOT NULL,
	username CHAR(50) NOT NULL,
    time_created DATETIME NOT NULL,
	PRIMARY KEY(post_id),
	FOREIGN KEY(username) REFERENCES users(username) ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS posttagsvideogame
(
	post_id INT AUTO_INCREMENT,
	game_name CHAR(50),
	PRIMARY KEY(post_id, game_name),
	FOREIGN KEY(post_id) REFERENCES post(post_id),
	FOREIGN KEY(game_name) REFERENCES videogame(name)
);

CREATE TABLE IF NOT EXISTS comment
(
	comment_id INT AUTO_INCREMENT,
	body TEXT NOT NULL,
	username CHAR(50) NOT NULL,
	time_created DATETIME NOT NULL,
    post_id INT,
	PRIMARY KEY(comment_id, post_id),
	FOREIGN KEY(username) REFERENCES users(username) ON UPDATE CASCADE,
	FOREIGN KEY(post_id) REFERENCES post(post_id) ON DELETE CASCADE
);

INSERT INTO developer
            (name,website_link,description)
VALUES      ('House House','househou.se',
'House House is an independent video game developer based in Melbourne, Australia.'
),
            ('Game Freak','www.gamefreak.co.jp',
'Game Freak Co., Ltd. is a Japanese video game developer, best known as the primary developer of the mainline Pokémon series of role-playing video games published by Nintendo and The Pokémon Company.'
),
            ('Mobius Digital','www.mobiusdigitalgames.com',NULL),
            ('Nintendo','nintendo.com',
'Nintendo Co., Ltd. is a Japanese multinational video game company headquartered in Kyoto. It develops and releases both video games and video game consoles.'
),
            ('Phil Fish',NULL,
'Phil Fish is a French Canadian former indie game designer best known for his work on the 2012 platform game Fez.'
),
            ('Jonathan Blow','http://number-none.com/blow',
			'Jonathan Blow is an American video game designer and programmer.')
,
            ('Edmund McMillen',NULL,
'Edmund McMillen is an American video game designer and artist known for his Flash game visual style.'
),
            ('Square Enix','square-enix.com',
'Square Enix Holdings Co., Ltd. is a Japanese multinational holding company, production enterprise and entertainment conglomerate, best known for its Final Fantasy, Dragon Quest, Star Ocean and Kingdom Hearts role-playing video game franchises, among numerous others.'
),
            ('Eric Barone',NULL,
'Eric Barone, also known by his alias ConcernedApe, is an American video game developer, video game designer, artist, composer, and musician.'
),
            ('Lucas Pope','dukope.com',
'Lucas Pope is an American video game designer. He is best known for experimental indie games, notably Papers, Please and Return of the Obra Dinn.'
),
            ('Rockstar North','rockstarnorth.com',
'Rockstar North Limited (formerly DMA Design Limited) is a British video game development company and a studio of Rockstar Games based in Edinburgh.'
),
            ('Capcom','www.capcom.com',
'Capcom Co., Ltd. is a Japanese video game developer and publisher.');

INSERT INTO country
            (country,country_code)
VALUES      ('United States','1'),
            ('Canada','1'),
            ('Australia','61'),
            ('Japan','81'),
            ('United Kingdom','44');

INSERT INTO studio
            (name,year_established,country,phone_number)
VALUES      ('House House',2014,'Australia',NULL),
            ('Game Freak',1989,'Japan','(334) 674-387'),
            ('Mobius Digital',2013,'United States',NULL),
            ('Nintendo',1889,'Japan','(800) 255-3700'),
            ('Square Enix',2003,'Japan',NULL),
            ('Rockstar North',1987,'United Kingdom',NULL),
            ('Capcom',1979,'Japan',NULL);

INSERT INTO individualdeveloper
            (name,birthdate)
VALUES      ('Phil Fish','1984-11-01'),
            ('Jonathan Blow','1971-01-01'),
            ('Edmund McMillen','1980-03-02'),
            ('Eric Barone','1987-12-03'),
            ('Lucas Pope',NULL);

INSERT INTO franchise
            (name,description)
VALUES      ('Pokémon',
'The franchise was created by Satoshi Tajiri in 1996, and is centred around fictional creatures called "Pokémon"'
),
            ('Grand Theft Auto',
             'Grand Theft Auto (GTA) is a series of action-adventure games.'),
            ('Super Mario',
'The Super Mario games are set primarily in the fictional Mushroom Kingdom, typically with Mario as the player character.'
),
            ('The Legend of Zelda',
'The series centres on the various incarnations of Link, a courageous young man of the elf-like Hylian race; and Princess Zelda, a magical princess who is the mortal reincarnation of the goddess Hylia'
),
            ('Kingdom Hearts',
'The series centers on the main character, Sora, and his journey and experiences with various Disney and Pixar characters, as well as some from Square Enix properties.'
);

INSERT INTO videogame
            (name,release_date,genre,synopsis,rating,sales,developer_name,
            start_date,
            end_date,franchise_name)
VALUES      ('Untitled Goose Game','2019-09-20','Puzzle',
'Players control a goose who bothers the inhabitants of an English village.'
,'E',1000000,'House House',NULL,2019,NULL),
('Pokémon Red and Blue','1998-09-28','Role-playing',
'The player controls the protagonist from an overhead perspective and navigates him throughout the fictional region of Kanto in a quest to master Pokémon battling.'
,'E',31380000,'Game Freak',1990,1998,'Pokémon'),
('Outer Wilds','2019-05-28','Action-adventure',
'Named Game of the Year 2019 by Giant Bomb, Polygon, Eurogamer, and The Guardian, Outer Wilds is a critically-acclaimed and award-winning open world mystery about a solar system trapped in an endless time loop.'
,'E10+',4000000,'Mobius Digital',2012,2021,NULL),
('Super Mario Galaxy','2007-11-01','Platform',
'As Mario, the player embarks on a quest to rescue Princess Peach, save the universe from Bowser, and collect 120 Power Stars, after which the player can play the game as Luigi for a more difficult experience.'
,'E',12800000,'Nintendo',2004,2007,'Super Mario'),
('Fez','2012-04-13','Puzzle-platform',
'The player-character Gomez receives a fez that reveals his two-dimensional (2D) world to be one of four sides of a three-dimensional (3D) world.'
,'E',1000000,'Phil Fish',2007,2012,NULL),
('The Witness','2016-01-16','Puzzle',
'The player progresses by solving puzzles, which are based on interactions with grids presented on panels around the island or paths hidden within the environment.'
,'E',100000,'Jonathan Blow',2008,2016,NULL),
('Super Meat Boy','2010-10-20','Platform',
'The player controls Meat Boy, a red, cube-shaped character, as he attempts to rescue his girlfriend, Bandage Girl, from the antagonist Dr. Fetus.'
,'T',1000000,'Edmund McMillen',2008,2010,NULL),
('The Legend of Zelda: Breath of the Wild','2017-03-03','Action-adventure',
'The player controls an amnesiac Link, who awakens from a hundred-year slumber, and attempts to regain his memories, save princess Zelda and prevent the further destruction of Hyrule by Calamity Ganon.'
,'E10+',29000000,'Nintendo',NULL,2017,'The Legend of Zelda'),
('Kingdom Hearts III','2019-01-25','Action role-playing',
'Kingdom Hearts III is the twelfth installment in the Kingdom Hearts series, and serves as a conclusion of the "Dark Seeker Saga" story arc that began with the original game.'
,'E10+',6700000,'Square Enix',NULL,2018,'Kingdom Hearts'),
('Stardew Valley','2016-02-26','Simulation',
'Players take the role of a character who inherits a dilapidated farm in a place known as Stardew Valley.'
,'E10+',20000000,'Eric Barone',2011,2021,NULL),
('Papers, Please','2013-08-08','Puzzle',
'As an immigration officer, the player must review each immigrant and return passports and other supporting paperwork against an ever-growing list of rules using a number of tools and guides.'
,'M',1800000,'Lucas Pope',2010,2014,NULL),
('Braid','2008-08-06','Puzzle-platform',
'Braid is a puzzle-platformer, drawn in a painterly style, where you can manipulate the flow of time in strange and unusual ways. From a house in the city, journey to a series of worlds and solve puzzles to rescue an abducted princess.'
,'E10+',NULL,'Jonathan Blow',2004,2010,NULL),
('Grand Theft Auto V','2013-09-17','Action-adventure',
'Set within the fictional state of San Andreas, based on Southern California, the single-player story follows three protagonists—retired bank robber Michael De Santa, street gangster Franklin Clinton, and drug dealer and gunrunner Trevor Philips—and their attempts to commit heists while under pressure from a corrupt government agency and powerful criminals.'
,'M',175000000,'Rockstar North',2008,2022,'Grand Theft Auto'),
('Super Mario Bros.','1985-09-13','Platform',
'Players control Mario, or his brother Luigi in the multiplayer mode, as they traverse the Mushroom Kingdom to rescue Princess Toadstool from King Koopa (later named Bowser).'
,'E',40240000,'Nintendo',NULL,1987,'Super Mario'),
('The Legend of Zelda: The Minish Cap','2004-11-04','Action-adventure',
'The Minish Cap continues the story of the Four Sword, a weapon introduced in Four Swords and Four Swords Adventures. The game retains many elements common to previous Zelda games, especially top-down predecessors such as A Link to the Past, and includes new features and mechanics.'
,'E',NULL,'Capcom',NULL,2005,'The Legend of Zelda'),
('Return of the Obra Dinn','2018-10-18','Adventure',
'Set in 1807, the player assumes the role of insurance inspector for the East India Company. The Obra Dinn, a merchant ship missing for five years, has reappeared off the coast of England with no one alive aboard. The player is dispatched to the ghost ship to perform an appraisal, reconstruct the events of the voyage, and determine the fates of all sixty souls aboard, providing a cause of death for those deceased or a probable current location for those presumed living.'
,'M',NULL,'Lucas Pope',NULL,2020,NULL),
('Kentucky Route Zero','2020-01-28','Point-and-click adventure',
'Kentucky Route Zero follows the narrative of a truck driver named Conway and the strange people he meets as he tries to cross the mysterious Route Zero in Kentucky to make a final delivery for the antiques company for which he works.'
,'T',NULL,NULL,NULL,NULL,NULL);

INSERT INTO voiceactor
            (actor_id,name,biography,birthdate)
VALUES      (1,'Kengo Takanashi',
'Kengo Takanashi is a Japanese voice actor, affiliated with Arts Vision.'
,'1986-06-12'),
(2,'Charles Martinet',
'Charles Martinet is an American actor and voice actor, known for his portrayal of both Mario and Luigi in the Super Mario video game series since 1992.'
,'1955-09-17'),
(3,'Patricia Summersett',
'Patricia Summersett is a Canadian actress, best known for voicing Princess Zelda in The Legend of Zelda: Breath of the Wild and Hyrule Warriors: Age of Calamity.'
,'1983-03-15'),
(4,'Haley Joel Osment','Haley Joel Osment is an American actor and voice actor.'
,
'1988-04-10'),
(5,'David Gallagher',
'David Lee Gallagher is an American actor and former model.'
,'1985-02-09'),
(6, 'Fujiko Takimoto', 'Fujiko Takimoto is a Japanese voice actress from Osaka Prefecture, Japan.', '1967-11-06'),
(7, 'Hikari Tachibana', 'Hikari Tachibana is a Japanese voice actress.', '1973-09-18'),
(8, 'Frank Welker', 'Franklin Wendell Welker is an American voice actor.
He began his career in the 1960s, and holds over 860 film, television, and video game credits as of 2022, making him one of the most prolific voice actors of all time.',
'1946-03-12'),
(9, 'Harvey Atkin',
'Elliot Harvey Atkin was a Canadian actor best known for his roles as Morty Melnick in Meatballs, Sergeant Ronald
Coleman in Cagney & Lacey, and for voicing King Koopa in The Super Mario Bros.', '1942-12-18'),
(10, 'Tsuguo Mogami', 'Tsuguo Mogami is a Japanese voice actor from Saitama Prefecture, Japan.', '1980-1-18');

INSERT INTO characters
            (name,description,history)
VALUES      ('Link',
'Link is the protagonist of the video game franchise The Legend of Zelda. He was created by Japanese video game designer Shigeru Miyamoto.'
,
'Link is the soul of a legendary hero that throughout history is reincarnated within a seemingly ordinary boy or man when the need arises for a new warrior to defeat the forces of evil.'
),
            ('Mario',
'Mario is the title character of the video game franchise of the same name and the mascot of Japanese video game company Nintendo.'
,
'Mario is depicted as a portly plumber who lives in the fictional land of the Mushroom Kingdom with Luigi, his younger, taller brother.'
),
            ('Zelda',
'Zelda is a princess and member of the royal family of Hyrule. She is typically depicted with blonde or brown hair and blue eyes and wears a royal dress, tiara and jewellery.'
,
'In many games, Zelda is captured by the antagonist Ganon, necessitating Link to come to her rescue. In several games she is one of the Sages or Champions whose heroism is essential to defeating Ganon; in others, like Ocarina of Time and The Wind Waker, she adopts alternative personas to take a more active role in the story. In Skyward Sword, she is established as the mortal reincarnation of the goddess Hylia, which gives her incarnations a range of magical powers.'
),
            ('Sora',
'Sora is the main protagonist and main playable character in most of the Kingdom Hearts series.'
,
'He is a Keyblade wielder from the Destiny Islands where he, along with his childhood friends Riku and Kairi, dreamed of venturing away to find out what lies beyond their home.'
),
            ('Red',
'Red is the canon name of the protagonist of the Generation I games and is a Pokémon Trainer from Pallet Town, Kanto.'
,
'Red is known throughout the Pokémon world as the Champion from Pallet Town, as well as a living legend for his defeat of Team Rocket in Kanto during his quest.'
),
            ('Riku',
'Riku is a calm, cool, collected teenager who is not afraid to push the boundaries. He is tall and muscular with pale skin, bright blue-green eyes and silver hair.'
,
'Riku is introduced as a teenager who wishes to visit other worlds with his friends Sora and Kairi. After a way to other worlds is opened, Riku meets the evil fairy Maleficent who pits him against Sora, leading to Riku falling to darkness and ultimately being possessed by Ansem, Seeker of Darkness. Riku is freed thanks to Sora and returns as a protagonist in following games.'
),
            ('Luigi', 'Luigi is Mario''s younger twin brother and the secondary protagonist of the Mario franchise.',
'Throughout his life, he has lived in Mario''s shadow, developing both cowardly and heroic tendencies. Despite this, Luigi has helped and fought alongside his brother on many occasions.'),
            ('Yoshi',
'Yoshi is a dinosaur-like character that acts as an ally of Mario and Luigi', 'Among members of the Yoshi species hailing from Yoshi''s Island, any Yoshi may be identified as the "Yoshi" character, and as such, not all iterations of the character are necessarily the same one.'),
            ('Bowser',
'Bowser, or King Koopa, is a fictional character, the main antagonist in Nintendo''s Mario franchise.',
'He is a large, powerful, fire-breathing Koopa who leads the Koopa Troop,
an evil kingdom of turtle-like creatures, and has been the arch-nemesis of Mario since his debut in Super Mario Bros.
He has repeatedly kidnapped or attempted to kidnap Princess Peach with the ultimate goal of defeating Mario and taking
over the Mushroom Kingdom.'),
            ('Calamity Ganon', 'A recurring major antagonist in The Legend of Zelda series.',
'Calamity Ganon is known as a primal evil that has appeared throughout Hyrule''s history.');

INSERT INTO videogamehascharacter
            (game_name,character_name,actor_id,character_role)
VALUES      ('Super Mario Galaxy','Mario',2,'Playable'),
            ('Super Mario Bros.', 'Mario', 2, 'Playable'),
            ('Super Mario Bros.', 'Luigi', 2, 'Playable'),
            ('Super Mario Galaxy', 'Luigi', 2, 'Playable'),
            ('Super Mario Bros.', 'Yoshi', 8, 'Supporting'),
            ('Super Mario Bros.', 'Bowser', 9, 'Antagonist'),
            ('Super Mario Galaxy', 'Bowser', 9, 'Antagonist'),
            ('The Legend of Zelda: Breath of the Wild','Link',1,'Playable'),
            ('The Legend of Zelda: Breath of the Wild','Zelda',3,'Supporting'),
            ('The Legend of Zelda: Breath of the Wild', 'Calamity Ganon', 10, 'Antagonist'),
            ('The Legend of Zelda: The Minish Cap', 'Link', 6, 'Playable'),
            ('The Legend of Zelda: The Minish Cap', 'Zelda', 7, 'Playable'),
            ('Kingdom Hearts III','Sora',4,'Playable'),
            ('Pokémon Red and Blue','Red',NULL,'Playable'),
            ('Kingdom Hearts III','Riku',5,'Playable');

INSERT INTO roles
            (user_role,post_permission,remove_post_permission,
            change_roles_permission)
VALUES      ('developer',1,1,1),
            ('admin',1,1,1),
            ('sub_admin',1,1,0),
            ('member',1,0,0),
            ('banned',0,0,0);

INSERT INTO users
            (username,email,user_password,user_role)
VALUES      ('andy613','andy6138213@gmail.com','UIQHE@3h8@JQO_{@','admin'),
            ('john','johnkkkkm@gmail.com','absoiqjwk139','banned'),
            ('jk222','jk22201@gmail.com','password3838','sub_admin'),
            ('random','sbshaun2019@gmail.com','92109211k','admin'),
            ('allend','631938@gmail.com','securePassword','member');

INSERT INTO post
            (post_id,title,body,views,username,time_created)
VALUES      (1,'Review of the game',
'I played the game for 50 years since I was 7-year old in 2001, I really enjoyed the game. Highly recommended!'
            ,17,'andy613','2021-01-25 13:11:44'),
            (2,'Looking for some advices',
            'Hello I am new to the game, need some advices!',
            111,'andy613','2023-02-21 11:34:21'),
            (3,'Anyone else had this bug?','The game just crashed for no reason'
            ,5,'allend',
            '2023-02-21 11:41:56'),
            (4,'My favorite video game character',
'I just wanted to share my love for my favorite video game character.'
,15,'john','2023-02-22 23:01:33'),
(5,'Video game blog!',
'Hey everyone, I decided to have a blog for myself, I''ll post updates daily, please follow!'
,8,'andy613','2023-02-25 19:59:12');

INSERT INTO posttagsvideogame
            (post_id,game_name)
VALUES      (1,'Pokémon Red and Blue'),
            (2,'Untitled Goose Game'),
            (3,'Outer Wilds'),
            (4,'Fez'),
            (4,'Super Mario Galaxy');

INSERT INTO comment
            (comment_id,body,username,time_created,post_id)
VALUES      (1,'great game!','andy613','2023-02-25 12:34:56',1),
            (2,'really enjoyed playing','jk222','2023-02-24 18:27:39',2),
            (3,'add me: y89019','random','2023-02-23 09:15:22',1),
            (4,'the game is classic, everyone should give it try!','jk222',
            '2023-02-22 21:45:33',1),
            (5,'lol the game is so badly designed','allend',
            '2023-02-21 15:08:47',3); 