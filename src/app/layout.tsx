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
    return (
        <html lang="en">
            <head>
                <script
                    async
                    src={`https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY}&callback=Function.prototype&libraries=places`}
                ></script>
                <script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-YQKPKC8399"
                ></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YQKPKC8399');
        `,
                    }}
                ></script>
            </head>
            <body>{children}</body>
        </html>
    )
}
