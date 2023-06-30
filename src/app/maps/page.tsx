'use client'

import { useJsApiLoader } from '@react-google-maps/api'
import { FC, memo, useEffect, useState } from 'react'
import SimpleBottomNavigation from '@/components/BottomNav'
import FilterComponent from '@/components/FilterComponet'
import { totalArray } from './data'
import { MarkerClusterer } from '@googlemaps/markerclusterer'
import BasicModal from '@/components/Modal'
import CircularIndeterminate from '@/components/Loader'
import customMarkerIcon from '../../assets/anzuelo.png'
import customMarkerIconShop from '../../assets/tienda.png'
import customMarkerIconPlace from '../../assets/destino.png'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FilterContainer, MainContainer, MapContainer } from './style'
import { MarkerData } from './type'

// Declara una variable llamada markerClusterer para agrupar los marcadores.
let markerClusterer: MarkerClusterer | null = null

// Declara un enumerado llamado MarkerType con diferentes tipos de marcadores.
enum MarkerType {
    SHOP = 'shop',
    WORM = 'worm',
    ALL = 'all',
    PLACE = 'place',
}

// Declara un componente de React llamado GoogleMapComp.
const GoogleMapComp: FC = () => {
    // Carga el API de Google Maps utilizando el hook useJsApiLoader.
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.API_KEY || '',
    })
    let map: google.maps.Map


    // Define los estados del componente.
    const [loading, setLoading] = useState<boolean>(true)
    const [currentFilter, setCurrentFilter] = useState(MarkerType.ALL)
    const [markers, setMarkers] = useState<google.maps.Marker[]>([])
    const [center, setCenter] = useState<google.maps.LatLngLiteral>({
        lat: 40.463667 || undefined,
        lng: -3.74922 || undefined,
    })

    const [selectedMarker, setSelectedMarker] = useState<{
        id: number
        shop: string
        lat: number
        lng: number
        label: string
        address: string
    } | null>(null)

    // Función para mostrar una notificación de éxito.
    const notify = () => {
        toast.success('Ubicación cargada correctamente', {
            position: toast.POSITION.TOP_LEFT,
            toastId: 'success1',
        })
    }

    // Efecto que se ejecuta al cargar el componente para obtener la ubicación actual del usuario.
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords
                    setCenter({ lat: latitude, lng: longitude })
                    notify()
                },
                error => {
                    console.error('Error getting current location:', error)
                }
            )
        } else {
            console.error('Geolocation is not supported by this browser.')
        }
    }, [])

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
            map,
        })

        // Agrega un evento de clic al marcador.
        marker.addListener('click', () => {
            handleMarkerClick(markerData)
        })

        return marker
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
    const handleMarkerClick = (marker: any) => {
        setSelectedMarker(marker)
    }

    // Cierra el modal.
    const closeModal = () => {
        setSelectedMarker(null)
    }

    // Efecto que se ejecuta cuando se carga el API de Google Maps y se establece el centro del mapa.
    useEffect(() => {
        if (isLoaded) {
            map = new window.google.maps.Map(
                document.getElementById('map') as HTMLElement,
                {
                    center: center,
                    zoom: 7,
                    zoomControl: false,
                    zoomControlOptions: {
                        position: 9,
                    },
                    disableDefaultUI: true,
                    streetViewControl: false,
                }
            )

            // Crea el cluster de marcadores.
            markerClusterer = new MarkerClusterer({ map, markers })
        }
        setLoading(false)
    }, [isLoaded, center])

    // Efecto que se ejecuta cuando cambia el filtro para filtrar los marcadores.
    useEffect(() => {
        filterMarkers(currentFilter)
    }, [currentFilter])

    // Efecto que se ejecuta cuando cambian los marcadores para actualizar el cluster de marcadores.
    useEffect(() => {
        if (markerClusterer) {
            markerClusterer.clearMarkers()
            markerClusterer.addMarkers(markers)
        }
    }, [markers])

    // Renderiza el componente.
    if (loading) {
        return (
            <div>
                <CircularIndeterminate />
            </div>
        )
    }

    return (
        <MainContainer>
            {center && (
                <>
                    <MapContainer id="map" />
                    {selectedMarker && (
                        <BasicModal
                            key={selectedMarker.id}
                            label={selectedMarker.label}
                            direction={selectedMarker.address}
                            isOpenProp={true}
                            onClose={closeModal}
                        />
                    )}
                    <FilterContainer>
                        <FilterComponent onChange={handleFilterChange} />
                    </FilterContainer>
                    <SimpleBottomNavigation />
                    <ToastContainer autoClose={2000} limit={1} />
                </>
            )}
        </MainContainer>
    )
}

export default memo(GoogleMapComp)
