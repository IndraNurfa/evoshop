# E-Commerce Web Application

## 🌐 Live Demo
[Live Demo](https://milestone-3-indranurfa.vercel.app/)

## 📖 Overview
A modern e-commerce application built with Next.js, featuring product management, shopping cart functionality, and user authentication. The project uses a modern tech stack and implements best practices for testing and styling.

## ✨ Features

- User Authentication with NextAuth
- Product Management
- Shopping Cart System
- Responsive UI with Tailwind CSS
- Real-time Updates with Hot Toast
- Comprehensive Testing Suite

## 🛠️ Technology Stack

### Core Technologies
- **Frontend Framework**: Next.js 15.3.1
- **Programming Language**: TypeScript
- **Styling**: Tailwind CSS 4

### Key Dependencies
- **Authentication**: next-auth
- **Icons**: @fortawesome/react-fontawesome
- **HTTP Client**: axios
- **Image Handling**: react-modal-image
- **Notifications**: react-hot-toast

### Development Tools
- **Testing**: Jest, React Testing Library
- **Linting**: ESLint
- **Code Formatting**: Prettier
- **Type Checking**: TypeScript

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone [repository-url]
   cd milestone-3-indranurfa
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file with necessary configurations.
   ```
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-for-jwt-encryption
   ```

4. **Run development server**:
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🔍 Project Structure

```
milestone-3-indranurfa/
├── app/               # Next.js app directory
├── components/        # Reusable React components
├── contexts/         # React contexts (e.g., CartContext)
├── __tests__/        # Test files
├── public/           # Static assets
└── styles/           # Global styles
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run test suite

## 🧪 Testing

Run the test suite:
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test:watch

# Generate coverage report
npm test:coverage
```