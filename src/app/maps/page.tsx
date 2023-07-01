'use client'

import { useJsApiLoader } from '@react-google-maps/api'
import { FC, memo, use, useEffect, useState } from 'react'
import SimpleBottomNavigation from '@/components/BottomNav'
import FilterComponent from '@/components/FilterComponet'
import { MarkerClusterer } from '@googlemaps/markerclusterer'
import BasicModal from '@/components/Modal'
import CircularIndeterminate from '@/components/Loader'
import { ToastContainer } from 'react-toastify'
import { FilterContainer, MainContainer, MapContainer, stylesMaps } from './style'
import { useScrollBlock } from '@/hooks'
import { useLogicMaps } from './logic'
import 'react-toastify/dist/ReactToastify.css'
import FloatHomeButton from '@/components/FloatHomeButton'
import CustomizedSwitches from '@/components/MuiSwitch'

// Declara una variable llamada markerClusterer para agrupar los marcadores.
let markerClusterer: MarkerClusterer | null = null

// Declara un componente de React llamado GoogleMapComp.
const GoogleMapComp: FC = () => {
    const [blockScroll] = useScrollBlock()
    const {
        currentFilter,
        markers,
        selectedMarker,
        notify,
        filterMarkers,
        handleFilterChange,
        closeModal
    } = useLogicMaps()



    // Carga el API de Google Maps utilizando el hook useJsApiLoader.
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.API_KEY || '',
    })
    let map: google.maps.Map

    const [styledMap, setStyledMap] = useState(true)

    const selectMapStyle = () => {
        if (!styledMap) {
            console.log('mapa cargado')
            const updatedStyles = styledMap ? [] : stylesMaps
            map.setOptions({ styles: updatedStyles })
            setStyledMap(true)
        } else if (styledMap) {
            console.log('mapa no cargado')
            setStyledMap(false)
        }
    }

    // Define los estados del componente.
    const [loading, setLoading] = useState<boolean>(true)
    const [center, setCenter] = useState<google.maps.LatLngLiteral>({
        lat: 40.463667 || undefined,
        lng: -3.74922 || undefined,
    })

    // Función para mostrar una notificación de éxito.

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

    const addMarkerDragable = (map: google.maps.Map) => {
        console.log('addMarkerDragable')
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
                    styles: styledMap ? stylesMaps : [],
                }
            )

            // Crea el cluster de marcadores.
            markerClusterer = new MarkerClusterer({ map, markers })
        }
        setLoading(false)
    }, [isLoaded, center, styledMap])

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

    blockScroll()

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
                    <FloatHomeButton />
                    <SimpleBottomNavigation />
                    <ToastContainer autoClose={2000} limit={1} />
                    <CustomizedSwitches
                        style={{ display: 'flex', marginLeft: '10px', top: '10px', position: 'absolute' }}
                        onClick={() => selectMapStyle()}

                    />
                </>
            )}
        </MainContainer>
    )
}

export default memo(GoogleMapComp)
