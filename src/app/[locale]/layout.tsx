import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import StyledTheme from '@/style/styledTheme'
import './reset.css'
import StyledComponentsRegistry from '@/lib/registry'

export function generateStaticParams() {
    return [{ locale: 'en' }, { locale: 'de' }]
}

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
