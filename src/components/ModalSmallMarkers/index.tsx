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
    markerType?: string
}

const ModalSmallMarkers: FC<Props> = ({
    isOpen,
    onClick,
    onClose,
    picture,
    place,
    description,
    markerType,
}) => {
    usePreventZoom()

    return (
        <React.Fragment>
            {isOpen && (
                <MainContainer onClick={onClick} onClose={onClose}>
                    <Container>
                        <PictureMarker src={picture} />
                        <Typography
                            sx={{
                                fontSize: '0.7rem',
                                textAlign: 'left',
                                ml: 1,
                                fontWeight: 600,
                            }}
                        >
                            {markerType!.charAt(0).toUpperCase() +
                                markerType?.slice(1)}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '0.7rem',
                                textAlign: 'left',
                                ml: 1,
                                mr: 1,
                            }}
                        >
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
