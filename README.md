# SKILL ANALYSER - AI Mock Interview Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.2.4-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791)](https://neon.tech/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF)](https://clerk.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-2.5_Flash-4285F4)](https://ai.google.dev/)

An AI-powered mock interview platform that helps users practice and ace their job interviews through realistic question generation, real-time audio recording, and instant personalized feedback.

## 🚀 Features

### Core Functionality

- **AI-Generated Questions**: Generate 5 tailored interview questions based on job position, description, and experience level using Google Gemini AI
- **Real-Time Recording**: Record answers via microphone with automatic transcription
- **Instant Feedback**: Receive AI-powered ratings (1-10) and detailed improvement suggestions
- **Interview History**: Review past interviews with complete Q&A breakdowns
- **Responsive Design**: Mobile-first design with dark/light mode support

### User Experience

- **Authentication**: Secure sign-in/sign-up with Clerk authentication
- **Dashboard**: Centralized hub for managing interviews and viewing history
- **Webcam Integration**: Optional video recording for enhanced practice
- **Progress Tracking**: Navigate through questions with previous/next controls
- **Feedback Dashboard**: Comprehensive review with color-coded sections

### Additional Features

- **Pricing Plans**: Subscription-based access with Stripe integration ($7.99/month, $49/year)
- **Newsletter Signup**: Lead capture for user engagement
- **Diagnostics**: Built-in connectivity checker for troubleshooting
- **Docker Support**: Containerized deployment for development and production

## 🛠 Tech Stack

### Frontend

- **Next.js 14.2.4** - React framework with App Router
- **React 18.3.1** - UI library
- **Tailwind CSS 3.4.0** - Utility-first CSS framework
- **Shadcn UI** - Modern component library based on Radix UI
- **Framer Motion** - Animation library

### Backend & Database

- **Next.js API Routes** - Server-side logic
- **PostgreSQL (Neon)** - Serverless database
- **Drizzle ORM 0.31.2** - Type-safe SQL query builder
- **Clerk** - Authentication and user management

### AI & Integrations

- **Google Generative AI (Gemini 2.5 Flash)** - Question generation and feedback analysis
- **Stripe** - Payment processing
- **Web Audio API** - Audio recording and transcription

### Development Tools

- **Docker & Docker Compose** - Containerization
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL database (Neon recommended)
- Google Gemini API key
- Clerk account for authentication
- Stripe account for payments (optional)

## 🚀 Installation

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd ai-mock-interview
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

    ```env
    # Database
    DRIZZLE_DB_URL=postgresql://username:password@host:port/database

    # AI
    NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key

    # Authentication
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    CLERK_SECRET_KEY=your_clerk_secret_key
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

    # Stripe (for payments)
    STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
    STRIPE_SECRET_KEY=your_stripe_secret_key
    STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

    # App Info
    NEXT_PUBLIC_INFORMATION=your_app_description
    ```

4. **Set up the database**

    ```bash
    # Push schema to database
    npm run db:push

    # (Optional) Open Drizzle Studio to view database
    npm run db:studio
    ```

5. **Run the development server**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🐳 Docker Deployment

### Development

```bash
docker compose up --build
```

### Production

```bash
# Build production image
docker build -f Dockerfile.prod -t skill-analyser .

# Run production container
docker run -p 3000:3000 skill-analyser
```

## 📖 Usage

### Creating an Interview

1. Sign in to your account
2. Navigate to the dashboard
3. Click "Add New Interview"
4. Enter job position, description, and experience level
5. AI generates 5 tailored questions

### Taking an Interview

1. Start the interview from your dashboard
2. Enable microphone and optional webcam
3. Answer each question by recording your response
4. Navigate through questions using Previous/Next buttons
5. End interview to view AI feedback

### Reviewing Feedback

- Access feedback from the interview page or dashboard
- View overall rating and detailed Q&A breakdown
- Review AI suggestions for improvement

## 🗄 Database Schema

The application uses the following main tables:

- **MockInterview**: Stores interview metadata and generated questions
- **UserAnswer**: Records user responses and AI feedback
- **Question**: PYQ (Past Year Questions) feature
- **Newsletter**: Email lead capture

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run db:push      # Apply database schema changes
npm run db:studio    # Open Drizzle Studio
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Docker

Use the provided `Dockerfile.prod` for production builds with multi-stage optimization.

### Manual Server

```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini AI for powering the interview generation and feedback
- Clerk for seamless authentication
- Neon for reliable PostgreSQL hosting
- Shadcn UI for beautiful components

## 📞 Support

For support, email support@skillanalyser.com or join our Discord community.

---

**Made with ❤️ for job seekers worldwide**
