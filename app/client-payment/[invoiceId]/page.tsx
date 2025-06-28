"use client"

import { ClientPaymentPage } from "@/components/client-payment-page"

interface ClientPaymentProps {
  params: {
    invoiceId: string
  }
}

export default function ClientPayment({ params }: ClientPaymentProps) {
  return <ClientPaymentPage invoiceId={params.invoiceId} />
}
