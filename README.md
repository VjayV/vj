# EventShuffle Backend

The backend is built with Node.js, Express, and MongoDB. And the frontend is built with React and Typescript.

## Project Overview

Shuffle Event enables users to create events and vote on dates.

## Technologies Used

- **Node.js**: Backend runtime.
- **Express**: Node.js web application framework.
- **MongoDB**: NoSQL database for storing user data, events, and votes.
- **JSON Web Tokens (JWT)**: For  authentication and authorization.
- **React with TS**: For frontend with type safety.

## Design Practices

- **Monolithic Architecture**: The backend is structured using monolithic architecture for easy of deployment and development.
- **MVC Pattern**: The backend follows the Model-View-Controller pattern With custom middleware for easy error handling across the application.

## Project Structure

```
backend/
├── server/
├──── src/
├──────├──api/ # Api Route definitions
├─────────├──middlewares/ # Contains authentication middleware
├──────├──controllers/ # Controllers for handling requests
├──────├──services/ # Controllers service files
├──────├──utils/ # Contains helper functions
├──────├──database/ # Database related files
├──────├───├── models/ # Mongoose models
├──────├───├── connection.ts/ # MongoDb connection
├──────index.ts # Express app setup and initialization
├── ui/
├──── package.json # Dependencies and scripts
├──── src/
├──────├── api/ # Contains all Api calls
├──────├── components/ # React components
├──────├── pages/ # Page components
├──────├── App.tsx # Main App component
├──────└── index.tsx # Entry point
├────── public/ # Public assets
├────── package.json # Dependencies and scripts

```

## Setup and Installation

### Installing Dependencies

To install the required dependencies, navigate to the server and ui folders and run the below command.

```
npm install
```

Create .env file with required values in it. Reference .env.example file in the respective folders for setting env values.

Once the packages are installed and env is set up, navigate to the respective folders start the applications by running the below command.

```
npm start
```

## Database

MongoDB is used as the database for storing user details, events, and votes. Mongoose is used to interact with the MongoDB database using schemas and models.

## Authentication and Authorization

**JWT Authentication**: Users are authenticated using JSON Web Tokens (JWT). The token is generated upon successful login and is used to authorize access to protected routes.

## Controllers

- **authController.ts**: Handles user registration, login, and logout.
- **eventController.ts**: Manages CRUD operations for events and voting functionality.

## Error Handling

**Custom Error Middleware**: Handles and formats errors consistently across the application.

## API Documentation

### Base URL

`/api/v1`: Base Url for event and vote routes  
`/api/user`: Base Url for user registration and login
`/api/stat`: Health check url  

### Auth Routes

- `POST /register`: Register a new user.
- `POST /login`: Log in a user and generate a new JWT token.

### Event Routes

- `GET /list/`: Retrieve all events.
- `POST /events`: Create a new event.
- `GET /events/:id`: Retrieve a specific event.
- `POST /events/:id/vote`: Vote on a specific event date.
