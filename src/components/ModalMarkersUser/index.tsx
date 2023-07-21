import { FC } from 'react'
import { Modal, Box, Typography } from '@mui/material'
import {
    TypographyContainer,
    ContenidoGoogle,
    ImageModal,
    PictureContainer,
    CreatorLink,
} from './style'
import ButtonComp from '../Button'
import { FontWeight } from '@cloudinary/url-gen/qualifiers'

interface Props {
    isOpen: boolean
    onClose?: () => void
    onClick?: () => void
    dataMarkerUser?: {
        comments: string
        rating: number
    }
    direction?: string
    markerType?: string
    description?: string
    pictures?: string
    location?: {
        lat: number
        lng: number
    }
    creator?: string
}

const ModalUserMarkers: FC<Props> = ({
    isOpen,
    onClose,
    direction,
    description,
    markerType,
    pictures,
    location,
    creator,
}) => {
    const openMap = (location: { lat: number; lng: number } | undefined) => {
        console.log(location)
        if (location) {
            const baseUrl = 'https://www.google.com/maps/search/?api=1&query='
            const encodedCoordinates = encodeURIComponent(
                `${location.lat},${location.lng}`
            )
            window.open(baseUrl + encodedCoordinates)
        }
    }

    const style = {
        position: 'absolute' as const,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: '0 10px 100px #000', // Corrección aquí
        p: 0,
        borderRadius: '10px',
        maxHeight: '600px',
        minWidth: '300px',
        overflowY: 'scroll',
    }

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box sx={style}>
                <PictureContainer>
                    <ImageModal src={pictures} />
                </PictureContainer>

                <Box sx={{ p: 1 }}>
                    <TypographyContainer>
                        <ContenidoGoogle
                            id="modal-modal-title"
                            style={{
                                marginBottom: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                marginLeft: '0.2rem',
                                fontFamily: 'Roboto',
                                fontWeight: 300,
                                fontSize: '1rem',
                            }}
                        >
                            Creado por:{' '}
                            <CreatorLink href="/">{creator}</CreatorLink>
                        </ContenidoGoogle>
                    </TypographyContainer>
                    <TypographyContainer>
                        <TypographyContainer
                            id="modal-modal-description"
                            style={{ marginTop: 2, fontFamily: 'Roboto' }}
                        >
                            <Typography sx={{ mb: 1, fontWeight: '800' }}>
                                Lugar/Dirección:
                            </Typography>
                            {direction}
                        </TypographyContainer>
                    </TypographyContainer>
                    <TypographyContainer>
                        <TypographyContainer
                            id="modal-modal-description"
                            style={{
                                marginTop: 1,
                                fontFamily: 'Roboto',
                                lineHeight: '2rem',
                            }}
                        >
                            <Typography sx={{ mb: 0, fontWeight: '800' }}>
                                Descripción:
                            </Typography>
                            {description}
                        </TypographyContainer>
                    </TypographyContainer>
                </Box>

                {/* <TypographyContainer>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Marcador: {markerType}
                    </Typography>
                </TypographyContainer> */}

                <Box
                    sx={{
                        mt: 2,
                        mb: 2,
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <ButtonComp
                        title="Ir a Google Maps"
                        variant="contained"
                        onClick={() => openMap(location)}
                        bgColor="#49007a"
                        color="white"
                    />
                </Box>
            </Box>
        </Modal>
    )
}

export default ModalUserMarkers
