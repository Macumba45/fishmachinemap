import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Divider, IconButton } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import ButtonComp from '@/components/Button'
import CloseIcon from '@mui/icons-material/Close'
import NavigationIcon from '@mui/icons-material/Navigation'
import {
    ButtonContainer,
    ImageContainer,
    MainContainer,
    TypographyContainer,
} from './style'
import SimpleSlider from '../Carousel/page'
import BasicRating from '../Rating'

export const openMap = (address: string) => {
    const baseUrl = 'https://www.google.com/maps/search/?api=1&query='
    const encodedAddress = encodeURIComponent(address)
    window.open(baseUrl + encodedAddress)
}

interface Picture {
    src: string
}

interface Props {
    label?: string
    direction?: string
    onClose?: () => void
    onClick?: () => void
    isOpenProp?: boolean
    icon?: React.ReactNode
    children?: React.ReactNode
    selectedMarker?: string
    value?: number
}

const BasicModal: FC<Props> = ({
    label,
    direction,
    onClose,
    isOpenProp,
    children,
    selectedMarker,
    onClick,
    value,
}) => {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setIsOpen(isOpenProp || true)
    }, [isOpenProp])

    // const handleClose = () => {
    //     setIsOpen(false)
    // }

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
        borderRadius: '10px',
    }

    return (
        <MainContainer>
            <Modal
                open={isOpen}
                onClick={onClick}
                disableEscapeKeyDown={true}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <IconButton
                        aria-label="Close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            zIndex: 9999999,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <TypographyContainer>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            {label}
                        </Typography>
                    </TypographyContainer>
                    <TypographyContainer>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {direction}
                        </Typography>
                    </TypographyContainer>
                    <TypographyContainer>
                        <Typography sx={{ marginTop: '1rem' }}>
                            Valoraciones:
                            <BasicRating value={value} />
                        </Typography>
                    </TypographyContainer>
                    <Divider sx={{ width: '100px', margin: '1.5rem auto' }} />
                    {children}
                    <ButtonContainer>
                        <ButtonComp
                            variant="outlined"
                            title="+ Info"
                            border="1px solid #49007a"
                            color="#49007a"
                        />
                    </ButtonContainer>
                    <ButtonContainer>
                        <ButtonComp
                            icon={<NavigationIcon fontSize="medium" />}
                            color="white"
                            title="Abrir en Google Maps"
                            bgColor="#49007a"
                            variant="contained"
                            onClick={() => openMap(direction || '')}
                        ></ButtonComp>
                    </ButtonContainer>
                </Box>
            </Modal>
        </MainContainer>
    )
}

export default BasicModal
