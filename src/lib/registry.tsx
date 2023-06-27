'use client'

import { ThemeProvider } from 'styled-components';
import { FC } from 'react';
import { Reset } from 'styled-reset';
import theme from '@/styles/theme';

interface Props {
    children: React.ReactNode
}

const StyledComponentsTheme: FC<Props> = ({ children }: { children: React.ReactNode }) => {

    return (

        <ThemeProvider theme={theme}>
            <Reset />
            {children}
        </ThemeProvider>


    )

}


export default StyledComponentsTheme;


