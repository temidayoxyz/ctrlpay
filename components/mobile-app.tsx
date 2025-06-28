"use client"

import { useState } from "react"
import { MobileDashboard } from "@/components/mobile/mobile-dashboard"
import { MobileInvoiceCreator } from "@/components/mobile/mobile-invoice-creator"
import { MobileWithdrawScreen } from "@/components/mobile/mobile-withdraw-screen"
import { MobileTransactions } from "@/components/mobile/mobile-transactions"
import { MobileNotifications } from "@/components/mobile/mobile-notifications"
import { MobileSettings } from "@/components/mobile/mobile-settings"
import { BottomNavigation } from "@/components/mobile/bottom-navigation"
import { MobileHeader } from "@/components/mobile/mobile-header"
import { PaymentNotification } from "@/components/mobile/payment-notification"
import { ShareSimulation } from "@/components/mobile/share-simulation"
import { SafariClientPayment } from "@/components/mobile/safari-client-payment"

type Screen =
  | "dashboard"
  | "create-invoice"
  | "withdraw"
  | "transactions"
  | "notifications"
  | "settings"
  | "share-simulation"
  | "client-payment"

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

interface MobileAppProps {
  user: { name: string; email: string } | null
  onLogout: () => void
  balance: number
  transactions: Transaction[]
  onInvoiceCreated: (invoice: Invoice) => void
  onPaymentCompleted: (amount: number, clientName: string) => void
  onWithdrawal: (amount: number, method: string) => void
}

export function MobileApp({
  user,
  onLogout,
  balance,
  transactions,
  onInvoiceCreated,
  onPaymentCompleted,
  onWithdrawal,
}: MobileAppProps) {
  const [currentScreen, setCurrentScreen] = useState<Screen>("dashboard")
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null)
  const [showPaymentNotification, setShowPaymentNotification] = useState(false)
  const [paymentNotificationData, setPaymentNotificationData] = useState<any>(null)

  const handleInvoiceCreated = (invoice: Invoice) => {
    setCurrentInvoice(invoice)
    onInvoiceCreated(invoice)
  }

  const handleShareInvoice = (invoice: Invoice) => {
    setCurrentInvoice(invoice)
    setCurrentScreen("share-simulation")
  }

  const handleClientPayment = () => {
    setCurrentScreen("client-payment")
  }

  const handlePaymentCompleted = (amount: number, description: string) => {
    // Show notification
    setPaymentNotificationData({ amount, description })
    setShowPaymentNotification(true)

    // Auto-hide notification but don't auto-redirect
    setTimeout(() => {
      setShowPaymentNotification(false)
      // Pass the client name from the current invoice
      const clientName = currentInvoice?.clientName || "Client"
      onPaymentCompleted(amount, clientName)
    }, 3000)
  }

  const handleWithdrawal = (amount: number, method: string) => {
    onWithdrawal(amount, method)
    setCurrentScreen("dashboard")
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "dashboard":
        return (
          <MobileDashboard
            balance={balance}
            transactions={transactions}
            onCreateInvoice={() => setCurrentScreen("create-invoice")}
            onWithdraw={() => setCurrentScreen("withdraw")}
          />
        )
      case "create-invoice":
        return <MobileInvoiceCreator onInvoiceCreated={handleInvoiceCreated} onShareInvoice={handleShareInvoice} />
      case "share-simulation":
        return (
          <ShareSimulation
            invoice={currentInvoice}
            user={user}
            onClientPayment={handleClientPayment}
            onBack={() => setCurrentScreen("create-invoice")}
          />
        )
      case "client-payment":
        return (
          <SafariClientPayment
            invoice={currentInvoice}
            user={user}
            onPaymentCompleted={handlePaymentCompleted}
            onReturnToDashboard={() => setCurrentScreen("dashboard")}
          />
        )
      case "withdraw":
        return (
          <MobileWithdrawScreen
            balance={balance}
            onWithdraw={handleWithdrawal}
            onBack={() => setCurrentScreen("dashboard")}
          />
        )
      case "transactions":
        return <MobileTransactions transactions={transactions} />
      case "notifications":
        return <MobileNotifications />
      case "settings":
        return <MobileSettings user={user} onLogout={onLogout} />
      default:
        return null
    }
  }

  return (
    <div className="h-full min-h-screen bg-gray-50 flex flex-col relative">
      <MobileHeader
        currentScreen={currentScreen}
        balance={balance}
        onBack={() => {
          if (currentScreen === "share-simulation") {
            setCurrentScreen("create-invoice")
          } else if (currentScreen === "client-payment") {
            setCurrentScreen("share-simulation")
          } else {
            setCurrentScreen("dashboard")
          }
        }}
        user={user}
        onLogout={onLogout}
      />

      <main className={`flex-1 overflow-y-auto ${currentScreen !== "client-payment" ? "pb-20" : ""}`}>
        {renderScreen()}
      </main>

      {currentScreen !== "client-payment" && (
        <BottomNavigation currentScreen={currentScreen} onScreenChange={setCurrentScreen} />
      )}

      {/* Payment Notification Overlay */}
      {showPaymentNotification && paymentNotificationData && (
        <PaymentNotification data={paymentNotificationData} onClose={() => setShowPaymentNotification(false)} />
      )}
    </div>
  )
}
