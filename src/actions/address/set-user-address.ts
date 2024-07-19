'use server'
import { Address } from '@/interfaces'
import prisma from '@/lib/prisma'

export async function setUserAddress(address: Address, userId: string) {
  try {
    const newAddress = await createOrReplaceAddress(address, userId)
    return { address: newAddress, message: 'Dirección guardada exitosamente' }
  } catch (error) {
    console.error(error)
    return { address: null, message: error }
  }
}

async function createOrReplaceAddress(address: Address, userId: string) {
  try {
    const storeAddress = await prisma.userAddress.findUnique({ where: { userId } })
    const addressToSave = {
      userId,
      address: address.address,
      address2: address.address2,
      countryId: address.country,
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone,
      postalCode: address.postalCode,
      city: address.city
    }
    if (!storeAddress) {
      const newAddress = await prisma.userAddress.create({ data: addressToSave })
      return newAddress
    }
    const updateAddress = await prisma.userAddress.update({ where: { userId }, data: addressToSave })
    return updateAddress
  } catch (error) {
    console.error(error)
    throw new Error('No se pudo guardar la dirección')
  }
}
