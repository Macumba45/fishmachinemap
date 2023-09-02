import { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

export const metadata = {
    title: 'FishGramApp',
    description: 'App hecha para y por pescadores',
    image: '/images/logo.png',
    type: 'website',
    url: 'https://fishgramapp.vercel.app',
    keywords:
        'pesca, pescadores, pesca deportiva, pesca submarina, tienda de pesca, articulos de pesca',
}

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
    return <>{children}</>
}
