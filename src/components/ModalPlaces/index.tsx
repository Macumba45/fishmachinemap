import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Divider, IconButton } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import ButtonComp from '@/components/Button'
import CloseIcon from '@mui/icons-material/Close'
import NavigationIcon from '@mui/icons-material/Navigation'
import ContactPhoneIcon from '@mui/icons-material/ContactPhone'
import BasicRating from '../Rating'
import {
    ButtonContainer,
    CallNumber,
    ContenidoGoogle,
    MainContainer,
    NumberContainer,
    NumberOfRating,
    RatingContainer,
    TotalRating,
    TypographyContainer,
} from './style'

export const openMap = (address: string) => {
    const baseUrl = 'https://www.google.com/maps/search/?api=1&query='
    const encodedAddress = encodeURIComponent(address)
    window.open(baseUrl + encodedAddress)
}

export interface PlaceReview {
    author_name?: string
    author_url?: string
    language?: string
    profile_photo_url?: string
    rating?: number
    relative_time_description?: string
    text?: string
    time?: number
    place_id?: string
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
    phone?: string
    numberRating?: number
    isOpenStore?: boolean | undefined
    place_id?: string
    type?: string[]
}

const BasicModal: FC<Props> = ({
    label,
    direction,
    phone,
    onClose,
    isOpenProp,
    children,
    selectedMarker,
    onClick,
    value,
    numberRating,
    isOpenStore,
    place_id,
    type,
}) => {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setIsOpen(isOpenProp || true)
    }, [isOpenProp])

    const handleOpen = () => {
        setIsOpen(true)
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
        boxShadow: '0 10px 100px #000', // Corrección aquí
        p: 4,
        borderRadius: '10px',
        maxHeight: '500px',
        overflowY: 'scroll',
    }

    return (
        <MainContainer>
            <Modal
                open={isOpen}
                onClose={onClose}
                onClick={onClick}
                disableEscapeKeyDown={true}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                key={place_id}
            >
                <Box sx={style}>
                    <TypographyContainer>
                        <IconButton
                            aria-label="Close"
                            onClick={onClose}
                            sx={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </TypographyContainer>
                    <TypographyContainer>
                        <ContenidoGoogle
                            id="modal-modal-title"
                            style={{
                                marginBottom: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            Contenido de{' '}
                            <img
                                style={{
                                    width: '16px',
                                    height: '16px',
                                    marginLeft: '0.5rem',
                                }}
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"
                                alt=""
                            />
                        </ContenidoGoogle>
                    </TypographyContainer>
                    <TypographyContainer>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            {label}
                        </Typography>
                    </TypographyContainer>
                    <Typography
                        sx={{
                            mb: 1,
                            mt: 1,
                            color: isOpenStore ? 'green' : 'red',
                            fontWeight: 500,
                        }}
                    >
                        {type?.includes('natural_feature')
                            ? undefined
                            : isOpenStore
                                ? 'Abierto'
                                : 'Cerrado'}
                    </Typography>
                    <TypographyContainer>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {direction}
                        </Typography>
                    </TypographyContainer>
                    <RatingContainer>
                        <NumberOfRating>{value}</NumberOfRating>
                        <BasicRating value={value} />
                        <TotalRating>
                            ({numberRating} valoraciones totales)
                        </TotalRating>
                    </RatingContainer>
                    {phone === undefined ? null : (
                        <NumberContainer>
                            <CallNumber href={`tel:${phone}`}>
                                <ContactPhoneIcon
                                    sx={{ marginRight: '0.5rem' }}
                                />{' '}
                                Llamar al lugar
                            </CallNumber>
                        </NumberContainer>
                    )}
                    <Divider sx={{ width: '100px', margin: '1.5rem auto' }} />
                    {children}
                    <ButtonContainer>
                        <ButtonComp
                            icon={<NavigationIcon fontSize="medium" />}
                            color="white"
                            title="Abrir en Google Maps"
                            bgColor="#4675A6"
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
