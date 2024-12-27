# Chat App

## Description
The Chat App is a real-time messaging application that allows users to communicate seamlessly. Built with modern web technologies, this app supports user authentication, live chat functionality, and a responsive user interface.

## Features
- **User Authentication:** Secure login and registration system.
- **Real-Time Messaging:** Send and receive messages instantly using WebSocket technology.
- **Responsive Design:** Optimized for desktop and mobile devices.
- **User Profiles:** View and update profile information.
- **Online Status Indicator:** See who is currently online.
- **Message Notifications:** Get notified of new messages.

## Technologies Used
- **Frontend:** React.js (with Vite for development)
- **Backend:** Node.js with Express.js
- **Database:** MongoDB (via Mongoose)
- **Real-Time Communication:** Socket.IO
- **Styling:** CSS/SCSS or TailwindCSS

## Installation

### Prerequisites
Ensure you have the following installed on your system:
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/chat-app.git
   cd chat-app
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `backend` directory with the following:
     ```env
     MONGO_URI=your-mongodb-connection-string
     JWT_SECRET=your-jwt-secret
     PORT=5000
     ```

4. Start the development servers:
   ```bash
   # Start the backend server
   cd backend
   npm run dev

   # Start the frontend server
   cd ../frontend
   npm run dev
   ```

5. Open the app:
   - Frontend: Navigate to `http://localhost:3000` in your browser.
   - Backend: API runs on `http://localhost:5000`.

## Usage
1. Register a new account or log in with existing credentials.
2. Start a chat by selecting a user from the contact list.
3. Send and receive messages in real-time.
4. Update your profile as needed.

## Folder Structure
```
chat-app/
├── backend/
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API routes
│   ├── controllers/    # Request handlers
│   └── server.js       # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Application pages
│   │   ├── context/    # State management
│   │   └── App.jsx     # Root component
└── README.md           # Project documentation
```

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes and push to your fork.
4. Submit a pull request for review.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact
For questions or suggestions, please contact:
- **Name:** Your Name
- **Email:** your.email@example.com
- **GitHub:** [your-username](https://github.com/your-username)

