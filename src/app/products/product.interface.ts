export interface Product {
    id: string,
    name: string,
    description: string,
    price: number,
    category: {
        id: string,
        name: string,
        rootCategory: {
            id: string,
            name: string,
            description: string
        }
    },
    image: string
}

export interface ProductItemResume {
    id?: string,
    title: string,
    price: number,
    image: string
}

export interface ProductPage {
    items: Product[],
    page: number,
    total: number,
    currentPage: number
}
