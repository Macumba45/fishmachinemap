import { toast } from 'react-toastify'
import { MarkerData } from './type'
import customMarkerIcon from '../../assets/anzuelo.png'
import customMarkerIconShop from '../../assets/tienda.png'
import customMarkerIconPlace from '../../assets/destino.png'
import { useRef, useState } from 'react'
import { totalArray } from './data'
import { stylesMaps } from './style'
import { shopsListID } from '../list/data'

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

    const notify = () => {
        toast.success('Ubicación cargada correctamente', {
            position: toast.POSITION.TOP_LEFT,
            toastId: 'success1',
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

    return {
        currentFilter,
        markers,
        selectedMarker,
        notify,
        filterMarkers,
        handleFilterChange,
        handleMarkerClick,
        closeModal,
        setMarkers,
        styledMap,
        selectMapStyle,
        mapRef,
        shopsListID,
    }
}
