"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, WalletCardsIcon, Shield, Zap, Check } from "lucide-react"

interface WelcomeScreenProps {
  onSignUp: () => void
  onLogin: () => void
}

export function WelcomeScreen({ onSignUp, onLogin }: WelcomeScreenProps) {
  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-[#0548B7]/10 via-white to-[#0548B7]/5">
      {/* Status Bar - Only show on mobile */}
      <div className="flex items-center justify-between px-4 py-1 text-xs font-medium sm:hidden">
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-between px-4 py-6">
        {/* Logo and Brand */}
        <div className="text-center pt-8 animate-in zoom-in duration-700">
          <div className="w-24 h-24 bg-gradient-to-br from-[#0548B7] to-[#0548B7]/80 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-[#0548B7]/30 animate-bounce">
            <WalletCardsIcon className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">CTRL+Pay</h1>
          <p className="text-lg font-semibold text-gray-700 mb-2">Take Control of Your Payments</p>
          <p className="text-sm text-gray-600 font-medium">Get paid in USD by global clients</p>
        </div>

        {/* Feature Highlights */}
        <div className="space-y-4 my-8 px-2">
          {[
            { icon: Check, title: "Low 2% Fees", desc: "Keep more of what you earn", color: "green", delay: "100" },
            { icon: Shield, title: "Secure & Trusted", desc: "Bank-level security", color: "blue", delay: "200" },
            { icon: Zap, title: "Fast Payouts", desc: "Get paid instantly", color: "purple", delay: "300" },
          ].map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className={`bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/20 animate-in slide-in-from-left duration-500`}
                style={{ animationDelay: `${feature.delay}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${
                      feature.color === "green"
                        ? "from-green-500 to-green-600"
                        : feature.color === "blue"
                          ? "from-[#0548B7] to-[#0548B7]/80"
                          : "from-purple-500 to-purple-600"
                    } rounded-2xl flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{feature.title}</p>
                    <p className="text-sm text-gray-600 font-medium">{feature.desc}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 animate-in slide-in-from-bottom duration-500 delay-500">
          <Button
            onClick={onSignUp}
            className="w-full bg-gradient-to-r from-[#0548B7] to-[#0548B7]/90 hover:from-[#0548B7]/90 hover:to-[#0548B7] text-white rounded-2xl h-14 text-lg font-bold shadow-2xl shadow-[#0548B7]/30 transition-all duration-300 hover:scale-105"
          >
            Get Started
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
          <Button
            onClick={onLogin}
            variant="outline"
            className="w-full h-14 text-lg font-semibold bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-2xl hover:border-[#0548B7] hover:text-[#0548B7] transition-all duration-300 hover:scale-105"
          >
            I already have an account
          </Button>
        </div>
      </div>
    </div>
  )
}
