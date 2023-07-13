import { useRef, useState } from 'react'
import { Marker, MarkerData, Style } from './type'
import { pictures, totalArray } from './data'
import { defaultStylesMaps, stylesMaps } from './style'
import { shopsListID } from '../feed/data'
import { useJsApiLoader } from '@react-google-maps/api'
import customMarkerIcon from '../../assets/anzuelo.png'
import customMarkerIconShop from '../../assets/tienda.png'
import customMarkerIconPlace from '../../assets/destino.png'
import customMarkerIconPicture from '../../assets/back-camera.png'
import MarkerUserIcon from '../../assets/location.png'
import { toast } from 'react-toastify'

export const useLogicMaps = () => {
    enum MarkerType {
        SHOP = 'shop',
        WORM = 'worm',
        ALL = 'all',
        PLACE = 'place',
        PICTURES = 'pictures',
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
    const [currentFilter, setCurrentFilter] = useState(MarkerType.ALL)
    const [markers, setMarkers] = useState<google.maps.Marker[]>([])
    const mapRef = useRef<google.maps.Map>()
    const [selectedMarker, setSelectedMarker] = useState<{
        id: number
        shop: string
        lat: number
        lng: number
        label: string
        address: string
    } | null>(null)
    const [addingMarker, setAddingMarker] = useState(false)
    const [confirmedMarkers, setConfirmedMarkers] = useState<Marker[]>([])

    const [currentLocationMarker, setCurrentLocationMarker] =
        useState<google.maps.Marker | null>(null)
    const [style, setStyle] = useState<Array<Style>>([])
    const [styledMap, setStyledMap] = useState(true)
    const [floatMarker, setFloatMarker] = useState(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const [address, setAddress] = useState('')

    const selectMapStyle = () => {
        if (typeof window !== 'undefined' && mapRef.current) {
            mapRef.current.setOptions({
                styles: styledMap ? defaultStylesMaps : stylesMaps,
            })
            setStyledMap(!styledMap)
        }
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

    // Función para obtener la URL del ícono del marcador según el tipo.
    function getIcon(selectIcon: string): string | undefined {
        let icon

        switch (selectIcon) {
            case MarkerType.SHOP:
                icon = customMarkerIconShop.src
                break
            case MarkerType.WORM:
                icon = customMarkerIcon.src
                break
            case MarkerType.PLACE:
                icon = customMarkerIconPlace.src
                break
            case MarkerType.PICTURES:
                icon = customMarkerIconPicture.src
                break
        }
        return icon
    }

    // Función para crear un marcador en el mapa.
    const createMarker = (markerData: MarkerData) => {
        const icon = {
            url: getIcon(markerData.shop),
            scaledSize: new google.maps.Size(32, 32),
        } as google.maps.Icon
        const marker = new google.maps.Marker({
            position: { lat: markerData.lat, lng: markerData.lng },
            clickable: true,
            cursor: 'pointer',
            opacity: 1,
            icon: icon,
            animation: window.google.maps.Animation.DROP, // Agregar la animación de "drop"
        })

        // Agrega un evento de clic al marcador.
        marker.addListener('click', () => {
            handleMarkerClick(markerData)
        })

        return marker
    }

    // Función para filtrar los marcadores según el tipo de filtro.
    const filterMarkers = (filter: MarkerType) => {
        let filteredMarkerInstances: google.maps.Marker[] = []
        if (filter === MarkerType.ALL) {
            filteredMarkerInstances = [...totalArray, ...pictures].map(
                createMarker
            )
        } else if (filter === MarkerType.SHOP) {
            filteredMarkerInstances = totalArray
                .filter(marker => marker.shop === 'shop')
                .map(createMarker)
        } else if (filter === MarkerType.WORM) {
            filteredMarkerInstances = totalArray
                .filter(marker => marker.shop === 'worm')
                .map(createMarker)
        } else if (filter === MarkerType.PLACE) {
            filteredMarkerInstances = totalArray
                .filter(marker => marker.shop === 'place')
                .map(createMarker)
        } else if (filter === MarkerType.PICTURES) {
            filteredMarkerInstances = pictures
                .filter(marker => marker.shop === 'pictures')
                .map(createMarker)
        }

        setMarkers(filteredMarkerInstances)
    }

    // Función para abrir el modo de "Añadir a marcadores"
    const [direccion, setDireccion] = useState('')
    const [tipoLugar, setTipoLugar] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fotos, setFotos] = useState<File[]>([])

    console.log(fotos)
    console.log(direccion)
    console.log(tipoLugar)
    console.log(descripcion)
    console.log(positionMarkerUser)

    const openAddMarkerMode = () => {
        if (mapRef.current) {
            setIsButtonDisabled(true) // Deshabilita el botón
            setFloatMarker(true)
        }
    }

    const addMarkerDraggable = (map: google.maps.Map) => {
        const geocoder = new google.maps.Geocoder()

        const centerLatLng = map.getCenter() // Obtener las coordenadas del centro del mapa
        const position = {
            lat: centerLatLng?.lat(),
            lng: centerLatLng?.lng(),
        }
        const { lat, lng } = position

        const geocodeRequest = {
            location: new google.maps.LatLng({
                lat: lat as number,
                lng: lng as number,
            }),
        }
        geocoder.geocode(geocodeRequest, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results && results.length > 0) {
                    const address = results[0].formatted_address
                    console.log(address)
                    setAddress(address)
                    // Aquí puedes utilizar la dirección obtenida como necesites
                }
            } else {
                console.log('Error en la geocodificación inversa:', status)
            }
        })
        const marker = new google.maps.Marker({
            position: centerLatLng, // Establecer el centro del mapa como posición del marcador
            map: map,
            icon: {
                url: MarkerUserIcon.src,
                scaledSize: new google.maps.Size(32, 32),
                anchor: new google.maps.Point(16, 16),
            },
            // draggable: true,
        }) as google.maps.Marker

        console.log(position)

        setpositionMarkerUser(position)

        // Agregar el nuevo marcador al estado de marcadores
        setMarkers(prevMarkers => [...prevMarkers, marker])

        // Evento para controlar el movimiento del marcador
        google.maps.event.addListener(marker, 'dragend', () => {
            // Acciones a realizar al soltar el marcador arrastrable
        })

        // Evento para controlar el click del marcador
        google.maps.event.addListener(marker, 'click', () => {
            // Acciones a realizar al hacer click en el marcador
        })

        // Aquí puedes realizar cualquier acción adicional con el marcador, como guardar su posición en un estado o enviarla al servidor.
    }

    // Función para confirmar el marcador
    const confirmMarker = (
        direccion: any,
        tipoLugar: any,
        descripcion: any,
        fotos: any
    ) => {
        const newMarker = {
            direccion,
            tipoLugar,
            descripcion,
            fotos,
            // Agrega aquí las demás propiedades requeridas por un objeto de tipo Marker
        }

        // Agregar el nuevo marcador al estado de marcadores confirmados
        setConfirmedMarkers(prevMarkers => [...prevMarkers, newMarker])
        setMarkers([...markers])
        setAddingMarker(false)
        setIsButtonDisabled(false)
        setFloatMarker(false)
        notifyMarker()
    }

    const handlerConfirmation = () => {
        setFloatMarker(false)
        setAddingMarker(true)
        addMarkerDraggable(mapRef.current as google.maps.Map)
    }

    // Maneja el cambio de filtro.
    const handleFilterChange = (newFilter: MarkerType) => {
        setCurrentFilter(newFilter)
    }

    // Maneja el clic en un marcador.
    const handleMarkerClick = (marker: MarkerData): void => {
        setSelectedMarker(marker)
    }

    // Cierra el modal.
    const closeModal = () => {
        setSelectedMarker(null)
    }

    return {
        currentFilter,
        markers,
        selectedMarker,
        notifySucces,
        filterMarkers,
        handleFilterChange,
        handleMarkerClick,
        closeModal,
        styledMap,
        selectMapStyle,
        mapRef,
        shopsListID,
        notifyMarker,
        confirmMarker,
        openAddMarkerMode,
        currentLocationMarker,
        confirmedMarkers,
        setConfirmedMarkers,
        setCurrentLocationMarker,
        addingMarker,
        isButtonDisabled,
        style,
        setStyle,
        isLoaded,
        loading,
        setLoading,
        center,
        positionMarkerUser,
        floatMarker,
        handlerConfirmation,
        address,
        direccion,
        setDireccion,
        tipoLugar,
        setTipoLugar,
        descripcion,
        setDescripcion,
        fotos,
        setFotos,
    }
}
