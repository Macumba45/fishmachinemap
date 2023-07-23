import styled from 'styled-components'

export const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    height: 100%;
    object-fit: cover;
    margin-bottom: 4rem;
    @media screen and (min-width: 600px) {
        flex-wrap: nowrap;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0 auto;
        margin-bottom: 4rem;
    }
`
export const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 1rem;
`
