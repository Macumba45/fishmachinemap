import { FC } from 'react'
import { FeedPros } from './type'
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
} from './style'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import CommentIcon from '@mui/icons-material/Comment'
import { IconButton, Typography } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import TodayIcon from '@mui/icons-material/Today'

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
                <HearthContainer>
                    <Icons>
                        <CommentIcon style={{ color: '#49007a' }} />
                        <Description>{description}</Description>
                    </Icons>
                    <DateContainer>
                        <TodayIcon
                            style={{ color: '#49007a', marginLeft: '1rem' }}
                        />{' '}
                        {date}
                    </DateContainer>
                </HearthContainer>
            </IconsContainer>
        </CardContainer>
    )
}

export default CardFeed
