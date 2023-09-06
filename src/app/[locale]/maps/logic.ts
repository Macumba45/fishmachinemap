import { useCallback, useRef, useState } from 'react'
import customMarkerIcon from '../../../assets/anzuelo.png'
import customMarkerIconShop from '../../../assets/tienda.png'
import customMarkerIconPlace from '../../../assets/destino.png'
import customMarkerIconPicture from '../../../assets/back-camera.png'
import customMarkerIconAlgas from '../../../assets/algas.png'
import { defaultStylesMaps, stylesMaps } from './style'
import { Style, User, UserMarker } from './type'
import { useMediaQuery } from 'react-responsive'
import { MarkerType } from './type'
import { getAuthenticatedToken } from '@/lib/storage/storage'

export const useLogicMaps = () => {
    const addUserMarker = useCallback(async (userMark: UserMarker) => {
        try {
            const token = getAuthenticatedToken()
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Agregar el token al header 'Authorization'
            }
            const response = await fetch('/api/markers/marker', {
                method: 'POST',
                headers,
                body: JSON.stringify(userMark),
            })
            if (response.ok) {
                await response.json()
            } else {
                throw new Error('Error en la respuesta del servidor')
            }
        } catch (error) {
            console.error('Error al enviar el objeto:', error)
        }
    }, [])

    const getUserInfo = useCallback(async () => {
        try {
            const token = getAuthenticatedToken()
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Agregar el token al header 'Authorization'
            }
            if (!token) return setCurrentUser(null)
            const response = await fetch('/api/user/userData', {
                method: 'GET',
                headers,
            })
            if (response.ok) {
                const data = await response.json()
                setCurrentUser(data.user)
            } else {
                throw new Error('Error en la respuesta del servidor')
            }
        } catch (error) {
            console.error('Error al enviar el objeto:', error)
        }
    }, [])

    const getAllMarkersUser = useCallback(async () => {
        try {
            const token = getAuthenticatedToken()
            const userId = token
                ? JSON.parse(atob(token.split('.')[1])).userId
                : ''

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Agregar el token al header 'Authorization'
            }
            const response = await fetch('/api/markers/getMarkers', {
                method: 'GET',
                headers,
            })
            if (response.ok) {
                const data = await response.json()
                await getUserInfo()
                const likeMarkers = data.markers.map((marker: any) => {
                    const isLiked = marker.likes.some(
                        (like: any) =>
                            like.userId === (currentUser?.id as string)
                    )
                    return {
                        ...marker,
                        isLiked,
                    }
                })
                const likedMarkerStates = likeMarkers.reduce(
                    (states: any, marker: any) => {
                        const isLiked = marker.likes.some(
                            (like: any) => like.userId === userId
                        )
                        states[marker.id] = isLiked
                        return states
                    },
                    {}
                )
                setLikedMarkers(likedMarkerStates)
                setUserMarkers(data.markers)
                setConfirmedMarkers(true)
            } else {
                throw new Error('Error en la respuesta del servidor')
            }
        } catch (error) {
            console.error('Error al enviar el objeto:', error)
        }
    }, [])

    const [likedMarkers, setLikedMarkers] = useState<Record<string, boolean>>(
        {}
    )

    const fetchLikesMarkers = useCallback(
        async (markerId: string, userId: string) => {
            try {
                const token = getAuthenticatedToken()
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
                const response = await fetch('/api/feed/toogleLike', {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({
                        markerId: markerId,
                    }),
                })
                const data = await response.json()
                // Verificar si el usuario ha dado like al marcador
                const isLiked = data.isLiked // Accede directamente a la propiedad isLiked de data
                // Actualizar el estado del corazón para este marcador individualmente
                setLikedMarkers(prevState => ({
                    ...prevState,
                    [markerId]: isLiked,
                }))
                getAllMarkersUser()
                return data.marker
            } catch (error: any) {
                console.error('Error al obtener los marcadores:', error.message)
            }
        },
        [setLikedMarkers, getAllMarkersUser]
    )

    // Define los estados del componente.
    const [positionMarkerUser, setpositionMarkerUser] = useState<
    | google.maps.LatLngLiteral
    | {
        lat: number | undefined
        lng: number | undefined
    }
    >()
    const [loading, setLoading] = useState<boolean>(true)
    const [center] = useState<google.maps.LatLngLiteral>({
        lat: 40.463667 || undefined,
        lng: -3.74922 || undefined,
    })
    // Define los estados del componente.
    const mapRef = useRef<google.maps.Map>()
    const [addingMarker, setAddingMarker] = useState(false)
    const [currentLocationMarker, setCurrentLocationMarker] =
        useState<google.maps.Marker | null>(null)
    const [style, setStyle] = useState<Array<Style>>([])
    const [styledMap, setStyledMap] = useState(true)
    const [floatMarker, setFloatMarker] = useState(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const [direccion, setDireccion] = useState('')
    const [tipoLugar, setTipoLugar] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fotos, setFotos] = useState<string>('')
    const [confirmedMarkers, setConfirmedMarkers] = useState(false)
    const [userMarkers, setUserMarkers] = useState<UserMarker[]>([])
    const [place, setPlace] = useState<google.maps.places.PlaceResult | null>(
        null
    )
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [isButtonDisabledPlaces, setIsButtonDisabledPlaces] = useState(false)

    const [dataMarkerUser, setDataMarkerUser] = useState<UserMarker>({
        id: '',
        location: positionMarkerUser as google.maps.LatLngLiteral,
        direction: direccion,
        markerType: tipoLugar,
        description: descripcion,
        picture: fotos,
        user: {
            id: '',
            name: '',
            email: '',
            picture: '',
        },
    })
    const [modalUserMarker, setModalUserMarker] = useState(false)
    const [loadingLocation, setLoadingLocation] = useState(false)
    const isSmallScreen = useMediaQuery({ maxWidth: 360 })
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [filteredMarkers, setFilteredMarkers] =
        useState<UserMarker[]>(userMarkers)

    const [openDetailModal, setOpenDetailModal] = useState(false)
    const handleMarkerClick = (marker: any) => {
        setDataMarkerUser(marker)
        setOpenDetailModal(true)
    }

    // Función para obtener el ícono del marcador según el tipo de marcador.
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

    const handleToogleLikeModal = async () => {
        // Perform like/unlike action here
        await fetchLikesMarkers(
            dataMarkerUser?.id as string,
            currentUser?.id as string
        )
        // Actualizar el estado del corazón en tiempo real
        setLikedMarkers(prevState => ({
            ...prevState,
            [dataMarkerUser.id as string]:
                !prevState[dataMarkerUser.id as string],
        }))
    }

    const handleShareOnFacebook = (userId: string) => {
        const feedUrl = `https://fishgramapp.vercel.app/feed/${userId}` // Reemplaza con la URL real del feed
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            feedUrl
        )}`
        window.open(url, '_blank')
    }

    const handleShareOnWhatsApp = (userId: string) => {
        const feedUrl = `https://fishgramapp.vercel.app/feed/${userId}` // Reemplaza con la URL real del feed
        const url = `https://wa.me/?text=${encodeURIComponent(feedUrl)}`
        window.open(url, '_blank')
    }

    const [openModalBadged, setOpenModalBadged] = useState(false)

    const openModalBadge = () => {
        setOpenModalBadged(true)
    }

    const closeModalBadge = () => {
        setOpenModalBadged(false)
    }

    const OneMonthInMiliSeconds = 2592000000
    const OneWeekInMillis = 7 * 24 * 60 * 60 * 1000 // Una semana en milisegundos

    const now = new Date()
    const oneWeekAgo = new Date(now.getTime() - OneMonthInMiliSeconds)
    const oneWeekAgoNew = new Date(now.getTime() - OneWeekInMillis)

    const newMarkers = userMarkers.filter(marker => {
        const markerCreatedAt = new Date(marker.createdAt as string)
        return markerCreatedAt >= oneWeekAgo
    })
    const badgeNewMarkers = newMarkers.filter(
        (marker: any) => new Date(marker.createdAt) >= oneWeekAgoNew
    )

    const [selectedMarkers, setSelectedMarkers] = useState<
    google.maps.Marker[]
    >([])

    const [markersSmallModal, markersSetSmallModal] =
        useState<UserMarker[]>(userMarkers)

    const [locationUser, setLocationUser] =
        useState<google.maps.LatLngLiteral>()

    const selectMapStyle = useCallback(() => {
        if (typeof window !== 'undefined' && mapRef.current) {
            mapRef.current.setOptions({
                styles: styledMap ? defaultStylesMaps : stylesMaps,
            })
            setStyledMap(!styledMap)
        }
    }, [styledMap])

    // Función para abrir el modo de "Añadir a marcadores"

    const openAddMarkerMode = useCallback(() => {
        if (mapRef.current) {
            setIsButtonDisabled(true) // Deshabilita el botón
            setFloatMarker(true)
        }
    }, [])

    const addMarkerDraggable = useCallback(async (map: google.maps.Map) => {
        const centerLatLng = map.getCenter()
        const position = {
            lat: centerLatLng?.lat(),
            lng: centerLatLng?.lng(),
        }

        if (position.lat !== undefined && position.lng !== undefined) {
            setpositionMarkerUser(position)
        }
    }, [])

    // Función para confirmar el marcador
    const confirmMarker = useCallback(
        async (
            location:
            | google.maps.LatLngLiteral
            | { lat: number | undefined; lng: number | undefined }
            | undefined,
            direction: string,
            markerType: string,
            description: string,
            picture: string | null
        ) => {
            const latLng: google.maps.LatLngLiteral = {
                lat: location?.lat || 0,
                lng: location?.lng || 0,
            }

            const nuevoMarcador = {
                direction,
                markerType,
                description,
                picture,
                location: {
                    lat: latLng.lat,
                    lng: latLng.lng,
                },
            }

            await addUserMarker(nuevoMarcador)
            setAddingMarker(false)
            setIsButtonDisabled(false)
        },
        []
    )

    const handlerConfirmation = () => {
        setFloatMarker(false)
        setAddingMarker(true)
        if (mapRef.current) {
            addMarkerDraggable(mapRef.current)
        }
    }

    // Función para obtener la URL del ícono del marcador según el tipo.
    function getIcon(selectIcon: string): google.maps.Icon {
        let icon: google.maps.Icon
        let iconType: any

        switch (selectIcon) {
            case MarkerType.SHOP:
                icon = {
                    url: customMarkerIconShop.src,
                    scaledSize: new google.maps.Size(32, 32),
                }
                break
            case MarkerType.WORM:
                icon = {
                    url: customMarkerIcon.src,
                    scaledSize: new google.maps.Size(32, 32),
                }
                break
            case MarkerType.SPOT:
                icon = {
                    url: customMarkerIconPlace.src,
                    scaledSize: new google.maps.Size(32, 32),
                }
                break
            case MarkerType.PICTURES:
                icon = {
                    url: customMarkerIconPicture.src,
                    scaledSize: new google.maps.Size(32, 32),
                }
                break
            case MarkerType.ALGAS:
                icon = {
                    url: customMarkerIconAlgas.src,
                    scaledSize: new google.maps.Size(32, 32),
                }
                break
            default:
                icon = {
                    url: customMarkerIcon.src,
                    scaledSize: new google.maps.Size(32, 32),
                }
        }
        return icon
    }

    const handleCloseModal = useCallback(() => {
        setAddingMarker(false)
        setIsButtonDisabled(false)
    }, [])

    const handleCloseLugar = useCallback(() => {
        setFloatMarker(false)
        setIsButtonDisabled(false)
    }, [])

    const openModal = useCallback((place: any) => {
        setPlace(place)
        setModalIsOpen(true)
    }, [])

    const closeModal = useCallback(() => {
        setModalIsOpen(false)
    }, [])

    const [openModalComments, setOpenModalComments] = useState(false)

    const handleOpenModalComments = useCallback(() => {
        setOpenModalComments(true)
    }, [])

    const handleCloseModalComments = useCallback(() => {
        setOpenModalComments(false)
    }, [])

    return {
        styledMap,
        selectMapStyle,
        mapRef,
        confirmMarker,
        openAddMarkerMode,
        currentLocationMarker,
        setCurrentLocationMarker,
        addingMarker,
        isButtonDisabled,
        setIsButtonDisabled,
        style,
        setStyle,
        loading,
        setLoading,
        center,
        positionMarkerUser,
        floatMarker,
        setFloatMarker,
        handlerConfirmation,
        direccion,
        setDireccion,
        tipoLugar,
        setTipoLugar,
        descripcion,
        setDescripcion,
        fotos,
        setFotos,
        setAddingMarker,
        getAllMarkersUser,
        userMarkers,
        confirmedMarkers,
        setConfirmedMarkers,
        handleCloseModal,
        handleCloseLugar,
        place,
        modalIsOpen,
        setPlace,
        setModalIsOpen,
        openModal,
        closeModal,
        isButtonDisabledPlaces,
        setIsButtonDisabledPlaces,
        getIcon,
        modalUserMarker,
        setModalUserMarker,
        setDataMarkerUser,
        dataMarkerUser,
        loadingLocation,
        setLoadingLocation,
        isSmallScreen,
        currentUser,
        getUserInfo,
        MarkerType,
        filteredMarkers,
        setFilteredMarkers,
        openModalComments,
        handleOpenModalComments,
        handleCloseModalComments,
        likedMarkers,
        fetchLikesMarkers,
        setLikedMarkers,
        handleToogleLikeModal,
        handleShareOnFacebook,
        handleShareOnWhatsApp,
        badgeNewMarkers,
        openModalBadge,
        closeModalBadge,
        openDetailModal,
        setOpenDetailModal,
        openModalBadged,
        handleMarkerClick,
        selectedMarkers,
        setSelectedMarkers,
        markersSmallModal,
        markersSetSmallModal,
        locationUser,
        setLocationUser,
        goToMarkerUserLocation,
        oneWeekAgoNew,
        newMarkers,
    }
}
