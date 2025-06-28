"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Building, Wallet, Bitcoin, Shield, Check } from "lucide-react"

interface Invoice {
  id: string
  amount: number
  description: string
  clientEmail: string
  status: "pending" | "paid"
  paymentLink: string
}

interface MobilePaymentPageProps {
  invoice: Invoice | null
  onPaymentCompleted: (amount: number) => void
}

export function MobilePaymentPage({ invoice, onPaymentCompleted }: MobilePaymentPageProps) {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [cardData, setCardData] = useState({
    name: "",
  })

  if (!invoice) return null

  const processingFee = invoice.amount * 0.029
  const totalAmount = invoice.amount + processingFee

  const handlePayment = async () => {
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setIsCompleted(true)
    setTimeout(() => {
      onPaymentCompleted(invoice.amount)
    }, 2000)
  }

  if (isCompleted) {
    return (
      <div className="p-4 text-center space-y-6 py-12">
        <div className="w-20 h-20 bg-[#0548B7]/10 rounded-full flex items-center justify-center mx-auto">
          <Check className="h-10 w-10 text-green-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600">Your payment of ${invoice.amount.toFixed(2)} has been processed.</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-700">The freelancer will receive their funds immediately.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-6">
      <div className="text-center py-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Complete Payment</h2>
        <p className="text-gray-600 text-sm">Secure payment powered by CTRL+Pay</p>
      </div>

      {/* Invoice Summary */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <h3 className="font-semibold text-gray-900">Payment Details</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">{invoice.description}</span>
              <span className="font-bold">${invoice.amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Processing fee (2.9%)</span>
              <span>${processingFee.toFixed(2)}</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Payment Method</h3>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center gap-3 flex-1 cursor-pointer">
                  <CreditCard className="h-5 w-5 text-[#0548B7]" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">Credit/Debit Card</p>
                    <p className="text-xs text-gray-500">Visa, Mastercard, Amex</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Instant
                  </Badge>
                </Label>
              </div>

              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <RadioGroupItem value="bank" id="bank" />
                <Label htmlFor="bank" className="flex items-center gap-3 flex-1 cursor-pointer">
                  <Building className="h-5 w-5 text-green-600" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">Bank Transfer</p>
                    <p className="text-xs text-gray-500">Direct bank transfer</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    1-2 days
                  </Badge>
                </Label>
              </div>

              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal" className="flex items-center gap-3 flex-1 cursor-pointer">
                  <Wallet className="h-5 w-5 text-blue-500" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">PayPal</p>
                    <p className="text-xs text-gray-500">Pay with PayPal balance</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Instant
                  </Badge>
                </Label>
              </div>

              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <RadioGroupItem value="crypto" id="crypto" />
                <Label htmlFor="crypto" className="flex items-center gap-3 flex-1 cursor-pointer">
                  <Bitcoin className="h-5 w-5 text-orange-500" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">Cryptocurrency</p>
                    <p className="text-xs text-gray-500">BTC, ETH, USDC</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    10-30 min
                  </Badge>
                </Label>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Card Details Form */}
      {paymentMethod === "card" && (
        <Card>
          <CardContent className="p-4 space-y-4">
            <h3 className="font-semibold text-gray-900">Card Details</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="cardNumber" className="text-sm">
                  Card Number
                </Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="expiry" className="text-sm">
                    Expiry
                  </Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div>
                  <Label htmlFor="cvv" className="text-sm">
                    CVV
                  </Label>
                  <Input id="cvv" placeholder="123" />
                </div>
              </div>
              <div>
                <Label htmlFor="name" className="text-sm">
                  Cardholder Name
                </Label>
                <Input
                  id="name"
                  placeholder="Temidayo Jacob" // Changed from "John Doe"
                  value={cardData.name}
                  onChange={(e) => setCardData((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Security Notice */}
      <div className="bg-[#0548B7]/10 border border-[#0548B7]/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-[#0548B7] mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 text-sm">Secure Payment</h4>
            <p className="text-xs text-blue-700">Protected by bank-level encryption and fraud detection.</p>
          </div>
        </div>
      </div>

      <Button
        onClick={handlePayment}
        disabled={isProcessing}
        className="w-full bg-[#0548B7] hover:bg-[#0548B7]/90 h-12"
      >
        {isProcessing ? "Processing Payment..." : `Pay $${totalAmount.toFixed(2)}`}
      </Button>
    </div>
  )
}
