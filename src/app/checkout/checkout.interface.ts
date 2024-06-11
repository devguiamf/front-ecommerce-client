export interface Checkout {
  cartItems: {
    productId: string,
    quantity: number
  }[],
  paymentMethod: string,
  paymentDetails: {
  customerKey: string
},
  deliveryAddress: {
    cep: string,
    address: string,
    number: string,
    state: string,
    city: string
  }
}
