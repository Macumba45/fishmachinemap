'use client'

import { FC, memo, useCallback, useEffect, useState } from 'react'
import React from 'react'
import { feedUseLogic } from '../logic'
import AccountMenu from '@/components/Menu'
import RoomIcon from '@mui/icons-material/Room'
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel'
import ModalUserMarkers from '@/components/ModalMarkersUser'
import AddCommentIcon from '@mui/icons-material/AddComment'
import { UserMarker } from '@/app/maps/type'
import CommentModal from '@/components/ModalComments'
import FavoriteIcon from '@mui/icons-material/Favorite'
import SimpleBottomNavigation from '@/components/BottomNav'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import {
    Avatar,
    Button,
    ButtonGroup,
    Divider,
    ImageList,
    ImageListItem,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from '@mui/material'
import {
    ContainerMenu,
    LabelIcons,
    MainContainer,
    UserContainerData,
    nameStyles,
} from './style'
import { Store } from '@/app/store/type'
import { BlaBlaFish } from '@/app/blablafish/type'

interface Props {
    params: {
        user: string
    }
}

const Page: FC<Props> = ({ params }) => {
    const { userInfoFeed, dataFeedUser, userMarkers, blablaFish, userStores } =
        feedUseLogic()

    const [activeView, setActiveView] = useState('capturas')
    const [width, setWidth] = useState<number>(0)
    const [selectedImage, setSelectedImage] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const [openModalComments, setOpenModalComments] = useState(false)
    const [selectedMarkerId, setSelectedMarkerId] = useState(null) // Estado para almacenar el ID del marcador seleccionado
    const fotosMarkers = userMarkers.filter(item => item.markerType === 'fotos')

    const handleOpenModal = useCallback((item: any) => {
        setSelectedImage(item.picture)
        setSelectedMarkerId(item.id)
        setOpenModal(true)
    }, [])

    const handleCloseModal = useCallback(() => {
        setOpenModal(false)
    }, [])

    const handleViewChange = useCallback((view: any) => {
        setActiveView(view)
    }, [])

    const handleOpenModalComments = useCallback(() => {
        setOpenModalComments(true)
    }, [])

    const handleCloseModalComments = useCallback(() => {
        setOpenModalComments(false)
    }, [])

    const goToMarkerUserLocation = useCallback(
        (location: { lat: number; lng: number } | undefined) => {
            if (location) {
                const baseUrl =
                    'https://www.google.com/maps/search/?api=1&query='
                const encodedCoordinates = encodeURIComponent(
                    `${location.lat},${location.lng}`
                )
                window.open(baseUrl + encodedCoordinates)
            }
        },
        []
    )

    // Función de utilidad para formatear la fecha
    function formatDate(date: Date) {
        return date.toLocaleDateString('es-ES', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
        })
    }

    // Función para capitalizar la primera letra
    function capitalizeFirstLetter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

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

    useEffect(() => {
        const handleScroll = (event: Event) => {
            event.preventDefault()
        }

        document.body.style.overflow = ''
        document.removeEventListener('scroll', handleScroll)

        return () => {
            // Permitir el desplazamiento cuando se desmonta el componente
            document.body.style.overflow = ''
            document.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <>
            <ContainerMenu>
                <AccountMenu userPicture={dataFeedUser?.picture} />
            </ContainerMenu>
            <MainContainer>
                <UserContainerData>
                    <Avatar
                        sx={{
                            width: 100,
                            height: 100,
                            marginTop: '2rem',
                            marginBottom: '1rem',
                        }}
                        src={dataFeedUser?.picture}
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
                                onClick={() => handleViewChange('stores')}
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
                {activeView === 'blablafish' && blablaFish.length === 0 && (
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
                    blablaFish.map((blabla: BlaBlaFish) => (
                        <React.Fragment key={blabla.id}>
                            <ListItem
                                sx={{
                                    width: width,
                                    display: 'flex',
                                    alignItems: 'center',
                                    minWidth: 200,
                                    maxWidth: 600,
                                }}
                                alignItems="flex-start"
                            >
                                <div>
                                    <img
                                        key={blabla.id}
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '30px',
                                            marginRight: '1.5rem',
                                            objectFit: 'cover',
                                        }}
                                        src="https://www.a-alvarez.com/img/ybc_blog/post/surfcasting-lanzar-mas.jpg"
                                    />
                                </div>

                                <ListItemText
                                    primaryTypographyProps={{ width: '220px' }}
                                    primary={capitalizeFirstLetter(
                                        formatDate(new Date(blabla.date))
                                    )}
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
                                                {blabla.description
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    blabla.description.slice(1)}
                                            </Typography>
                                            <Typography
                                                component="span"
                                                sx={{
                                                    width: '100%',
                                                    fontWeight: 200,
                                                    fontSize: '0.8rem',
                                                    alignItems: 'center',
                                                    display: 'flex',
                                                    color: '#49007a',
                                                }}
                                            >
                                                {blabla.departureCity
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    blabla.departureCity.slice(
                                                        1
                                                    )}
                                                {<ArrowRightAltIcon />}
                                                {blabla.arrivalCity
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    blabla.arrivalCity.slice(1)}
                                            </Typography>
                                        </>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="hr" />
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
                            {userMarkers.map(item => (
                                <ImageListItem key={item.id}>
                                    <img
                                        style={{
                                            width: '150px',
                                            height: '150px',
                                        }}
                                        src={`${item.picture}?w=164&h=164&fit=crop&auto=format`}
                                        srcSet={`${item.picture}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                        loading="lazy"
                                        onClick={() => handleOpenModal(item)}
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </React.Fragment>
                )}
                {userMarkers
                    .filter(marker => marker.id === selectedMarkerId) // Filtrar el marcador seleccionado
                    .map(marker => (
                        <React.Fragment key={marker.id}>
                            <ModalUserMarkers
                                isOpen={openModal}
                                key={marker.id}
                                description={marker.description}
                                pictures={marker.picture as string}
                                direction={marker.direction}
                                onClose={handleCloseModal}
                                onClick={() => {
                                    const location: google.maps.LatLngLiteral =
                                        {
                                            lat: marker.location?.lat,
                                            lng: marker.location?.lng,
                                        }
                                    goToMarkerUserLocation(location)
                                }}
                                icon={
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <AddCommentIcon
                                            sx={{
                                                color: '#49007a',
                                                cursor: 'pointer',
                                                marginRight: 1,
                                            }}
                                            onClick={handleOpenModalComments}
                                        />
                                        <LabelIcons>
                                            {marker.comments?.length}{' '}
                                            Comentarios
                                        </LabelIcons>
                                    </div>
                                }
                                icon2={
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <FavoriteIcon
                                            sx={{
                                                color: '#49007a',
                                                marginRight: 1,
                                            }}
                                        />
                                        <LabelIcons>
                                            {marker.likes?.length} Likes
                                        </LabelIcons>
                                    </div>
                                }
                            />
                            <CommentModal
                                open={openModalComments}
                                id={marker.id as string}
                                onClose={handleCloseModalComments}
                            />
                        </React.Fragment>
                    ))}

                {activeView === 'stores' && userStores.length === 0 && (
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
                        No tiene productos en Venta
                    </Typography>
                )}

                {activeView === 'stores' &&
                    userStores.map((store: Store) => (
                        <React.Fragment key={store.id}>
                            <ListItem
                                sx={{
                                    width: width,
                                    display: 'flex',
                                    alignItems: 'center',
                                    minWidth: 200,
                                    maxWidth: 600,
                                }}
                                alignItems="flex-start"
                            >
                                <div>
                                    <img
                                        key={store.id}
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '30px',
                                            marginRight: '1.5rem',
                                            objectFit: 'cover',
                                        }}
                                        src={store.picture as string}
                                    />
                                </div>

                                <ListItemText
                                    primaryTypographyProps={{ width: '220px' }}
                                    primary={store.title}
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
                                                {store.description
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    store.description.slice(1)}
                                            </Typography>
                                            <Typography
                                                component="span"
                                                sx={{
                                                    width: '100%',
                                                    fontWeight: 200,
                                                    fontSize: '0.8rem',
                                                    alignItems: 'center',
                                                    display: 'flex',
                                                    color: '#49007a',
                                                }}
                                            >
                                                {store.price}€
                                            </Typography>
                                        </>
                                    }
                                />
                            </ListItem>
                        </React.Fragment>
                    ))}
                <SimpleBottomNavigation />
            </MainContainer>
        </>
    )
}

export default memo(Page)
