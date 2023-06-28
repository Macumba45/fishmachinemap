import * as React from 'react'
import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import RestoreIcon from '@mui/icons-material/Restore'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhishingIcon from '@mui/icons-material/Phishing';
import Link from 'next/link'

export default function SimpleBottomNavigation() {
    const [value, setValue] = React.useState(0)
    console.log('value', value)

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
                    icon={<LocationOnIcon />}
                    component={Link}
                    href='/maps'
                />
                <BottomNavigationAction
                    label="Lista"
                    icon={<PhishingIcon />}
                    component={Link}
                    href='/list'
                />
                <BottomNavigationAction
                    label="Perfil"
                    icon={<RestoreIcon />}
                    component={Link}
                    href='/perfil'
                />
            </BottomNavigation>
        </Box>
    )
}
