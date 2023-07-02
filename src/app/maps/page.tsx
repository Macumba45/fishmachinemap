'use client'

import { useJsApiLoader } from '@react-google-maps/api'
import { FC, memo, useEffect, useRef, useState } from 'react'
import SimpleBottomNavigation from '@/components/BottomNav'
import FilterComponent from '@/components/FilterComponet'
import { MarkerClusterer } from '@googlemaps/markerclusterer'
import BasicModal from '@/components/Modal'
import CircularIndeterminate from '@/components/Loader'
import { ToastContainer } from 'react-toastify'
import {
    FilterContainer,
    MainContainer,
    MapContainer,
    stylesMaps,
} from './style'
import { useScrollBlock } from '@/hooks'
import { useLogicMaps } from './logic'
import FloatHomeButton from '@/components/FloatHomeButton'
import ButtonComp from '@/components/Button'
import CustomizedSwitches from '@/components/MuiSwitch'
import 'react-toastify/dist/ReactToastify.css'
import CardList from '@/components/CardList'

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
        closeModal,
        setMarkers,
        styledMap,
        selectMapStyle,
        mapRef,
        shopsListID,
    } = useLogicMaps()

    // Carga el API de Google Maps utilizando el hook useJsApiLoader.
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.API_KEY || '',
    })
    let map: google.maps.Map

    // Define los estados del componente.
    const [loading, setLoading] = useState<boolean>(true)
    const [center] = useState<google.maps.LatLngLiteral>({
        lat: 40.463667 || undefined,
        lng: -3.74922 || undefined,
    })
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

    // Efecto que se ejecuta al cargar el componente para obtener la ubicación actual del usuario.
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords
                    const currentLatLng = { lat: latitude, lng: longitude }

                    const infoWindow = new google.maps.InfoWindow({
                        content: 'Usted está aquí',
                        ariaLabel: 'Usted está aquí',
                    })

                    // Elimina el marcador de ubicación actual si ya existe
                    if (currentLocationMarker) {
                        currentLocationMarker.setMap(null)
                    }

                    // Crea un nuevo marcador para la ubicación actual
                    const marker = new google.maps.Marker({
                        position: currentLatLng,
                        map: mapRef.current,
                        animation: window.google.maps.Animation.DROP, // Agregar la animación de "drop"
                        icon: {
                            path: google.maps.SymbolPath.CIRCLE,
                            fillColor: '#9900ff',
                            fillOpacity: 10,
                            strokeWeight: 10,
                            scale: 10,
                        },
                    })

                    marker.addListener('click', () => {
                        infoWindow.open({
                            anchor: marker,
                            map,
                        })
                    })
                    // Actualiza la variable de estado con el nuevo marcador
                    setCurrentLocationMarker(marker)

                    // Centra el mapa en la ubicación actual
                    mapRef.current?.setCenter(currentLatLng)
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

    const clearMarkers = () => {
        if (markerClusterer) {
            markerClusterer.clearMarkers()
        }
        setMarkers([]) // Eliminar todos los marcadores del estado
    }

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

        console.log(markers)
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

    // Efecto que se ejecuta cuando se carga el API de Google Maps y se establece el centro del mapa.
    useEffect(() => {
        if (typeof window !== 'undefined' && isLoaded) {
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
                    styles: style,
                    draggable: true,
                }
            )
            mapRef.current = map

            // addMarkerDraggable(map)
            // Crea el cluster de marcadores.
            markerClusterer = new MarkerClusterer({
                map,
                markers: [...confirmedMarkers, ...markers],
            })
        }
        setLoading(false)
    }, [isLoaded])

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

    // Efecto que se ejecuta cuando cambia el estilo del mapa.
    useEffect(() => {
        const updatedStyle = styledMap ? stylesMaps : []
        setStyle(updatedStyle)
    }, [styledMap])

    // Renderiza el componente.
    if (loading) {
        return (
            <div>
                <CircularIndeterminate />
            </div>
        )
    }

    let bottomPosition
    if (window.innerWidth < 600) {
        bottomPosition = '250px'
    } else {
        bottomPosition = '160px'
    }
    blockScroll()

    return (
        <MainContainer>
            {center && (
                <>
                    <MapContainer id="map" />
                    {selectedMarker && (
                        <BasicModal
                            selectedMarker={selectedMarker.shop} // Aquí pasas el valor correspondiente
                            key={selectedMarker.id}
                            label={selectedMarker.label}
                            direction={selectedMarker.address}
                            isOpenProp={true}
                            onClose={closeModal}

                        >
                            {selectedMarker.shop === 'shop' && <CardList id={shopsListID[0].id} title={shopsListID[0].title} description={shopsListID[0].description} image={shopsListID[0].image} titleImage={shopsListID[0].titleImage} city={shopsListID[0].city} address={shopsListID[0].address} />}

                        </BasicModal>

                    )}
                    {addingMarker && (
                        <ButtonComp
                            variant="contained"
                            style={{
                                position: 'absolute',
                                zIndex: 999999,
                                top: '12%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                backgroundColor: '#49007a',
                            }}
                            title="Confirmar"
                            onClick={confirmMarker}
                        />
                    )}
                    <FilterContainer>
                        <FilterComponent onChange={handleFilterChange} />
                    </FilterContainer>
                    <FloatHomeButton
                        disabled={isButtonDisabled}
                        onClick={openAddMarkerMode}
                    />
                    <SimpleBottomNavigation />
                    <ToastContainer autoClose={2000} limit={1} />
                    <CustomizedSwitches
                        style={{
                            display: 'flex',
                            marginLeft: '0px',
                            right: '0',
                            bottom: bottomPosition,
                            position: 'absolute',
                        }}
                        onClick={() => selectMapStyle()}
                    />
                </>
            )}
        </MainContainer>
    )
}

export default memo(GoogleMapComp)
