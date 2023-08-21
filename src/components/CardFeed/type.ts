import React from 'react'

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
    comments?: string[]
    onClick?: () => void
    isLiked?: boolean
    user?: {
        id: string
        name: string
        email: string
    }
    numberOfComments?: number
    iconCreator?: React.ReactNode
    handleShareOnWhatsApp?: () => void
    handleShareOnFacebook?: () => void
    disabled?: boolean
}
