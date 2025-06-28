"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, DollarSign, Shield, Zap, Check } from "lucide-react"

interface OnboardingStepsProps {
  onComplete: () => void
}

const steps = [
  {
    icon: DollarSign,
    title: "Receive USD Payments",
    description: "Create invoices and get paid by clients worldwide in USD with just 2% fees.",
    color: "text-green-600",
    bgColor: "bg-green-100",
    features: ["Create professional invoices", "Share payment links easily", "Only 2% transaction fee"],
  },
  {
    icon: Shield,
    title: "Secure & Transparent",
    description: "All transactions are secured with bank-level encryption. No hidden fees.",
    color: "text-[#0548B7]",
    bgColor: "bg-[#0548B7]/10",
    features: ["Bank-level security", "No hidden charges", "Transparent pricing"],
  },
  {
    icon: Zap,
    title: "Fast Withdrawals",
    description: "Withdraw to your Nigerian bank, mobile money, crypto wallet, or USD account.",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    features: ["Multiple withdrawal options", "Fast processing", "Competitive rates"],
  },
]

export function OnboardingSteps({ onComplete }: OnboardingStepsProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handleSkip = () => {
    onComplete()
  }

  const currentStepData = steps[currentStep]
  const Icon = currentStepData.icon

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-[#0548B7]/5 to-[#0548B7]/10">
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

      {/* Progress Indicator */}
      <div className="px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-8 rounded-full ${
                  index <= currentStep ? "bg-[#0548B7]" : "bg-gray-200"
                } transition-colors duration-300`}
              />
            ))}
          </div>
          <Button variant="ghost" onClick={handleSkip} className="text-gray-500 text-sm">
            Skip
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-4 py-4">
        <div className="text-center mb-6">
          <div
            className={`w-16 h-16 ${currentStepData.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
          >
            <Icon className={`h-8 w-8 ${currentStepData.color}`} />
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-3">{currentStepData.title}</h2>
          <p className="text-gray-600 leading-relaxed px-2 mb-6 text-sm">{currentStepData.description}</p>
        </div>

        {/* Feature List */}
        <div className="space-y-3 mb-6">
          {currentStepData.features.map((feature, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <Check className={`h-4 w-4 ${currentStepData.color}`} />
                  <p className="font-medium text-sm text-gray-900">{feature}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-6">
        <Button onClick={handleNext} className="w-full bg-[#0548B7] hover:bg-[#0548B7]/90 h-12 text-base">
          {currentStep < steps.length - 1 ? (
            <>
              Next
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          ) : (
            "Get Started"
          )}
        </Button>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>
      </div>
    </div>
  )
}
