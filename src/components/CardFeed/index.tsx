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
    DescriptionContainer,
} from './style'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CommentIcon from '@mui/icons-material/Comment'
import { Button } from '@mui/material'

const CardFeed: FC<FeedPros> = ({
    id,
    userName,
    picture,
    direction,
    description,
    date,
    comentarios,
}) => {
    return (
        <CardContainer key={id}>
            <ImagenContainer>
                <Imagen src={picture} />
            </ImagenContainer>
            <IconsContainer>
                <Icons>
                    <FavoriteBorderIcon sx={{ color: '#49007a' }} />
                    <LikesLabel>120 likes</LikesLabel>
                </Icons>
                <Icons>
                    <CommentIcon sx={{ color: '#49007a' }} />
                    <Description>{description}</Description>
                </Icons>
                <Icons>
                    <LocationOnIcon sx={{ color: '#49007a' }} />
                    <Button
                        sx={{
                            color: '#49007a',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                        }}
                    >
                        Ver mapa
                    </Button>
                </Icons>
            </IconsContainer>
            <DescriptionContainer></DescriptionContainer>
        </CardContainer>
    )
}

export default CardFeed
