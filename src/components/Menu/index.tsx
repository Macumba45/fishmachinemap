import * as React from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import CustomizedSwitches from '../MuiSwitch'
import { useEffect, useState } from 'react'
import { useLogicMaps } from '@/app/maps/logic'

export default function AccountMenu() {
    const { selectMapStyle } = useLogicMaps()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [avatar, setAvatar] = useState<string>('')
    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const logOut = () => {
        localStorage.removeItem('token')
        window.location.href = '/'
    }

    const gotoProfile = () => {
        window.location.href = '/perfil'
    }

    return (
        <React.Fragment>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                    position: 'absolute',
                    top: '3%',
                    zIndex: 999,
                }}
            >
                <Tooltip title="Menú">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 3 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <MenuIcon sx={{ fontSize: '2rem', color: 'white' }} />
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={gotoProfile}>
                    <img
                        style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            marginRight: '1rem',
                        }}
                        src="https://api.dicebear.com/6.x/adventurer/svg?seed=Abby"
                        alt="avatar"
                    />
                    Mi perfil
                </MenuItem>
                {/* <MenuItem>
                    <ListItemIcon>
                        <CustomizedSwitches
                            onClick={selectMapStyle}
                            label="Modo oscuro"
                        />
                    </ListItemIcon>
                </MenuItem> */}
                <Divider />
                <MenuItem onClick={logOut}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Cerrar sesión
                </MenuItem>
            </Menu>
        </React.Fragment>
    )
}
