"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, Download } from "lucide-react"

export function TransactionSummary() {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Transaction Successful</h2>
        <p className="text-gray-600">Your withdrawal has been processed</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Amount</p>
              <p className="text-xl font-bold">$248.00</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <Badge className="mt-1">Processing</Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Method</p>
              <p className="font-medium">Bank Transfer</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Expected Arrival</p>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm">1-2 business days</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Fee Breakdown</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Withdrawal amount</span>
                <span>$250.00</span>
              </div>
              <div className="flex justify-between">
                <span>Transaction fee</span>
                <span>-$2.00</span>
              </div>
              <div className="flex justify-between font-medium border-t pt-1">
                <span>Net amount</span>
                <span>$248.00</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button className="w-full" variant="outline">
        <Download className="h-4 w-4 mr-2" />
        Download Receipt
      </Button>
    </div>
  )
}
