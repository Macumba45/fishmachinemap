import { FC } from 'react'
import { Fab, Tooltip, useMediaQuery } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { title } from 'process'

interface Props {
    onClick?: () => void
    disabled?: boolean
    title: string
}

const FloatAddBlaBlaFish: FC<Props> = ({ onClick, disabled, title }) => {
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
            <CustomTooltip title={title}>
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
                                backgroundColor: '#7b00cd', // Cambiar color del hover
                            },
                        }}
                        disabled={disabled}
                        color="primary"
                        aria-label="add"
                    >
                        <AddIcon />
                    </Fab>
                </span>
            </CustomTooltip>
        </div>
    )
}

export default FloatAddBlaBlaFish
