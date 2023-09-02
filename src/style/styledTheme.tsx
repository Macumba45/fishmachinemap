'use client'
import { ThemeProvider } from 'styled-components'
import theme from './theme'
import React, { FC } from 'react'

interface Props {
    children: React.ReactNode
}

const StyledTheme: FC<Props> = ({ children }) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default StyledTheme
