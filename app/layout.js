import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider
} from '@clerk/nextjs'
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/ThemeProvider.tsx"
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SKILL ANALYSER — AI-Powered Mock Interviews",
  description: "Practice with AI-powered mock interviews tailored to your role. Get instant feedback and ace your next interview.",
};

export default function RootLayout({ children }) {
  return (
    
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      fallbackRedirectUrl="/dashboard"
    >
      <html lang="en">
        <body className={inter.className}>
          <Toaster />
          <ThemeProvider
            attribute="class"
            defaultTheme="white"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          </body>
      </html>
    </ClerkProvider>
  );
}
