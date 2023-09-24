import { FC, memo } from 'react'
import { Container } from './style'
import { Tab, Tabs } from '@mui/material'

interface Props {
    onChange?: (value: any) => void
    value?: string
}

const LimitTags: FC<Props> = ({ onChange, value }) => {
    const handleOnChange = (event: any, newValue: any) => {
        onChange && onChange(newValue)
    }

    const tabStyles = {
        fontSize: '0.7rem',
        '&.MuiTab-root': {
            color: '#5c5c5c', // Cambia el color del texto de los tabs no activos
        },
        '&.Mui-selected': {
            color: '#4675A6', // Cambia el color del texto del tab activo
        },
    }

    return (
        <Container>
            <Tabs
                value={value} // Asegúrate de que value sea una cadena, por ejemplo, value="Accesorios"
                onChange={handleOnChange}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                aria-label="scrollable force tabs example"
                TabIndicatorProps={{
                    style: {
                        backgroundColor: '#4675A6',
                    },
                }}
                TabScrollButtonProps={{
                    style: {
                        color: '#4675A6',
                    },
                }}
            >
                <Tab sx={tabStyles} value="Todos" label="Todos" />
                <Tab sx={tabStyles} value="Accesorios" label="Accesorios" />
                <Tab sx={tabStyles} value="Ropa" label="Ropa y Calzado" />
                <Tab sx={tabStyles} value="Camping" label="Camping" />
                <Tab
                    sx={tabStyles}
                    value="Equipamiento"
                    label="Equipamiento de Embarcaciones"
                />
                <Tab sx={tabStyles} value="Equipo" label="Equipo Completo" />
                <Tab sx={tabStyles} value="Cañas" label="Cañas de Pesca" />
                <Tab sx={tabStyles} value="Bolsas" label="Bolsas y Fundas" />
                <Tab sx={tabStyles} value="Electrónica" label="Electrónica" />
            </Tabs>
        </Container>
    )
}

export default memo(LimitTags)
