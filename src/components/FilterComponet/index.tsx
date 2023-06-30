// FilterComponent
import React, { FC, useState } from 'react'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

enum MarkerType {
    SHOP = 'shop',
    WORM = 'worm',
    ALL = 'all',
    PLACE = 'place',
}

type FilterComponentProps = {
    
    onChange: (newFilter: MarkerType) => void;
};

const FilterComponent: FC<FilterComponentProps> = ({ onChange }) => {

   
    // Añadir el estado local para el filtro
    const [filter, setFilter] = useState('all')

    // Añadir la función handleFilterChange

    const handleFilterChange = (
        event: React.MouseEvent<HTMLElement>,
        newFilter: MarkerType
    ) => {
        setFilter(newFilter)
        onChange(newFilter) // Invocar la función onChange para propagar el cambio al componente padre
    }

    return (
        <div
            style={{
                backgroundColor: 'white',
                borderRadius: '10px',
                fontFamily: 'Roboto',
            }}
        >
            <ToggleButtonGroup
                value={filter}
                exclusive
                onChange={handleFilterChange}
                sx={{
                    backgroundColor: 'grey',
                    borderRadius: '10px',
                }}
            >
                <ToggleButton
                    sx={{
                        border: 'none',
                        borderRadius: '10px',
                        color: 'white',
                        fontSize: '0.7rem',
                    }}
                    value="all"
                >
                    Todo
                </ToggleButton>
                <ToggleButton
                    sx={{
                        border: 'none',
                        borderRadius: '10px',
                        color: 'white',
                        fontSize: '0.7rem',
                    }}
                    value="place"
                >
                    Pesqueros
                </ToggleButton>
                <ToggleButton
                    sx={{
                        border: 'none',
                        borderRadius: '10px',
                        color: 'white',
                        fontSize: '0.7rem',
                    }}
                    value="shop"
                >
                    Tiendas
                </ToggleButton>
                <ToggleButton
                    sx={{
                        border: 'none',
                        borderRadius: '10px',
                        color: 'white',
                        fontSize: '0.7rem',
                    }}
                    value="worm"
                >
                    Cebos 24h
                </ToggleButton>
            </ToggleButtonGroup>
        </div>
    )
}

export default FilterComponent
