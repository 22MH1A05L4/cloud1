# MERN Stack Task Management System

A full-stack web application for managing agents and distributing tasks using the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- **Admin Authentication**: Secure login system for administrators
- **Agent Management**: Add and manage agents with their details
- **Task Distribution**: Upload CSV files to automatically distribute tasks among agents
- **Modern UI**: Responsive design with beautiful gradient styling
- **Real-time Updates**: Live feedback for all operations

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Multer** for file uploads
- **bcryptjs** for password hashing

### Frontend
- **React.js** with functional components and hooks
- **React Router** for navigation
- **Axios** for API calls
- **Modern CSS** with gradients and animations

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd mern-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```env
MONGO_URI=mongodb://localhost:27017/agentdb
JWT_SECRET=your-secret-key-change-in-production
PORT=8998
```

4. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:8998`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd mern-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm start
```

The frontend will run on `http://localhost:9190`

## Default Admin Credentials

- **Email**: `admin@example.com`
- **Password**: `admin`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Admin registration

### Agents
- `POST /api/agents/register` - Register new agent
- `GET /api/agents/agents` - Get all agents
- `PUT /api/agents/:id` - Update agent
- `DELETE /api/agents/:id` - Delete agent
- `GET /api/agents/agent-distribution` - Get task distribution

### Upload
- `POST /api/upload` - Upload CSV file for task distribution

## CSV Format

The CSV file should contain the following columns:
- `taskName` or `name` - Task name
- `description` - Task description

## Project Structure

```
├── mern-backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── agentController.js
│   │   ├── authController.js
│   │   └── uploadController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── isAdmin.js
│   ├── models/
│   │   ├── agentModel.js
│   │   ├── task.js
│   │   └── user.js
│   ├── routes/
│   │   ├── agentRoutes.js
│   │   ├── authRoutes.js
│   │   └── uploadRoutes.js
│   └── server.js
├── mern-frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddAgent.js
│   │   │   ├── Dashboard.js
│   │   │   ├── LoginForm.js
│   │   │   └── UploadCSV.js
│   │   ├── pages/
│   │   │   ├── HomePage.js
│   │   │   └── LoginPage.js
│   │   ├── api.js
│   │   ├── auth.js
│   │   └── App.js
│   └── package.json
└── README.md
```

## Features in Detail

### Admin Dashboard
- Clean, modern interface with gradient styling
- Responsive design that works on all devices
- Real-time feedback for all operations

### Agent Management
- Add new agents with name, email, mobile, and password
- Automatic password hashing for security
- Form validation and error handling

### Task Distribution
- Upload CSV files to distribute tasks
- Automatic round-robin distribution among agents
- Support for various CSV formats
- File validation and error handling

### Security Features
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes with middleware
- CORS configuration for security

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the MONGO_URI in your .env file

2. **Port Already in Use**
   - Change the PORT in .env file
   - Kill processes using the ports

3. **CORS Errors**
   - Ensure the frontend URL is added to allowedOrigins in server.js

4. **File Upload Issues**
   - Ensure the uploads directory exists
   - Check file format (only CSV allowed)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License. 
