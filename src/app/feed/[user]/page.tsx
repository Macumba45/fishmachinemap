'use client'

import { FC, memo, useCallback, useEffect, useState } from 'react'
import React from 'react'
import { feedUseLogic } from '../logic'
import { MainContainer } from '../style'
import AccountMenu from '@/components/Menu'
import RoomIcon from '@mui/icons-material/Room'
import PhishingIcon from '@mui/icons-material/Phishing'
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel'
import customMarkerIcon from '../../../assets/anzuelo.png'
import customMarkerIconShop from '../../../assets/tienda.png'
import customMarkerIconPlace from '../../../assets/destino.png'
import customMarkerIconPicture from '../../../assets/back-camera.png'
import { UserMarker } from '@/app/maps/type'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import SimpleBottomNavigation from '@/components/BottomNav'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle'
import {
    Avatar,
    Button,
    ButtonGroup,
    Dialog,
    Divider,
    IconButton,
    ImageList,
    ImageListItem,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from '@mui/material'
import { UserContainerData, nameStyles } from './style'

interface Props {
    params: {
        user: string
    }
}

const Page: FC<Props> = ({ params }) => {
    const { userInfoFeed, dataFeedUser, userMarkers, blablaFish } =
        feedUseLogic()

    const [activeView, setActiveView] = useState('capturas')
    const [width, setWidth] = useState<number>(0)
    const [selectedImage, setSelectedImage] = useState('')
    const [openModal, setOpenModal] = useState(false)

    const handleOpenModal = useCallback((item: any) => {
        setSelectedImage(item.picture)
        setOpenModal(true)
    }, [])

    const handleCloseModal = useCallback(() => {
        setOpenModal(false)
    }, [])

    const handleViewChange = useCallback((view: any) => {
        setActiveView(view)
    }, [])

    const goToMaps = useCallback(() => {
        window.location.href = '/maps'
    }, [])

    useEffect(() => {
        userInfoFeed(params.user)
    }, [params.user])

    useEffect(() => {
        // Check if window is available before setting the initial width
        if (typeof window !== 'undefined') {
            setWidth(window.innerWidth)
        }

        // Handle the resize event
        const handleResize = () => {
            setWidth(window.innerWidth)
        }

        // Add the event listener only if window is available
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize)

            return () => {
                window.removeEventListener('resize', handleResize)
            }
        }
    }, [])

    return (
        <>
            <AccountMenu />
            <MainContainer>
                <UserContainerData>
                    <Avatar
                        sx={{
                            width: 100,
                            height: 100,
                            marginTop: '2rem',
                            marginBottom: '1rem',
                        }}
                    />
                    <Typography
                        style={{
                            textAlign: 'center',
                            ...nameStyles,
                        }}
                        variant="h6"
                        gutterBottom
                    >
                        {dataFeedUser?.name}
                    </Typography>
                </UserContainerData>
                {userMarkers.length >= 0 && (
                    <>
                        <ButtonGroup
                            sx={{
                                marginTop: '2rem',
                                backgroundColor: 'none',
                                marginBottom: '1rem',
                                '.MuiButtonGroup-grouped:not(:last-of-type)': {
                                    borderColor: 'white',
                                    borderRight: '2px solid white',
                                },
                            }}
                            variant="contained"
                            aria-label="outlined primary button group"
                        >
                            <Button
                                sx={{
                                    backgroundColor: '#49007a',
                                    '&:hover': { backgroundColor: '#7900ca' },
                                }}
                                onClick={() => handleViewChange('capturas')}
                            >
                                <ViewCarouselIcon />
                            </Button>
                            <Button
                                onClick={() => handleViewChange('userMarkers')}
                                sx={{
                                    backgroundColor: '#49007a',
                                    '&:hover': { backgroundColor: '#7900ca' },
                                    borderColor: 'white',
                                }}
                            >
                                <RoomIcon />
                            </Button>
                            <Button
                                sx={{
                                    backgroundColor: '#49007a',
                                    '&:hover': { backgroundColor: '#7900ca' },
                                }}
                                onClick={() => handleViewChange('blablafish')}
                            >
                                <AirportShuttleIcon />
                            </Button>
                            <Button
                                sx={{
                                    backgroundColor: '#49007a',
                                    '&:hover': { backgroundColor: '#7900ca' },
                                }}
                                onClick={() => handleViewChange('blablafish')}
                            >
                                <ShoppingBagIcon />
                            </Button>
                        </ButtonGroup>
                        <Divider
                            sx={{
                                my: 2,
                                backgroundColor: '#49007a',
                                width: '200px',
                                marginBottom: '2rem',
                            }}
                        />
                    </>
                )}
                {activeView === 'userMarkers' && userMarkers.length === 0 && (
                    <Typography
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '2rem',
                            color: '#49007a',
                            flexDirection: 'column',
                            textAlign: 'center',
                        }}
                        variant="h6"
                        gutterBottom
                    >
                        No tiene marcadores
                    </Typography>
                )}

                {activeView === 'userMarkers' &&
                    userMarkers.map(
                        (marker: UserMarker) =>
                            // Agrega una condición para verificar si el marcador es visible
                            marker.visible && (
                                <React.Fragment key={marker.id}>
                                    <ListItem
                                        sx={{
                                            width: width,
                                            display: 'flex',
                                            alignItems: 'center',
                                            minWidth: 300,
                                            maxWidth: 600,
                                        }}
                                        alignItems="flex-start"
                                    >
                                        <ListItemAvatar
                                            key={marker.id}
                                            sx={{ margin: '0' }}
                                        >
                                            <div>
                                                <img
                                                    key={marker.id}
                                                    style={{
                                                        width: '50px',
                                                        height: '50px',
                                                        borderRadius: '30px',
                                                        marginRight: '1.5rem',
                                                        objectFit: 'cover',
                                                    }}
                                                    src={
                                                        marker.picture as string
                                                    }
                                                />
                                            </div>
                                        </ListItemAvatar>

                                        <ListItemText
                                            primaryTypographyProps={{
                                                width: '220px',
                                            }}
                                            primary={
                                                marker.direction
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                marker.direction.slice(1)
                                            }
                                            secondary={
                                                <>
                                                    <Typography
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection:
                                                                'column',
                                                            fontWeight: 400,
                                                            wordWrap:
                                                                'break-word',
                                                        }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        {marker.description
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                            marker.description.slice(
                                                                1
                                                            )}
                                                    </Typography>
                                                    <Typography
                                                        component="span"
                                                        sx={{
                                                            width: '100%',
                                                            fontWeight: 200,
                                                            fontSize: '0.8rem',
                                                        }}
                                                    >
                                                        {marker.markerType
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                            marker.markerType.slice(
                                                                1
                                                            )}
                                                    </Typography>
                                                </>
                                            }
                                        />
                                    </ListItem>
                                    <Divider variant="inset" component="hr" />
                                </React.Fragment>
                            )
                    )}
                {activeView === 'blablafish' && userMarkers.length === 0 && (
                    <Typography
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '2rem',
                            color: '#49007a',
                            flexDirection: 'column',
                            textAlign: 'center',
                        }}
                        variant="h6"
                        gutterBottom
                    >
                        No tiene BlaBlaFish
                    </Typography>
                )}

                {activeView === 'blablafish' &&
                    userMarkers.map((marker: UserMarker) => (
                        <React.Fragment key={marker.id}>
                            <ListItem
                                sx={{
                                    width: width,
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                alignItems="flex-start"
                            >
                                <ListItemAvatar
                                    key={marker.id}
                                    sx={{ margin: '0' }}
                                >
                                    <Avatar alt="Marker Icon">
                                        {(() => {
                                            switch (marker.markerType) {
                                                case 'pesquero':
                                                    return (
                                                        <img
                                                            style={{
                                                                width: '100%',
                                                            }}
                                                            src={
                                                                customMarkerIconPlace.src
                                                            }
                                                            alt="Marker Icon"
                                                        />
                                                    )

                                                case 'tienda':
                                                    return (
                                                        <img
                                                            style={{
                                                                width: '100%',
                                                            }}
                                                            src={
                                                                customMarkerIconShop.src
                                                            }
                                                            alt="Marker Icon"
                                                        />
                                                    )

                                                case 'cebos':
                                                    return (
                                                        <img
                                                            style={{
                                                                width: '100%',
                                                            }}
                                                            src={
                                                                customMarkerIcon.src
                                                            }
                                                            alt="Marker Icon"
                                                        />
                                                    )

                                                case 'fotos':
                                                    return (
                                                        <img
                                                            style={{
                                                                width: '100%',
                                                            }}
                                                            src={
                                                                customMarkerIconPicture.src
                                                            }
                                                            alt="Marker Icon"
                                                        />
                                                    )
                                                default:
                                                    return null
                                            }
                                        })()}
                                    </Avatar>
                                </ListItemAvatar>

                                <ListItemText
                                    primaryTypographyProps={{ width: '200px' }}
                                    primary={
                                        marker.direction
                                            .charAt(0)
                                            .toUpperCase() +
                                        marker.direction.slice(1)
                                    }
                                    secondary={
                                        <>
                                            <Typography
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    fontWeight: 400,
                                                    wordWrap: 'break-word',
                                                }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {marker.description
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    marker.description.slice(1)}
                                            </Typography>
                                            <Typography
                                                component="span"
                                                sx={{
                                                    width: '100%',
                                                    fontWeight: 200,
                                                    fontSize: '0.8rem',
                                                }}
                                            >
                                                {marker.markerType
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    marker.markerType.slice(1)}
                                            </Typography>
                                        </>
                                    }
                                />
                            </ListItem>
                        </React.Fragment>
                    ))}
                {activeView === 'capturas' && (
                    <React.Fragment>
                        <ImageList
                            sx={{
                                maxWidth: '600px',
                                minWidth: '300px',
                                height: '100%',
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                                marginBottom: '2rem',
                            }}
                            cols={2}
                            rowHeight={150}
                        >
                            {userMarkers.length === 0 && (
                                <Typography
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        marginTop: '2rem',
                                        color: '#49007a',
                                        flexDirection: 'column',
                                        textAlign: 'center',
                                    }}
                                    variant="h6"
                                    gutterBottom
                                >
                                    No tiene capturas
                                </Typography>
                            )}
                            {userMarkers.map(
                                item =>
                                    item.markerType === 'fotos' && (
                                        <React.Fragment key={item.id}>
                                            {' '}
                                            {/* Agregar el atributo key aquí */}
                                            <ImageListItem>
                                                <img
                                                    style={{
                                                        width: '150px',
                                                        height: '150px',
                                                    }}
                                                    src={`${item.picture}?w=164&h=164&fit=crop&auto=format`}
                                                    srcSet={`${item.picture}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                    loading="lazy"
                                                    onClick={() =>
                                                        handleOpenModal(item)
                                                    }
                                                />
                                                <IconButton
                                                    style={{ padding: 0 }}
                                                >
                                                    <FavoriteBorderIcon
                                                        style={{
                                                            color: 'white',
                                                            position:
                                                                'absolute',
                                                            display: 'flex',
                                                            bottom: '10px',
                                                            right: '10px',
                                                        }}
                                                    />
                                                </IconButton>
                                            </ImageListItem>
                                        </React.Fragment>
                                    )
                            )}
                        </ImageList>
                    </React.Fragment>
                )}
                <Dialog open={openModal} onClose={handleCloseModal}>
                    <img
                        style={{
                            width: '100%',
                            height: 'auto',
                            maxHeight: '80vh',
                        }}
                        src={selectedImage}
                        alt="Selected Image"
                    />
                </Dialog>
                <SimpleBottomNavigation />
            </MainContainer>
        </>
    )
}

export default memo(Page)
