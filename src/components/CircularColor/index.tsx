import * as React from 'react'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'

const styleProgress = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: '50%',
    left: '50%',

    fontFamily: 'Roboto',
}

export default function CircularColor() {
    return (
        <Stack
            spacing={2}
            sx={{
                color: 'grey.500',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <CircularProgress color="secondary" />
            <p style={styleProgress}>Cargando ubicación </p>
        </Stack>
    )
}
