'use client'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'

export default function PayPalButton() {
  const [{ isPending }] = usePayPalScriptReducer()

  if (isPending) {
    return (
      <div className="animate-pulse">
        <div className="h-11 bg-gray-300 rounded" />
        <div className="h-11 bg-gray-300 rounded mt-4" />
      </div>
    )
  }

  return <PayPalButtons></PayPalButtons>
}
