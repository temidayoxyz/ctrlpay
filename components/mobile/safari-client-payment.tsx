"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Building, Wallet, Bitcoin, Shield, Check, Share, ChevronLeft, ChevronRight } from "lucide-react"

interface Invoice {
  id: string
  amount: number
  description: string
  clientEmail: string
  status: "pending" | "paid"
  paymentLink: string
}

interface User {
  id: string
  name: string
  email: string
}

interface SafariClientPaymentProps {
  invoice: Invoice | null
  onPaymentCompleted: (amount: number, description: string) => void
  onReturnToDashboard: () => void
  user?: User | null
}

export function SafariClientPayment({
  invoice,
  onPaymentCompleted,
  onReturnToDashboard,
  user,
}: SafariClientPaymentProps) {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })

  if (!invoice) return null

  const processingFee = invoice.amount * 0.02 // 2% fee
  const totalAmount = invoice.amount + processingFee

  const handlePayment = async () => {
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsProcessing(false)
    setIsCompleted(true)
  }

  const isFormValid = () => {
    if (paymentMethod === "card") {
      return cardData.number && cardData.expiry && cardData.cvv && cardData.name
    }
    return true
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Safari Browser Header */}
        <div className="bg-gray-100 border-b border-gray-300">
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

          {/* Safari Address Bar */}
          <div className="px-4 py-2">
            <div className="bg-white rounded-lg px-3 py-2 flex items-center gap-2 text-sm">
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-gray-600 text-xs">pay.ctrlpay.com/invoice/{invoice.id}</span>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="max-w-md mx-auto p-4 space-y-6">
          <div className="text-center py-4">
            <h1 className="text-lg font-bold text-gray-900 mb-2">Client Payment Portal</h1>
          </div>

          <div className="text-center space-y-6 py-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
              <p className="text-gray-600">
                Your payment of ${invoice.amount.toFixed(2)} to {user?.name || "the freelancer"} has been processed
                successfully.
              </p>
            </div>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Amount paid:</span>
                    <span className="font-bold">${invoice.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Processing fee (2%):</span>
                    <span>${processingFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>For:</span>
                    <span>{invoice.description}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-700">
                {user?.name || "The freelancer"} has been notified and will receive the funds immediately.
              </p>
            </div>

            <Button
              onClick={() => {
                onPaymentCompleted(invoice.amount, `Payment from ${invoice.clientEmail.split("@")[0]}`)
                onReturnToDashboard()
              }}
              className="w-full bg-[#0548B7] hover:bg-[#0548B7]/90 h-12"
            >
              Return to Freelancer Dashboard
            </Button>
          </div>
        </div>

        {/* Safari Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-gray-100 border-t border-gray-300 px-4 py-2">
          <div className="flex items-center justify-between max-w-md mx-auto">
            <ChevronLeft className="h-6 w-6 text-gray-400" />
            <ChevronRight className="h-6 w-6 text-gray-400" />
            <Share className="h-5 w-5 text-blue-500" />
            <div className="w-6 h-6 border border-gray-400 rounded"></div>
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Safari Browser Header */}
      <div className="bg-gray-100 border-b border-gray-300">
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

        {/* Safari Address Bar */}
        <div className="px-4 py-2">
          <div className="bg-white rounded-lg px-3 py-2 flex items-center gap-2 text-sm">
            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <span className="text-gray-600 text-xs">pay.ctrlpay.com/invoice/{invoice.id}</span>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="max-w-md mx-auto p-4 space-y-6">
        <div className="text-center py-4">
          <h1 className="text-lg font-bold text-gray-900 mb-2">Client Payment Portal</h1>
          <p className="text-gray-600 text-sm">Secure payment processing</p>
        </div>

        {/* Invoice Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Payment Request from {user?.name || "Freelancer"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">{invoice.description}</span>
                <span className="font-bold text-lg">${invoice.amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Processing fee (2%)</span>
                <span>${processingFee.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between items-center font-bold text-xl">
                  <span>Total</span>
                  <span className="text-[#0548B7]">${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-3 flex-1 cursor-pointer">
                    <CreditCard className="h-5 w-5 text-[#0548B7]" />
                    <div>
                      <p className="font-medium">Credit/Debit Card</p>
                      <p className="text-sm text-gray-500">Visa, Mastercard, Amex</p>
                    </div>
                  </Label>
                  <Badge variant="secondary">Instant</Badge>
                </div>

                <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal" className="flex items-center gap-3 flex-1 cursor-pointer">
                    <Wallet className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">PayPal</p>
                      <p className="text-sm text-gray-500">Pay with PayPal balance</p>
                    </div>
                  </Label>
                  <Badge variant="secondary">Instant</Badge>
                </div>

                <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="bank" id="bank" />
                  <Label htmlFor="bank" className="flex items-center gap-3 flex-1 cursor-pointer">
                    <Building className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Bank Transfer</p>
                      <p className="text-sm text-gray-500">Direct bank transfer</p>
                    </div>
                  </Label>
                  <Badge variant="secondary">1-2 days</Badge>
                </div>

                <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="crypto" id="crypto" />
                  <Label htmlFor="crypto" className="flex items-center gap-3 flex-1 cursor-pointer">
                    <Bitcoin className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="font-medium">Cryptocurrency</p>
                      <p className="text-sm text-gray-500">BTC, ETH, USDC</p>
                    </div>
                  </Label>
                  <Badge variant="secondary">10-30 min</Badge>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Card Details Form */}
        {paymentMethod === "card" && (
          <Card>
            <CardHeader>
              <CardTitle>Card Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardData.number}
                  onChange={(e) => setCardData((prev) => ({ ...prev, number: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={cardData.expiry}
                    onChange={(e) => setCardData((prev) => ({ ...prev, expiry: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={cardData.cvv}
                    onChange={(e) => setCardData((prev) => ({ ...prev, cvv: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Cardholder Name</Label>
                <Input
                  id="name"
                  placeholder="Temidayo Jacob"
                  value={cardData.name}
                  onChange={(e) => setCardData((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Security Notice */}
        <div className="bg-[#0548B7]/10 border border-[#0548B7]/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-[#0548B7] mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Secure Payment</h4>
              <p className="text-sm text-blue-700">Your payment is protected by bank-level encryption.</p>
            </div>
          </div>
        </div>

        <Button
          onClick={handlePayment}
          disabled={isProcessing || !isFormValid()}
          className="w-full bg-[#0548B7] hover:bg-[#0548B7]/90 h-12 text-lg mb-20"
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing Payment...
            </div>
          ) : (
            `Pay $${totalAmount.toFixed(2)}`
          )}
        </Button>
      </div>

      {/* Safari Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-100 border-t border-gray-300 px-4 py-2">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <ChevronLeft className="h-6 w-6 text-gray-400" />
          <ChevronRight className="h-6 w-6 text-gray-400" />
          <Share className="h-5 w-5 text-blue-500" />
          <div className="w-6 h-6 border border-gray-400 rounded"></div>
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
