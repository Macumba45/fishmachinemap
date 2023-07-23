import styled from 'styled-components'

export const CardContainer = styled.div`
    display: flex;
    max-width: 500px;
    min-width: 300px;
    flex-direction: column;
    margin-bottom: 1rem;
    margin-top: 1rem;
    max-height: 800px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Agrega el sombreado aquí */
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
`

export const ImagenContainer = styled.div``
export const Imagen = styled.img`
    width: 100%;
    object-fit: cover;
    background-size: cover;
`

export const IconsContainer = styled.div``
export const Icons = styled.div`
    display: flex;
    align-items: center;
    margin-top: 0.8rem;
    margin-left: 0.5rem;
    padding-left: 0.5rem;
`

export const LikesLabel = styled.p`
    font-size: 0.8rem;
    font-family: 'Roboto', sans-serif;
    margin-left: 0.2rem;
    padding: 0.3rem;
`

export const DescriptionContainer = styled.div`
    display: flex;
    margin-left: 0.6rem;
    align-items: flex-start;
    margin-top: 0.5rem;
    word-wrap: break-word;
`

export const Description = styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-family: 'Roboto', sans-serif;
    margin-left: 0.5rem;
    word-wrap: break-word;
    line-height: 1rem;
`
