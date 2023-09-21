import styled from 'styled-components'

export const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    object-fit: cover;
    margin-top: 1rem;
    margin-bottom: 0rem;
    background-size: cover;
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

export const FilterContainer = styled.div`
    display: flex;
    position: fixed;
    width: 100%;
    top: 10px;
    align-items: center;
    margin-top: 3.5rem;
    background-color: white;
    z-index: 1;
`

export const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-bottom: 5rem;
    /* margin-left: 1rem;
    margin-right: 1rem; */
    /* @media screen and (min-width: 375px) {
        flex-wrap: wrap;
        
    } */
`

export const ContainerInFluencer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 8rem;

    /* @media screen and (min-width: 375px) {
        flex-wrap: wrap;
        
    } */
`

export const NoDataText = styled.h1`
    font-family: Roboto, sans-serif;
    font-size: 1rem;
    font-weight: 200;
    color: #4675a6;
    text-align: center;
`
