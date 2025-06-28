"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, FileText, Send } from "lucide-react"

interface Invoice {
  id: string
  amount: number
  description: string
  clientEmail: string
  status: "pending" | "paid"
  paymentLink: string
}

interface InvoiceCreatorProps {
  onInvoiceCreated: (invoice: Invoice) => void
}

export function InvoiceCreator({ onInvoiceCreated }: InvoiceCreatorProps) {
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [clientEmail, setClientEmail] = useState("")
  const [createdInvoice, setCreatedInvoice] = useState<Invoice | null>(null)
  const [linkCopied, setLinkCopied] = useState(false)

  const handleCreateInvoice = () => {
    const invoice: Invoice = {
      id: Date.now().toString(),
      amount: Number.parseFloat(amount),
      description,
      clientEmail,
      status: "pending",
      paymentLink: `https://ctrlpay.com/pay/${Date.now()}`,
    }

    setCreatedInvoice(invoice)
    onInvoiceCreated(invoice)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  const isFormValid = amount && description && clientEmail

  if (createdInvoice) {
    return (
      <div className="p-6 space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Invoice Created!</h2>
          <p className="text-gray-600">Your payment link is ready to share</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Invoice Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Amount</Label>
                <p className="text-2xl font-bold text-green-600">${createdInvoice.amount.toFixed(2)}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Status</Label>
                <div className="mt-1">
                  <Badge variant="secondary">Pending Payment</Badge>
                </div>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-500">Description</Label>
              <p className="text-gray-900">{createdInvoice.description}</p>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-500">Client Email</Label>
              <p className="text-gray-900">{createdInvoice.clientEmail}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Link</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Input value={createdInvoice.paymentLink} readOnly className="flex-1 bg-gray-50" />
              <Button
                variant="outline"
                onClick={() => copyToClipboard(createdInvoice.paymentLink)}
                className="shrink-0"
              >
                {linkCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-2">Share this link with your client to receive payment</p>
          </CardContent>
        </Card>

        <Button
          className="w-full bg-blue-600 hover:bg-blue-700"
          onClick={() =>
            window.open(
              `mailto:${createdInvoice.clientEmail}?subject=Payment Request&body=Please use this link to complete your payment: ${createdInvoice.paymentLink}`,
            )
          }
        >
          <Send className="h-4 w-4 mr-2" />
          Send via Email
        </Button>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Payment Invoice</h2>
        <p className="text-gray-600">Generate a payment link for your client</p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="e.g., Website Design for Acme Corp"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="clientEmail">Client Email</Label>
            <Input
              id="clientEmail"
              type="email"
              placeholder="client@company.com"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
            />
            <p className="text-sm text-gray-500">We'll send payment confirmation to this email</p>
          </div>
        </CardContent>
      </Card>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="bg-blue-100 rounded-full p-1">
            <FileText className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <h4 className="font-medium text-blue-900">Low Transaction Fees</h4>
            <p className="text-sm text-blue-700">
              Only 1% fee on successful payments • No setup costs • Get paid in USD
            </p>
          </div>
        </div>
      </div>

      <Button
        onClick={handleCreateInvoice}
        disabled={!isFormValid}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
      >
        Create Invoice & Payment Link
      </Button>
    </div>
  )
}
