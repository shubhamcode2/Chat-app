# Chat App

This is a chat application built with React and Vite for the frontend and Express.js for the backend. The application supports user authentication, profile management, and real-time chat functionality.

## Project Structure
Frontend/ .env .gitignore components.json eslint.config.js index.html jsconfig.json package.json postcss.config.js public/ README.md src/ App.css App.jsx assets/ components/ ui/ index.css lib/ api-client.js utils.js main.jsx pages/ ... utils/ tailwind.config.js vite.config.js readme.md server/ .env .gitignore controllers/ AuthController.js index.js middlewares/ AuthMiddleware.js models/ UserModel.js package.json routes/ AuthRoutes.js
## Frontend

The frontend is built using React and Vite. It includes the following main components:

- **App.jsx**: The main application component that sets up routing.
- **components/ui**: Reusable UI components such as buttons, inputs, tabs, and toasters.
- **pages**: Different pages of the application like authentication, profile, and chat.
- **lib**: Utility functions and API client setup.
- **assets**: Static assets like images.

### Scripts

- `dev`: Start the development server.
- `build`: Build the application for production.
- `lint`: Run ESLint to check for code quality.
- `preview`: Preview the production build.

### Dependencies

- React
- React Router DOM
- Axios
- Tailwind CSS
- Zustand
- ESLint

## Backend

The backend is built using Express.js and MongoDB. It includes the following main components:

- **index.js**: The main server file that sets up middleware and routes.
- **controllers**: Contains the authentication controller for handling signup and login.
- **middlewares**: Middleware functions for authentication.
- **models**: Mongoose models for MongoDB collections.
- **routes**: Express routes for authentication.

### Scripts

- `start`: Start the server.
- `dev`: Start the server with nodemon for development.

### Dependencies

- Express
- Mongoose
- Bcrypt
- JSON Web Token
- Cookie Parser
- CORS
- Dotenv

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:

```sh
git clone https://github.com/your-repo/chat-app.git
cd chat-app
```

2. Install dependencies for both frontend and backend:
```
cd Frontend
npm install
cd ../server
npm install
```

3. Set up environment variables:

Create a .env file in both Frontend and server directories and add the necessary environment variables.
Running the Application



4. Start the backend server:

