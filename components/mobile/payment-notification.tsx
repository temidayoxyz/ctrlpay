"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, X, DollarSign, Sparkles } from "lucide-react"

interface PaymentNotificationProps {
  data: {
    amount: number
    description: string
    invoiceId: string
  }
  onClose: () => void
}

export function PaymentNotification({ data, onClose }: PaymentNotificationProps) {
  return (
    <div className="absolute top-4 left-4 right-4 z-50 animate-in slide-in-from-top duration-500">
      <Card className="bg-gradient-to-r from-green-50 to-green-100/80 border-0 shadow-2xl shadow-green-500/20 backdrop-blur-xl">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Check className="h-5 w-5 text-green-600" />
                <h4 className="font-bold text-green-900">Payment Received!</h4>
                <Sparkles className="h-4 w-4 text-green-600 animate-pulse" />
              </div>
              <p className="text-sm text-green-800 font-semibold">
                ${data.amount.toFixed(2)} for {data.description}
              </p>
              <p className="text-xs text-green-700 mt-1 font-medium">Funds added to your USD wallet</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2 h-auto text-green-600 hover:bg-green-200/50 rounded-xl transition-all duration-200"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
