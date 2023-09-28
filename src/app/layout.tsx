import { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

export const metadata = {
    title: 'FishGram - Tus Spots | Tus Capturas. Tu pasión. ¡Buena pesca!',
    description:
        'FishGram te permite encontrar los mejores spots de pesca, compartir tus capturas y conectarte con otros pescadores apasionados. ¡Buena pesca!',
    keywords:
        'pesca, pescadores, pesca deportiva, pesca submarina, tienda de pesca, articulos de pesca',

    openGraph: {
        title: 'FishGram - Tus Spots | Tus Capturas. Tu pasión. ¡Buena pesca!',
        description:
            'FishGram te permite encontrar los mejores spots de pesca, compartir tus capturas y conectarte con otros pescadores apasionados. ¡Buena pesca!',
        url: 'https://fishgramapp.vercel.app/',
        siteName: 'FisgGram - APP',
        images: [
            {
                url: './opengraph-image.png',
                width: 800,
                height: 600,
                alt: 'FishGram - Logo',
            },
        ],
        locale: 'es_ES',
        type: 'website',
    },
}

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
    return <>{children}</>
}
