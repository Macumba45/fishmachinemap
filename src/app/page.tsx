'use client'
import { getAuthenticatedToken } from '@/lib/storage/storage'
import { useLocale } from 'next-intl'
import { redirect } from 'next/navigation'

export default function Home() {
    const token = getAuthenticatedToken()
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined' && typeof navigator.language !== 'undefined') {
        const locale = navigator.language
        if (token) {
            return redirect(`/${locale}/maps`)
        } else {
            return redirect(locale)
        }
    }
}
