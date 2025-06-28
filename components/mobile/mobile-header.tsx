"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Bell, User } from "lucide-react"
import { useState } from "react"

interface MobileHeaderProps {
  currentScreen: string
  balance: number
  onBack: () => void
  user?: { name: string; email: string } | null
  onLogout?: () => void
}

export function MobileHeader({ currentScreen, balance, onBack, user, onLogout }: MobileHeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false)

  const getTitle = () => {
    switch (currentScreen) {
      case "dashboard":
        return user ? `Hi, ${user.name.split(" ")[0]}` : "Hi there"
      case "create-invoice":
        return "Create Invoice"
      case "share-simulation":
        return "Share Invoice"
      case "client-payment":
        return "Client Payment"
      case "withdraw":
        return "Withdraw"
      case "transactions":
        return "Transactions"
      case "notifications":
        return "Notifications"
      case "settings":
        return "Settings"
      default:
        return "CTRL+Pay"
    }
  }

  const showBackButton =
    currentScreen !== "dashboard" &&
    currentScreen !== "transactions" &&
    currentScreen !== "notifications" &&
    currentScreen !== "settings"

  return (
    <div className="bg-white/95 backdrop-blur-xl border-b border-gray-100/50">
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

      {/* App Header */}
      <header className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBackButton ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="p-2 hover:bg-gray-100/80 transition-all duration-200 rounded-xl"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          ) : (
            user && (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 hover:bg-gray-100/80 transition-all duration-200 rounded-xl"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-[#0548B7] to-[#0548B7]/80 rounded-full flex items-center justify-center shadow-lg">
                    <User className="h-4 w-4 text-white" />
                  </div>
                </Button>

                {showUserMenu && (
                  <div className="absolute left-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl z-50 animate-in slide-in-from-top-2 duration-200">
                    <div className="p-3 border-b border-gray-100">
                      <p className="font-semibold text-sm text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <div className="p-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={onLogout}
                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50/80 rounded-xl transition-all duration-200"
                      >
                        Sign Out
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )
          )}
          <h1 className="text-lg font-bold text-gray-900 transition-all duration-300">{getTitle()}</h1>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-gray-100/80 transition-all duration-200 rounded-xl relative"
          >
            <Bell className="h-5 w-5 text-gray-600" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </Button>
        </div>
      </header>
    </div>
  )
}
