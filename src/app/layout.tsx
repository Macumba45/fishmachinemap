import { ReactNode } from 'react'
import { Metadata } from 'next'

type Props = {
    children: ReactNode
}

export const metadata = {
    title: 'FishGram - APP',
    description:
        'FishGram - ¡Comparte tus spots favoritos, capturas y mucho más!',
    keywords:
        'pesca, pescadores, pesca deportiva, pesca submarina, tienda de pesca, articulos de pesca',
}

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
    return <>{children}</>
}
