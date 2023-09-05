import React, { FC, useEffect, useState, memo } from 'react'
import { Container, PictureMarker, MainContainer } from './style'
import usePreventZoom from '@/hooks/disableZoom'
import { Typography } from '@mui/material'

interface Props {
    isOpen?: boolean
    onClose?: () => void
    onClick?: () => void
    picture?: string
    place?: string
    description?: string
}

const ModalSmallMarkers: FC<Props> = ({
    isOpen,
    onClick,
    onClose,
    picture,
    place,
    description,
}) => {
    usePreventZoom()

    return (
        <React.Fragment>
            {isOpen && (
                <MainContainer onClick={onClick} onClose={onClose}>
                    <Container>
                        <PictureMarker src={picture} />
                        <Typography sx={{ fontSize: '0.7rem', ml: 1 }}>
                            {place}
                        </Typography>
                        <Typography>{description}</Typography>
                    </Container>
                </MainContainer>
            )}
        </React.Fragment>
    )
}

export default memo(ModalSmallMarkers)
