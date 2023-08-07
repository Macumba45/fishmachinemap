import { FC } from 'react'
import { Fab, Tooltip, useMediaQuery } from '@mui/material'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt'

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
        <div
            style={{
                position: 'absolute',
                bottom: '130px',
                right: '30px',
                marginRight: '1rem',
            }}
        >
            <CustomTooltip title="Añadir marcador">
                <span>
                    <Fab
                        onClick={onClick}
                        // size={isSmallScreen ? 'medium' : 'large'}
                        sx={{
                            position: 'fixed',
                            bottom: '5rem',
                            right: 0,
                            marginRight: '1rem',
                            backgroundColor: '#49007a',
                            '&:hover': {
                                backgroundColor: '#9900ff', // Cambiar color del hover
                            },
                        }}
                        disabled={disabled}
                        color="primary"
                        aria-label="add"
                    >
                        <AddLocationAltIcon />
                    </Fab>
                </span>
            </CustomTooltip>
        </div>
    )
}

export default FloatAddMarkerButton
