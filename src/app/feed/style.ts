import styled from 'styled-components'

export const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    flex-wrap: wrap;
    height: 100%;
    object-fit: cover;
    /* margin-top: 1rem; */
    margin-bottom: 4rem;
    min-width: 320px;
    @media screen and (min-width: 600px) {
        flex-wrap: nowrap;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0 auto;
        margin-bottom: 4rem;
        width: 450px;
    }
`
export const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 1rem;
`
