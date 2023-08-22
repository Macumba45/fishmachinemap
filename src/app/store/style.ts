import styled from 'styled-components'

export const MainContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    object-fit: cover;
    background-size: cover;
    margin-top: 2rem;
    margin-bottom: 5rem;
    justify-content: center;
`

export const MainContainerNoData = styled.div`
    display: flex;
    height: 100vh;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    font-family: Roboto, sans-serif;
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

export const FilterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 6rem;
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

export const NoDataText = styled.h1`
    font-family: Roboto, sans-serif;
    font-size: 1rem;
    font-weight: 200;
    color: #49007a;
`
