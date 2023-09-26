import { ReactNode } from 'react'
import { Metadata } from 'next'

type Props = {
    children: ReactNode
}

// export const metadata = {
//     title: 'FishGramApp',
//     description: 'App hecha para y por pescadores',
//     keywords:
//         'pesca, pescadores, pesca deportiva, pesca submarina, tienda de pesca, articulos de pesca',
//     applicationName: 'FishGramApp',
//     images: 'https://i.postimg.cc/W4tdJ1S8/LOGOTIPO-HORIZONTAL-COLOR.png'

// }

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
    return <>{children}</>
}
