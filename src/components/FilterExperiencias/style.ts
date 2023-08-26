import { Tabs } from '@mui/material'
import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`

export const StyledTabs = styled(Tabs)`
    /* Estilos personalizados para Tabs */
    /* Puedes acceder a las clases generadas por Material-UI usando .class-name */
    .MuiTabs-flexContainer {
        /* Estilos para la clase .MuiTabs-flexContainer */
        /* Agrega tus estilos personalizados aquí */
        width: 100%;
        display: flex;
        justify-content: center;
    }
`
