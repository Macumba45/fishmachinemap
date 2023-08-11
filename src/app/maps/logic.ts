import { useCallback, useRef, useState } from 'react'
import customMarkerIcon from '../../assets/anzuelo.png'
import customMarkerIconShop from '../../assets/tienda.png'
import customMarkerIconPlace from '../../assets/destino.png'
import customMarkerIconPicture from '../../assets/back-camera.png'
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
                setUserMarkers(data.markers)
                setConfirmedMarkers(true)
            } else {
                throw new Error('Error en la respuesta del servidor')
            }
        } catch (error) {
            console.error('Error al enviar el objeto:', error)
        }
    }, [])

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
        },
    })
    const [modalUserMarker, setModalUserMarker] = useState(false)
    const [loadingLocation, setLoadingLocation] = useState(false)
    const isSmallScreen = useMediaQuery({ maxWidth: 360 })
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [filteredMarkers, setFilteredMarkers] =
        useState<UserMarker[]>(userMarkers)

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
            case MarkerType.PESQUERO:
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
    }
}
