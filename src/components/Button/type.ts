import React from 'react'

export type Props = {
    title?: string | undefined
    icon?: React.ReactElement
    bgColor?: string | undefined
    marginBottom?: string | undefined
    border?: string | undefined
    href?: string | undefined
    style?: React.CSSProperties
    variant?: string
    color?: string
    fontFamily?: string
    initial?: number
    onClick?: () => void
    children?: React.ReactNode
}
