'use client'

import { FC } from 'react'
import { BackgroundVideo, MainContainer } from './style'
import { Props } from './types'
const VideoPlayer: FC<Props> = ({ url }) => {
    return (
        <MainContainer>
            <BackgroundVideo autoPlay muted playsInline src={url} />
        </MainContainer>
    )
}

export default VideoPlayer
