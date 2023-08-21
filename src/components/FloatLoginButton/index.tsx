import { FC, memo } from 'react'
import { Fab, Tooltip, useMediaQuery } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'

interface Props {
    onClick?: () => void
    disabled?: boolean
    title: string
    style: React.CSSProperties
}

const FloatLoginButton: FC<Props> = ({ onClick, disabled, title, style }) => {
    return (
        <Fab
            style={style}
            onClick={onClick}
            disabled={disabled}
            variant="extended"
        >
            <LoginIcon sx={{ mr: 1 }} />
            {title}
        </Fab>
    )
}

export default memo(FloatLoginButton)
