import styled from 'styled-components'

export const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 100%;
    object-fit: cover;
    background-size: cover;
`

export const CardContainer = styled.div`
    margin-top: 5.5rem;
    margin-bottom: 5rem;
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
`

export const ContainerMenu = styled.div`
    display: flex;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1;
`

export const NoDataContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 100vh;
`

export const NoDataText = styled.h1`
    font-family: Roboto, sans-serif;
    font-size: 1rem;
    font-weight: 200;
    color: #49007a;
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
