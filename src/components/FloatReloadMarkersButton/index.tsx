import { FC, memo } from 'react'
import { Fab, Tooltip, useMediaQuery } from '@mui/material'
import ReplayIcon from '@mui/icons-material/Replay'

interface Props {
    onClick?: () => void
    disabled?: boolean
    id?: string
}

const FloatReloadMarkersButton: FC<Props> = ({ onClick, disabled, id }) => {
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
                        id="updateResultsButton"
                        onClick={onClick}
                        size={isSmallScreen ? 'medium' : 'large'}
                        sx={{
                            position: 'fixed',
                            bottom: '5rem',
                            left: 0,
                            marginLeft: '1rem',
                            backgroundColor: '#9900ff',
                            '&:hover': {
                                backgroundColor: '#49007a', // Cambiar color del hover
                            },
                        }}
                        disabled={disabled}
                        color="primary"
                        aria-label="add"
                    >
                        <ReplayIcon />
                    </Fab>
                </span>
            </CustomTooltip>
        </>
    )
}

export default memo(FloatReloadMarkersButton)
