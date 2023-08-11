import styled from 'styled-components'

export const MainContainer = styled.div`
    // put in the center
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    object-fit: cover;
    background-size: cover;
    z-index: 999;
`

export const TypographyContainer = styled.div`
    margin-bottom: 1rem;
    margin-left: 0.3rem;
    margin-right: 0.3rem;
`

export const PictureContainer = styled.div``
export const ReviewsContainer = styled.div`
    position: absolute;
    display: flex;
    width: 400px;
    align-items: center;
    height: 500px;
    object-fit: cover;
    background-size: cover;
    z-index: 999;
    background-color: red;
    margin-top: 2.5rem;
`

export const ImageContainer = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 2rem;
    object-fit: cover;
    background-size: cover;
    border-radius: 100px;
`
export const ImageModal = styled.img`
    width: 100%;
    margin-bottom: 0.6rem;
    object-fit: cover;
    background-size: cover;
`

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
`

export const RatingContainer = styled.div`
    display: flex;
    margin-top: 1rem;
    align-items: center;
`
export const NumberOfRating = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: ${({ theme }) => theme.fonts.roboto};
    font-weight: 100;
    font-size: 1rem;
    margin-right: 0.5rem;
`

export const NumberContainer = styled.div`
    display: flex;
    margin-top: 1rem;
`
export const CallNumber = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: ${({ theme }) => theme.fonts.roboto};
    text-decoration: none;
    color: #4285f4;
`

export const ContenidoGoogle = styled.div`
    font-family: ${({ theme }) => theme.fonts.roboto};
`

export const TotalRating = styled.div`
    font-family: ${({ theme }) => theme.fonts.roboto};
    font-weight: 100;
    font-size: 0.8rem;
    margin-left: 0.5rem;
`
export const CreatorLink = styled.div`
    font-family: ${({ theme }) => theme.fonts.roboto};
    font-weight: 500;
    font-size: 0.8rem;
    margin-left: 0.5rem;
    text-decoration: none;
    color: #49007a;
`
export const LikesLabel = styled.div`
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    font-family: 'Roboto', sans-serif;
    margin-left: 0.2rem;
    padding: 0.3rem;
`
