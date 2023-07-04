import { FC, memo } from 'react'
import { Fab, Tooltip, useMediaQuery } from '@mui/material'
import RoomIcon from '@mui/icons-material/Room'

interface Props {
    onClick?: () => void
    disabled?: boolean
}

const FloatAddMarkerButton: FC<Props> = ({ onClick, disabled }) => {
    const isSmallScreen = useMediaQuery('(max-width:600px)')

    const CustomTooltip = ({ title, children }: any) => {
        return (
            <Tooltip title={title} placement="top">
                <span>{children}</span>
            </Tooltip>
        )
    }

    return (
        <>
            <CustomTooltip title="Añadir marcador">
                <span>
                    <Fab
                        onClick={onClick}
                        size={isSmallScreen ? 'medium' : 'large'}
                        sx={{
                            position: 'fixed',
                            bottom: '5rem',
                            right: 0,
                            marginRight: '1rem',
                            backgroundColor: '#9900ff',
                            '&:hover': {
                                backgroundColor: '#49007a', // Cambiar color del hover
                            },
                        }}
                        disabled={disabled}
                        color="primary"
                        aria-label="add"
                    >
                        <RoomIcon />
                    </Fab>
                </span>
            </CustomTooltip>
        </>
    )
}

export default memo(FloatAddMarkerButton)
