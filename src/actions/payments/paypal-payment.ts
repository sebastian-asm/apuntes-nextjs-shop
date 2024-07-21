'use server'
import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'

import type { PayPalOrderResponse } from '@/interfaces'

const { NEXT_PUBLIC_PAYPAL_CLIENT_ID, PAYPAL_SECRET, PAYPAL_OAUTH_URL, PAYPAL_ORDERS_URL } = process.env

export async function paypalCheckPayment(transactionId: string) {
  try {
    const authToken = await getPayPalBearerToken()
    if (!authToken) throw new Error('Error al obtener el token de verificación')

    const result = await verifyPayPalPayment(transactionId, authToken)
    if (!result) throw new Error('Error al verificar el pago')

    const { status, purchase_units } = result
    const { invoice_id: orderId } = purchase_units[0]
    if (status !== 'COMPLETED') throw new Error('La orden de compra quedó pendiente de pago')

    await prisma.order.update({
      where: { id: orderId },
      data: { isPaid: true, paidAt: new Date() }
    })
    revalidatePath(`/orders/${orderId}`)
    return true
  } catch (error) {
    console.error(error)
    return null
  }
}

async function getPayPalBearerToken() {
  const base64Token = Buffer.from(`${NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`, 'utf-8').toString('base64')
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
  myHeaders.append('Authorization', `Basic ${base64Token}`)

  const urlencoded = new URLSearchParams()
  urlencoded.append('grant_type', 'client_credentials')

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded
  }

  try {
    const result = await fetch(`${PAYPAL_OAUTH_URL}`, {
      ...requestOptions,
      cache: 'no-store'
    }).then((data) => data.json())
    return result.access_token
  } catch (error) {
    console.error(error)
    return null
  }
}

async function verifyPayPalPayment(transactionId: string, token: string): Promise<PayPalOrderResponse | null> {
  try {
    const result = await fetch(`${PAYPAL_ORDERS_URL}/${transactionId}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store'
    }).then((data) => data.json())
    return result
  } catch (error) {
    console.error(error)
    return null
  }
}
