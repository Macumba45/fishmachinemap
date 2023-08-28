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
                indicatorColor="secondary"
                textColor="secondary"
                sx={{ display: 'flex', justifyContent: 'center' }}
            >
                <Tab
                    sx={{ fontSize: '0.8rem' }}
                    value="Influencers"
                    label="Influencers"
                />
                <Tab
                    sx={{ fontSize: '0.8rem' }}
                    value="Empresas"
                    label="Empresas"
                />
            </Tabs>
        </Container>
    )
}

export default memo(FilterExperiencias)
