import { FC, useState, memo, useEffect } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next-intl/client'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Logout from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import mareas from '../../assets/mareas.png'
import EmailIcon from '@mui/icons-material/Email'
import ButtonComp from '@/components/Button'
import LanguageIcon from '@mui/icons-material/Language'
import { Person } from '@mui/icons-material'
import { Avatar, FormControl, InputLabel, Modal, Select } from '@mui/material'

interface AccountMenuProps {
    userPicture?: string | null
    className?: string
}

const AccountMenu: FC<AccountMenuProps> = ({ userPicture, className }) => {
    const t = useTranslations('menu')
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()
    const [isLogged, setIsLogged] = useState(false)
    const [pais, setPais] = useState('es')
    const [provincia, setProvincia] = useState('')
    const [ciudad, setCiudad] = useState('')
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [openModal, setOpenModal] = useState(false)
    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleModalMeteorologia = () => {
        setOpenModal(true)
    }

    const handleCLoseModal = () => {
        setOpenModal(false)
    }

    const logOut = () => {
        localStorage.removeItem('token')
        window.location.href = '/'
    }

    const gotoProfile = () => {
        router.push('/perfil')
    }

    const goToLogin = () => {
        router.push('/auth/login')
    }

    const emailMe = () => {
        return window.open('mailto:gonzalolovo@gmail.com', '_blank')
    }

    const fetchUrlMeteorologia = (
        pais: string,
        provincia: string,
        ciudad: string
    ) => {
        const url = `https://tablademareas.com/${pais}/${provincia}/${ciudad}`
        return window.open(url, '_blank')
    }

    let position
    if (typeof window !== 'undefined') {
        if (window.location.pathname === `/${locale}/maps`) {
            position = 'fixed'
        } else {
            position = 'absolute'
        }
    }

    const boxStyles = {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        position: position as any,
        top: '20px',
        zIndex: 999,
    }

    // Función para cambiar el idioma al hacer clic en una bandera
    function changeLocale(nextLocale: string) {
        router.push(pathname, { locale: nextLocale })
    }

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (!token) {
            setIsLogged(false)
            // router.push('/auth/login'); // Redirige al usuario a la página de inicio de sesión si no hay token
        } else {
            setIsLogged(true)
        }
    }, [])

    if (!isLogged) {
        return (
            <>
                <Box sx={boxStyles}>
                    <Tooltip title="Menu">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{
                                ml: 3,
                            }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <MenuIcon
                                sx={{ fontSize: '2rem', color: 'white' }}
                            />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    sx={{ mt: 1 }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={goToLogin}>
                        {t('logintoProfile')} <br /> {t('logintoProfile2')}
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={emailMe}>
                        <ListItemIcon>
                            <EmailIcon fontSize="small" />
                        </ListItemIcon>
                        {t('contact')}
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                        <ListItemIcon>
                            <LanguageIcon />
                        </ListItemIcon>
                        <Select defaultValue={locale}>
                            <MenuItem
                                onClick={() => changeLocale('es')}
                                value="es"
                            >
                                Español
                            </MenuItem>
                            <MenuItem
                                onClick={() => changeLocale('en')}
                                value="en"
                            >
                                English
                            </MenuItem>
                        </Select>
                    </MenuItem>
                </Menu>
            </>
        )
    }

    return (
        <div className={className}>
            <Box sx={boxStyles}>
                <Tooltip title="Menu">
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
                sx={{ mt: 1 }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={gotoProfile}>
                    {userPicture ? (
                        <img
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                marginRight: '1rem',
                            }}
                            src={userPicture as string} // Asegurarse de que sea una cadena
                            alt="userPicture"
                        />
                    ) : (
                        <Avatar
                            style={{
                                width: '36px',
                                height: '36px',
                                marginRight: '1rem',
                            }}
                        >
                            <Person />
                        </Avatar>
                    )}
                    {t('profile')}
                </MenuItem>
                <MenuItem>
                    <ListItemIcon
                        onClick={handleModalMeteorologia}
                        sx={{
                            color: 'inherit',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <img
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                marginRight: '1rem',
                            }}
                            src={mareas.src}
                            alt="meteorología"
                        />
                        {t('wheater')}
                    </ListItemIcon>
                </MenuItem>

                <Divider />
                <MenuItem onClick={emailMe}>
                    <ListItemIcon>
                        <EmailIcon fontSize="small" />
                    </ListItemIcon>
                    {t('contact')}
                </MenuItem>
                <MenuItem onClick={logOut}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    {t('logout')}
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <LanguageIcon />
                    </ListItemIcon>
                    <Select defaultValue={locale}>
                        <MenuItem onClick={() => changeLocale('es')} value="es">
                            Español
                        </MenuItem>
                        <MenuItem onClick={() => changeLocale('en')} value="en">
                            English
                        </MenuItem>
                    </Select>
                </MenuItem>
            </Menu>

            <Modal open={openModal} onClose={handleCLoseModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 250,
                        height: 250,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        borderRadius: '30px',
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-pais">
                            País
                        </InputLabel>
                        <Select
                            onChange={(e: any) => setPais(e.target.value)}
                            fullWidth
                            label="País"
                            value={pais || ''}
                            margin="dense"
                            sx={{ mb: 2 }}
                        >
                            <MenuItem value="es">España</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-Provincia">
                            Provincia
                        </InputLabel>
                        <Select
                            onChange={(e: any) => setProvincia(e.target.value)}
                            fullWidth
                            label="Provincia"
                            value={provincia || ''}
                            margin="dense"
                            sx={{ mb: 2 }}
                        >
                            <MenuItem value="a-coruna">
                                Mareas de A Coruña
                            </MenuItem>
                            <MenuItem value="pontevedra">
                                Mareas de Pontevedra
                            </MenuItem>
                            <MenuItem value="huelva">Mareas de Huelva</MenuItem>
                            <MenuItem value="cadiz">Mareas de Cádiz</MenuItem>
                            <MenuItem value="lugo">Mareas de Lugo</MenuItem>
                            <MenuItem value="asturias">
                                Mareas de Asturias
                            </MenuItem>
                            <MenuItem value="cantabria">
                                Mareas de Cantabria
                            </MenuItem>
                            <MenuItem value="vizcaya">
                                Mareas de Vizcaya
                            </MenuItem>
                            <MenuItem value="guipuzcoa">
                                Mareas de Guipúzcoa
                            </MenuItem>
                            <MenuItem value="malaga">Mareas de Málaga</MenuItem>
                            <MenuItem value="granada">
                                Mareas de Granada
                            </MenuItem>
                            <MenuItem value="almeria">
                                Mareas de Almería
                            </MenuItem>
                            <MenuItem value="murcia">Mareas de Murcia</MenuItem>
                            <MenuItem value="alicante">
                                Mareas de Alicante
                            </MenuItem>
                            <MenuItem value="valencia">
                                Mareas de Valencia
                            </MenuItem>
                            <MenuItem value="castellon">
                                Mareas de Castellón
                            </MenuItem>
                            <MenuItem value="tarragona">
                                Mareas de Tarragona
                            </MenuItem>
                            <MenuItem value="barcelona">
                                Mareas de Barcelona
                            </MenuItem>
                            <MenuItem value="girona">Mareas de Girona</MenuItem>
                            <MenuItem value="islas-canarias">
                                Mareas de Islas Canarias
                            </MenuItem>
                            <MenuItem value="islas-baleares">
                                Mareas de Islas Baleares
                            </MenuItem>
                            <MenuItem value="sevilla">
                                Mareas de Sevilla
                            </MenuItem>
                            <MenuItem value="ceuta">Mareas de Ceuta</MenuItem>
                            <MenuItem value="melilla">
                                Mareas de Melilla
                            </MenuItem>
                        </Select>
                    </FormControl>
                    {/* <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-Ciudad">
                            Ciudad
                        </InputLabel>
                        <Select
                            onChange={(e: any) => setCiudad(e.target.value)}
                            fullWidth
                            label="Ciudad"
                            value={ciudad || ''}
                            margin="dense"
                            sx={{ mb: 2 }}
                        >
                            <MenuItem value="rota">Rota</MenuItem>
                        </Select>
                    </FormControl> */}
                    <ButtonComp
                        title="Ver meteorología"
                        color="white"
                        variant="contained"
                        bgColor="#49007a"
                        onClick={() =>
                            fetchUrlMeteorologia(pais, provincia, ciudad)
                        }
                    />
                </Box>
            </Modal>
        </div>
    )
}

export default memo(AccountMenu)
