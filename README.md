# Blogs API

## Project

Backend project for managing a blog with a simple CRUD _(Create, Read, Update, Delete)_. In this project it was possible to put into practice lessons learned with the MSC architecture _(Model, Service and Controller)_, Node JS for code execution, Express JS for the creation of the API that communicates with the database, JSON Web Token to generate acess token, MySQL to store the data in the database, and Sequelize ORM to make transactions, migrations, seeds and querying.

## Developed using
> JavaScript, Node JS, MySQL, Express JS, JSON Web Token (JWT), MSC Architecture, Sequelize ORM

## API Endpoints

<details closed>
  <summary>User</summary>

  - Create new user
  
  > ```
  > Method: POST
  > Endpoint: /user
  > ```
  > ```json
  > Body example:
  > {
  >  "displayName": "username example",
  >  "email": "example@email.com",
  >  "password": "pass_example",
  >  "image": "https://picsum.photos/1920/1080"
  > }
  > ```
  
  - Login user

  > ```
  > Method: POST
  > Endpoint: /login
  > ```
  > ```json
  > Body example:
  > {
  >  "email": "example@email.com",
  >  "password": "pass_example",
  > }
  > ```
 
  - Get all users

  > ```
  > Method: GET
  > Endpoint: /user
  > Header - authorization: place_user_token (token generated in POST /login or POST /user)
  > ```

 - Get user by ID

  > ```
  > Method: GET
  > Endpoint: /user/:id
  > Header - authorization: place_user_token (token generated in POST /login or POST /user)
  > ```

  - Delete user

  > ```
  > Method: DELETE
  > Endpoint: /user/me
  > Header - authorization: place_user_token (token generated in POST /login or POST /user)
  > ```
</details>

<details closed>
  <summary>Categories</summary>

  - Get all categories
  
  > ```
  > Method: GET
  > Endpoint: /categories
  > Header - authorization: place_user_token (token generated in POST /login or POST /user)
  > ```
  
  - Create category

  > ```
  > Method: POST
  > Endpoint: /categories
  > Header - authorization: place_user_token (token generated in POST /login or POST /user)
  > ```
  > ```json
  > Body example:
  > {
  >  "name": "category_name",
  > }
  > ```
</details>

<details closed>
  <summary>Post</summary>

  - Get all posts
  
  > ```
  > Method: GET
  > Endpoint: /post
  > Header - authorization: place_user_token (token generated in POST /login or POST /user)
  > ```
  
  - Get post by ID
  
  > ```
  > Method: GET
  > Endpoint: /post/:id
  > Header - authorization: place_user_token (token generated in POST /login or POST /user)
  > ```
  
  - Search post by query
  
  > ```
  > Method: GET
  > Endpoint: /post/search?q={search_query}
  > Header - authorization: place_user_token (token generated in POST /login or POST /user)
  > ```
  
  - Create post

  > ```
  > Method: POST
  > Endpoint: /post
  > Header - authorization: place_user_token (token generated in POST /login or POST /user)
  > ```
  > ```json
  > Body example:
  > {
  >  "title": "new title example",
  >  "content": "new content example",
  >  "categoryIds": [1, 2]
  > }
  > ```
  
  - Update post
  
  > ```
  > Method: PUT
  > Endpoint: /post/:id
  > Header - authorization: place_user_token (token generated in POST /login or POST /user)
  > ```
  > ```json
  > Body example:
  > {
  >  "title": "updated title example",
  >  "content": "updated content example"
  > }
  > ```
  
   - Delete post
  
  > ```
  > Method: DELETE
  > Endpoint: /post/:id
  > Header - authorization: place_user_token (token generated in POST /login or POST /user)
  > ```
</details>

## Running the project
> 1 - Clone the project <br>
> 2 - Enter the directory `blogs-api/` <br>
> 3 - Start docker <br>
> 4 - Run the command `docker compose up -d` <br>
> 5 - Run the command `docker exec -it blogs_api bash` <br>
> 6 - Run the command `npm install` inside docker to install <br>
> 7 - Run the command `npm run prestart` inside docker to create database and migrate <br>
> 8 - Run the command `npm run seed` inside docker to populate database <br>
> 9 - Run the command `npm run debug` inside docker to run application <br>
(Optional)
> If you need to drop the DB, run the command `npm run drop` inside docker
