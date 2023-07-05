import styled from 'styled-components'

export const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    margin-bottom: 2rem;
`

export const ReviewsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 400px;
    height: auto;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3); /* Add the box-shadow property */
`

export const Container = styled.div`
    margin: 0.5rem;
`

export const AuthorNameH1 = styled.h1`
    font-family: ${({ theme }) => theme.fonts.roboto};
    font-weight: 800;
    margin-top: 1rem;
`

export const TextReview = styled.p`
    font-family: ${({ theme }) => theme.fonts.roboto};
    font-weight: 400;
    line-height: 1.5rem;
`
