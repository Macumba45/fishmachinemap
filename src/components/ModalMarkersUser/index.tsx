import React, { FC, useState } from 'react'
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    Rating,
} from '@mui/material'
import { TypographyContainer, ContenidoGoogle, ImageModal } from './style'
import ButtonComp from '../Button'
import { useLogicMaps } from '@/app/maps/logic'

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
}

const ModalUserMarkers: FC<Props> = ({
    isOpen,
    onClose,
    direction,
    description,
    markerType,
    pictures,
    location,
}) => {
    const { dataMarkerUser, positionMarkerUser } = useLogicMaps()
    const [comments, setComments] = useState('')
    const [rating, setRating] = useState(0)
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

    const handleSubmit = () => {
        // Aquí puedes realizar la lógica para guardar los comentarios y la valoración
        // Puedes acceder a los datos de dataMarkerUser y los nuevos comentarios y valoración
    }

    const style = {
        position: 'absolute' as const,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: '0 10px 100px #000', // Corrección aquí
        p: 3,
        borderRadius: '10px',
        maxHeight: '500px',
        overflowY: 'scroll',
    }

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box sx={style}>
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
                    <TypographyContainer
                        id="modal-modal-description"
                        style={{ marginTop: 2, fontFamily: 'Roboto' }}
                    >
                        <Typography sx={{ mb: 1, fontWeight: '800' }}>
                            Direccion:
                        </Typography>
                        {direction}
                    </TypographyContainer>
                </TypographyContainer>
                <TypographyContainer>
                    <TypographyContainer
                        id="modal-modal-description"
                        style={{ marginTop: 2, fontFamily: 'Roboto' }}
                    >
                        <Typography sx={{ mb: 1, fontWeight: '800' }}>
                            Descripción:
                        </Typography>
                        {description}
                    </TypographyContainer>
                </TypographyContainer>
                {/* <TypographyContainer>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Marcador: {markerType}
                    </Typography>
                </TypographyContainer> */}
                <TypographyContainer>
                    <ImageModal src={pictures} />
                </TypographyContainer>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" component="label">
                        Comentarios de Usuarios:
                    </Typography>
                    <TextField
                        value={comments}
                        onChange={e => setComments(e.target.value)}
                        fullWidth
                        multiline
                        rows={4}
                    />
                </Box>

                <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" component="label">
                        Valoraciones:
                    </Typography>
                    <Rating
                        value={rating}
                        onChange={(e, value) => setRating(value || 0)}
                    />
                </Box>

                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                    <ButtonComp
                        title="Ir a Google Maps"
                        variant="contained"
                        onClick={() => openMap(location)}
                    />
                </Box>
            </Box>
        </Modal>
    )
}

export default ModalUserMarkers
