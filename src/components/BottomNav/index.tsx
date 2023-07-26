'use client'

import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import SailingIcon from '@mui/icons-material/Sailing'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel'
import PhishingIcon from '@mui/icons-material/Phishing'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function SimpleBottomNavigation() {
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
                    icon={<LocationOnIcon sx={{ color: '#49007a' }} />}
                    component={Link}
                    href="/maps"
                    style={buttonStyles}
                />
                <BottomNavigationAction
                    label="Capturas"
                    icon={<ViewCarouselIcon sx={{ color: '#49007a' }} />}
                    component={Link}
                    href="/feed"
                    style={buttonStyles}
                />
                <BottomNavigationAction
                    label="Experiencias"
                    icon={<SailingIcon sx={{ color: '#49007a' }} />}
                    component={Link}
                    href="/experiencias"
                    style={buttonStyles}
                />
                <BottomNavigationAction
                    label="BlaBlaFish"
                    icon={<PhishingIcon sx={{ color: '#49007a' }} />}
                    component={Link}
                    href="/blablafish"
                    style={buttonStyles}
                />
            </BottomNavigation>
        </Box>
    )
}
