"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"

interface LoginScreenProps {
  onSuccess: (user: { name: string; email: string }) => void
  onBackToWelcome: () => void
  onSwitchToSignUp: () => void
}

export function LoginScreen({ onSuccess, onBackToWelcome, onSwitchToSignUp }: LoginScreenProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const isFormValid = () => {
    return email && password
  }

  const handleLogin = async () => {
    if (!isFormValid()) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    onSuccess({
      name: "Temidayo Jacob", // Changed from "John Doe"
      email: email,
    })
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Status Bar */}
      <div className="flex items-center justify-between px-4 py-1 text-xs font-medium">
        <div className="flex items-center gap-1">
          <span>9:41</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-black rounded-full"></div>
            <div className="w-1 h-3 bg-black rounded-full"></div>
            <div className="w-1 h-3 bg-black rounded-full"></div>
            <div className="w-1 h-3 bg-gray-300 rounded-full"></div>
          </div>
          <svg width="18" height="12" viewBox="0 0 18 12" className="ml-1">
            <rect x="1" y="3" width="14" height="6" rx="2" fill="none" stroke="black" strokeWidth="1" />
            <rect x="16" y="5" width="1" height="2" rx="0.5" fill="black" />
            <rect x="2" y="4" width="12" height="4" rx="1" fill="black" />
          </svg>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center">
        <Button variant="ghost" size="sm" onClick={onBackToWelcome} className="p-2 mr-3">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-bold text-gray-900">Sign In</h1>
      </div>

      {/* Form */}
      <div className="flex-1 flex flex-col justify-center px-4 py-4 space-y-6">
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600 text-sm">Sign in to your CTRL+Pay account</p>
        </div>

        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="dayo@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="text-right">
              <button className="text-sm text-[#0548B7] hover:underline">Forgot Password?</button>
            </div>
          </CardContent>
        </Card>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="text-center">
            <h4 className="font-medium text-green-900 text-sm mb-2">Demo Account</h4>
            <p className="text-xs text-green-700">
              Use any email and password to explore the app. This is a prototype for demonstration purposes.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-4 bg-white border-t border-gray-200 space-y-4">
        <Button
          onClick={handleLogin}
          disabled={!isFormValid() || isLoading}
          className="w-full bg-[#0548B7] hover:bg-[#0548B7]/90 h-12"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <button onClick={onSwitchToSignUp} className="text-[#0548B7] font-medium">
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
