import styled from 'styled-components'

export const CardContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
    margin-bottom: 1rem;
    /* @media screen and (min-width: 375px) {
        flex-wrap: wrap;
        
    } */
`
export const Spanbold = styled.span`
    font-weight: 700;
    font-family: ${({ theme }) => theme.fonts.roboto};
    color: #4675a6;
`

export const LogoInfluencerContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    margin-left: 1rem;
    width: 100%;

    /* @media screen and (min-width: 375px) {
        flex-wrap: wrap;
        
    } */
`

export const ContainerInfo = styled.div`
    display: grid;
    align-items: center;
    margin-top: 2rem;
    margin-bottom: 1rem;
    justify-content: center;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
    height: 30px;
`
