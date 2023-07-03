'use client'

import { FC, memo, useEffect } from 'react'
import SimpleBottomNavigation from '@/components/BottomNav'
import FilterComponent from '@/components/FilterComponet'
import { MarkerClusterer } from '@googlemaps/markerclusterer'
import BasicModal from '@/components/Modal'
import CircularIndeterminate from '@/components/Loader'
import { ToastContainer } from 'react-toastify'
import { useLogicMaps } from './logic'
import FloatHomeButton from '@/components/FloatHomeButton'
import ButtonComp from '@/components/Button'
import CustomizedSwitches from '@/components/MuiSwitch'
import CardList from '@/components/CardList'
import 'react-toastify/dist/ReactToastify.css'
import {
    FilterContainer,
    MainContainer,
    MapContainer,
    stylesMaps,
} from './style'

// Declara una variable llamada markerClusterer para agrupar los marcadores.
let markerClusterer: MarkerClusterer | null = null

// Declara un componente de React llamado GoogleMapComp.
const GoogleMapComp: FC = () => {
    const {
        currentFilter,
        markers,
        selectedMarker,
        notifySucces,
        filterMarkers,
        handleFilterChange,
        closeModal,
        styledMap,
        selectMapStyle,
        mapRef,
        shopsListID,
        confirmMarker,
        openAddMarkerMode,
        confirmedMarkers,
        setCurrentLocationMarker,
        addingMarker,
        currentLocationMarker,
        isButtonDisabled,
        style,
        setStyle,
        isLoaded,
        loading,
        setLoading,
        center,
    } = useLogicMaps()

    // Crea una referencia mutable para almacenar el mapa de Google Maps.
    let map: google.maps.Map

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
                        animation: window.google.maps.Animation.BOUNCE, // Agregar la animación de "drop"
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
                    notifySucces()
                },
                error => {
                    console.error('Error getting current location:', error)
                }
            )
        } else {
            console.error('Geolocation is not supported by this browser.')
        }
    }, [])

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
            // // Bloquea el scroll de la fista maps.
            // blockScroll()
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

    useEffect(() => {
        const handleScroll = (event: Event) => {
            event.preventDefault()
        }

        // Bloquear el desplazamiento cuando se monta el componente
        document.body.style.overflow = 'hidden'
        document.addEventListener('scroll', handleScroll, { passive: false })

        return () => {
            // Permitir el desplazamiento cuando se desmonta el componente
            document.body.style.overflow = ''
            document.removeEventListener('scroll', handleScroll)
        }
    }, [])

    // Renderiza el componente.
    if (loading) {
        return (
            <div>
                <CircularIndeterminate />
            </div>
        )
    }

    // cambia la posición del switch dependiendo del tamaño de la pantalla
    let bottomPosition
    if (window.innerWidth < 600) {
        bottomPosition = '150px'
    } else {
        bottomPosition = '160px'
    }

    // // Bloquea el scroll de la fista maps.
    // blockScroll()

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
                            {selectedMarker.shop === 'shop' && (
                                <CardList
                                    id={shopsListID[0].id}
                                    title={shopsListID[0].title}
                                    description={shopsListID[0].description}
                                    image={shopsListID[0].image}
                                    titleImage={shopsListID[0].titleImage}
                                    city={shopsListID[0].city}
                                    address={shopsListID[0].address}
                                />
                            )}
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
