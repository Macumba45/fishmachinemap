'use client'

import React, { FC, useState } from 'react'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import customMarkerIcon from '../../assets/anzuelo.png'
import customMarkerIconShop from '../../assets/tienda.png'
import customMarkerIconPlace from '../../assets/destino.png'
import customMarkerIconPicture from '../../assets/back-camera.png'
import customMarkerIconLikes from '../../assets/likes.png'
import { Icon } from '@mui/material'
import { MainContainer } from './style'
import { MarkerType } from '@/app/[locale]/maps/type'

type FilterComponentProps = {
    onChange: (newFilter: MarkerType) => void
    selectedFilter: MarkerType // Nuevo prop para recibir el filtro seleccionado
}

const FilterComponent: FC<FilterComponentProps> = ({
    onChange,
    selectedFilter,
}) => {
    // Añadir el estado local para el filtro
    const [filter, setFilter] = useState<MarkerType>(selectedFilter)
    const [filterAll, setFilterAll] = useState(false)

    // Añadir la función handleFilterChange

    const handleFilterChange = (
        event: React.MouseEvent<HTMLElement>,
        newFilter: MarkerType
    ) => {
        setFilter(newFilter)
        onChange(newFilter) // Invocar la función onChange para propagar el cambio al componente padre
    }
    let widthFilter
    if (window.innerWidth < 350) {
        widthFilter = '300px'
    } else {
        widthFilter = '100%'
    }

    return (
        <MainContainer>
            <ToggleButtonGroup
                value={filter}
                exclusive
                onChange={handleFilterChange}
                sx={{
                    borderRadius: '10px',
                    display: 'flex',
                }}
            >
                <ToggleButton
                    sx={{
                        border: 'none',
                        borderRadius: '10px',
                        color: 'white',
                        fontSize: '0.7rem',
                        fontWeight: filter === 'all' ? 800 : 'inherit',
                        fontFamily: 'Roboto',
                        '&.MuiToggleButton-root.Mui-selected': {
                            color: '#b649ff',
                            backgroundColor: 'white',
                        },
                    }}
                    value="all"
                >
                    <Icon
                        component="img"
                        sx={{
                            width: '1.5rem',
                            height: '1.5rem',
                            marginRight: '0.2rem',
                        }}
                        src={customMarkerIcon.src}
                    ></Icon>
                </ToggleButton>
                <ToggleButton
                    sx={{
                        border: 'none',
                        borderRadius: '10px',
                        color: 'white',
                        fontSize: '0.7rem',
                        fontWeight: filter === 'tienda' ? 800 : 'inherit',
                        fontFamily: 'Roboto',
                        '&.MuiToggleButton-root.Mui-selected': {
                            color: '#b649ff',
                            backgroundColor: 'white',
                        },
                    }}
                    value="pesquero"
                >
                    <Icon
                        component="img"
                        sx={{
                            width: '1.5rem',
                            height: '1.5rem',
                            marginRight: '0.2rem',
                        }}
                        src={customMarkerIconPlace.src}
                    ></Icon>
                </ToggleButton>
                <ToggleButton
                    sx={{
                        border: 'none',
                        borderRadius: '10px',
                        color: 'white',
                        fontSize: '0.7rem',
                        fontWeight: filter === 'pesquero' ? 800 : 'inherit',
                        fontFamily: 'Roboto',
                        '&.MuiToggleButton-root.Mui-selected': {
                            color: '#b649ff',
                            backgroundColor: 'white',
                        },
                    }}
                    value="tienda"
                >
                    <Icon
                        component="img"
                        sx={{
                            width: '1.5rem',
                            height: '1.5rem',
                            marginRight: '0.2rem',
                        }}
                        src={customMarkerIconShop.src}
                    ></Icon>
                </ToggleButton>
                <ToggleButton
                    sx={{
                        border: 'none',
                        borderRadius: '10px',
                        color: 'white',
                        fontSize: '0.7rem',
                        fontWeight: filter === 'cebos' ? 800 : 'inherit',
                        fontFamily: 'Roboto',
                        '&.MuiToggleButton-root.Mui-selected': {
                            color: '#b649ff',
                            backgroundColor: 'white',
                        },
                    }}
                    value="cebos"
                >
                    <Icon
                        component="img"
                        sx={{
                            width: '1.5rem',
                            height: '1.5rem',
                            marginRight: '0.2rem',
                        }}
                        src={customMarkerIcon.src}
                    ></Icon>
                </ToggleButton>
                <ToggleButton
                    sx={{
                        border: 'none',
                        borderRadius: '10px',
                        color: 'white',
                        fontSize: '0.7rem',
                        fontWeight: filter === 'fotos' ? 800 : 'inherit',
                        fontFamily: 'Roboto',
                        '&.MuiToggleButton-root.Mui-selected': {
                            color: '#b649ff',
                            backgroundColor: 'white',
                        },
                    }}
                    value="fotos"
                >
                    <Icon
                        component="img"
                        sx={{
                            width: '1.5rem',
                            height: '1.5rem',
                            marginRight: '0.2rem',
                        }}
                        src={customMarkerIconPicture.src}
                    ></Icon>
                </ToggleButton>
                <ToggleButton
                    sx={{
                        border: 'none',
                        borderRadius: '10px',
                        color: 'white',
                        fontSize: '0.7rem',
                        fontWeight: filter === 'fotos' ? 800 : 'inherit',
                        fontFamily: 'Roboto',
                        '&.MuiToggleButton-root.Mui-selected': {
                            color: '#b649ff',
                            backgroundColor: 'white',
                        },
                    }}
                    value="likes"
                >
                    <Icon
                        component="img"
                        sx={{
                            width: '1.5rem',
                            height: '1.5rem',
                            marginRight: '0.2rem',
                        }}
                        src={customMarkerIconLikes.src}
                    ></Icon>
                </ToggleButton>
            </ToggleButtonGroup>
        </MainContainer>
    )
}

export default FilterComponent
