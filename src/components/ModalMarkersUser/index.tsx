import { FC } from 'react'
import { Modal, Box, Typography, IconButton } from '@mui/material'
import ButtonComp from '../Button'
import NavigationIcon from '@mui/icons-material/Navigation'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import {
    TypographyContainer,
    ContenidoGoogle,
    ImageModal,
    PictureContainer,
    CreatorLink,
    LikesLabel,
} from './style'

interface Props {
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
    onClickLike,
    link,
    icon,
    icon2,
    icon3,
    isLiked,
    likes,
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

    console.log(window.location.pathname === '/maps')

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
                            {typeof window !== 'undefined' && window.location.pathname === '/maps' && (
                                <>
                                    <IconButton
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: 0,
                                            marginRight: '0.5rem',
                                        }}
                                        onClick={onClickLike}
                                    >
                                        {isLiked ? (
                                            <FavoriteIcon
                                                style={{ color: '#49007a' }}
                                            />
                                        ) : (
                                            <FavoriteBorderIcon
                                                style={{ color: '#49007a' }}
                                            />
                                        )}
                                    </IconButton>
                                    {/* <LikesLabel>{likes} Likes</LikesLabel> */}
                                </>
                            )}
                        </ContenidoGoogle>
                    </TypographyContainer>
                    <TypographyContainer>
                        <TypographyContainer
                            id="modal-modal-description"
                            style={{ marginTop: 2, fontFamily: 'Roboto' }}
                        >
                            <Typography sx={{ mb: 1, fontWeight: '800', fontSize: '0.9rem' }}>
                                Lugar/Dirección:
                            </Typography>
                            <Typography sx={{ fontWeight: '400', fontSize: '0.8rem' }}>
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
                            <Typography sx={{ mb: 1, fontWeight: '800', fontSize: '0.9rem' }}>
                                Descripción:
                            </Typography>
                            <Typography sx={{ fontWeight: '400', fontSize: '0.8rem' }}>
                                {description}
                            </Typography>
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
