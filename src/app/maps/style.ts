import styled from 'styled-components'

export const containerStyle = {
    width: '100%',
    height: '100vh',
    // marginTop: '5rem',
    // border: '2px solid #9B786F',
}

export const center = {
    lat: 40.463667 || undefined,
    lng: -3.74922 || undefined,
}

export const options = {
    disableDefaultUI: false,
    zoomControl: true,
    fullscreenControl: false,
    streetViewControl: false,


}



export const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    object-fit: cover;
    background-size: cover;
`

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    text-align: center;
`

export const TitleHeader = styled.h1`
    font-family: ${({ theme }) => theme.fonts.montserrat};
    color: ${({ theme }) => theme.colors.secondary};
    font-size: ${({ theme }) => theme.fontSizes.mediumSmall};
    z-index: 999;
    line-height: 4rem;

    @media screen and (max-width: 600px) {
        font-size: 1.5rem;
    }
`
