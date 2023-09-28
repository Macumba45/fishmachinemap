import { FC } from 'react'
import { Fab, Tooltip } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

interface Props {
    onClick?: () => void
    disabled?: boolean
    title: string
}

const FloatAddExperiences: FC<Props> = ({ onClick, disabled, title }) => {
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
                            backgroundColor: '#4675A6',
                            '&:hover': {
                                backgroundColor: '#42ACE8', // Cambiar color del hover
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

export default FloatAddExperiences
