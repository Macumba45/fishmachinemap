export type User = {
    id: number
    role: string
    name: string
    email: string
    password: string
    picture: string
}

export type Experiences = {
    type?: string
    title: string
    picture: string
    category: string
    description: string
    price: string
    phone: string
    city: string
    whatsapp: string
    url: string
    user?: User
}

export enum ExperiencesType {
    ALL = 'all',
    INFLUENCER = 'influencer',
    BUSINESS = 'business',
}
