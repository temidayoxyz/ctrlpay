"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Download, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
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

interface MobileTransactionsProps {
  transactions: Transaction[]
}

export function MobileTransactions({ transactions }: MobileTransactionsProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")

  const filteredTransactions = transactions.filter((transaction) => {
    const searchText = transaction.clientName || transaction.description
    const matchesSearch = searchText.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === "all" || transaction.type === filter
    return matchesSearch && matchesFilter
  })

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "payment":
        return <Plus className="h-5 w-5 text-green-600" />
      case "withdrawal":
        return <Download className="h-5 w-5 text-red-600" />
      default:
        return <Download className="h-5 w-5 text-gray-600" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getTransactionDisplayText = (transaction: Transaction) => {
    if (transaction.type === "payment") {
      // For payments, ALWAYS show the client name if available
      return transaction.clientName || "Unknown Client"
    }
    return transaction.description
  }

  return (
    <div className="p-4 space-y-4">
      <div className="text-center py-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Transaction History</h2>
        <p className="text-gray-600 text-sm">All your payments and withdrawals</p>
      </div>

      {/* Search and Filter */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
            className="whitespace-nowrap"
          >
            All
          </Button>
          <Button
            variant={filter === "payment" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("payment")}
            className="whitespace-nowrap"
          >
            Payments
          </Button>
          <Button
            variant={filter === "withdrawal" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("withdrawal")}
            className="whitespace-nowrap"
          >
            Withdrawals
          </Button>
        </div>
      </div>

      {/* Transaction List - Show ALL filtered transactions */}
      <div className="space-y-3">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-8">
            <Filter className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No transactions found</p>
          </div>
        ) : (
          filteredTransactions.map((transaction) => (
            <Card
              key={transaction.id}
              className={`border-l-4 ${transaction.type === "payment" ? "border-l-green-500" : "border-l-red-500"}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="mt-1">{getTransactionIcon(transaction.type)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm truncate">
                        {getTransactionDisplayText(transaction)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{formatDate(transaction.date)}</p>
                      {transaction.fee && (
                        <p className="text-xs text-gray-400 mt-1">Fee: ${transaction.fee.toFixed(2)}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right ml-3">
                    <p
                      className={`font-bold text-sm ${
                        transaction.type === "payment" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {transaction.type === "payment" ? "+" : "-"}${transaction.amount.toFixed(2)}
                    </p>
                    <Badge
                      variant={transaction.status === "completed" ? "default" : "secondary"}
                      className="text-xs mt-1"
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Summary Stats */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50">
        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm">Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-lg font-bold text-green-600">
                $
                {transactions
                  .filter((t) => t.type === "payment" && t.status === "completed")
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toFixed(2)}
              </p>
              <p className="text-xs text-gray-500">Total Earned</p>
            </div>
            <div>
              <p className="text-lg font-bold text-red-600">
                $
                {transactions
                  .filter((t) => t.type === "withdrawal" && t.status === "completed")
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toFixed(2)}
              </p>
              <p className="text-xs text-gray-500">Total Withdrawn</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
