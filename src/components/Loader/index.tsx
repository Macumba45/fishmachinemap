import * as React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

export default function CircularIndeterminate() {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <Box>
                <CircularProgress sx={{ color: '#4675A6' }} size={'80px'} />
            </Box>
        </div>
    )
}
