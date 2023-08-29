'use client'

import { FC, useCallback, useEffect, useState, memo } from 'react'
import React from 'react'
import SimpleBottomNavigation from '@/components/BottomNav'
import { useLogicUser } from './logic'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import AccountMenu from '@/components/Menu'
import { UserMarker } from '../maps/type'
import { Delete, Edit } from '@mui/icons-material'
import DeleteMarkerModal from '@/components/DeletedModalMarker'
import ButtonComp from '@/components/Button'
import RoomIcon from '@mui/icons-material/Room'
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import AddCommentIcon from '@mui/icons-material/AddComment'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { BlaBlaFish } from '../blablafish/type'
import { Store } from '../store/type'
import ModalUserMarkers from '@/components/ModalMarkersUser'
import CommentModal from '@/components/ModalComments'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { useRouter } from 'next/navigation'
import {
    Button,
    ButtonGroup,
    IconButton,
    ImageList,
    ImageListItem,
} from '@mui/material'
import {
    Container,
    LabelIcons,
    MainContainer,
    UserContainerData,
    emailStyles,
    nameStyles,
} from './style'
import { getAuthenticatedToken } from '@/lib/storage/storage'

const Profile: FC = () => {
    const router = useRouter()
    useEffect(() => {
        const token = getAuthenticatedToken()

        if (!token && !user) {
            router.push('/auth/login') // Redirige al usuario a la página de inicio de sesión si no hay token
        }
    }, [])

    const {
        user,
        userMarkers,
        getUser,
        deleteUserMarkers,
        setToBeDeletedMarkers,
        toBeDeletedMarkers,
        noMarkers,
        width,
        setWidth,
        blablaFish,
        updateMarkerVisible,
        markerVisibility,
        setMarkerVisibility,
        deleteBlaBlaFish,
        toBeDeletedBlaBlaFish,
        setToBeDeletedBlaBlaFish,
        stores,
        userLikes,
        toBeDeletedStores,
        setToBeDeletedStores,
        deleteStore,
        uploadProfilePicture,
        picture,
        setPicture,
    } = useLogicUser()

    const [openModal, setOpenModal] = useState(false)
    const [selectedImage, setSelectedImage] = useState('')
    const [selectedMarkerId, setSelectedMarkerId] = useState(null) // Estado para almacenar el ID del marcador seleccionado
    const [openModalComments, setOpenModalComments] = useState(false)
    const [activeView, setActiveView] = useState('capturas')
    const fotosMarkers = userMarkers.filter(item => item.markerType === 'fotos')

    const goToMaps = useCallback(() => {
        window.location.href = '/maps'
    }, [])
    const handleViewChange = useCallback((view: any) => {
        setActiveView(view)
    }, [])

    const handleOpenModal = useCallback((item: any) => {
        setSelectedImage(item.picture)
        setSelectedMarkerId(item.id)
        setOpenModal(true)
    }, [])

    const handleCloseModal = useCallback(() => {
        setOpenModal(false)
    }, [])

    const handleOpenModalComments = useCallback(() => {
        setOpenModalComments(true)
    }, [])

    const handleCloseModalComments = useCallback(() => {
        setOpenModalComments(false)
    }, [])

    const handleVisibilityToggle = useCallback(async (markerId: string) => {
        try {
            // Lógica para actualizar la visibilidad del marcador en el servidor
            await updateMarkerVisible(markerId)

            // Actualiza el estado local para reflejar la nueva visibilidad
            setMarkerVisibility(prevState => ({
                ...prevState,
                [markerId]: !prevState[markerId],
            }))
        } catch (error: any) {
            console.error(
                'Error al actualizar la visibilidad del marcador:',
                error.message
            )
        }
    }, [])

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
        getUser()
    }, [toBeDeletedMarkers, toBeDeletedBlaBlaFish, toBeDeletedStores])

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

    const getBase64FromUrl = async (url: string) => {
        const data = await fetch(url)
        const blob = await data.blob()
        return new Promise<string>(resolve => {
            const reader = new FileReader()
            reader.readAsDataURL(blob)
            reader.onloadend = () => {
                const base64data = reader.result as string
                resolve(base64data)
            }
        })
    }

    const handleFotosChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = event.target.files
        if (files && files.length > 0) {
            const file = files[0]

            // Reducir el tamaño de la imagen antes de convertirla a Base64
            const resizedFile = await resizeImage(file, {
                maxWidth: 1024,
                maxHeight: 1024,
            })

            const fileUrl = URL.createObjectURL(resizedFile)
            const base64Data = await getBase64FromUrl(fileUrl)
            setPicture(base64Data) // Guarda la imagen en formato Base64 en el estado
            uploadProfilePicture(base64Data)
        }
    }

    const resizeImage = (
        file: File,
        options: { maxWidth: number; maxHeight: number }
    ) => {
        return new Promise<File>(resolve => {
            const img = new Image()
            img.src = URL.createObjectURL(file)

            img.onload = () => {
                const { width, height } = img
                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d')
                canvas.width = options.maxWidth
                canvas.height = options.maxHeight

                const scaleFactor = Math.min(
                    options.maxWidth / width,
                    options.maxHeight / height
                )
                canvas.width = width * scaleFactor
                canvas.height = height * scaleFactor

                ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)
                canvas.toBlob(resizedBlob => {
                    if (resizedBlob) {
                        const resizedFile = new File([resizedBlob], file.name, {
                            type: file.type,
                        })
                        resolve(resizedFile)
                    } else {
                        resolve(file)
                    }
                }, file.type)
            }
        })
    }

    return (
        <>
            <Container>
                <AccountMenu userPicture={user?.picture} />
            </Container>
            <MainContainer>
                <UserContainerData>
                    {user?.picture ? (
                        <Avatar
                            sx={{ width: 100, height: 100, marginTop: '2rem' }}
                            src={user?.picture}
                        />
                    ) : (
                        <>
                            <Avatar
                                sx={{
                                    width: 100,
                                    height: 100,
                                    marginTop: '2rem',
                                }}
                            >
                                <label htmlFor="upload-input">
                                    <CloudUploadIcon fontSize="large" />
                                </label>
                                <input
                                    id="upload-input"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFotosChange}
                                    style={{ display: 'none' }}
                                />
                            </Avatar>
                            {/* <button onClick={() => uploadProfilePicture(picture)}>
                                subir
                            </button> */}
                        </>
                    )}

                    <Typography
                        style={{
                            textAlign: 'center',
                            ...nameStyles,
                        }}
                        variant="h6"
                        gutterBottom
                    >
                        {user?.name}
                    </Typography>
                    <Typography
                        style={{
                            textAlign: 'center',
                            ...emailStyles,
                        }}
                        variant="h6"
                        gutterBottom
                    >
                        {user?.email}
                    </Typography>
                </UserContainerData>

                {noMarkers && (
                    <>
                        <ButtonComp
                            title="Añade tu primer marcador"
                            variant="contained"
                            color="#49007a"
                            style={{
                                marginTop: '2rem',
                                backgroundColor: '#49007a',
                            }}
                            onClick={goToMaps}
                        />
                    </>
                )}
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
                            <Button
                                sx={{
                                    backgroundColor: '#49007a',
                                    '&:hover': { backgroundColor: '#7900ca' },
                                }}
                                onClick={() => handleViewChange('likes')}
                            >
                                <FavoriteIcon />
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
                        No tienes marcadores
                    </Typography>
                )}

                {activeView === 'userMarkers' &&
                    userMarkers.map((marker: UserMarker) => (
                        <React.Fragment key={marker.id}>
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
                                        key={marker.id}
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '30px',
                                            marginRight: '1.5rem',
                                            objectFit: 'cover',
                                        }}
                                        src={marker.picture as string}
                                    />
                                </div>

                                <ListItemText
                                    primaryTypographyProps={{ width: '220px' }}
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
                                <IconButton
                                    onClick={() =>
                                        setToBeDeletedMarkers(prevState => ({
                                            ...prevState,
                                            [marker.id as string]: true,
                                        }))
                                    }
                                    edge="end"
                                    aria-label="delete"
                                >
                                    <Delete />
                                </IconButton>
                                <IconButton
                                    // onClick={() => setToBeDeletedMarker(true)}
                                    edge="end"
                                    aria-label="edit"
                                >
                                    <Edit />
                                </IconButton>

                                <IconButton
                                    key={`marker-${marker.id}`} // Add a unique identifier to the key prop
                                    edge="end"
                                    aria-label="toggle-visibility"
                                    onClick={() =>
                                        handleVisibilityToggle(
                                            marker.id as string
                                        )
                                    }
                                >
                                    {markerVisibility[marker.id as string] ? (
                                        <VisibilityIcon />
                                    ) : (
                                        <VisibilityOffIcon />
                                    )}
                                </IconButton>
                            </ListItem>
                            <Divider variant="inset" component="hr" />
                            {marker.id && toBeDeletedMarkers[marker.id] && (
                                <>
                                    <DeleteMarkerModal
                                        key={marker.id}
                                        isOpen={toBeDeletedMarkers[marker.id]}
                                        onCancel={() =>
                                            setToBeDeletedMarkers(
                                                prevState => ({
                                                    ...prevState,
                                                    [marker.id as string]:
                                                        false,
                                                })
                                            )
                                        }
                                        onClick={() => {
                                            marker.id &&
                                                deleteUserMarkers(marker.id)
                                            setToBeDeletedMarkers(
                                                prevState => ({
                                                    ...prevState,
                                                    [marker.id as string]:
                                                        false,
                                                })
                                            )
                                        }}
                                    />
                                </>
                            )}
                        </React.Fragment>
                    ))}

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
                        No tienes BlaBlaFish
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
                                <IconButton
                                    onClick={() =>
                                        setToBeDeletedBlaBlaFish(prevState => ({
                                            ...prevState,
                                            [blabla.id as string]: true,
                                        }))
                                    }
                                    edge="end"
                                    aria-label="delete"
                                >
                                    <Delete />
                                </IconButton>
                                {/* <IconButton
                                    // onClick={() => setToBeDeletedMarker(true)}
                                    edge="end"
                                    aria-label="edit"
                                >
                                    <Edit />
                                </IconButton> */}
                            </ListItem>
                            <Divider variant="inset" component="hr" />
                            {blabla.id && toBeDeletedBlaBlaFish[blabla.id] && (
                                <>
                                    <DeleteMarkerModal
                                        key={blabla.id}
                                        isOpen={
                                            toBeDeletedBlaBlaFish[blabla.id]
                                        }
                                        onCancel={() =>
                                            setToBeDeletedBlaBlaFish(
                                                prevState => ({
                                                    ...prevState,
                                                    [blabla.id as string]:
                                                        false,
                                                })
                                            )
                                        }
                                        onClick={() => {
                                            blabla.id &&
                                                deleteBlaBlaFish(blabla.id)
                                            setToBeDeletedBlaBlaFish(
                                                prevState => ({
                                                    ...prevState,
                                                    [blabla.id as string]:
                                                        false,
                                                })
                                            )
                                        }}
                                    />
                                </>
                            )}
                        </React.Fragment>
                    ))}

                {activeView === 'stores' && stores.length === 0 && (
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
                        No tienes productos en Venta
                    </Typography>
                )}

                {activeView === 'stores' &&
                    stores.map((store: Store) => (
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
                                <IconButton
                                    onClick={() =>
                                        setToBeDeletedStores(prevState => ({
                                            ...prevState,
                                            [store.id as string]: true,
                                        }))
                                    }
                                    edge="end"
                                    aria-label="delete"
                                >
                                    <Delete />
                                </IconButton>
                                {/* <IconButton
                                    // onClick={() => setToBeDeletedMarker(true)}
                                    edge="end"
                                    aria-label="edit"
                                >
                                    <Edit />
                                </IconButton> */}
                            </ListItem>
                            <Divider variant="inset" component="hr" />
                            {store.id && toBeDeletedStores[store.id] && (
                                <>
                                    <DeleteMarkerModal
                                        key={store.id}
                                        isOpen={toBeDeletedStores[store.id]}
                                        onCancel={() =>
                                            setToBeDeletedStores(prevState => ({
                                                ...prevState,
                                                [store.id as string]: false,
                                            }))
                                        }
                                        onClick={() => {
                                            store.id && deleteStore(store.id)
                                            setToBeDeletedStores(prevState => ({
                                                ...prevState,
                                                [store.id as string]: false,
                                            }))
                                        }}
                                    />
                                </>
                            )}
                        </React.Fragment>
                    ))}
                {activeView === 'likes' && userLikes.length === 0 && (
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
                        No tienes favoritos
                    </Typography>
                )}

                {activeView === 'likes' && (
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
                            {userLikes.map(
                                item =>
                                    item.marker && (
                                        <ImageListItem key={item.id}>
                                            <img
                                                style={{
                                                    width: '150px',
                                                    height: '150px',
                                                }}
                                                src={`${item.marker.picture}?w=164&h=164&fit=crop&auto=format`}
                                                srcSet={`${item.marker.picture}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                loading="lazy"
                                                onClick={() =>
                                                    handleOpenModal(item.marker)
                                                }
                                            />
                                        </ImageListItem>
                                    )
                            )}
                        </ImageList>
                    </React.Fragment>
                )}
                {userLikes
                    .filter(marker => marker.marker.id === selectedMarkerId) // Filtrar el marcador seleccionado
                    .map(marker => (
                        <React.Fragment key={marker.id}>
                            <ModalUserMarkers
                                isOpen={openModal}
                                key={marker.id}
                                description={marker.marker.description}
                                pictures={marker.marker.picture as string}
                                direction={marker.marker.direction}
                                onClose={handleCloseModal}
                                onClick={() => {
                                    const location: google.maps.LatLngLiteral =
                                        {
                                            lat: marker.marker.location?.lat,
                                            lng: marker.marker.location?.lng,
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
                                            {marker.marker.comments?.length}{' '}
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
                                            {marker.marker.likes?.length} Likes
                                        </LabelIcons>
                                    </div>
                                }
                            />
                            <CommentModal
                                open={openModalComments}
                                id={marker.marker.id as string}
                                onClose={handleCloseModalComments}
                            />
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
                            {fotosMarkers.length === 0 && (
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
                                    No tienes capturas
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
            </MainContainer>
            <SimpleBottomNavigation />
        </>
    )
}

export default memo(Profile)
