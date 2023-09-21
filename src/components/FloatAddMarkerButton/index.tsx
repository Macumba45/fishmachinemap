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
            <Tooltip className="addMarker" title={title} placement="top">
                <span>{children}</span>
            </Tooltip>
        )
    }

    return (
        <>
            <Fab
                className="addMarker"
                onClick={onClick}
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
        </>
    )
}

export default FloatAddMarkerButton
