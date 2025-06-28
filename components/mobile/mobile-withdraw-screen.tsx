"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Building, Smartphone, Clock, TrendingDown, Bitcoin, DollarSign, Sparkles } from "lucide-react"

interface MobileWithdrawScreenProps {
  balance: number
  onWithdraw: (amount: number, method: string) => void
  onBack: () => void
}

export function MobileWithdrawScreen({ balance, onWithdraw }: MobileWithdrawScreenProps) {
  const [amount, setAmount] = useState("")
  const [withdrawMethod, setWithdrawMethod] = useState("bank")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const usdToNgnRate = 1547.5
  const fees = {
    bank: 0.02,
    mobile: 0.02,
    crypto: 0.02,
    domiciliary: 0.02,
  }

  const withdrawAmount = Number.parseFloat(amount) || 0
  const feeAmount = withdrawAmount * fees[withdrawMethod as keyof typeof fees]
  const netAmount = withdrawAmount - feeAmount
  const ngnAmount = netAmount * usdToNgnRate

  const handleWithdraw = async () => {
    if (showConfirmation) {
      setIsProcessing(true)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      onWithdraw(withdrawAmount, withdrawMethod)
    } else {
      setShowConfirmation(true)
    }
  }

  const isValidAmount = withdrawAmount > 0 && withdrawAmount <= balance && withdrawAmount >= 10

  if (isProcessing) {
    return (
      <div className="p-4 text-center space-y-6 py-12 bg-gradient-to-br from-gray-50 to-white min-h-full">
        <div className="w-20 h-20 bg-gradient-to-br from-[#0548B7]/20 to-[#0548B7]/30 rounded-3xl flex items-center justify-center mx-auto animate-pulse">
          <Clock className="h-10 w-10 text-[#0548B7]" />
        </div>
        <div className="animate-in zoom-in duration-500">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Processing Withdrawal</h2>
          <p className="text-gray-600 text-sm">Your withdrawal of ${withdrawAmount.toFixed(2)} is being processed...</p>
        </div>

        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm animate-in slide-in-from-bottom duration-500 delay-200">
          <CardContent className="p-6">
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <span className="font-medium">Amount</span>
                <span className="font-bold text-lg">${netAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Method</span>
                <span className="capitalize font-semibold">{withdrawMethod} Transfer</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Expected Arrival</span>
                <span className="text-xs font-semibold">
                  {withdrawMethod === "bank" && "1-2 business days"}
                  {withdrawMethod === "mobile" && "Within 30 minutes"}
                  {withdrawMethod === "crypto" && "10-30 minutes"}
                  {withdrawMethod === "domiciliary" && "1-2 hours"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-[#0548B7]/5 to-[#0548B7]/10 animate-in slide-in-from-bottom duration-500 delay-300">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#0548B7]/20 to-[#0548B7]/30 rounded-2xl flex items-center justify-center">
                <Clock className="h-5 w-5 text-[#0548B7]" />
              </div>
              <div>
                <h4 className="font-bold text-[#0548B7] text-sm mb-1">Processing Your Request</h4>
                <p className="text-xs text-[#0548B7]/80">We'll send you an email confirmation once complete.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showConfirmation) {
    return (
      <div className="p-4 space-y-6 bg-gradient-to-br from-gray-50 to-white min-h-full">
        <div className="text-center py-4 animate-in slide-in-from-top duration-500">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Confirm Withdrawal</h2>
          <p className="text-gray-600 text-sm">Please review your withdrawal details</p>
        </div>

        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm animate-in zoom-in duration-500 delay-100">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0548B7] to-[#0548B7]/80 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-[#0548B7] text-lg">Withdrawal Summary</h3>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl p-4">
                <Label className="text-xs text-green-600 font-bold uppercase tracking-wide">Amount</Label>
                <p className="text-2xl font-bold text-green-700">${withdrawAmount.toFixed(2)}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-4">
                <Label className="text-xs text-blue-600 font-bold uppercase tracking-wide">Method</Label>
                <p className="font-bold text-blue-700 capitalize">{withdrawMethod} Transfer</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="font-medium">Withdrawal amount</span>
                <span className="font-semibold">${withdrawAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Transaction fee (2%)</span>
                <span className="font-semibold text-red-600">-${feeAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-base border-t border-gray-200 pt-3">
                <span>You'll receive</span>
                <div className="text-right">
                  <div className="text-green-600">${netAmount.toFixed(2)}</div>
                  {withdrawMethod === "bank" || withdrawMethod === "mobile" ? (
                    <div className="text-xs text-gray-500 font-normal">≈ ₦{ngnAmount.toLocaleString()}</div>
                  ) : withdrawMethod === "crypto" ? (
                    <div className="text-xs text-gray-500 font-normal">≈ {(netAmount * 0.99).toFixed(6)} USDC</div>
                  ) : (
                    <div className="text-xs text-gray-500 font-normal">USD (Domiciliary)</div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3 animate-in slide-in-from-bottom duration-500 delay-200">
          <Button
            variant="outline"
            onClick={() => setShowConfirmation(false)}
            className="flex-1 h-12 rounded-2xl border-2 font-semibold transition-all duration-300 hover:scale-105"
          >
            Back
          </Button>
          <Button
            onClick={handleWithdraw}
            className="flex-1 bg-gradient-to-r from-[#0548B7] to-[#0548B7]/90 hover:from-[#0548B7]/90 hover:to-[#0548B7] text-white rounded-2xl h-12 font-bold shadow-2xl shadow-[#0548B7]/30 transition-all duration-300 hover:scale-105"
          >
            Confirm
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-6 bg-gradient-to-br from-gray-50 to-white min-h-full">
      <div className="text-center py-4 animate-in slide-in-from-top duration-500">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Withdraw Funds</h2>
        <p className="text-gray-600 text-sm">
          Available: <span className="font-bold text-green-600">${balance.toFixed(2)}</span>
        </p>
      </div>

      <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm animate-in slide-in-from-left duration-500 delay-100">
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-bold text-gray-700 uppercase tracking-wide">
              Amount (USD)
            </Label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-2xl font-bold h-14 pl-12 border-2 border-gray-200 rounded-2xl focus:border-[#0548B7] transition-all duration-300"
              />
            </div>
            <p className="text-xs text-gray-500 font-medium">Minimum withdrawal: $10</p>
          </div>

          <div className="flex gap-2">
            {["50", "100", "250", balance.toString()].map((value, index) => (
              <Button
                key={value}
                variant="outline"
                size="sm"
                onClick={() => setAmount(value === balance.toString() ? balance.toString() : value)}
                className="rounded-xl border-2 font-semibold transition-all duration-300 hover:scale-105 hover:border-[#0548B7] hover:text-[#0548B7]"
              >
                {value === balance.toString() ? "All" : `$${value}`}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm animate-in slide-in-from-right duration-500 delay-200">
        <CardContent className="p-6">
          <h3 className="font-bold text-gray-900 mb-4 text-lg">Withdrawal Method</h3>
          <RadioGroup value={withdrawMethod} onValueChange={setWithdrawMethod}>
            <div className="space-y-3">
              {[
                {
                  id: "bank",
                  icon: Building,
                  label: "Nigerian Bank",
                  desc: "Direct transfer",
                  time: "1-2 days",
                  color: "text-[#0548B7]",
                  bg: "bg-blue-100",
                },
                {
                  id: "mobile",
                  icon: Smartphone,
                  label: "Mobile Money",
                  desc: "Opay, PalmPay, Kuda",
                  time: "30 min",
                  color: "text-green-600",
                  bg: "bg-green-100",
                },
                {
                  id: "crypto",
                  icon: Bitcoin,
                  label: "Cryptocurrency",
                  desc: "USDC, USDT, BTC",
                  time: "10-30 min",
                  color: "text-orange-500",
                  bg: "bg-orange-100",
                },
                {
                  id: "domiciliary",
                  icon: DollarSign,
                  label: "Domiciliary USD",
                  desc: "Keep in USD",
                  time: "1-2 hours",
                  color: "text-green-600",
                  bg: "bg-green-100",
                },
              ].map((method) => {
                const Icon = method.icon
                return (
                  <div
                    key={method.id}
                    className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-2xl hover:border-[#0548B7]/50 transition-all duration-300 hover:shadow-lg"
                  >
                    <RadioGroupItem value={method.id} id={method.id} className="border-2" />
                    <Label htmlFor={method.id} className="flex items-center gap-3 flex-1 cursor-pointer">
                      <div className={`w-12 h-12 ${method.bg} rounded-2xl flex items-center justify-center shadow-lg`}>
                        <Icon className={`h-6 w-6 ${method.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-sm">{method.label}</p>
                        <p className="text-xs text-gray-500">{method.desc}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="text-xs font-semibold">
                          {method.time}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">2% fee</p>
                      </div>
                    </Label>
                  </div>
                )
              })}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {withdrawAmount > 0 && (
        <Card className="border-0 bg-gradient-to-br from-[#0548B7]/5 to-[#0548B7]/10 animate-in slide-in-from-bottom duration-500 delay-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingDown className="h-5 w-5 text-[#0548B7]" />
              <h4 className="font-bold text-[#0548B7] text-sm">
                {withdrawMethod === "crypto"
                  ? "Crypto Conversion"
                  : withdrawMethod === "domiciliary"
                    ? "USD Transfer"
                    : "Live Exchange Rate"}
              </h4>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-medium">Withdrawal amount</span>
                <span className="font-semibold">${withdrawAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Transaction fee (2%)</span>
                <span className="font-semibold text-red-600">-${feeAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold border-t border-[#0548B7]/20 pt-2">
                <span>You'll receive</span>
                <span className="text-green-600">
                  {withdrawMethod === "crypto"
                    ? `${((withdrawAmount - feeAmount) * 0.99).toFixed(6)} USDC`
                    : withdrawMethod === "domiciliary"
                      ? `$${netAmount.toFixed(2)} USD`
                      : `₦${(netAmount * usdToNgnRate).toLocaleString()}`}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Button
        onClick={handleWithdraw}
        disabled={!isValidAmount}
        className={`w-full rounded-2xl h-14 font-bold text-lg shadow-2xl transition-all duration-300 animate-in slide-in-from-bottom duration-500 delay-400 ${
          isValidAmount
            ? "bg-gradient-to-r from-[#0548B7] to-[#0548B7]/90 hover:from-[#0548B7]/90 hover:to-[#0548B7] text-white shadow-[#0548B7]/30 hover:scale-105"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        {isValidAmount ? "Continue" : "Enter valid amount"}
      </Button>
    </div>
  )
}
