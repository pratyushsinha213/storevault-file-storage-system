# StoreVault – File Storage System

A modern, full-stack file storage and management system with AI-powered features, built with React, Node.js, and MongoDB.

![StoreVault](https://img.shields.io/badge/StoreVault-File%20Storage-blue)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933)
![MongoDB](https://img.shields.io/badge/MongoDB-8.16.4-47A248)

## 🚀 Features

### Core File Management
- **Secure File Upload & Storage**: Upload files to AWS S3 with secure access controls
- **Folder Organization**: Create, rename, and organize files in hierarchical folders
- **File Preview**: Preview PDFs and other document types directly in the browser
- **Drag & Drop**: Intuitive drag-and-drop interface for file management
- **Search & Filter**: Advanced search functionality with command palette interface

### AI-Powered Features
- **AI Assistant**: Chat with your files using Google Gemini AI
- **Document Analysis**: AI-powered document processing and insights
- **Smart File Organization**: AI suggestions for file categorization

### User Management & Security
- **Authentication**: JWT-based user authentication with secure login/logout
- **Role-Based Access**: User and admin roles with different permissions
- **File Permissions**: Private, public, and shared file visibility options
- **Storage Limits**: Configurable storage limits per user tier

### Analytics & Insights
- **Usage Analytics**: Track file uploads, storage usage, and user activity
- **Storage Monitoring**: Real-time storage usage tracking
- **Activity Dashboard**: Visual analytics with charts and graphs

### Payment Integration
- **Stripe Integration**: Secure payment processing for premium plans
- **Subscription Management**: Monthly and yearly subscription options
- **Plan Upgrades**: Seamless plan upgrades with payment processing

### Modern UI/UX
- **Responsive Design**: Mobile-first responsive design
- **Dark Mode**: Beautiful dark theme with modern UI components
- **Real-time Updates**: Live updates with toast notifications
- **Loading States**: Smooth loading animations and skeleton screens

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **Radix UI** - Accessible UI primitives
- **Zustand** - Lightweight state management
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **Recharts** - Data visualization library
- **React PDF Viewer** - PDF preview functionality
- **Drag & Drop Kit** - Drag and drop functionality

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload middleware
- **AWS SDK** - S3 integration for file storage
- **Stripe** - Payment processing
<!-- - **BullMQ** - Job queue for background tasks -->
<!-- - **Redis** - Caching and session storage -->
- **Google Generative AI** - AI-powered features

### DevOps & Tools
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **ESLint** - Code linting
- **nodemon** - Development server with auto-restart

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- Redis
- AWS S3 Account
- Stripe Account
- Google AI API Key

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/pratyushsinha213/storevault-file-storage-system
   cd storevault-file-storage-system
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the backend directory:
   ```env
   PORT=5500
   MONGODB_URI=mongodb://localhost:27017/storevault
   JWT_SECRET=your_jwt_secret_here
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_REGION=your_aws_region
   AWS_S3_BUCKET=your_s3_bucket_name
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   GOOGLE_AI_API_KEY=your_google_ai_api_key
   ```

4. **Start the backend server**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

### Docker Setup (Alternative)

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

## 🚀 Usage

### Getting Started

1. **Register an Account**
   - Visit the application and click "Register"
   - Fill in your details and create an account
   - Verify your email (if required)

2. **Upload Files**
   - Navigate to the Files page
   - Drag and drop files or click to browse
   - Create folders to organize your files

3. **Use AI Assistant**
   - Go to the AI Assistant page
   - Chat with your files using natural language
   - Get insights and analysis from your documents

4. **View Analytics**
   - Check the Analytics page for usage statistics
   - Monitor your storage usage and activity

5. **Upgrade Plan**
   - Visit the Upgrade Plan page to access premium features
   - Choose between monthly and yearly subscriptions

### File Management

- **Upload**: Drag and drop files or use the upload button
- **Organize**: Create folders and move files between them
- **Search**: Use the command palette (Cmd/Ctrl + K) to search files
- **Share**: Set file permissions to share with other users
- **Preview**: Click on files to preview them in the browser

### AI Features

- **Chat**: Ask questions about your uploaded documents
- **Analysis**: Get AI-powered insights from your files
- **Organization**: Receive suggestions for file organization

## 📁 Project Structure

```
StoreVault/
├── backend/                 # Node.js/Express backend
│   ├── config/             # Database and environment config
│   ├── controllers/        # Route controllers
│   ├── middlewares/        # Custom middleware
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── services/           # Business logic services
│   ├── utils/              # Utility functions
│   └── workers/            # Background job workers
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── store/          # Zustand state management
│   │   └── utils/          # Utility functions
│   └── public/             # Static assets
└── docker-compose.yml      # Docker configuration
```

## 🔧 API Endpoints

### Authentication
- `POST /api/v1/users/register` - User registration
- `POST /api/v1/users/login` - User login
- `POST /api/v1/users/logout` - User logout
- `GET /api/v1/users/profile` - Get user profile

### Files
- `GET /api/v1/files` - Get user files
- `POST /api/v1/files/upload` - Upload file
- `POST /api/v1/files/folder` - Create folder
- `PUT /api/v1/files/:id` - Update file/folder
- `DELETE /api/v1/files/:id` - Delete file/folder

### AI Assistant
- `POST /api/v1/ai-assistant/chat` - Chat with AI
- `POST /api/v1/ai-assistant/process` - Process documents

### Analytics
- `GET /api/v1/analytics/usage` - Get usage analytics
- `GET /api/v1/analytics/storage` - Get storage analytics

### Payments
- `POST /api/v1/payments/create-session` - Create payment session
- `POST /api/v1/payments/webhook` - Stripe webhook handler

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for password security
- **CORS Protection**: Configured CORS for secure cross-origin requests
- **File Validation**: File type and size validation
- **Rate Limiting**: API rate limiting (can be implemented)
- **Input Sanitization**: Protection against XSS and injection attacks

## 🚀 Deployment

### Production Build

1. **Build the frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Start production backend**
   ```bash
   cd backend
   npm start
   ```

### Environment Variables

Make sure to set all required environment variables for production:
- Database connection strings
- AWS credentials
- Stripe keys
- JWT secrets
- Redis connection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

<!-- ## 📝 License

This project is licensed under the ISC License. -->

<!-- ## 🆘 Support

For support, email support@storevault.com or create an issue in the repository. -->

## 🔮 Roadmap

- [ ] Real-time collaboration features
- [ ] Advanced file versioning
- [ ] Mobile app development
- [ ] Advanced AI document processing
- [ ] Team management features
- [ ] Advanced analytics dashboard
- [ ] File encryption at rest
- [ ] Multi-region deployment

---

**StoreVault** - Secure, AI-powered file storage for the modern world. 