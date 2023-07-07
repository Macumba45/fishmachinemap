'use client'

import { FC, useEffect, useState } from 'react'
import SimpleBottomNavigation from '@/components/BottomNav'
import FilterComponent from '@/components/FilterComponet'
import { MarkerClusterer } from '@googlemaps/markerclusterer'
import CircularIndeterminate from '@/components/Loader'
import { ToastContainer } from 'react-toastify'
import { useLogicMaps } from './logic'
import ButtonComp from '@/components/Button'
import CustomizedSwitches from '@/components/MuiSwitch'
import customAnzueloMarkerIcon from '../../assets/anzuelo.png'
import MarkerUserIcon from '../../assets/location.png'
import customMarkerIconShop from '../../assets/tienda.png'
import customMarkerIconPlace from '../../assets/destino.png'
import customMarkerIconPicture from '../../assets/back-camera.png'
import FloatAddMarkerButton from '@/components/FloatAddMarkerButton'
import BasicModal, { PlaceReview } from '@/components/Modal'
import SimpleSlider from '@/components/Carousel/page'
import CustomizedSwitchesLocation from '@/components/MuiSwitchLocation'
import CircularColor from '@/components/CircularColor'
import SearchIcon from '@mui/icons-material/Search'
import {
    ButtonStyleBuscarLugares,
    ButtonStyleConfirmarLugar,
    CustomizedSwitchesLocationStyles,
    CustomizedSwitchesStyles,
    FilterContainer,
    IconMarker,
    MainContainer,
    MapContainer,
    ReviewsContainer,
    stylesMaps,
} from './style'
import 'react-toastify/dist/ReactToastify.css'
import ReviewsComp from '@/components/Reviews'
import ModalCrearMarcador from '@/components/ModalAddMarker'

// Declara una variable llamada markerClusterer para agrupar los marcadores.
let markerClusterer: MarkerClusterer | null = null

