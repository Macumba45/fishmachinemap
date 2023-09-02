import styled from 'styled-components'

export const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    object-fit: cover;
    background-size: cover;
    margin-bottom: 5rem;
`

export const MainContainerNoUser = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
`
export const Container = styled.div`
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
`

export const UserContainerData = styled.div`
    background-color: #49007a;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 300px;
`

export const ContainerData = styled.div`
    display: flex;
    align-items: center;
    margin: 1rem;
`

export const LabelIcons = styled.label`
    font-size: 0.8rem;
    font-family: 'Roboto', sans-serif;
`

export const ContainerMenu = styled.div`
    display: flex;
    height: 80px;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 2;
`

export const nameStyles = {
    color: 'white',
    marginTop: '1rem',
    fontSize: '1.5rem',
    fontWeight: '400',
}

export const emailStyles = {
    color: 'white',
    marginTop: '0.5rem',
    fontSize: '1rem',
    fontWeight: '200',
}
