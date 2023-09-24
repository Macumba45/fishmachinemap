import { FC, memo } from 'react'
import { Container } from './style'
import { Tab, Tabs } from '@mui/material'

interface Props {
    onChange?: (value: any) => void
    value?: string
}

const FilterExperiencias: FC<Props> = ({ onChange, value }) => {
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
                sx={{ display: 'flex', justifyContent: 'center' }}
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
                <Tab
                    sx={{
                        fontSize: '0.8rem',
                        '&.MuiTab-root': {
                            color: '#5c5c5c', // Cambia el color del texto de los tabs no activos
                        },
                        '&.Mui-selected': {
                            color: '#4675A6', // Cambia el color del texto del tab activo
                        },
                    }}
                    value="Influencers"
                    label="Influencers"
                />
                <Tab
                    sx={{
                        fontSize: '0.8rem',
                        '&.MuiTab-root': {
                            color: '#5c5c5c', // Cambia el color del texto de los tabs no activos
                        },
                        '&.Mui-selected': {
                            color: '#4675A6', // Cambia el color del texto del tab activo
                        },
                    }}
                    value="Empresas"
                    label="Empresas"
                />
            </Tabs>
        </Container>
    )
}

export default memo(FilterExperiencias)
