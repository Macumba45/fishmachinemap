import StyledComponentsRegistry from '../lib/registry'
import './reset.css'
import React from 'react'
import StyledTheme from './style/styledTheme'

export function generateStaticParams() {
    return [{ locale: 'en' }, { locale: 'es' }];
}
console.log(generateStaticParams())

export const metadata = {
    title: 'FishGram',
    description: 'App hecha para y por pescadores',
    image: '/images/logo.png',
    og: {
        title: 'FishGram',
        description: 'App hecha para y por pescadores',
        image: '/images/logo.png',
        type: 'website',
        url: 'https://fishgramapp.vercel.app',
    },

    keywords:
        'pesca, pescadores, pesca deportiva, pesca submarina, tienda de pesca, articulos de pesca',
}

export default async function LocaleLayout({ children, params: { locale } }: any) {
    return (
        <html suppressHydrationWarning lang={locale}>
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

            <body>
                <StyledComponentsRegistry>
                    <StyledTheme>{children}</StyledTheme>
                </StyledComponentsRegistry>
            </body>
        </html>
    )
}
