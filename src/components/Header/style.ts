import styled from 'styled-components'

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    background: rgb(70, 117, 166);
    background: linear-gradient(
        180deg,
        rgba(70, 117, 166, 1) 0%,
        rgba(66, 172, 232, 1) 35%,
        rgba(172, 204, 237, 1) 100%
    );
`

export const LogoPicture = styled.img`
    width: 350px;
    object-fit: cover;
    background-size: cover;
    @media screen and (max-width: 600px) {
        width: 280px;
    }
`

export const ContainerLanguage = styled.div`
    display: flex;
    position: absolute;
    justify-content: center;
    margin-top: 1rem;
    z-index: 999;
    width: 100%;
`

export const VideoContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;

    ::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.4);
        z-index: 1;
    }
    @media screen and (max-width: 375px) {
        height: 100vh;
    }
    @media screen and (max-width: 360px) {
        height: 110vh;
    }
    @media screen and (max-width: 330px) {
        height: 140vh;
    }
`

export const BackgroundVideo = styled.video`
    width: 100%;
    height: 100vh;
    background-size: cover;
    object-fit: cover;
    position: absolute;
`

export const TitleContainer = styled.div`
    display: flex;
    position: absolute;
    justify-content: center;
    width: 100%;
    z-index: 1;
    margin-top: 15rem;

    @media screen and (max-width: 600px) {
        margin-top: 10rem;
    }
`
export const TitleHeader = styled.h1`
    font-family: Roboto, sans-serif;
    color: white;
    font-size: 5rem;
    text-align: center;
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    @media screen and (max-width: 600px) {
        font-size: 2rem;
    }
`

export const SubtitleContainer = styled.div`
    display: flex;
    position: absolute;
    justify-content: center;
    width: 100%;
    margin-top: 20rem;
    z-index: 999;
    @media screen and (max-width: 600px) {
        margin-top: 14.5rem;
    }
`
export const SubtitleHeader = styled.h2`
    font-family: Roboto, sans-serif;
    color: white;
    font-size: 1rem;
    text-align: center;
    padding: 0.5rem;
    border-radius: 10px;
    font-weight: 500;
    background-color: #4675a6;
    width: 310px;
    @media screen and (max-width: 600px) {
        width: 200px;
        font-size: 0.8rem;
    }
`

export const SpanBold = styled.span`
    font-family: Roboto, sans-serif;
    color: #42c3ff;
    font-weight: 400;
    line-height: 5rem;
    font-size: 2.5rem;

    @media screen and (max-width: 600px) {
        font-size: 1.5rem;
        font-weight: 400;
        line-height: 0rem;
    }
`

export const ButtonContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    position: absolute;
    margin: 0 auto;
    z-index: 999999;
    margin-top: 25rem;
    flex-direction: column;

    @media screen and (max-width: 600px) {
        flex-direction: column;
        margin-top: 20rem;
    }
`
