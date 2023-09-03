'use client'

import clsx from 'clsx'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next-intl/client'
import { FC, useEffect, useTransition } from 'react'
import spain from '../assets/icons8-spain-96.png'
import usa from '../assets/icons8-usa-96.png'

interface LocaleSwitcherProps {
    setLanguage?: any
}

const LocaleSwitcher: FC<LocaleSwitcherProps> = ({ setLanguage }) => {
    const t = useTranslations('LocaleSwitcher')
    const [isPending, startTransition] = useTransition()
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()

    // Función para cambiar el idioma al hacer clic en una bandera
    function changeLocale(nextLocale: string) {
        startTransition(() => {
            setLanguage((prevLanguage: string) => nextLocale)
            router.push(pathname, { locale: nextLocale })
            router.refresh()
        })
    }

    useEffect(() => {
        // Update the pathname when the locale changes
        router.push(pathname, { locale: locale })
    }, [locale, router])

    return (
        <div>
            {/* Bandera de España */}
            <img
                src={spain.src}
                style={{
                    width: '40px',
                    height: '40px',
                    cursor: 'pointer',
                    marginRight: '5px',
                    border: locale === 'es' ? '3.5px solid white' : 'none', // Agrega un borde si el idioma es 'es'
                    borderRadius: '50%',
                }}
                alt="España"
                className={clsx('cursor-pointer', {
                    'opacity-30': locale === 'es',
                    'hover:opacity-80': locale !== 'es' && !isPending,
                })}
                onClick={() => changeLocale('es')}
            />
            {/* Bandera de Estados Unidos */}
            <img
                src={usa.src}
                style={{
                    width: '40px',
                    height: '40px',
                    cursor: 'pointer',
                    marginLeft: '5px',
                    border: locale === 'en' ? '3.5px solid white' : 'none', // Agrega un borde si el idioma es 'en'
                    borderRadius: '50%',
                }}
                alt="USA"
                className={clsx('cursor-pointer', {
                    'opacity-30': locale === 'en',
                    'hover:opacity-80': locale !== 'en' && !isPending,
                })}
                onClick={() => changeLocale('en')}
            />
        </div>
    )
}

export default LocaleSwitcher
