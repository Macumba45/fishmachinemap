import { FC } from 'react'
import { Fab, Tooltip, useMediaQuery } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'

interface Props {
    onClick?: () => void
    disabled?: boolean
}

const FloatLogOut: FC<Props> = ({ onClick, disabled }) => {
    const isSmallScreen = useMediaQuery('(max-width:600px)')

    const CustomTooltip = ({ title, children }: any) => {
        return (
            <Tooltip title={title} placement="top">
                <span>{children}</span>
            </Tooltip>
        )
    }

    return (
        <div
            style={{
                position: 'absolute',
                bottom: '10px',
                left: '50px',
                marginRight: '1rem',
            }}
        >
            <CustomTooltip title="Cerrar sesión">
                <span>
                    <Fab
                        onClick={onClick}
                        size={isSmallScreen ? 'medium' : 'large'}
                        sx={{
                            position: 'fixed',
                            bottom: '5rem',
                            left: 0,
                            marginLeft: '1rem',
                            backgroundColor: '#42ACE8',
                            '&:hover': {
                                backgroundColor: '#4675A6', // Cambiar color del hover
                            },
                        }}
                        disabled={disabled}
                        color="primary"
                        aria-label="add"
                    >
                        <LogoutIcon />
                    </Fab>
                </span>
            </CustomTooltip>
        </div>
    )
}

export default FloatLogOut
