"use client"

import { Button } from "@/components/ui/button"
import { Home, CreditCard, Bell, Settings } from "lucide-react"

interface BottomNavigationProps {
  currentScreen: string
  onScreenChange: (screen: string) => void
}

export function BottomNavigation({ currentScreen, onScreenChange }: BottomNavigationProps) {
  const navItems = [
    { id: "dashboard", label: "Home", icon: Home },
    { id: "create-invoice", label: "Invoice", icon: CreditCard },
    { id: "notifications", label: "Alerts", icon: Bell },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-100/50 shadow-2xl">
      <div className="flex items-center justify-around py-2 pb-6 px-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentScreen === item.id

          return (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => onScreenChange(item.id)}
              className={`flex flex-col items-center gap-1 p-3 h-auto rounded-2xl transition-all duration-300 ${
                isActive
                  ? "text-[#0548B7] bg-[#0548B7]/10 scale-110"
                  : "text-gray-500 hover:text-[#0548B7] hover:bg-gray-100/80"
              }`}
            >
              <div className={`relative ${isActive ? "animate-bounce" : ""}`}>
                <Icon className={`h-5 w-5 ${isActive ? "text-[#0548B7]" : "text-gray-500"}`} />
                {isActive && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#0548B7] rounded-full animate-pulse"></div>
                )}
              </div>
              <span className={`text-xs font-medium ${isActive ? "text-[#0548B7]" : "text-gray-500"}`}>
                {item.label}
              </span>
            </Button>
          )
        })}
      </div>
    </nav>
  )
}
