import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import StyledTheme from '@/style/styledTheme'
import './reset.css'
import StyledComponentsRegistry from '@/lib/registry'
import dotenv from 'dotenv'
import Script from 'next/script'
dotenv.config()

export default async function LocaleLayout({
    children,
    params: { locale },
}: any) {
    let messages
    try {
        messages = (await import(`../../../messages/${locale}.json`)).default
    } catch (error) {
        notFound()
    }

    return (
        <html lang={locale}>
            <head>
                <Script
                    rel="preconnect"
                    async
                    src={`https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY}&callback=Function.prototype&libraries=places,geometry`}
                ></Script>
                <Script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-YQKPKC8399"
                ></Script>
                <Script
                    id="gtag"
                    dangerouslySetInnerHTML={{
                        __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-YQKPKC8399');
            `,
                    }}
                ></Script>
            </head>
            <body>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <StyledComponentsRegistry>
                        <StyledTheme>{children}</StyledTheme>
                    </StyledComponentsRegistry>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
