import { toast } from 'react-toastify'
import { MarkerData } from './type'
import customMarkerIcon from '../../assets/anzuelo.png'
import customMarkerIconShop from '../../assets/tienda.png'
import customMarkerIconPlace from '../../assets/destino.png'
import { useRef, useState } from 'react'
import { totalArray } from './data'
import { stylesMaps } from './style'
import { shopsListID } from '../feed/data'

export const useLogicMaps = () => {
    enum MarkerType {
        SHOP = 'shop',
        WORM = 'worm',
        ALL = 'all',
        PLACE = 'place',
    }

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
    const [confirmedMarkers, setConfirmedMarkers] = useState<
        google.maps.Marker[]
    >([])
    const [currentLocationMarker, setCurrentLocationMarker] =
        useState<google.maps.Marker | null>(null)
    const [style, setStyle] = useState<
        Array<{ elementType: string; stylers: Array<{ color: string }> }>
    >([])

    const isAlreadyMarkedRef = useRef<boolean>(false) // Utiliza una referencia en lugar de un estado

    const [isButtonDisabled, setIsButtonDisabled] = useState(false)

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
            filteredMarkerInstances = totalArray.map(createMarker)
        } else if (filter === MarkerType.SHOP) {
            filteredMarkerInstances = totalArray
                .filter(marker => marker.shop === 'shop')
                .map(createMarker)
        } else if (filter === MarkerType.WORM) {
            filteredMarkerInstances = totalArray
                .filter(marker => marker.shop !== 'shop')
                .map(createMarker)
        } else if (filter === MarkerType.PLACE) {
            filteredMarkerInstances = totalArray
                .filter(marker => marker.shop === 'place')
                .map(createMarker)
        }

        setMarkers(filteredMarkerInstances)
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

    const [styledMap, setStyledMap] = useState(true)
    const selectMapStyle = () => {
        if (typeof window !== 'undefined' && mapRef.current) {
            mapRef.current.setOptions({ styles: styledMap ? [] : stylesMaps })
            setStyledMap(!styledMap)
        }
    }


    const addMarkerDraggable = (map: google.maps.Map) => {
        if (!isAlreadyMarkedRef.current) {
            console.log('Ya se ha marcado')
            return
        }

        const listener = map.addListener('click', (event: any) => {
            const latLng = event.latLng
            const marker = new google.maps.Marker({
                position: latLng,
                map: map,
                draggable: true,
                animation: window.google.maps.Animation.DROP, // Agregar la animación de "drop"
            })
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

            setAddingMarker(true)
            google.maps.event.removeListener(listener)
            isAlreadyMarkedRef.current = true
            // Aquí puedes realizar cualquier acción adicional con el marcador, como guardar su posición en un estado o enviarla al servidor.
        })
    }

    // const clearMarkers = () => {
    //     if (markerClusterer) {
    //         markerClusterer.clearMarkers()
    //     }
    //     setMarkers([]) // Eliminar todos los marcadores del estado
    // }

    // Función para confirmar el marcador
    const confirmMarker = () => {
        isAlreadyMarkedRef.current = false
        console.log(isAlreadyMarkedRef)

        // Agregar los marcadores confirmados al estado de marcadores confirmados
        setConfirmedMarkers(prevMarkers => [...prevMarkers, ...markers])

        // Restablecer el estado
        // clearMarkers()
        setMarkers([...markers])
        setAddingMarker(false)
        setIsButtonDisabled(false)
        notifyMarker()

    }

    // Función para abrir el modo de "Añadir a marcadores"
    const openAddMarkerMode = () => {
        // Realizar acciones adicionales al abrir el modo de "Añadir a marcadores"
        // Restablecer el estado
        // clearMarkers()
        isAlreadyMarkedRef.current = true

        if (mapRef.current) {
            setIsButtonDisabled(true) // Deshabilita el botón
            addMarkerDraggable(mapRef.current)
        }
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
        setStyle

    }
}
