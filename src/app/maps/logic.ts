import { useRef, useState } from 'react'
import customMarkerIcon from '../../assets/anzuelo.png'
import customMarkerIconShop from '../../assets/tienda.png'
import customMarkerIconPlace from '../../assets/destino.png'
import customMarkerIconPicture from '../../assets/back-camera.png'
import { defaultStylesMaps, stylesMaps } from './style'
import { shopsListID } from '../feed/data'
import { useJsApiLoader } from '@react-google-maps/api'
import { toast } from 'react-toastify'
import { Style, User, UserMarker } from './type'
import { useMediaQuery } from 'react-responsive'

export const useLogicMaps = () => {
    const addUserMarker = async (userMark: UserMarker) => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch('/api/markers/marker', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
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
    }

    const [currentUser, setCurrentUser] = useState<User | null>(null)

    const getUserInfo = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch('/api/user/userData', {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
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
    }

    const getAllMarkersUser = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch('/api/markers/getMarkers', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
            })
            if (response.ok) {
                const data = await response.json()
                setUserMarkers(data.markers)
                setConfirmedMarkers(true)
            } else {
                throw new Error('Error en la respuesta del servidor')
            }
        } catch (error) {
            console.error('Error al enviar el objeto:', error)
        }
    }

    const fetchMarkerUser = async () => {
        try {
            const userId = dataMarkerUser.id
            const token = localStorage.getItem('token')
            const response = await fetch(`/api/markers/user?userId=${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Agregar el token al header 'Authorization'
                },
            })
            const data = await response.json()
            setMarkerCreator(data.user)
        } catch (error) {
            console.error('Error al obtener el usuario del marcador:', error)
        }
    }

    enum MarkerType {
        SHOP = 'tienda',
        WORM = 'cebos',
        PESQUERO = 'pesquero',
        PICTURES = 'fotos',
    }

    // Carga el API de Google Maps utilizando el hook useJsApiLoader.
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.API_KEY || '',
    })

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

    const [dataMarkerUser, setDataMarkerUser] = useState({
        id: '',
        positionMarkerUser: positionMarkerUser,
        direction: direccion,
        markerType: tipoLugar,
        description: descripcion,
        picture: fotos,
    })
    const [modalUserMarker, setModalUserMarker] = useState(false)
    const [loadingLocation, setLoadingLocation] = useState(false)
    const [markerCreator, setMarkerCreator] = useState<User | null>(null)
    const isSmallScreen = useMediaQuery({ maxWidth: 360 })
    const [locationModal, setLocationModal] = useState<
    google.maps.LatLngLiteral | undefined
    >(undefined)

    const selectMapStyle = () => {
        if (typeof window !== 'undefined' && mapRef.current) {
            mapRef.current.setOptions({
                styles: styledMap ? defaultStylesMaps : stylesMaps,
            })
            setStyledMap(!styledMap)
        }
    }

    // Función para abrir el modo de "Añadir a marcadores"

    const openAddMarkerMode = () => {
        if (mapRef.current) {
            setIsButtonDisabled(true) // Deshabilita el botón
            setFloatMarker(true)
        }
    }

    const addMarkerDraggable = async (map: google.maps.Map) => {
        const centerLatLng = map.getCenter()
        const position = {
            lat: centerLatLng?.lat(),
            lng: centerLatLng?.lng(),
        }

        if (position.lat !== undefined && position.lng !== undefined) {
            setpositionMarkerUser(position)
        }
    }

    // Función para confirmar el marcador
    const confirmMarker = async (
        location:
        | google.maps.LatLngLiteral
        | { lat: number | undefined; lng: number | undefined }
        | undefined,
        direction: string,
        markerType: string,
        description: string,
        picture: string | null,
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
        notifyMarker()
    }

    const handlerConfirmation = () => {
        setFloatMarker(false)
        setAddingMarker(true)
        if (mapRef.current && isLoaded) {
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

    const notifySucces = () => {
        toast.success('Ubicación cargada correctamente', {
            position: toast.POSITION.TOP_LEFT,
            toastId: 'success1',
        })
    }

    const notifyMarker = () => {
        toast.success('Marcador añadido correctamente', {
            position: toast.POSITION.TOP_LEFT,
            toastId: 'marker1',
        })
    }

    const handleCloseModal = () => {
        setAddingMarker(false)
        setIsButtonDisabled(false)
    }

    const handleCloseLugar = () => {
        setFloatMarker(false)
        setIsButtonDisabled(false)
    }

    const openModal = (place: any) => {
        console.log(place)
        setPlace(place)
        setModalIsOpen(true)
    }

    const closeModal = () => {
        setModalIsOpen(false)
    }

    return {
        notifySucces,
        styledMap,
        selectMapStyle,
        mapRef,
        shopsListID,
        notifyMarker,
        confirmMarker,
        openAddMarkerMode,
        currentLocationMarker,
        setCurrentLocationMarker,
        addingMarker,
        isButtonDisabled,
        setIsButtonDisabled,
        style,
        setStyle,
        isLoaded,
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
        fetchMarkerUser,
        markerCreator,
        isSmallScreen,
        locationModal,
        currentUser,
        getUserInfo
    }
}
