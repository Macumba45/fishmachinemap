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
    rating?: number
    text?: string
}

const ReviewsComp: FC<PlaceReview> = ({ author_name, rating, text }) => {
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
