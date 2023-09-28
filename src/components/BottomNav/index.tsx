'use client'

import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import SailingIcon from '@mui/icons-material/Sailing'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel'
import SailingOutlinedIcon from '@mui/icons-material/SailingOutlined'
import ViewCarouselOutlinedIcon from '@mui/icons-material/ViewCarouselOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle'
import AirportShuttleOutlinedIcon from '@mui/icons-material/AirportShuttleOutlined'
import Link from 'next/link'
import { FC, memo, useEffect, useState } from 'react'
import { useLocale } from 'next-intl'

const SimpleBottomNavigation: FC = () => {
    function getInitialValue(pathname: string) {
        if (pathname === '/maps') {
            return 0
        } else if (pathname === '/feed') {
            return 1
        } else if (pathname === '/experiencas') {
            return 2
        } else if (pathname === '/blablafish') {
            return 3
        } else if (pathname === '/store') {
            return 4
        }
    }

    // Añadir el estado local `value` y la función `setValue`
    const [locationNav, setLocationNav] = useState('')
    const locale = useLocale() // Obtén el idioma actual utilizando useLocale

    const [value, setValue] = useState(getInitialValue(locationNav))

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const locationPathname = location.pathname
            setLocationNav(locationPathname)
        }
    }, [])
    // Añadir el efecto para actualizar el valor del estado `value` cuando cambie la ruta
    useEffect(() => {
        if (locationNav === `/${locale}/maps`) {
            setValue(0)
        } else if (locationNav === `/${locale}/feed`) {
            setValue(1)
        } else if (locationNav === `/${locale}/experiencias`) {
            setValue(2)
        } else if (locationNav === `/${locale}/blablafish`) {
            setValue(3)
        } else if (locationNav === `/${locale}/store`) {
            setValue(4)
        }
    }, [locationNav, locale])
    // Añadir el componente BottomNavigation

    const buttonStyles = {
        color: '#4675A6',
        minWidth: '50px',
        '&.MuiSelected': {
            color: '#4675A6', // Color cuando está activo
            fontSize: '0.9rem',
        },
    }

    return (
        <Box sx={{ width: '100%', position: 'fixed', bottom: '0' }}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue)
                }}
            >
                <BottomNavigationAction
                    // label="Mapa"
                    className="maps"
                    icon={
                        value === 0 ? (
                            <LocationOnIcon sx={{ color: '#4675A6' }} />
                        ) : (
                            <LocationOnOutlinedIcon sx={{ color: '#4675A6' }} />
                        )
                    }
                    component={Link}
                    href={`/${locale}/maps`}
                    style={buttonStyles}
                />
                <BottomNavigationAction
                    // label="Capturas"
                    className="feed"
                    icon={
                        value === 1 ? (
                            <ViewCarouselIcon sx={{ color: '#4675A6' }} />
                        ) : (
                            <ViewCarouselOutlinedIcon
                                sx={{ color: '#4675A6' }}
                            />
                        )
                    }
                    component={Link}
                    href={`/${locale}/feed`}
                    style={buttonStyles}
                />
                <BottomNavigationAction
                    // label="Experiencias"
                    className="experiencias"
                    icon={
                        value === 2 ? (
                            <SailingIcon sx={{ color: '#4675A6' }} />
                        ) : (
                            <SailingOutlinedIcon sx={{ color: '#4675A6' }} />
                        )
                    }
                    component={Link}
                    href={`/${locale}/experiencias`}
                    style={buttonStyles}
                />
                <BottomNavigationAction
                    // label="BlaBlaFish"
                    className="blablafish"
                    icon={
                        value === 3 ? (
                            <AirportShuttleIcon sx={{ color: '#4675A6' }} />
                        ) : (
                            <AirportShuttleOutlinedIcon
                                sx={{ color: '#4675A6' }}
                            />
                        )
                    }
                    component={Link}
                    href={`/${locale}/blablafish`}
                    style={buttonStyles}
                />
                <BottomNavigationAction
                    // label="BlaBlaFish"
                    className="store"
                    icon={
                        value === 4 ? (
                            <ShoppingBagIcon sx={{ color: '#4675A6' }} />
                        ) : (
                            <ShoppingBagOutlinedIcon
                                sx={{ color: '#4675A6' }}
                            />
                        )
                    }
                    component={Link}
                    href={`/${locale}/store`}
                    style={buttonStyles}
                />
            </BottomNavigation>
        </Box>
    )
}

export default memo(SimpleBottomNavigation)
