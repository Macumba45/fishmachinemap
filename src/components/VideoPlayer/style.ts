import styled from 'styled-components'

export const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
    width: 100%;
`

export const BackgroundVideo = styled.video`
    width: 100%;
    height: 100vh;
    background-size: cover;
    object-fit: cover;
    position: absolute;
`

export const TitleContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    z-index: 999;
`
export const TitleHeader = styled.h1`
    font-family: ${({ theme }) => theme.fonts.montserrat};
    color: ${({ theme }) => theme.colors.primaryLight};
    font-size: 3rem;
    text-align: center;
`
