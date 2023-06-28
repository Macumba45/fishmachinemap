import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { ButtonContainer, MainContainer } from './style'
import { FC, useEffect, useState } from 'react'
import { Button, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface Props {
    label?: string
    direction?: string
    onClose?: () => void
    isOpenProp?: boolean
    icon?: React.ReactNode
    children?: React.ReactNode // Agrega la prop children
}

const BasicModal: FC<Props> = ({
    label,
    direction,
    onClose,
    isOpenProp,
    children, // Agrega la prop children
}) => {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setIsOpen(isOpenProp || true)
    }, [isOpenProp])

    const handleClose = () => {
        setIsOpen(false)
    }

    let width = window.innerWidth

    if (width < 600) {
        width = 300
    } else {
        width = 400
    }

    const style = {
        position: 'absolute' as const,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: width,
        bgcolor: 'background.paper',
        boderShadow: '0 10px 100px #000',
        p: 4,
    }

    const openMap = (address: any) => {
        const baseUrl = 'https://www.google.com/maps/search/?api=1&query='
        const encodedAddress = encodeURIComponent(address)
        window.open(baseUrl + encodedAddress, '_blank')
    }

    return (
        <MainContainer>
            <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <IconButton
                        aria-label="Close"
                        onClick={onClose} // Usa la función onClose pasada como prop
                        sx={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            zIndex: 9999999,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        {label}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {direction}
                    </Typography>
                    {children}
                    <ButtonContainer>
                        <Button
                            variant="contained"
                            onClick={() => openMap(direction)}
                        >
                            Ir a Cebos Vivos
                        </Button>
                    </ButtonContainer>
                </Box>
            </Modal>
        </MainContainer>
    )
}

export default BasicModal
