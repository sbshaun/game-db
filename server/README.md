> change log: 
> 1. added `AUTO_INCREMENT` to id fields in tables /src/sql/scripts.sql
> 2. added `nodemon` to auto-restart server for file changes for development 

1. setup php environment
2. run `php -S localhost:4000`
3. you can access the server at `http://localhost:4000`

## Endpoints

`/videogames`
- Gets a list of videogames

`/videogames/{name}`
- Gets a specific video game given a name

`/franchises`
- Gets a list of all the franchises

`/franchises/{name}`
- Gets a single franchise given the name
- Also returns the associated video games with that franchise

`/videogames/genre/{genre}`
- Gets all video games of a specific genre

`/videogames/rating/{rating}`
- Gets all video games of a specific rating