"use client"

import { useState } from "react"
import { WelcomeScreen } from "./welcome-screen"
import { SignUpScreen } from "./signup-screen"
import { LoginScreen } from "./login-screen"
import { OnboardingSteps } from "./onboarding-steps"

type OnboardingScreen = "welcome" | "signup" | "login" | "onboarding"

interface OnboardingFlowProps {
  onAuthSuccess: (user: { name: string; email: string }) => void
}

export function OnboardingFlow({ onAuthSuccess }: OnboardingFlowProps) {
  const [currentScreen, setCurrentScreen] = useState<OnboardingScreen>("welcome")
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  const handleSignUpSuccess = (userData: { name: string; email: string }) => {
    setUser(userData)
    setCurrentScreen("onboarding")
  }

  const handleLoginSuccess = (userData: { name: string; email: string }) => {
    setUser(userData)
    onAuthSuccess(userData)
  }

  const handleOnboardingComplete = () => {
    if (user) {
      onAuthSuccess(user)
    }
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "welcome":
        return <WelcomeScreen onSignUp={() => setCurrentScreen("signup")} onLogin={() => setCurrentScreen("login")} />
      case "signup":
        return (
          <SignUpScreen
            onSuccess={handleSignUpSuccess}
            onBackToWelcome={() => setCurrentScreen("welcome")}
            onSwitchToLogin={() => setCurrentScreen("login")}
          />
        )
      case "login":
        return (
          <LoginScreen
            onSuccess={handleLoginSuccess}
            onBackToWelcome={() => setCurrentScreen("welcome")}
            onSwitchToSignUp={() => setCurrentScreen("signup")}
          />
        )
      case "onboarding":
        return <OnboardingSteps onComplete={handleOnboardingComplete} />
      default:
        return null
    }
  }

  return <div className="h-full min-h-screen bg-white flex flex-col">{renderScreen()}</div>
}
