import * as React from 'react'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import { FC } from 'react'

interface Props {
    value?: number
}

const BasicRating: FC<Props> = ({ value }) => {
    return (
        <Box
            sx={{
                '& > legend': { mt: 2 },
            }}
        >
            <Rating precision={0.5} name="read-only" value={value} readOnly />
        </Box>
    )
}

export default BasicRating
