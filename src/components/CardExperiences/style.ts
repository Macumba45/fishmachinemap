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
    margin-left: 0.5rem;
    font-family: ${({ theme }) => theme.fonts.roboto};
`
