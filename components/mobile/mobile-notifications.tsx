"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Bell, DollarSign, AlertCircle, CheckCircle } from "lucide-react"

export function MobileNotifications() {
  const notifications = [
    {
      id: "1",
      type: "payment",
      title: "Payment Received",
      message: "You received $500 from Acme Corp for Website Design",
      time: "2 hours ago",
      read: false,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: "2",
      type: "withdrawal",
      title: "Withdrawal Completed",
      message: "Your withdrawal of $200 to your bank account was successful",
      time: "1 day ago",
      read: true,
      icon: CheckCircle,
      color: "text-[#0548B7]",
      bgColor: "bg-blue-100",
    },
    {
      id: "3",
      type: "alert",
      title: "Exchange Rate Alert",
      message: "USD to NGN rate has improved to ₦1,550/$1",
      time: "2 days ago",
      read: true,
      icon: AlertCircle,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  return (
    <div className="p-4 space-y-4">
      <div className="text-center py-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Notifications</h2>
        <p className="text-gray-600 text-sm">Stay updated with your account activity</p>
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => {
          const Icon = notification.icon
          return (
            <Card key={notification.id} className={`${!notification.read ? "border-[#0548B7] bg-blue-50/30" : ""}`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 ${notification.bgColor} rounded-full flex items-center justify-center`}>
                    <Icon className={`h-5 w-5 ${notification.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium text-gray-900 text-sm">{notification.title}</h4>
                      {!notification.read && <div className="w-2 h-2 bg-[#0548B7] rounded-full"></div>}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {notifications.length === 0 && (
        <div className="text-center py-12">
          <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No notifications yet</p>
        </div>
      )}
    </div>
  )
}
