import styled from 'styled-components'

export const MainContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    margin-top: 9rem;
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

export const FilterContainer = styled.div`
    display: flex;
    position: fixed;
    width: 100%;
    top: 10px;
    align-items: center;
    margin-top: 3.1rem;
    background-color: white;
    z-index: 1;
`

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    width: 100%;
    height: 60px;
    background-color: #4675a6;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
    z-index: 1;
`

export const ContainerMenu = styled.div`
    display: flex;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 2;
    height: 60px;
`

export const TextNav = styled.img`
    width: 130px;
`

export const NoDataText = styled.h1`
    font-family: Roboto, sans-serif;
    font-size: 1rem;
    font-weight: 200;
    color: #4675a6;
`
