import { FC } from 'react'
import { Fab } from '@mui/material'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt'

interface Props {
    onClick?: () => void
    disabled?: boolean
}

const FloatAddMarkerButton: FC<Props> = ({ onClick, disabled }) => {
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
                    backgroundColor: '#4675A6',
                    '&:hover': {
                        backgroundColor: '#42ACE8', // Cambiar color del hover
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
