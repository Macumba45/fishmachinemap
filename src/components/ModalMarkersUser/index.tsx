import { FC } from 'react'
import { Modal, Box, Typography } from '@mui/material'
import ButtonComp from '../Button'
import NavigationIcon from '@mui/icons-material/Navigation'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import {
    TypographyContainer,
    ContenidoGoogle,
    ImageModal,
    PictureContainer,
    CreatorLink,
} from './style'

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
    creator?: string
    link?: React.ReactElement // Cambiado a React.ReactElement
    user?: {
        id: string
        name: string
        email: string
    }
    icon?: React.ReactElement
}

const ModalUserMarkers: FC<Props> = ({
    isOpen,
    onClose,
    direction,
    description,
    markerType,
    pictures,
    creator,
    onClick,
    link,
    icon,
}) => {
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
        borderColor: 'transparent',
        border: 'none',
        outline: 'none',
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
                            {icon}
                            <CreatorLink>{link}</CreatorLink>
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
                        mb: 3,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <ButtonComp
                        icon={
                            <NavigationIcon
                                sx={{ marginRight: '0.5rem' }}
                                fontSize="medium"
                            />
                        }
                        color="white"
                        title="Abrir en Google Maps"
                        variant="contained"
                        onClick={onClick}
                        bgColor="#49007a"
                    />
                </Box>
            </Box>
        </Modal>
    )
}

export default ModalUserMarkers
