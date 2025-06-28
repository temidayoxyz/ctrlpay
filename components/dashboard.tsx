"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Download, TrendingUp, Clock, CheckCircle, DollarSign } from "lucide-react"

interface Transaction {
  id: string
  type: "payment" | "withdrawal" | "conversion"
  amount: number
  currency: "USD" | "NGN"
  status: "completed" | "pending"
  date: string
  description: string
  fee?: number
}

interface DashboardProps {
  balance: number
  transactions: Transaction[]
  onCreateInvoice: () => void
  onWithdraw: () => void
}

export function Dashboard({ balance, transactions, onCreateInvoice, onWithdraw }: DashboardProps) {
  const completedPayments = transactions.filter((t) => t.type === "payment" && t.status === "completed")
  const totalEarned = completedPayments.reduce((sum, t) => sum + t.amount, 0)
  const thisMonthEarnings = completedPayments
    .filter((t) => new Date(t.date).getMonth() === new Date().getMonth())
    .reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="p-6 space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">USD Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${balance.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Available for withdrawal</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${thisMonthEarnings.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Earnings this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
            <CheckCircle className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalEarned.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">All-time earnings</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={onCreateInvoice} className="flex-1 bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Invoice
        </Button>
        <Button onClick={onWithdraw} variant="outline" className="flex-1">
          <Download className="h-4 w-4 mr-2" />
          Withdraw Funds
        </Button>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.slice(0, 5).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === "payment" ? "bg-green-100" : "bg-blue-100"
                    }`}
                  >
                    {transaction.type === "payment" ? (
                      <Plus className="h-5 w-5 text-green-600" />
                    ) : (
                      <Download className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${transaction.type === "payment" ? "text-green-600" : "text-blue-600"}`}>
                    {transaction.type === "payment" ? "+" : "-"}${transaction.amount.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant={transaction.status === "completed" ? "default" : "secondary"}>
                      {transaction.status}
                    </Badge>
                    {transaction.fee && <span className="text-xs text-gray-500">Fee: ${transaction.fee}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
