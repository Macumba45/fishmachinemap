import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Logout from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import { FC, useState } from 'react'
import { useLogicMaps } from '@/app/maps/logic'

const AccountMenu: FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
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
        <>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                    position: 'absolute',
                    top: '4%',
                    zIndex: 99999999999,
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
        </>
    )
}

export default AccountMenu
