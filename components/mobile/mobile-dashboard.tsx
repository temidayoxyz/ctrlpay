"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, Download, TrendingUp, Eye, EyeOff, ArrowUpRight, BadgeDollarSign } from "lucide-react"
import { useState } from "react"

interface Transaction {
  id: string
  type: "payment" | "withdrawal" | "conversion"
  amount: number
  currency: "USD" | "NGN"
  status: "completed" | "pending"
  date: string
  description: string
  clientName?: string
  fee?: number
}

interface MobileDashboardProps {
  balance: number
  transactions: Transaction[]
  onCreateInvoice: () => void
  onWithdraw: () => void
}

export function MobileDashboard({ balance, transactions, onCreateInvoice, onWithdraw }: MobileDashboardProps) {
  const [showBalance, setShowBalance] = useState(true)

  const completedPayments = transactions.filter((t) => t.type === "payment" && t.status === "completed")
  const thisMonthEarnings = completedPayments
    .filter((t) => new Date(t.date).getMonth() === new Date().getMonth())
    .reduce((sum, t) => sum + t.amount, 0)

  const getTransactionIcon = (type: string) => {
    return type === "payment" ? (
      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
        <Upload className="h-5 w-5 text-white" />
      </div>
    ) : (
      <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
        <Download className="h-5 w-5 text-white" />
      </div>
    )
  }

  const getTransactionDisplayText = (transaction: Transaction) => {
    if (transaction.type === "payment") {
      return transaction.clientName || "Unknown Client"
    }
    return transaction.description
  }

  return (
    <div className="p-4 space-y-6 bg-gradient-to-br from-gray-50 to-white min-h-full">
      {/* Balance Card */}
      <Card className="bg-gradient-to-br from-[#0548B7] via-[#0548B7] to-[#0548B7]/90 text-white border-0 shadow-2xl shadow-[#0548B7]/20 animate-in slide-in-from-top duration-500">
        <CardContent className="p-6 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-4 left-4 w-24 h-24 bg-white rounded-full blur-2xl"></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <BadgeDollarSign className="h-4 w-4 text-blue-200" />
                  <p className="text-blue-100 text-sm font-medium">Current Balance</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-4xl font-bold tracking-tight">
                    {showBalance ? `$${balance.toFixed(2)}` : "••••••"}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowBalance(!showBalance)}
                    className="text-white hover:bg-white/20 p-2 rounded-xl transition-all duration-200"
                  >
                    {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={onCreateInvoice}
                className="flex-1 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/20 rounded-2xl h-12 font-semibold transition-all duration-300 hover:scale-105"
              >
                <Upload className="h-4 w-4 mr-2" />
                Receive
              </Button>
              <Button
                onClick={onWithdraw}
                className="flex-1 bg-white text-[#0548B7] hover:bg-gray-50 rounded-2xl h-12 font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Download className="h-4 w-4 mr-2" />
                Withdraw
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-0 shadow-lg shadow-green-500/10 bg-gradient-to-br from-green-50 to-green-100/50 animate-in slide-in-from-left duration-500 delay-100">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-green-700">${thisMonthEarnings.toFixed(2)}</p>
            <p className="text-xs text-green-600 font-medium">Monthly Earnings</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg shadow-[#0548B7]/10 bg-gradient-to-br from-blue-50 to-blue-100/50 animate-in slide-in-from-right duration-500 delay-200">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-[#0548B7] to-[#0548B7]/80 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <ArrowUpRight className="h-6 w-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-[#0548B7]">{completedPayments.length}</p>
            <p className="text-xs text-blue-600 font-medium">Completed Payments</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <div className="animate-in slide-in-from-bottom duration-500 delay-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Recent Transactions</h3>
          <Button
            variant="ghost"
            size="sm"
            className="text-[#0548B7] font-semibold hover:bg-blue-50 rounded-xl transition-all duration-200"
          >
            View All
          </Button>
        </div>

        <div className="space-y-3">
          {transactions.slice(0, 4).map((transaction, index) => (
            <Card
              key={transaction.id}
              className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] animate-in slide-in-from-bottom"
              style={{ animationDelay: `${400 + index * 100}ms` }}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getTransactionIcon(transaction.type)}
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm">{getTransactionDisplayText(transaction)}</p>
                      <p className="text-xs text-gray-500 font-medium">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-bold text-sm ${
                        transaction.type === "payment" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {transaction.type === "payment" ? "+" : "-"}${transaction.amount.toFixed(2)}
                    </p>
                    <Badge
                      variant={transaction.status === "completed" ? "default" : "secondary"}
                      className={`text-xs mt-1 ${
                        transaction.status === "completed"
                          ? "bg-green-100 text-green-700 border-green-200"
                          : "bg-orange-100 text-orange-700 border-orange-200"
                      }`}
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
