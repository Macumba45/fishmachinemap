import StyledComponentsRegistry from '../lib/registry'
import './reset.css'
import './fontWeb.css'
import React from 'react'
import StyledTheme from './style/styledTheme'

export const metadata = {
    title: 'Fish App',
    description: 'App hecha para y por pescadores',
    keywords: 'pesca, pescadores, pesca deportiva, pesca submarina',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html suppressHydrationWarning lang="es">
            <head>
                {/* <script
                    src={`https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY}&libraries=geometry`}
                >

                </script> */}
                <script
                    async
                    src={`https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY}&callback=Function.prototype&libraries=places`}
                ></script>
                {/* <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDw2bVFpPABnpSh7xogUBucTML69T4U9rY&libraries=places"></script> */}
            </head>

            <body>
                <StyledComponentsRegistry>
                    <StyledTheme>{children}</StyledTheme>
                </StyledComponentsRegistry>
            </body>
        </html>
    )
}
