import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import StyledTheme from '@/style/styledTheme'
import './reset.css'
import StyledComponentsRegistry from '@/lib/registry'
import dotenv from 'dotenv'
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
                <script
                    async
                    src={`https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY}&callback=Function.prototype&libraries=places,geometry`}
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
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <StyledComponentsRegistry>
                        <StyledTheme>{children}</StyledTheme>
                    </StyledComponentsRegistry>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
