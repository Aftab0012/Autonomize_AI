Certainly! Below is the updated README with the provided project details, API endpoints, and additional routes:

# GitHub User Data Backend

Welcome to the GitHub User Data Backend, a Node.js application that interacts with the GitHub API to retrieve user data and performs various actions on the data. This backend supports a range of API endpoints for managing GitHub user information in a MongoDB database.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Installation](#installation-for-local-environment)
- [API Reference](#api-reference)
  - [User Actions](#user-actions)
  - [User Search](#user-search)
  - [User Management](#user-management)
  - [User Sorting](#user-sorting)
  - [Mutual Friends](#mutual-friends)

### Tech Stack

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [axios](https://github.com/axios/axios)

## Installation for Local Environment

1. Clone the repository:

   ```bash
   https://github.com/Aftab0012/Autonomize_AI.git
   ```

2. Change to the project directory:

   ```bash
   cd Autonomize_AI
   ```

3. Install server dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   npm start
   ```

5. Please add a .env file with the following content to run the server:

   ```bash
   MONGODB_URI={YOUR MONGODB CONNECTION STRING GOES HERE}
   ```

## API Reference

### User Actions

#### Get User Data

- **Endpoint:**
  `GET /api/user/:username`

- **Example Request:**

  ```bash
  POSTMAN GET :- http://localhost:3002/api/user/mralexgray
  ```

- **Example Response:**
  ```bash
  {
    "username": "mralexgray",
    "location": "San Francisco",
    "blog": "https://www.example.com",
    "bio": "Passionate developer...",
    "public_repos": 50,
    "public_gists": 30,
    "followers": 100,
    "following": 80,
    "created_at": "2012-05-10T15:25:05Z"
  }
  ```

#### Search Users

- **Endpoint:**
  `GET http://localhost:3002/api/search/user`

- **Query Parameters:**

  - `q` (Search query)

- **Example Request:**

  ```bash
  POSTMAN GET:- http://localhost:3002/api/search/user?q=mralexgray
  ```

- **Example Response:**
  ```bash
  {
    "message": "User found",
    "user": {
      "username": "mralexgray",
      "location": "San Francisco",
      "blog": "https://www.example.com",
      "bio": "Passionate developer...",
      "public_repos": 50,
      "public_gists": 30,
      "followers": 100,
      "following": 80,
      "created_at": "2012-05-10T15:25:05Z"
    }
  }
  ```

#### Delete User

- **Endpoint:**
  `DELETE http://localhost:3002/api/user/:username`

- **Example Request:**

  ```bash
  POSTMAN DELETE :- http://localhost:3002/api/user/mralexgray
  ```

- **Example Response:**
  ```bash
  {
    "message": "User deleted",
    "user": {
      "username": "mralexgray",
      "location": "San Francisco",
      "blog": "https://www.example.com",
      "bio": "Passionate developer...",
      "public_repos": 50,
      "public_gists": 30,
      "followers": 100,
      "following": 80,
      "created_at": "2012-05-10T15:25:05Z"
    }
  }
  ```

#### Update User

- **Endpoint:**
  `PATCH http://localhost:3002/api/user/:username`

- **Example Request:**

  ```bash
  POSTMAN PATCH :- http://localhost:3002/api/user/mralexgray
  ```

````

- **Example Response:**
```bash
{
  "message": "User updated successfully",
  "user": {
    "username": "mralexgray",
    "location": "New Location",
    "blog": "https://newblog.com",
    "bio": "Updated bio",
    "public_repos": 50,
    "public_gists": 30,
    "followers": 100,
    "following": 80,
    "created_at": "2012-05-10T15:25:05Z"
  }
}
````

### User Management

#### Get All Users

- **Endpoint:**
  `GET /api/allUsers`

- **Example Request:**

  ```bash
  POSTMAN GET :- http://localhost:3002/api/allUsers
  ```

- **Example Response:**
  ```bash
  [
    {
      "username": "user1",
      "location": "City1",
      "public_repos": 10,
      "followers": 20,
      "following": 15
    },
    {
      "username": "user2",
      "location": "City2",
      "public_repos": 5,
      "followers": 30,
      "following": 25
    },
    // ... more users
  ]
  ```

### User Sorting

#### Get Users Sorted by Fields

- **Endpoint:**
  `GET http://localhost:3002/api/allUsers?sortBy=public_repos`

- **Query Parameters:**

  - `sortBy` (Field to sort by: public_repos, public_gists, followers, following, created_at)

- **Example Request:**

  ```bash
  POSTMAN GET:- https://localhost:3002/api/allUsers?sortBy=public_repos
  ```

- **Example Response:**
  ```bash
  [
    {
      "username": "user3",
      "public_repos": 25
    },
    {
      "username": "user1",
      "public_repos": 15
    },
    {
      "username": "user2",
      "public_repos": 10
    },
    // ... more users
  ]
  ```

### Mutual Friends

#### Handle Mutual Friends

- **Endpoint:**
  `POST http://localhost:3002/api/addFriend/:username`

- **Example Request:**

  ```bash
   POSTMAN POST :- https://localhost:3002/api/addFriend/mralexgray
  ```

- **Example Response:**
  ```bash
  {
    "message": "Mutual friends added successfully",
    "friends": [
      "user1",
      "user2",
      // ... more friends
    ]
  }
  ```

## Outro

If you find this helpful, please give a star to this repository.
