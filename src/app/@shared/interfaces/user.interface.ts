export interface UserLoggeed {
    id: string,
    email: string,
    name: string,
    cpf: string,
    phone: string,
    address: {
        cep: string,
        address: string,
        number: string,
        state: string,
        city: string,
    },
    role: string,
    isConfirmed: false
}