'use client'

import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhishingIcon from '@mui/icons-material/Phishing'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function SimpleBottomNavigation() {
    function getInitialValue(pathname: string) {
        if (pathname === '/maps') {
            return 0
        } else if (pathname === '/list') {
            return 1
        } else if (pathname === '/perfil') {
            return 2
        } else {
            return 0 // Valor predeterminado en caso de que la ruta no coincida con ninguna de las opciones anteriores
        }
    }

    // Añadir el estado local `value` y la función `setValue`
    const locationNav = location.pathname
    const [value, setValue] = useState(getInitialValue(locationNav))
    // Añadir el efecto para actualizar el valor del estado `value` cuando cambie la ruta
    useEffect(() => {
        // Obtiene la ruta actual y establece el valor del estado `value` en función de esa ruta
        if (locationNav === '/maps') {
            setValue(0)
        } else if (locationNav === '/list') {
            setValue(1)
        } else if (locationNav === '/perfil') {
            setValue(2)
        }
    }, [])

    // Añadir el componente BottomNavigation

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
                    sx={{
                        color: '#49007a',
                        '&.Mui-selected': {
                            color: '#49007a', // Color cuando está activo
                        },
                    }}
                />
                <BottomNavigationAction
                    label="Lista"
                    icon={<PhishingIcon sx={{ color: '#49007a' }} />}
                    component={Link}
                    href="/list"
                    sx={{
                        color: '#49007a',
                        '&.Mui-selected': {
                            color: '#49007a', // Color cuando está activo
                        },
                    }}
                />
                <BottomNavigationAction
                    label="Perfil"
                    icon={<AccountCircleIcon sx={{ color: '#49007a' }} />}
                    component={Link}
                    href="/perfil"
                    sx={{
                        color: '#49007a',
                        '&.Mui-selected': {
                            color: '#49007a', // Color cuando está activo
                        },
                    }}
                />
            </BottomNavigation>
        </Box>
    )
}
