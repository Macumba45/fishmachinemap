// FilterComponent
import React, { useState } from 'react'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'


const FilterComponent = ({ onChange }: any) => {
    // Añadir el estado local para el filtro
    const [filter, setFilter] = useState('all')

    // Añadir la función handleFilterChange

    const handleFilterChange = (
        event: React.MouseEvent<HTMLElement>,
        newFilter: string
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
