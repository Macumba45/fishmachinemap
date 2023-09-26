import { ReactNode } from 'react'
import { Metadata } from 'next'


type Props = {
    children: ReactNode
}

export const metadata = {
    title: 'FishGram - APP',
    description: 'FishGram - APP. ¡Comparte tus spots favoritos, capturas y mucho más!',
    keywords:
        'pesca, pescadores, pesca deportiva, pesca submarina, tienda de pesca, articulos de pesca',
    applicationName: 'FishGram - APP',
    images: 'https://i.postimg.cc/W4tdJ1S8/LOGOTIPO-HORIZONTAL-COLOR.png'
    
    

}

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
    return <>{children}</>
}
