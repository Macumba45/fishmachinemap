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
} from './style'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CommentIcon from '@mui/icons-material/Comment'
import { Button, IconButton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'

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
}) => {
    const [likes, setLikes] = useState(0)
    const [isLiked, setIsLiked] = useState(false)

    const handleLike = () => {
        if (isLiked) {
            setLikes(likes - 1)
            setIsLiked(false)
        } else {
            setLikes(likes + 1)
            setIsLiked(true)
        }
    }

    return (
        <CardContainer key={id}>
            <ImagenContainer>
                <Imagen src={picture} />
            </ImagenContainer>
            <IconsContainer>
                <HearthContainer>
                    <Button
                        variant="contained"
                        sx={{
                            color: 'white',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            paddingTop: 0.5,
                            paddingBottom: 0.5,
                            paddingLeft: 2,
                            backgroundColor: '#49007a',
                            width: '6rem',
                            marginLeft: '0.7rem',
                        }}
                    >
                        <LocationOnIcon
                            sx={{ color: 'white', paddingRight: 1 }}
                        />
                        Mapa
                    </Button>
                    <IconButton onClick={onClick} sx={{ marginLeft: '10rem' }}>
                        {isLiked ? (
                            <FavoriteIcon sx={{ color: '#49007a' }} />
                        ) : (
                            <FavoriteBorderIcon sx={{ color: '#49007a' }} />
                        )}
                        <LikesLabel>{likes}</LikesLabel>
                    </IconButton>
                </HearthContainer>
                <Icons>
                    <CommentIcon sx={{ color: '#49007a' }} />
                    <Description>{description}</Description>
                </Icons>
            </IconsContainer>
        </CardContainer>
    )
}

export default CardFeed
