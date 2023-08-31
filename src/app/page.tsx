'use client'
import HeaderComp from '@/components/Header'
import React from 'react'
import useTranslation from 'next-translate/useTranslation'


export default function Home() {
    const { t } = useTranslation('common')
    console.log(useTranslation('common'))
    return (
        <div>
            <HeaderComp />
        </div>
    )
}
