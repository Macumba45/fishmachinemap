import styled from 'styled-components'
export const containerStyle = {
    width: '100%',
    height: '100vh',
    // marginTop: '5rem',
    // border: '2px solid #9B786F',
}

export const options = {
    disableDefaultUI: true,
    zoomControl: true,
    fullscreenControl: false,
    streetViewControl: false,
}

export const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
    object-fit: cover;
    background-size: cover;
`

export const MapContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
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

export const ContainerFilter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const FilterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 60px; /* ajusta la altura según tus necesidades */
`
