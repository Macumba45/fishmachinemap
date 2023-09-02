import styled from 'styled-components'

export const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    height: 100%;
    object-fit: cover;
    margin-bottom: 4rem;
    margin-top: 5rem;
    flex-direction: column;
    /* margin-top: 2rem; */
`
export const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 1rem;
`

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    width: 100%;
    height: 80px;
    background-color: #49007a;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
    z-index: 1;
`

export const ContainerMenu = styled.div`
    display: flex;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 2;
`
export const TextNav = styled.h1`
    font-family: Roboto, sans-serif;
    font-size: 1rem;
    font-weight: 500;
    color: #fff;
    margin-left: 1rem;
    margin-right: 1rem;
    @media screen and (max-width: 370px) {
        font-size: 0.75rem;
    }
`
