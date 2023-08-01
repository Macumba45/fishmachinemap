'use client'

import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import SailingIcon from '@mui/icons-material/Sailing'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel'
import PhishingIcon from '@mui/icons-material/Phishing'
import SailingOutlinedIcon from '@mui/icons-material/SailingOutlined'
import ViewCarouselOutlinedIcon from '@mui/icons-material/ViewCarouselOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import PhishingOutlinedIcon from '@mui/icons-material/PhishingOutlined'
import NoCrashIcon from '@mui/icons-material/NoCrash'
import NoCrashOutlinedIcon from '@mui/icons-material/NoCrashOutlined'
import Link from 'next/link'
import { FC, memo, useEffect, useState } from 'react'

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
        }
    }

    // Añadir el estado local `value` y la función `setValue`
    const [locationNav, setLocationNav] = useState('')

    const [value, setValue] = useState(getInitialValue(locationNav))

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const locationPathname = location.pathname
            setLocationNav(locationPathname)
        }
    }, [])
    // Añadir el efecto para actualizar el valor del estado `value` cuando cambie la ruta
    useEffect(() => {
        if (locationNav === '/maps') {
            setValue(0)
        } else if (locationNav === '/feed') {
            setValue(1)
        } else if (locationNav === '/experiencias') {
            setValue(2)
        } else if (locationNav === '/blablafish') {
            setValue(3)
        }
    }, [locationNav])
    // Añadir el componente BottomNavigation

    const buttonStyles = {
        color: '#49007a',
        '&.MuiSelected': {
            color: '#49007a', // Color cuando está activo
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
                    label="Mapa"
                    icon={
                        value === 0 ? (
                            <LocationOnIcon sx={{ color: '#49007a' }} />
                        ) : (
                            <LocationOnOutlinedIcon sx={{ color: '#49007a' }} />
                        )
                    }
                    component={Link}
                    href="/maps"
                    style={buttonStyles}
                />
                <BottomNavigationAction
                    label="Capturas"
                    icon={
                        value === 1 ? (
                            <ViewCarouselIcon sx={{ color: '#49007a' }} />
                        ) : (
                            <ViewCarouselOutlinedIcon
                                sx={{ color: '#49007a' }}
                            />
                        )
                    }
                    component={Link}
                    href="/feed"
                    style={buttonStyles}
                />
                <BottomNavigationAction
                    label="Experiencias"
                    icon={
                        value === 2 ? (
                            <SailingIcon sx={{ color: '#49007a' }} />
                        ) : (
                            <SailingOutlinedIcon sx={{ color: '#49007a' }} />
                        )
                    }
                    component={Link}
                    href="/experiencias"
                    style={buttonStyles}
                />
                <BottomNavigationAction
                    label="BlaBlaFish"
                    icon={
                        value === 3 ? (
                            <NoCrashIcon sx={{ color: '#49007a' }} />
                        ) : (
                            <NoCrashOutlinedIcon sx={{ color: '#49007a' }} />
                        )
                    }
                    component={Link}
                    href="/blablafish"
                    style={buttonStyles}
                />
            </BottomNavigation>
        </Box>
    )
}

export default memo(SimpleBottomNavigation)
