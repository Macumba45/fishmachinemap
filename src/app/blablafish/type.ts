export type BlaBlaFish = {
    id?: string
    date: string | number
    departureCity: string
    arrivalCity: string
    departureTime: string
    description: string
    price: string
    phone: string
    userId?: string
    createdAt?: string
    user?: {
        id: string
        name: string
        email: string
        userId?: string
        picture: string
    }
}
