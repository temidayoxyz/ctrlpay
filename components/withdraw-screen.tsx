"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Building, Smartphone, Clock, TrendingDown, AlertCircle, Bitcoin, DollarSign } from "lucide-react"

interface WithdrawScreenProps {
  balance: number
  onWithdraw: (amount: number, method: string) => void
  onBack: () => void
}

export function WithdrawScreen({ balance, onWithdraw }: WithdrawScreenProps) {
  const [amount, setAmount] = useState("")
  const [withdrawMethod, setWithdrawMethod] = useState("bank")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  // Mock exchange rates
  const usdToNgnRate = 1547.5
  const fees = {
    bank: 2, // $2 flat fee
    mobile: 5, // $5 fee for mobile money
    crypto: 3, // $3 fee for crypto
    domiciliary: 1, // $1 fee for domiciliary account
  }

  const withdrawAmount = Number.parseFloat(amount) || 0
  const fee = fees[withdrawMethod as keyof typeof fees]
  const netAmount = withdrawAmount - fee
  const ngnAmount = netAmount * usdToNgnRate

  const handleWithdraw = async () => {
    if (showConfirmation) {
      setIsProcessing(true)
      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 2000))
      onWithdraw(withdrawAmount, withdrawMethod)
    } else {
      setShowConfirmation(true)
    }
  }

  const isValidAmount = withdrawAmount > 0 && withdrawAmount <= balance && withdrawAmount >= 10

  if (isProcessing) {
    return (
      <div className="p-6 text-center space-y-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
          <Clock className="h-8 w-8 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Processing Withdrawal</h2>
          <p className="text-gray-600">Your withdrawal of ${withdrawAmount.toFixed(2)} is being processed...</p>
        </div>

        <Card className="border-2 border-blue-200">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Amount</span>
                <span className="font-bold">${netAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Method</span>
                <span className="capitalize">{withdrawMethod} Transfer</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Expected Arrival</span>
                <span>
                  {withdrawMethod === "bank" && "1-2 business days"}
                  {withdrawMethod === "mobile" && "Within 30 minutes"}
                  {withdrawMethod === "crypto" && "10-30 minutes"}
                  {withdrawMethod === "domiciliary" && "1-2 hours"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Processing Your Request</h4>
              <p className="text-sm text-blue-700">
                We'll send you an email confirmation once the withdrawal is complete.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (showConfirmation) {
    return (
      <div className="p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Confirm Withdrawal</h2>
          <p className="text-gray-600">Please review your withdrawal details</p>
        </div>

        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">Withdrawal Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Withdrawal Amount</Label>
                <p className="text-xl font-bold">${withdrawAmount.toFixed(2)}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Method</Label>
                <p className="text-lg font-medium capitalize">{withdrawMethod} Transfer</p>
              </div>
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Withdrawal amount</span>
                <span>${withdrawAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Transaction fee</span>
                <span>-${fee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>You'll receive</span>
                <div className="text-right">
                  <div>${netAmount.toFixed(2)}</div>
                  {withdrawMethod === "bank" || withdrawMethod === "mobile" ? (
                    <div className="text-sm text-gray-500 font-normal">≈ ₦{ngnAmount.toLocaleString()}</div>
                  ) : withdrawMethod === "crypto" ? (
                    <div className="text-sm text-gray-500 font-normal">≈ {(netAmount * 0.99).toFixed(6)} USDC</div>
                  ) : (
                    <div className="text-sm text-gray-500 font-normal">USD (Domiciliary)</div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>
                  Expected arrival:{" "}
                  {withdrawMethod === "bank"
                    ? "1-2 business days"
                    : withdrawMethod === "mobile"
                      ? "Within 30 minutes"
                      : withdrawMethod === "crypto"
                        ? "10-30 minutes"
                        : "1-2 hours"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-amber-900">Exchange Rate Notice</h4>
              <p className="text-sm text-amber-700">
                Rate: $1 = ₦{usdToNgnRate.toFixed(2)} • Rates update every 15 minutes
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" onClick={() => setShowConfirmation(false)} className="flex-1">
            Back to Edit
          </Button>
          <Button onClick={handleWithdraw} className="flex-1 bg-blue-600 hover:bg-blue-700">
            Confirm Withdrawal
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Withdraw Funds</h2>
        <p className="text-gray-600">
          Available balance: <span className="font-bold text-green-600">${balance.toFixed(2)}</span>
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Withdrawal Amount</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (USD)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-xl font-bold"
            />
            <p className="text-sm text-gray-500">Minimum withdrawal: $10</p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setAmount("50")}>
              $50
            </Button>
            <Button variant="outline" size="sm" onClick={() => setAmount("100")}>
              $100
            </Button>
            <Button variant="outline" size="sm" onClick={() => setAmount("250")}>
              $250
            </Button>
            <Button variant="outline" size="sm" onClick={() => setAmount(balance.toString())}>
              All
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Withdrawal Method</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={withdrawMethod} onValueChange={setWithdrawMethod}>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="bank" id="bank" />
                <Label htmlFor="bank" className="flex items-center gap-3 flex-1 cursor-pointer">
                  <Building className="h-6 w-6 text-blue-600" />
                  <div className="flex-1">
                    <p className="font-medium">Nigerian Bank Account</p>
                    <p className="text-sm text-gray-500">Direct transfer to your local bank</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary">1-2 days</Badge>
                    <p className="text-sm text-gray-500 mt-1">$2 fee</p>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="mobile" id="mobile" />
                <Label htmlFor="mobile" className="flex items-center gap-3 flex-1 cursor-pointer">
                  <Smartphone className="h-6 w-6 text-green-600" />
                  <div className="flex-1">
                    <p className="font-medium">Mobile Money</p>
                    <p className="text-sm text-gray-500">Opay, PalmPay, Kuda, etc.</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary">30 min</Badge>
                    <p className="text-sm text-gray-500 mt-1">$5 fee</p>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="crypto" id="crypto" />
                <Label htmlFor="crypto" className="flex items-center gap-3 flex-1 cursor-pointer">
                  <Bitcoin className="h-6 w-6 text-orange-500" />
                  <div className="flex-1">
                    <p className="font-medium">Cryptocurrency</p>
                    <p className="text-sm text-gray-500">USDC, USDT, BTC, ETH</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary">10-30 min</Badge>
                    <p className="text-sm text-gray-500 mt-1">$3 fee</p>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="domiciliary" id="domiciliary" />
                <Label htmlFor="domiciliary" className="flex items-center gap-3 flex-1 cursor-pointer">
                  <DollarSign className="h-6 w-6 text-green-600" />
                  <div className="flex-1">
                    <p className="font-medium">Domiciliary USD Account</p>
                    <p className="text-sm text-gray-500">Keep funds in USD</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary">1-2 hours</Badge>
                    <p className="text-sm text-gray-500 mt-1">$1 fee</p>
                  </div>
                </Label>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {withdrawAmount > 0 && withdrawMethod !== "domiciliary" && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <TrendingDown className="h-5 w-5 text-blue-600" />
              <h4 className="font-medium text-blue-900">
                {withdrawMethod === "crypto" ? "Crypto Conversion" : "Live Exchange Rate"}
              </h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>${withdrawAmount.toFixed(2)} USD</span>
                <span>
                  {withdrawMethod === "crypto"
                    ? `≈ ${(withdrawAmount * 0.99).toFixed(6)} USDC`
                    : `≈ ₦${(withdrawAmount * usdToNgnRate).toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Transaction fee</span>
                <span>-${fee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t border-blue-200 pt-2">
                <span>You'll receive</span>
                <span>
                  {withdrawMethod === "crypto"
                    ? `${((withdrawAmount - fee) * 0.99).toFixed(6)} USDC`
                    : `₦${((withdrawAmount - fee) * usdToNgnRate).toLocaleString()}`}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {withdrawAmount > 0 && withdrawMethod === "domiciliary" && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <DollarSign className="h-5 w-5 text-green-600" />
              <h4 className="font-medium text-green-900">USD Domiciliary Account</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Withdrawal amount</span>
                <span>${withdrawAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Transaction fee</span>
                <span>-${fee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t border-green-200 pt-2">
                <span>You'll receive</span>
                <span>${netAmount.toFixed(2)} USD</span>
              </div>
            </div>
            <p className="text-sm text-green-700 mt-2">Funds will remain in USD in your domiciliary account</p>
          </CardContent>
        </Card>
      )}

      <Button
        onClick={handleWithdraw}
        disabled={!isValidAmount}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
      >
        {isValidAmount ? "Continue" : "Enter valid amount"}
      </Button>
    </div>
  )
}
