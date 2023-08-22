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

    return (
        <Container>
            <Tabs
                value={value} // Asegúrate de que value sea una cadena, por ejemplo, value="Accesorios"
                onChange={handleOnChange}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                aria-label="scrollable force tabs example"
                indicatorColor="secondary"
                textColor="secondary"
                sx={{ width: '100%' }}
            >
                <Tab sx={{ fontSize: '0.7rem' }} value="Todos" label="Todos" />
                <Tab
                    sx={{ fontSize: '0.7rem' }}
                    value="Accesorios"
                    label="Accesorios"
                />
                <Tab
                    sx={{ fontSize: '0.7rem' }}
                    value="Ropa"
                    label="Ropa y Calzado"
                />
                <Tab
                    sx={{ fontSize: '0.7rem' }}
                    value="Camping"
                    label="Camping"
                />
                <Tab
                    sx={{ fontSize: '0.7rem' }}
                    value="Equipamiento"
                    label="Equipamiento de Embarcaciones"
                />
                <Tab
                    sx={{ fontSize: '0.7rem' }}
                    value="Equipo"
                    label="Equipo Completo"
                />
                <Tab
                    sx={{ fontSize: '0.7rem' }}
                    value="Cañas"
                    label="Cañas de Pesca"
                />
                <Tab
                    sx={{ fontSize: '0.7rem' }}
                    value="Bolsas"
                    label="Bolsas y Fundas"
                />
                <Tab
                    sx={{ fontSize: '0.7rem' }}
                    value="Electrónica"
                    label="Electrónica"
                />
            </Tabs>
        </Container>
    )
}

export default memo(LimitTags)
