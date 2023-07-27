export type FeedPros = {
    id?: string
    creator?: string
    userId?: string
    userName?: string
    picture?: string
    direction?: string
    description?: string
    date?: string
    likes?: number
    comentarios?: string[]
    onClick?: () => void
    isLiked?: boolean
    user?: {
        id: string
        name: string
        email: string
    }
}
