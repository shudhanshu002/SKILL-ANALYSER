# SKILL ANALYSER - AI Mock Interview Platform

![Demo Homepage](file:///C:/Users/sudha/.gemini/antigravity/brain/c0dcf605-9f27-42c8-8b41-835a7eeb9253/demo_homepage_1778661349180.png)

[![Next.js](https://img.shields.io/badge/Next.js-14.2.4-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791)](https://neon.tech/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF)](https://clerk.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-2.5_Flash-4285F4)](https://ai.google.dev/)

---

## 🎯 Overview

**Skill Analys​er** is an AI‑powered mock interview platform that helps job seekers practice realistic interview scenarios. It generates tailored questions, records spoken answers, transcribes them, and provides instant, data‑driven feedback.

---

## 🚀 Features

### Core
- **AI‑Generated Questions** – Powered by Google Gemini, creates 5 custom questions per interview based on role, description, and experience.
- **Real‑Time Audio Capture** – Record answers via microphone; optional webcam video support.
- **Instant Feedback** – AI rates each answer (1‑10) and offers actionable improvement suggestions.
- **Interview History** – Review past Q&A sessions with full transcription and feedback.
- **Responsive Design** – Mobile‑first UI with dark/light mode.

### User Experience
- **Secure Authentication** – Clerk integration for sign‑in/up.
- **Dashboard** – Central hub to manage interviews, view history, and track progress.
- **Subscription Plans** – Stripe powered plans ($7.99/mo, $49/yr).
- **Newsletter Capture** – Lead generation for community updates.
- **Diagnostics** – Built‑in connectivity checker for quick troubleshooting.
- **Docker Support** – Containerized dev and prod workflows.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 14, React 18, Tailwind CSS 3, Shadcn UI, Framer Motion |
| **Backend** | Next.js API Routes, Drizzle ORM 0.31.2, PostgreSQL (Neon) |
| **Auth** | Clerk |
| **AI** | Google Gemini 2.5 Flash |
| **Payments** | Stripe |
| **Containerisation** | Docker & Docker Compose |
| **CI/CD** | Vercel (recommended) |

---

## 📦 Installation

```bash
# 1. Clone repository
git clone https://github.com/shudhanshu002/Ai-mock-interviewer.git
cd Ai-mock-Interview

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local
# Edit .env.local with your keys (see section below)

# 4. Initialise database (Neon/PostgreSQL)
npm run db:push

# 5. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔧 Environment Variables

Create a `.env.local` file in the project root:

```env
# Database
DRIZZLE_DB_URL=postgresql://<username>:<password>@<host>/<database>

# Gemini AI
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Stripe (optional)
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# App Metadata
NEXT_PUBLIC_INFORMATION="AI Mock Interview Platform"
```

---

## 🐳 Docker Deployment

### Development
```bash
docker compose up --build
```

### Production
```bash
# Build optimized image
docker build -f Dockerfile.prod -t skill-analyser .

# Run container
docker run -p 3000:3000 skill-analyser
```

---

## 📖 Usage

### Creating an Interview
1. Sign in.
2. Navigate to **Dashboard** → **Add New Interview**.
3. Provide job position, description, and experience level.
4. AI generates 5 custom questions.

### Taking the Interview
1. Click **Start Interview**.
2. Enable microphone (and webcam if desired).
3. Record each answer and move with **Previous/Next**.
4. Submit to receive AI‑driven rating and suggestions.

### Reviewing Feedback
- Access detailed feedback on the interview page or through the dashboard.
- View overall rating, per‑question scores, and improvement tips.

---

## ⚡️ Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm start            # Start production server
npm run lint         # Linting with ESLint
npm run db:push      # Apply DB schema changes
npm run db:studio    # Open Drizzle Studio UI
```

---

## 🚀 Deployment

### Vercel (Recommended)
1. Connect the GitHub repo to Vercel.
2. Add the same environment variables in the Vercel dashboard.
3. Deploy – Vercel will rebuild on each push.

### Docker (see above)

---

## 🤝 Contributing

1. Fork the repo.
2. Create a feature branch (`git checkout -b feature/awesome-feature`).
3. Commit your changes (`git commit -m "Add awesome feature"`).
4. Push (`git push origin feature/awesome-feature`).
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Google Gemini AI** – powering question generation and feedback.
- **Clerk** – seamless authentication.
- **Neon** – serverless PostgreSQL.
- **Shadcn UI** – beautiful UI components.
- **Stripe** – subscription handling.

---

## 📞 Support

For assistance, email **support@skillanalyser.com** or join our Discord community.

---

**Made with ❤️ for job seekers worldwide**
