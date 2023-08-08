import styled from 'styled-components'

export const MainContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    object-fit: cover;
    background-size: cover;
    margin-top: 5.2rem;
    margin-bottom: 5rem;
    justify-content: center;
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
