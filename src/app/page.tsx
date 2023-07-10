'use client'

import HeaderComp from '@/components/Header'
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import React from 'react'

export default function Home() {
    return (
        <div>
            <HeaderComp />
        </div>
    )
}
