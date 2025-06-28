"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { User, Bell, Shield, CreditCard, HelpCircle, LogOut, ChevronRight, Smartphone, Globe } from "lucide-react"
import { useState } from "react"

interface MobileSettingsProps {
  user: { name: string; email: string } | null
  onLogout: () => void
}

export function MobileSettings({ user, onLogout }: MobileSettingsProps) {
  const [notifications, setNotifications] = useState(true)
  const [biometric, setBiometric] = useState(false)

  const settingsGroups = [
    {
      title: "Account",
      items: [
        { icon: User, label: "Profile Information", action: () => {} },
        { icon: CreditCard, label: "Payment Methods", action: () => {} },
        { icon: Shield, label: "Security Settings", action: () => {} },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          icon: Bell,
          label: "Push Notifications",
          toggle: true,
          value: notifications,
          onChange: setNotifications,
        },
        {
          icon: Smartphone,
          label: "Biometric Login",
          toggle: true,
          value: biometric,
          onChange: setBiometric,
        },
        { icon: Globe, label: "Language & Region", action: () => {} },
      ],
    },
    {
      title: "Support",
      items: [
        { icon: HelpCircle, label: "Help Center", action: () => {} },
        { icon: Shield, label: "Privacy Policy", action: () => {} },
        { icon: Shield, label: "Terms of Service", action: () => {} },
      ],
    },
  ]

  return (
    <div className="p-4 space-y-6">
      <div className="text-center py-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Settings</h2>
        <p className="text-gray-600 text-sm">Manage your account and preferences</p>
      </div>

      {/* User Profile Card */}
      {user && (
        <Card className="bg-gradient-to-r from-[#0548B7] to-[#0548B7]/90 text-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold">{user.name}</h3>
                <p className="text-blue-100 text-sm">{user.email}</p>
                <p className="text-blue-100 text-xs mt-1">Verified Account</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Settings Groups */}
      {settingsGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide px-2">{group.title}</h3>
          <Card>
            <CardContent className="p-0">
              {group.items.map((item, itemIndex) => {
                const Icon = item.icon
                return (
                  <div
                    key={itemIndex}
                    className={`flex items-center justify-between p-4 ${
                      itemIndex < group.items.length - 1 ? "border-b border-gray-100" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-gray-600" />
                      <span className="font-medium text-gray-900">{item.label}</span>
                    </div>
                    {item.toggle ? (
                      <Switch
                        checked={item.value}
                        onCheckedChange={item.onChange}
                        className="data-[state=checked]:bg-[#0548B7]"
                      />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      ))}

      {/* Logout Button */}
      <Card>
        <CardContent className="p-0">
          <Button
            variant="ghost"
            onClick={onLogout}
            className="w-full justify-start p-4 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </Button>
        </CardContent>
      </Card>

      {/* App Version */}
      <div className="text-center py-4">
        <p className="text-xs text-gray-500">CTRL+Pay v1.0.0</p>
      </div>
    </div>
  )
}
