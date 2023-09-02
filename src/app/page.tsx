'use client'
import { use, useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import { useLocale } from 'next-intl'

export default function Home() {

    return (

        useEffect(() => {
            redirect('/en')
        }
        , [])


    )
}
