import { FC, memo, useEffect, useState } from 'react'
import Link from 'next/link'
import { FeedPros } from './type'
import { Box, IconButton, Modal, Typography } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShareIcon from '@mui/icons-material/Share'
import AddCommentIcon from '@mui/icons-material/AddComment'
import CommentModal from '../ModalComments'
import FacebookIcon from '@mui/icons-material/Facebook'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import {
    Imagen,
    ImagenContainer,
    CardContainer,
    Icons,
    IconsContainer,
    LikesLabel,
    Description,
    HearthContainer,
    DateContainer,
    HearthContainerTop,
} from './style'

const CardFeed: FC<FeedPros> = ({
    id,
    userName,
    picture,
    direction,
    description,
    date,
    onClick,
    userId,
    isLiked,
    likes,
    user,
    numberOfComments,
    iconCreator,
    handleShareOnWhatsApp,
    handleShareOnFacebook,
    disabled,
}) => {
    const [isCommentModalOpen, setCommentModalOpen] = useState(false)
    const [isShareModalOpen, setShareModalOpen] = useState(false)

    const handleCommentModalOpen = () => {
        setCommentModalOpen(true)
    }

    const handleCommentModalClose = () => {
        setCommentModalOpen(false)
    }

    const handleShareModalOpen = () => {
        setShareModalOpen(true)
    }

    const handleShareModalClose = () => {
        setShareModalOpen(false)
    }

    const style = {
        position: 'absolute' as const,
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.paper',
        boxShadow: '0 10px 100px #000', // Corrección aquí
        p: 0,
        borderRadius: '10px',
        maxHeight: '600px',
        height: '150px',
        minWidth: '300px',
        overflowY: 'scroll',
        borderColor: 'transparent',
        border: 'none',
        outline: 'none',
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
        <CardContainer key={id}>
            <ImagenContainer>
                <Imagen src={picture} />
            </ImagenContainer>
            <IconsContainer>
                <HearthContainerTop>
                    <Typography
                        component={'div'}
                        style={{
                            fontSize: '0.8rem',
                            fontWeight: 500,
                            alignItems: 'center',
                            display: 'flex',
                            marginLeft: '0.5rem',
                        }}
                    >
                        {iconCreator}
                        <Link
                            style={{
                                textDecorationColor: '#49007a',
                                color: '#49007a',
                            }}
                            href={`/feed/${user?.id}`}
                        >
                            {user?.name}
                        </Link>
                    </Typography>
                    <IconButton onClick={handleShareModalOpen}>
                        <ShareIcon style={{ color: '#49007a' }} />
                    </IconButton>
                    <IconButton
                        onClick={handleCommentModalOpen}
                        style={{ justifySelf: 'end' }}
                    >
                        <AddCommentIcon style={{ color: '#49007a' }} />
                        <LikesLabel>{numberOfComments}</LikesLabel>
                    </IconButton>
                    <IconButton
                        onClick={onClick}
                        style={{ justifySelf: 'end' }}
                        disabled={!isLogged}
                    >
                        {isLiked ? (
                            <FavoriteIcon
                                style={{ color: isLogged ? '#49007a' : 'grey' }}
                            />
                        ) : (
                            <FavoriteBorderIcon
                                style={{ color: isLogged ? '#49007a' : 'grey' }}
                            />
                        )}
                        <LikesLabel>{likes}</LikesLabel>
                    </IconButton>
                </HearthContainerTop>
                <HearthContainer>
                    <Icons>
                        {/* <CommentIcon style={{ color: '#49007a' }} /> */}
                        <Description>{description}</Description>
                    </Icons>
                    <DateContainer>{date}</DateContainer>
                </HearthContainer>

                <CommentModal
                    open={isCommentModalOpen}
                    onClose={handleCommentModalClose}
                    id={id as string}
                />
            </IconsContainer>

            <Modal
                open={isShareModalOpen}
                onClose={handleShareModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ mb: 1 }}
                    >
                        Comparte con amigos
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <IconButton onClick={handleShareOnWhatsApp}>
                            <WhatsAppIcon />
                        </IconButton>
                        <IconButton onClick={handleShareOnFacebook}>
                            <FacebookIcon />
                        </IconButton>
                    </Typography>
                </Box>
            </Modal>
        </CardContainer>
    )
}

export default memo(CardFeed)
