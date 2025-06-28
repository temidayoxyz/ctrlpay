"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, Copy, Share, MessageCircle, Mail, Smartphone, ExternalLink } from "lucide-react"

interface Invoice {
  id: string
  amount: number
  description: string
  clientEmail: string
  status: "pending" | "paid"
  paymentLink: string
}

interface ShareSimulationProps {
  invoice: Invoice | null
  onClientPayment: () => void
  onBack: () => void
  user?: { name?: string | null } | null
}

export function ShareSimulation({ invoice, onClientPayment, onBack, user }: ShareSimulationProps) {
  const [linkCopied, setLinkCopied] = useState(false)
  const [shareMethod, setShareMethod] = useState<string | null>(null)
  const [showClientView, setShowClientView] = useState(false)

  if (!invoice) return null

  const copyToClipboard = () => {
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  const handleShare = (method: string) => {
    setShareMethod(method)

    // Simulate sharing delay
    setTimeout(() => {
      setShowClientView(true)
    }, 1500)
  }

  if (showClientView) {
    return (
      <div className="p-4 space-y-6">
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Link Shared Successfully!</h2>
          <p className="text-gray-600 text-sm">Your client received the payment link via {shareMethod}</p>
        </div>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="text-center space-y-3">
              <h3 className="font-semibold text-blue-900">Simulating Client Experience</h3>
              <p className="text-sm text-blue-700">
                Click below to see how your client will experience the payment process
              </p>
              <Button onClick={onClientPayment} className="w-full bg-blue-600 hover:bg-blue-700">
                <ExternalLink className="h-4 w-4 mr-2" />
                View as Client (Demo)
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium text-gray-900 mb-3">What your client sees:</h4>
            <div className="bg-gray-50 rounded-lg p-3 text-sm">
              <p className="font-medium">Payment Request from {user?.name || "Freelancer"}</p>
              <p className="text-gray-600 mt-1">Amount: ${invoice.amount.toFixed(2)}</p>
              <p className="text-gray-600">For: {invoice.description}</p>
              <p className="text-blue-600 mt-2">Click here to pay securely →</p>
            </div>
          </CardContent>
        </Card>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="text-center">
            <h4 className="font-medium text-orange-900 text-sm">Waiting for Payment</h4>
            <p className="text-xs text-orange-700 mt-1">
              You'll be notified instantly when your client completes the payment
            </p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-orange-600">Monitoring payment status...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (shareMethod) {
    return (
      <div className="p-4 space-y-6">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Share className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Sharing via {shareMethod}...</h2>
          <p className="text-gray-600 text-sm">Sending payment link to your client</p>
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Creating secure payment link...</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Composing message...</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Sending to {invoice.clientEmail}...</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-6">
      <div className="text-center py-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Share Payment Link</h2>
        <p className="text-gray-600 text-sm">Choose how to send the payment request</p>
      </div>

      <Card>
        <CardContent className="p-4">
          <Label className="text-xs text-gray-500 mb-2 block">Payment Link</Label>
          <div className="flex items-center gap-2 mb-3">
            <Input value={invoice.paymentLink} readOnly className="flex-1 bg-gray-50 text-xs" />
            <Button variant="outline" size="sm" onClick={copyToClipboard} className="shrink-0 bg-transparent">
              {linkCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <p className="text-xs text-gray-500">Secure payment link for your client</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h4 className="font-medium text-gray-900 mb-4">Choose sharing method</h4>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => handleShare("Email")}
              className="flex flex-col items-center gap-2 h-20 border-[#0548B7]/20 hover:bg-[#0548B7]/5"
            >
              <Mail className="h-6 w-6 text-[#0548B7]" />
              <span className="text-sm">Email</span>
            </Button>

            <Button
              variant="outline"
              onClick={() => handleShare("WhatsApp")}
              className="flex flex-col items-center gap-2 h-20 border-green-200 hover:bg-green-50"
            >
              <MessageCircle className="h-6 w-6 text-green-600" />
              <span className="text-sm">WhatsApp</span>
            </Button>

            <Button
              variant="outline"
              onClick={() => handleShare("SMS")}
              className="flex flex-col items-center gap-2 h-20 border-blue-200 hover:bg-blue-50"
            >
              <Smartphone className="h-6 w-6 text-blue-600" />
              <span className="text-sm">SMS</span>
            </Button>

            <Button
              variant="outline"
              onClick={() => handleShare("Other")}
              className="flex flex-col items-center gap-2 h-20 border-purple-200 hover:bg-purple-50"
            >
              <Share className="h-6 w-6 text-purple-600" />
              <span className="text-sm">Other</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="bg-[#0548B7]/10 border border-[#0548B7]/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="bg-[#0548B7]/10 rounded-full p-1">
            <Share className="h-4 w-4 text-[#0548B7]" />
          </div>
          <div>
            <h4 className="font-medium text-blue-900 text-sm">Prototype Demo</h4>
            <p className="text-xs text-blue-700">
              This simulates sharing the link with your client. In the real app, this would open your device's sharing
              options.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
