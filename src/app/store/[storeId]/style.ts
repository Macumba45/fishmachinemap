import styled from 'styled-components'

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 100%;
`

export const PictureContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    object-fit: cover;
    background-size: cover;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
`

export const Picture = styled.img`
    width: 400px;
    object-fit: cover;
    height: 300px;
`

export const ContainerTitle = styled.div`
    margin-top: 3rem;
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`
export const Title = styled.h1`
    font-family: Roboto, sans-serif;
    font-size: 1.5rem;
    font-weight: 500;
`
export const ContainerDescription = styled.div`
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 300px;
    max-width: 600px;
    margin-left: 1rem;
    margin-right: 1rem;
`
export const Description = styled.p`
    font-family: Roboto, sans-serif;
    font-size: 1rem;
    font-weight: 400;
    text-align: center;
    line-height: 1.5rem;
`

export const ContainerPrice = styled.div`
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #49007a;
    padding: 1rem;
    border-radius: 10px;
    color: #fff;
`
export const Price = styled.h1`
    font-family: Roboto, sans-serif;
    font-size: 1.5rem;
    font-weight: 400;
`

export const ContainerButton = styled.div`
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 0;
    width: 100%;
`
