import styled from 'styled-components'

interface MainContainerProps {
    onClose?: () => void
    isSelected?: boolean
}

export const MainContainer = styled.div<MainContainerProps>`
    display: flex;
    width: 120px;
    height: 150px;
    margin: 0.8rem;
    cursor: pointer;
`

export const Container = styled.div`
    background-color: white;
    border-radius: 10px;
    object-fit: cover;
    background-size: cover;
    overflow-x: scroll;
`

export const PictureMarker = styled.img`
    width: 120px;
    margin-bottom: 0.5rem;
    height: 100px;
    object-fit: cover;
    background-size: cover;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
`
