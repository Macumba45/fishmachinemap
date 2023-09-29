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
                value={value}
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
                <Tab sx={tabStyles} value="all" label="Todos" />
                <Tab sx={tabStyles} value="influencer" label="Influencers" />
                <Tab sx={tabStyles} value="business" label="Empresas" />
            </Tabs>
        </Container>
    )
}

export default memo(FilterExperiencias)
