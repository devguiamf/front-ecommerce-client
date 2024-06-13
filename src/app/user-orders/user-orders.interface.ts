export interface Order {
    orderId: string,
    items: [
        {
            productId: string,
            productName: string,
            quantity: number,
            unitPrice: number,
            totalAmount: number
        }
    ],
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
    },
    totalAmount: number,
    status: string,
    date: string
}

export interface OrderPage {
    total: number,
    pages: number,
    currentPage: number,
    items: Order[]
}