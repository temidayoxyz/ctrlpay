"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

interface PaymentPageProps {
  invoice: Invoice | null
  onPaymentCompleted: (amount: number) => void
}

export function PaymentPage({ invoice, onPaymentCompleted }: PaymentPageProps) {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [cardholderName, setCardholderName] = useState("")

  if (!invoice) return null

  const processingFee = invoice.amount * 0.029 // 2.9% processing fee
  const totalAmount = invoice.amount + processingFee

  const handlePayment = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessing(false)
    setIsCompleted(true)

    // Complete after showing success
    setTimeout(() => {
      onPaymentCompleted(invoice.amount)
    }, 2000)
  }

  if (isCompleted) {
    return (
      <div className="p-6 text-center space-y-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600">Your payment of ${invoice.amount.toFixed(2)} has been processed successfully.</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-700">The freelancer will receive their funds in USD immediately.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete Payment</h2>
        <p className="text-gray-600">Secure payment powered by CTRL+Pay</p>
      </div>

      {/* Invoice Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">{invoice.description}</span>
            <span className="font-bold">${invoice.amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>Processing fee (2.9%)</span>
            <span>${processingFee.toFixed(2)}</span>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between items-center font-bold text-lg">
              <span>Total</span>
              <span>${totalAmount.toFixed(2)}</span>
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
                  <CreditCard className="h-5 w-5 text-blue-600" />
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
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="123" value={cvv} onChange={(e) => setCvv(e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Cardholder Name</Label>
              <Input
                id="name"
                placeholder="Temidayo Jacob"
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Security Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900">Secure Payment</h4>
            <p className="text-sm text-blue-700">
              Your payment is protected by bank-level encryption and fraud detection.
            </p>
          </div>
        </div>
      </div>

      <Button onClick={handlePayment} disabled={isProcessing} className="w-full bg-blue-600 hover:bg-blue-700">
        {isProcessing ? <>Processing Payment...</> : <>Pay ${totalAmount.toFixed(2)}</>}
      </Button>
    </div>
  )
}
