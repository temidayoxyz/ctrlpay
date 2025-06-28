"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { DollarSign, User, Mail, FileText, Share2 } from "lucide-react"

interface Invoice {
  id: string
  amount: number
  description: string
  clientName: string
  clientEmail: string
  status: "pending" | "paid"
  paymentLink: string
}

interface MobileInvoiceCreatorProps {
  onInvoiceCreated: (invoice: Invoice) => void
  onShareInvoice: (invoice: Invoice) => void
}

export function MobileInvoiceCreator({ onInvoiceCreated, onShareInvoice }: MobileInvoiceCreatorProps) {
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [clientName, setClientName] = useState("")
  const [clientEmail, setClientEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const isFormValid = () => {
    return amount && description && clientName && clientEmail && Number.parseFloat(amount) > 0
  }

  const handleCreateInvoice = async () => {
    if (!isFormValid()) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const invoice: Invoice = {
      id: Date.now().toString(),
      amount: Number.parseFloat(amount),
      description,
      clientName,
      clientEmail,
      status: "pending",
      paymentLink: `https://ctrlpay.app/pay/${Date.now()}`,
    }

    onInvoiceCreated(invoice)
    onShareInvoice(invoice)
    setIsLoading(false)
  }

  return (
    <div className="p-4 space-y-6 bg-gradient-to-br from-gray-50 to-white min-h-full">
      <div className="text-center py-4">
        <div className="w-16 h-16 bg-gradient-to-br from-[#0548B7] to-[#0548B7]/80 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <FileText className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Invoice</h2>
        <p className="text-gray-600 text-sm">Send a payment request to your client</p>
      </div>

      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              Amount (USD)
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-lg font-semibold h-12 rounded-xl border-2 focus:border-[#0548B7] transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-600" />
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Website design, logo creation, etc."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[80px] rounded-xl border-2 focus:border-[#0548B7] transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="clientName" className="text-sm font-medium flex items-center gap-2">
              <User className="h-4 w-4 text-purple-600" />
              Client Name
            </Label>
            <Input
              id="clientName"
              type="text"
              placeholder="Temidayo Jacob"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="h-12 rounded-xl border-2 focus:border-[#0548B7] transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="clientEmail" className="text-sm font-medium flex items-center gap-2">
              <Mail className="h-4 w-4 text-orange-600" />
              Client Email
            </Label>
            <Input
              id="clientEmail"
              type="email"
              placeholder="dayo@example.com"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              className="h-12 rounded-xl border-2 focus:border-[#0548B7] transition-all duration-200"
            />
          </div>
        </CardContent>
      </Card>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-4">
        <div className="text-center">
          <h4 className="font-semibold text-blue-900 text-sm mb-2">💡 Pro Tip</h4>
          <p className="text-xs text-blue-700">
            Clear descriptions help clients understand what they're paying for and reduce payment delays.
          </p>
        </div>
      </div>

      <Button
        onClick={handleCreateInvoice}
        disabled={!isFormValid() || isLoading}
        className="w-full bg-gradient-to-r from-[#0548B7] to-[#0548B7]/90 hover:from-[#0548B7]/90 hover:to-[#0548B7] h-14 text-lg font-semibold rounded-2xl shadow-lg transition-all duration-300 hover:scale-105"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Creating Invoice...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Create & Share Invoice
          </div>
        )}
      </Button>
    </div>
  )
}
