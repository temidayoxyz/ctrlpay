"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Building, Wallet, Bitcoin, Shield, Check } from "lucide-react"
import Image from "next/image"

interface ClientPaymentPageProps {
  invoiceId?: string
}

export function ClientPaymentPage({ invoiceId = "demo123" }: ClientPaymentPageProps) {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })

  // Mock invoice data - in real app, this would be fetched based on invoiceId
  const invoice = {
    id: invoiceId,
    amount: 500,
    description: "Website Design for Acme Corp",
    freelancerName: "John Doe",
    freelancerEmail: "john@example.com",
    status: "pending",
  }

  const processingFee = invoice.amount * 0.029
  const totalAmount = invoice.amount + processingFee

  const handlePayment = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsProcessing(false)
    setIsCompleted(true)

    // In a real app, this would trigger a webhook/notification to the freelancer's app
    // For demo purposes, we'll simulate this with localStorage
    const paymentNotification = {
      invoiceId: invoice.id,
      amount: invoice.amount,
      description: invoice.description,
      status: "completed",
      timestamp: new Date().toISOString(),
    }

    localStorage.setItem("payment_notification", JSON.stringify(paymentNotification))

    // Dispatch a custom event that the freelancer app can listen to
    window.dispatchEvent(new CustomEvent("payment_completed", { detail: paymentNotification }))
  }

  const isFormValid = () => {
    if (paymentMethod === "card") {
      return cardData.number && cardData.expiry && cardData.cvv && cardData.name
    }
    return true
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card>
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Check className="h-10 w-10 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
                <p className="text-gray-600">
                  Your payment of ${invoice.amount.toFixed(2)} has been processed successfully.
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
                      <span>Processing fee:</span>
                      <span>${processingFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>To:</span>
                      <span>{invoice.freelancerName}</span>
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
                  {invoice.freelancerName} has been notified of your payment and will receive the funds immediately.
                </p>
              </div>

              <Button onClick={() => window.close()} className="w-full bg-[#0548B7] hover:bg-[#0548B7]/90">
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <Image src="/assets/logo.png" alt="CTRL+Pay" width={32} height={32} />
          <div>
            <h1 className="text-lg font-bold text-gray-900">CTRL+Pay</h1>
            <p className="text-xs text-gray-500">Secure Payment</p>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        <div className="text-center py-4">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Complete Payment</h2>
          <p className="text-gray-600 text-sm">Pay {invoice.freelancerName} securely</p>
        </div>

        {/* Invoice Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Payment Request</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">{invoice.description}</span>
                <span className="font-bold text-lg">${invoice.amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>From: {invoice.freelancerName}</span>
                <span>Processing fee: ${processingFee.toFixed(2)}</span>
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
            <CardTitle>Choose Payment Method</CardTitle>
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
              <p className="text-sm text-blue-700">
                Your payment is protected by bank-level encryption and fraud detection.
              </p>
            </div>
          </div>
        </div>

        <Button
          onClick={handlePayment}
          disabled={isProcessing || !isFormValid()}
          className="w-full bg-[#0548B7] hover:bg-[#0548B7]/90 h-12 text-lg"
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

        <div className="text-center">
          <p className="text-xs text-gray-500">Powered by CTRL+Pay • Your payment is secure and encrypted</p>
        </div>
      </div>
    </div>
  )
}
