import styled from 'styled-components'

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
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
    z-index: 999;
    margin-top: 10rem;

    @media screen and (max-width: 600px) {
        margin-top: 12rem;
    }
`
export const TitleHeader = styled.h1`
    font-family: Roboto, sans-serif;
    color: white;
    font-size: 5rem;
    text-align: center;
    @media screen and (max-width: 600px) {
        font-size: 2rem;
    }
`

export const SubtitleContainer = styled.div`
    display: flex;
    position: absolute;
    justify-content: center;
    width: 100%;
    margin-top: 17rem;
    z-index: 999;
    @media screen and (max-width: 600px) {
        margin-top: 17rem;
    }
`
export const SubtitleHeader = styled.h2`
    font-family: Roboto, sans-serif;
    color: white;
    font-size: 2rem;
    text-align: center;
    line-height: 3rem;
    font-weight: 200;
    @media screen and (max-width: 600px) {
        font-size: 1.5rem;
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
    margin-top: 30rem;
    @media screen and (max-width: 600px) {
        flex-direction: column;
        margin-top: 25rem;
    }
`