// Declara un componente de React llamado GoogleMapComp.
const GoogleMapComp: FC = () => {
    const {
        currentFilter,
        selectedMarker,
        notifySucces,
        filterMarkers,
        handleFilterChange,
        styledMap,
        selectMapStyle,
        mapRef,
        confirmMarker,
        openAddMarkerMode,
        confirmedMarkers,
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
        address
    } = useLogicMaps()

    console.log(positionMarkerUser)
    // Crea una referencia mutable para almacenar el mapa de Google Maps.
    let map: google.maps.Map
    let service: google.maps.places.PlacesService
    const [place, setPlace] = useState<google.maps.places.PlaceResult | null>(
        null
    )
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [selectedMarkers, setSelectedMarkers] = useState<
        google.maps.Marker[]
    >([])

    const [loadingLocation, setLoadingLocation] = useState(false)
    const [disableLocation, setDisableLocation] = useState(true)

    // Efecto que se ejecuta al cargar el componente para obtener la ubicación actual del usuario.

    const getMyPosition = () => {
        setLoadingLocation(true)
        setDisableLocation(false)
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords
                    const currentLatLng = { lat: latitude, lng: longitude }

                    const infoWindow = new google.maps.InfoWindow({
                        content: 'Usted está aquí',
                        ariaLabel: 'Usted está aquí',
                    })
                    // Crea un nuevo marcador para la ubicación actual
                    const marker = new google.maps.Marker({
                        position: currentLatLng,
                        map: mapRef.current,
                        animation: window.google.maps.Animation.DROP, // Agregar la animación de "drop"
                        icon: {
                            path: google.maps.SymbolPath.CIRCLE,
                            fillColor: '#9900ff',
                            fillOpacity: 8,
                            strokeWeight: 8,
                            scale: 8,
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
                    setLoadingLocation(false)
                    setDisableLocation(false)
                    performSearch()
                },
                error => {
                    console.error('Error getting current location:', error)
                }
            )
        }
    }

    function initMap() {
        if (typeof window !== 'undefined' && isLoaded) {
            map = new window.google.maps.Map(
                document.getElementById('map') as HTMLElement,
                {
                    center: center,
                    zoom: 8,
                    zoomControl: false,
                    zoomControlOptions: {
                        position: 9,
                    },
                    disableDefaultUI: true,
                    streetViewControl: false,
                    styles: style,
                    draggable: true,
                    gestureHandling: 'greedy',
                }
            )
            mapRef.current = map

            service = new google.maps.places.PlacesService(map)

            const updateResultsButton = document.getElementById(
                'updateResultsButton'
            )
            if (updateResultsButton) {
                updateResultsButton.addEventListener('click', performSearch)
            }

            // addMarkerDraggable(map)
            // Crea el cluster de marcadores.
            // markerClusterer = new MarkerClusterer({
            //     map,
            //     markers: [...confirmedMarkers, ...markers],
            // })
            // // Bloquea el scroll de la fista maps.
            // blockScroll()
        }
        setLoading(false)
    }

    const markers: google.maps.Marker[] = []

    function performSearch() {
        const center = map.getCenter()
        console.log(center)
        // console.log(center?.lat(), center?.lng())
        // Eliminar los marcadores anteriores
        if (markerClusterer) markerClusterer.clearMarkers()

        // Options to pass along to the marker clusterer
        const clusterOptions = {
            imagePath:
                'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
            gridSize: 30,
            zoomOnClick: false,
            maxZoom: 8,
            minimunClusterSize: 2,
        }

        markerClusterer = new MarkerClusterer({
            map,
            markers: [], // Inicialmente sin marcadores
            algorithmOptions: clusterOptions,
        })

        const requestShops = {
            location: center,
            radius: 10000,
            query: 'Tienda de articulos pesca',
            locationBias: { radius: 10000, center: center },

            // type: ['']
        }
        const requestPlayas = {
            location: center,
            radius: 10000,
            query: 'Playas',
            locationBias: { radius: 10000, center: center },

            // type: ['']
        }

        service.textSearch(requestShops, callback)
        // service.textSearch(requestCebos, callback)
        service.textSearch(requestPlayas, callback)
    }

    function createMarker(place: google.maps.places.PlaceResult) {
        let iconUrl =
            'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
        // Icono predeterminado
        // Verificar el tipo de lugar y asignar un icono específico
        if (place.types!.includes('store' || 'establishment')) {
            iconUrl = customMarkerIconShop.src
        } else if (
            place.types!.includes('natural_feature' || 'point_of_interest')
        ) {
            iconUrl = customMarkerIconPlace.src
        }

        const infoWindowContent = `
    <div>
        <h3>${place.name}</h3>
        <p>Dirección: ${place.formatted_address}</p>
      <p>Telefono: ${place.international_phone_number}</p>
        <p>Valoración: ${place.rating || 'N/A'}</p>
        ${place.reviews ? `<p>Opiniones: ${place.reviews}</p>` : ''}
        <p>Latitud: ${place.geometry?.location?.lat()}</p>
        <p>Longitud: ${place.geometry?.location?.lng()}</p>
        <a>Web: ${place.url}</a>
        
    </div>
`

        const infoWindow = new google.maps.InfoWindow({
            content: infoWindowContent,
            position: place.geometry!.location,
        })
        const icon = {
            url: iconUrl,
            scaledSize: new google.maps.Size(32, 32),
        } as google.maps.Icon
        const marker = new google.maps.Marker({
            map: map,
            title: place.name,
            position: place.geometry!.location,
            icon: icon,
        })

        markerClusterer?.addMarker(marker) // Agregar el marcador al clúster

        marker.addListener('click', () => {
            if (!selectedMarkers.includes(marker)) {
                setSelectedMarkers(prevMarkers => [...prevMarkers, marker])
            }
            setPlace(place)
        })

        google.maps.event.addListener(marker, 'click', function () {
            // Acción al hacer clic en el marcador
            if (place.place_id) {
                service.getDetails(
                    { placeId: place.place_id },
                    (result, status) => {
                        if (
                            status === google.maps.places.PlacesServiceStatus.OK
                        ) {
                            openModal(result)
                            // Aquí puedes acceder a los detalles del lugar en la variable "result"
                        }
                    }
                )
            }
        })
    }

    function callback(
        results: google.maps.places.PlaceResult[] | null,
        status: google.maps.places.PlacesServiceStatus,
        pagination: google.maps.places.PlaceSearchPagination | null
    ) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (const place of results!) {
                createMarker(place)
            }
        }
    }

    const openModal = (place: any) => {
        console.log(place)
        setPlace(place)
        setModalIsOpen(true)
    }

    const closeModal = () => {
        setModalIsOpen(false)
    }

    // Efecto que se ejecuta cuando se carga el API de Google Maps y se establece el centro del mapa.
    useEffect(() => {
        initMap()
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
            console.log(markers)
        }
    }, [])

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

    return (
        <MainContainer>
            <>
                <MapContainer id="map" />
                {addingMarker && (
                    <ModalCrearMarcador
                        address={address}
                        isOpen={addingMarker}
                        onClick={confirmMarker}
                    />
                )}
                {/* <FilterContainer>
                    <FilterComponent onChange={handleFilterChange} />
                </FilterContainer> */}

                {modalIsOpen && (
                    <BasicModal
                        onClose={closeModal}
                        label={place?.name?.toLocaleUpperCase()}
                        direction={place?.formatted_address}
                        value={place?.rating}
                        phone={place?.international_phone_number}
                    >
                        {
                            <SimpleSlider
                                pictures={place?.photos?.map((photo: any) => {
                                    return {
                                        src: photo.getUrl(),
                                    }
                                })}
                            />
                        }
                        <ReviewsContainer>Reviews</ReviewsContainer>

                        {place?.reviews?.map(
                            (review: PlaceReview, index: number) => (
                                <>
                                    <ReviewsComp
                                        key={index}
                                        author_name={review.author_name}
                                        author_url={review.author_url}
                                        language={review.language}
                                        profile_photo_url={
                                            review.profile_photo_url
                                        }
                                        rating={review.rating}
                                        relative_time_description={
                                            review.relative_time_description
                                        }
                                        text={review.text}
                                    />
                                </>
                            )
                        )}
                    </BasicModal>
                )}
                {loadingLocation && (
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente oscuro
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <CircularColor />
                    </div>
                )}
                <SimpleBottomNavigation />
                <ToastContainer autoClose={2000} limit={1} />
                <CustomizedSwitches
                    style={{
                        bottom: bottomPosition,
                        position: 'fixed',
                        ...CustomizedSwitchesStyles,
                    }}
                    onClick={() => selectMapStyle()}
                />
                <CustomizedSwitchesLocation
                    disabled={!disableLocation}
                    style={{
                        position: 'fixed',
                        display: !disableLocation ? 'none' : 'flex',
                        ...CustomizedSwitchesLocationStyles,
                    }}
                    onClick={getMyPosition}
                />
            </>
            {floatMarker && (
                <>
                    <IconMarker
                        key="iconMarker"

                        src={MarkerUserIcon.src}
                        style={{
                            position: 'fixed',
                            top: '48%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '32px',
                            height: '32px',
                            /* ... estilos adicionales ... */
                        }}


                    />
                    <span
                        key="iconPoint"

                        style={{
                            position: 'relative',
                            display: 'inline-block',
                        }}
                    >
                        {/* Punto debajo del icono */}
                        <span
                            key="point"

                            style={{
                                position: 'fixed',
                                top: '52%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                backgroundColor: 'red',
                            }}
                        ></span>
                    </span>
                    <ButtonComp
                        key="confirmButton"
                        title="Confirmar lugar"
                        style={{
                            position: 'fixed',
                            ...ButtonStyleConfirmarLugar,
                        }}
                        variant="contained"
                        onClick={handlerConfirmation}
                    />
                </>
            )}
            <FloatAddMarkerButton
                disabled={isButtonDisabled}
                onClick={openAddMarkerMode}
            />
            <ButtonComp
                title="Buscar lugares"
                id="updateResultsButton"
                style={{
                    position: 'fixed',
                    ...ButtonStyleBuscarLugares,
                }}
                icon={<SearchIcon sx={{ color: 'black', mr: 1 }} />}
                variant="contained"
            />
        </MainContainer>
    )
}

export default GoogleMapComp
