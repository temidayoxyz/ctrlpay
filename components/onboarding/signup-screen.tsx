"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"

interface SignUpScreenProps {
  onSuccess: (user: { name: string; email: string }) => void
  onBackToWelcome: () => void
  onSwitchToLogin: () => void
}

export function SignUpScreen({ onSuccess, onBackToWelcome, onSwitchToLogin }: SignUpScreenProps) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const isFormValid = () => {
    return firstName && lastName && email && password && confirmPassword && password === confirmPassword
  }

  const handleSignUp = async () => {
    if (!isFormValid()) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    onSuccess({
      name: `${firstName} ${lastName}`,
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
        <h1 className="text-lg font-bold text-gray-900">Create Account</h1>
      </div>

      {/* Form */}
      <div className="flex-1 flex flex-col justify-center px-4 py-4 space-y-6 overflow-y-auto">
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Join CTRL+Pay</h2>
          <p className="text-gray-600 text-sm">Create your freelancer account</p>
        </div>

        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Temidayo"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Jacob"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

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
                  placeholder="Create a strong password"
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {password && confirmPassword && password !== confirmPassword && (
              <p className="text-sm text-red-600">Passwords do not match</p>
            )}
          </CardContent>
        </Card>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="text-center">
            <h4 className="font-medium text-green-900 text-sm mb-2">Demo Account</h4>
            <p className="text-xs text-green-700">
              Fill in any details to explore the app. This is a prototype for demonstration purposes.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-4 bg-white border-t border-gray-200 space-y-4">
        <Button
          onClick={handleSignUp}
          disabled={!isFormValid() || isLoading}
          className="w-full bg-[#0548B7] hover:bg-[#0548B7]/90 h-12"
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button onClick={onSwitchToLogin} className="text-[#0548B7] font-medium">
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
