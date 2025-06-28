"use client"

import { useState, useMemo } from "react"
import { MobileApp } from "@/components/mobile-app"
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow"

type Screen = "dashboard" | "create-invoice" | "payment" | "withdraw" | "summary"

interface Invoice {
  id: string
  amount: number
  description: string
  clientName: string
  clientEmail: string
  status: "pending" | "paid"
  paymentLink: string
}

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

export default function CtrlPayApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [currentScreen, setCurrentScreen] = useState<Screen>("dashboard")
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "payment",
      amount: 500,
      currency: "USD",
      status: "completed",
      date: "2024-01-15",
      description: "Website Design for Acme Corp",
      clientName: "Acme Corp",
      fee: 10,
    },
    {
      id: "2",
      type: "withdrawal",
      amount: 200,
      currency: "USD",
      status: "completed",
      date: "2024-01-10",
      description: "Withdrawal to Bank Account",
      fee: 4,
    },
    {
      id: "3",
      type: "payment",
      amount: 750,
      currency: "USD",
      status: "completed",
      date: "2024-01-08",
      description: "Mobile App Development",
      clientName: "TechStart Inc",
      fee: 15,
    },
    {
      id: "4",
      type: "payment",
      amount: 300,
      currency: "USD",
      status: "completed",
      date: "2024-01-05",
      description: "Logo Design Project",
      clientName: "Design Studio",
      fee: 6,
    },
    {
      id: "5",
      type: "payment",
      amount: 1200,
      currency: "USD",
      status: "completed",
      date: "2024-01-03",
      description: "E-commerce Platform",
      clientName: "Online Retail Co",
      fee: 24,
    },
    {
      id: "6",
      type: "withdrawal",
      amount: 800,
      currency: "USD",
      status: "completed",
      date: "2024-01-01",
      description: "Withdrawal to Mobile Money",
      fee: 16,
    },
  ])

  // Calculate dynamic balance based on transactions
  const usdBalance = useMemo(() => {
    return transactions.reduce((balance, transaction) => {
      if (transaction.status === "completed") {
        if (transaction.type === "payment") {
          // Add payments (minus fees)
          return balance + transaction.amount - (transaction.fee || 0)
        } else if (transaction.type === "withdrawal") {
          // Subtract withdrawals (including fees)
          return balance - transaction.amount - (transaction.fee || 0)
        }
      }
      return balance
    }, 0) // Start with 0 balance
  }, [transactions])

  const handleAuthSuccess = (userData: { name: string; email: string }) => {
    setUser(userData)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
  }

  const handleInvoiceCreated = (invoice: Invoice) => {
    setCurrentInvoice(invoice)
    setCurrentScreen("payment")
  }

  const handlePaymentCompleted = (amount: number, clientName: string) => {
    const fee = amount * 0.02 // 2% fee
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: "payment",
      amount,
      currency: "USD",
      status: "completed",
      date: new Date().toISOString().split("T")[0],
      description: currentInvoice?.description || "Payment received",
      clientName: clientName,
      fee: fee,
    }
    setTransactions([newTransaction, ...transactions])
    setCurrentScreen("dashboard")
  }

  const handleWithdrawal = (amount: number, method: string) => {
    const fee = method === "bank" ? 2 : 5
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: "withdrawal",
      amount,
      currency: "USD",
      status: "completed", // Changed to completed so it reflects immediately
      date: new Date().toISOString().split("T")[0],
      description: `Withdrawal via ${method}`,
      fee,
    }
    setTransactions([newTransaction, ...transactions])
    setCurrentScreen("dashboard")
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile-first responsive container */}
      <div className="w-full max-w-md mx-auto bg-white min-h-screen relative lg:max-w-lg xl:max-w-xl lg:my-8 lg:rounded-3xl lg:shadow-2xl lg:overflow-hidden">
        {!isAuthenticated ? (
          <OnboardingFlow onAuthSuccess={handleAuthSuccess} />
        ) : (
          <MobileApp
            user={user}
            onLogout={handleLogout}
            balance={usdBalance}
            transactions={transactions}
            onInvoiceCreated={handleInvoiceCreated}
            onPaymentCompleted={handlePaymentCompleted}
            onWithdrawal={handleWithdrawal}
          />
        )}
      </div>

      {/* Desktop enhancement - optional branding/info */}
      <div className="hidden lg:block fixed top-8 left-8 z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
          <h1 className="text-xl font-bold text-gray-900 mb-1">CTRL+Pay</h1>
          <p className="text-sm text-gray-600">Mobile Payment Platform</p>
        </div>
      </div>

      {/* Desktop enhancement - optional features info */}
      <div className="hidden xl:block fixed top-8 right-8 z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg max-w-xs">
          <h3 className="font-semibold text-gray-900 mb-2">Key Features</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Low 2% transaction fees</li>
            <li>• Instant USD payments</li>
            <li>• Multiple withdrawal options</li>
            <li>• Secure & encrypted</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
