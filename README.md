# 🏥 Child Vaccination Management System

A comprehensive full-stack web application for managing child vaccination records, appointments, and provider inventory with real-time updates and email notifications.

## 🌟 Features

### 👨‍⚕️ Provider Features
- **Vaccine Inventory Management**: Add, update, and track vaccine availability
- **Location Management**: Set vaccine availability by location/facility
- **Appointment Oversight**: Monitor all scheduled vaccinations
- **Real-time Status Updates**: Toggle vaccine availability with location details
- **Dashboard Analytics**: View vaccination statistics

### 👨‍👩‍👧‍👦 Parent Features
- **Child Profile Management**: Register and manage multiple children's profiles
- **Smart Appointment Booking**: Schedule vaccinations based on age-appropriate vaccines
- **Vaccination History**: Comprehensive tracking of completed vaccinations
- **Email Notifications**: Automated appointment confirmations and reminders
- **Availability Checker**: Real-time vaccine availability and location finder



## 🛠️ Tech Stack

### Frontend
- **React.js 18** - Modern UI Framework
- **React Router v6** - Client-side Navigation
- **Axios** - HTTP Client for API calls
- **CSS3** - Custom Styling with Responsive Design

### Backend
- **Node.js** - Runtime Environment
- **Express.js** - Web Framework
- **MongoDB** - NoSQL Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication & Authorization
- **bcryptjs** - Password Hashing
- **Nodemailer** - Email Service Integration
- **CORS** - Cross-Origin Resource Sharing

### Deployment & Infrastructure
- **Vercel** - Hosting Platform for both Frontend & Backend
- **MongoDB Atlas** - Cloud Database Service
- **GitHub** - Version Control & CI/CD

## 📦 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local) or MongoDB Atlas account
- Gmail account (for email notifications)
- Git

### 🔧 Local Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/Rakshitha-akki/child_vaccination_management_system.git
cd child_vaccination_management_system
```

2. **Backend Setup**
```bash
cd vaccination-backend
npm install

# Create environment file
cp .env.example .env

# Update .env with your configuration
# Start development server
npm run dev
```

3. **Frontend Setup**
```bash
cd ../vaccination-frontend
npm install

# Create environment file
cp .env.example .env

# Update .env with backend URL
# Start development server
npm start
```

4. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3000

## 🌐 Production Deployment

### 🚀 Deploy to Vercel (Free & Easy)

#### Prerequisites
- GitHub account
- Vercel account (free)
- MongoDB Atlas account (free)

#### Step 1: Prepare Repository
```bash
# Ensure all changes are committed
git add .
git commit -m "Ready for production deployment"
git push origin main
```

#### Step 2: Setup MongoDB Atlas
1. Create account at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create a free M0 cluster
3. Create database user
4. Whitelist IP: `0.0.0.0/0` (allow from anywhere)
5. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/vaccination_db`

#### Step 3: Deploy Backend
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project" → Import your repository
3. Configure:
   - **Project Name**: `vaccination-backend`
   - **Root Directory**: `vaccination-backend`
   - **Framework Preset**: Other

4. **Environment Variables** (Add in Vercel dashboard):
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vaccination_db
JWT_SECRET=your-super-secure-64-character-jwt-secret
FRONTEND_URL=https://vaccination-frontend.vercel.app
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
```

#### Step 4: Deploy Frontend
1. Create another Vercel project
2. Import same GitHub repository
3. Configure:
   - **Project Name**: `vaccination-frontend`
   - **Root Directory**: `vaccination-frontend`
   - **Framework Preset**: Create React App

4. **Environment Variables**:
```env
REACT_APP_API_URL=https://vaccination-backend.vercel.app
```

#### Step 5: Update CORS Configuration
After deployment, the backend is already configured to accept requests from Vercel domains.

### 📧 Email Setup (Gmail)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account Settings → Security
   - Under "2-Step Verification", click "App passwords"
   - Select "Mail" and "Other (Custom name)"
   - Enter "Vaccination App"
   - Copy the 16-character password (format: `xxxx xxxx xxxx xxxx`)
3. **Use this password** in `EMAIL_PASS` environment variable

## 📱 API Documentation

### Base URL
- Development: `http://localhost:3000`
- Production: `https://vaccination-backend.vercel.app`

### Authentication Endpoints
```
POST /api/auth/register - User registration
POST /api/auth/login    - User login
```

### Vaccine Endpoints
```
GET  /api/vaccines/all       - Get all vaccines
GET  /api/vaccines/available - Get available vaccines
PUT  /api/vaccines/update/:id - Update vaccine availability
POST /api/vaccines/initialize - Initialize default vaccines
```

### Appointment Endpoints
```
POST /api/appointments/book      - Book new appointment
GET  /api/appointments/user/:id  - Get user appointments
GET  /api/appointments/all       - Get all appointments (providers only)
```

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Input validation and sanitization
- SQL injection prevention (NoSQL)
- XSS protection headers

## 🧪 Testing

### Local Testing
```bash
# Test backend API
curl http://localhost:3000/

# Test frontend
npm test
```

### Production Testing
```bash
# Test deployed backend
curl https://vaccination-backend.vercel.app/

# Test deployed frontend
# Visit https://vaccination-frontend.vercel.app
```

## 📊 Project Structure

```
vaccination-management/
├── vaccination-backend/
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   ├── vercel.json        # Vercel deployment config
│   └── .env.example       # Environment template
├── vaccination-frontend/
│   ├── src/
│   │   ├── pages/         # React pages
│   │   ├── components/    # React components
│   │   └── App.js         # Main App component
│   ├── package.json       # Frontend dependencies
│   ├── vercel.json       # Vercel deployment config
│   └── .env.example      # Environment template
└── README.md             # This file
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Rakshitha** - *Initial work* - [Rakshitha-akki](https://github.com/Rakshitha-akki)

## 🙏 Acknowledgments

- Thanks to all contributors
- Inspired by healthcare digitization needs
- Built for community health improvement

## 📞 Support

For support, create an issue on GitHub or contact the development team.

## 🚀 Quick Deployment Commands

```bash
# 1. Clone and setup
git clone https://github.com/Rakshitha-akki/child_vaccination_management_system.git
cd child_vaccination_management_system

# 2. Push any final changes
git add .
git commit -m "Final deployment preparation"
git push origin main

# 3. Deploy on Vercel
# - Go to vercel.com
# - Import GitHub repository
# - Deploy backend (root: vaccination-backend)
# - Deploy frontend (root: vaccination-frontend)
# - Add environment variables

# 4. Test deployment
curl https://vaccination-backend.vercel.app/
# Visit https://vaccination-frontend.vercel.app
```

---

⭐ **Star this repository if you found it helpful!**

🎯 **Ready for deployment? Follow the steps above and your vaccination management system will be live in minutes!**
