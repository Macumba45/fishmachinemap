import { FC } from 'react'
import BasicRating from '../Rating'
import {
    Container,
    AuthorNameH1,
    MainContainer,
    ReviewsContainer,
    TextReview,
} from './styles'

interface PlaceReview {
    author_name?: string
    author_url?: string
    language?: string
    profile_photo_url?: string
    rating?: number
    relative_time_description?: string
    text?: string
    time?: number
}

const ReviewsComp: FC<PlaceReview> = ({
    author_name,
    author_url,
    language,
    profile_photo_url,
    rating,
    relative_time_description,
    text,
    time,
}) => {
    return (
        <MainContainer>
            <ReviewsContainer>
                <Container>
                    <AuthorNameH1>{author_name}</AuthorNameH1>
                </Container>
                <Container>
                    <TextReview>{text}</TextReview>
                </Container>
                <Container>
                    <BasicRating value={rating} />
                </Container>
            </ReviewsContainer>
        </MainContainer>
    )
}

export default ReviewsComp
