import { FC, useState } from 'react'
import { FeedPros } from './type'
import {
    Imagen,
    ImagenContainer,
    CardContainer,
    Icons,
    IconsContainer,
    LikesLabel,
    Description,
    DescriptionContainer,
    HearthContainer,
    ContainerUser,
} from './style'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CommentIcon from '@mui/icons-material/Comment'
import { Button, IconButton, Typography } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

const CardFeed: FC<FeedPros> = ({
    id,
    userName,
    picture,
    direction,
    description,
    date,
    comentarios,
    onClick,
    userId,
    isLiked,
    likes,
    user,
}) => {
    return (
        <CardContainer key={id}>
            <ImagenContainer>
                <Imagen src={picture} />
            </ImagenContainer>
            <IconsContainer>
                <HearthContainer>
                    <Typography
                        style={{
                            fontSize: '0.8rem',
                            fontWeight: 500,
                            alignItems: 'center',
                            display: 'flex',
                            marginLeft: '0.5rem',
                        }}
                    >
                        <AccountCircleIcon
                            style={{ color: '#49007a', marginRight: '0.3rem' }}
                        />
                        {user?.name}
                    </Typography>
                    <IconButton
                        onClick={onClick}
                        style={{ marginLeft: '10rem' }}
                    >
                        {isLiked ? (
                            <FavoriteIcon style={{ color: '#49007a' }} />
                        ) : (
                            <FavoriteBorderIcon style={{ color: '#49007a' }} />
                        )}
                        <LikesLabel>{likes}</LikesLabel>
                    </IconButton>
                </HearthContainer>
                <Icons>
                    <CommentIcon style={{ color: '#49007a' }} />
                    <Description>{description}</Description>
                </Icons>
                {/* <Button
                    variant="contained"
                    style={{
                        color: 'white',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        paddingTop: 0.5,
                        paddingBottom: 0.5,
                        paddingLeft: 2,
                        backgroundColor: '#49007a',
                        width: '6rem',
                        marginLeft: '0.5rem',
                        marginBottom: '1rem',
                    }}
                >
                    <LocationOnIcon
                        style={{ color: 'white', paddingRight: 1 }}
                    />
                    Mapa
                </Button> */}
            </IconsContainer>
        </CardContainer>
    )
}

export default CardFeed
