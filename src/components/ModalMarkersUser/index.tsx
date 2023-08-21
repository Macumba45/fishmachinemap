import { FC, useEffect, useState } from 'react'
import { Modal, Box, Typography, IconButton } from '@mui/material'
import ButtonComp from '../Button'
import NavigationIcon from '@mui/icons-material/Navigation'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FacebookIcon from '@mui/icons-material/Facebook'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import ShareIcon from '@mui/icons-material/Share'
import {
    TypographyContainer,
    ContenidoGoogle,
    ImageModal,
    PictureContainer,
    CreatorLink,
    LikesLabel,
} from './style'

interface Props {
    disabled?: boolean
    isOpen: boolean
    onClose?: () => void
    onClick?: () => void
    onClickLike?: () => void
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
    icon2?: React.ReactElement
    icon3?: React.ReactElement
    isLiked?: boolean
    likes?: number
    handleShareOnWhatsApp?: () => void
    handleShareOnFacebook?: () => void
}

const ModalUserMarkers: FC<Props> = ({
    disabled,
    isOpen,
    onClose,
    direction,
    description,
    markerType,
    pictures,
    creator,
    onClick,
    onClickLike,
    link,
    icon,
    icon2,
    icon3,
    isLiked,
    likes,
    handleShareOnWhatsApp,
    handleShareOnFacebook,
}) => {
    let maxHeight: any
    if (typeof window !== 'undefined') {
        if (window.innerWidth < 330) {
            maxHeight = '430px'
        } else if (window.innerWidth > 331) {
            maxHeight = '600px'
        } else if (window.innerWidth > 500) {
            maxHeight = '700px'
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
        maxHeight: maxHeight,
        minWidth: '300px',
        maxWidth: '400px',
        overflowY: 'scroll',
        borderColor: 'transparent',
        border: 'none',
        outline: 'none',
    }

    const shareStyle = {
        position: 'absolute' as const,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: '0 10px 100px #000', // Corrección aquí
        p: 3,
        outline: 'none',
        borderRadius: '10px',
    }

    const [isShareModalOpen, setShareModalOpen] = useState(false)

    const handleShareModalOpen = () => {
        setShareModalOpen(true)
    }

    const handleShareModalClose = () => {
        setShareModalOpen(false)
    }

    const [isLogged, setIsLogged] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (!token) {
            setIsLogged(false)
            // router.push('/auth/login'); // Redirige al usuario a la página de inicio de sesión si no hay token
        } else {
            setIsLogged(true)
        }
    }, [])

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
                        <ContenidoGoogle
                            style={{
                                marginBottom: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                marginLeft: '0.2rem',
                                fontFamily: 'Roboto',
                                fontWeight: 300,
                                fontSize: '1rem',
                                justifyContent: 'space-between',
                            }}
                        >
                            {icon2}
                            {typeof window !== 'undefined' &&
                                window.location.pathname === '/maps' && (
                                <>
                                    <IconButton
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: 0,
                                            marginRight: '0.5rem',
                                        }}
                                        onClick={onClickLike}
                                        disabled={!isLogged}
                                    >
                                        {isLiked ? (
                                            <FavoriteIcon
                                                style={{
                                                    color: isLogged
                                                        ? '#49007a'
                                                        : 'grey',
                                                }}
                                            />
                                        ) : (
                                            <FavoriteBorderIcon
                                                style={{
                                                    color: isLogged
                                                        ? '#49007a'
                                                        : 'grey',
                                                }}
                                            />
                                        )}
                                        <LikesLabel>{likes}</LikesLabel>
                                    </IconButton>
                                </>
                            )}
                        </ContenidoGoogle>
                    </TypographyContainer>
                    <TypographyContainer>
                        <TypographyContainer
                            id="modal-modal-description"
                            style={{ marginTop: 2, fontFamily: 'Roboto' }}
                        >
                            <Typography
                                sx={{
                                    mb: 1,
                                    fontWeight: '800',
                                    fontSize: '0.9rem',
                                }}
                            >
                                Lugar/Dirección:
                            </Typography>
                            <Typography
                                sx={{ fontWeight: '400', fontSize: '0.8rem' }}
                            >
                                {direction}
                            </Typography>
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
                            <Typography
                                sx={{
                                    mb: 1,
                                    fontWeight: '800',
                                    fontSize: '0.9rem',
                                }}
                            >
                                Descripción:
                            </Typography>
                            <Typography
                                sx={{ fontWeight: '400', fontSize: '0.8rem' }}
                            >
                                {description}
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: '800',
                                    fontSize: '0.9rem',
                                    mt: 1,
                                }}
                            >
                                Compartir:
                            </Typography>
                            <IconButton
                                sx={{ paddingLeft: 0 }}
                                onClick={handleShareModalOpen}
                            >
                                <ShareIcon style={{ color: '#49007a' }} />
                            </IconButton>
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
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Modal
                        open={isShareModalOpen}
                        onClose={handleShareModalClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={shareStyle}>
                            <Typography
                                id="modal-modal-description"
                                sx={{ mt: 2 }}
                            >
                                <IconButton onClick={handleShareOnWhatsApp}>
                                    <WhatsAppIcon />
                                </IconButton>
                                <IconButton onClick={handleShareOnFacebook}>
                                    <FacebookIcon />
                                </IconButton>
                            </Typography>
                        </Box>
                    </Modal>
                </Box>
            </Box>
        </Modal>
    )
}

export default ModalUserMarkers
