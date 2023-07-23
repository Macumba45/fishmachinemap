'use client'

import { FC, use, useEffect, useState } from 'react'
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
import customMarkerIcon from '../../assets/anzuelo.png'
import customMarkerIconShop from '../../assets/tienda.png'
import customMarkerIconPlace from '../../assets/destino.png'
import customMarkerIconPicture from '../../assets/back-camera.png'
import FloatAddMarkerButton from '@/components/FloatAddMarkerButton'
import BasicModal, { PlaceReview } from '@/components/ModalPlaces'
import SimpleSlider from '@/components/Carousel/page'
import CustomizedSwitchesLocation from '@/components/MuiSwitchLocation'
import CircularColor from '@/components/CircularColor'
import SearchIcon from '@mui/icons-material/Search'
import {
    ButtonStyleBuscarLugares,
    ButtonStyleCancelarLugar,
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
import FloatLogOut from '@/components/FloatLogOut'
import ModalUserMarkers from '@/components/ModalMarkersUser'
import AccountMenu from '@/components/Menu'

// Declara una variable llamada markerClusterer para agrupar los marcadores.
let markerClusterer: MarkerClusterer | null = null

// Declara un componente de React llamado GoogleMapComp.
const GoogleMapComp: FC = () => {
    const {
        notifySucces,
        styledMap,
        selectMapStyle,
        mapRef,
        openAddMarkerMode,
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
        direccion,
        tipoLugar,
        descripcion,
        fotos,
        userMarkers,
        confirmedMarkers,
        handleCloseModal,
        handleCloseLugar,
        place,
        modalIsOpen,
        setPlace,
        openModal,
        closeModal,
        getMarkersUser,
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
    } = useLogicMaps()

    // Crea una referencia mutable para almacenar el mapa de Google Maps.
    const markers: google.maps.Marker[] = []
    let map: google.maps.Map
    let service: google.maps.places.PlacesService

    const [selectedMarkers, setSelectedMarkers] = useState<
    google.maps.Marker[]
    >([])

    const getMyPosition = async () => {
        setLoadingLocation(true)
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
                            map: mapRef.current,
                        })
                    })
                    // Actualiza la variable de estado con el nuevo marcador
                    setCurrentLocationMarker(marker)
                    // Centra el mapa en la ubicación actual
                    mapRef.current?.setCenter(currentLatLng)
                    console.log('currentLatLng', currentLatLng)
                    setLoadingLocation(false)
                },
                error => {
                    console.error('Error getting current location:', error)
                    setLoadingLocation(false)
                    // Manejar la situación de ubicación desactivada en la interfaz de usuario
                }
            )
        } else {
            // El navegador no admite la geolocalización
            setLoadingLocation(false)
            // Manejar la situación de geolocalización no admitida en la interfaz de usuario
        }
    }

    async function initMap() {
        if (typeof window !== 'undefined' && isLoaded && confirmedMarkers) {
            map = new window.google.maps.Map(
                document.getElementById('map') as HTMLElement,
                {
                    center: center,
                    zoom: 6,
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
            // Crear una instancia de MarkerClusterer
            const clusterOptions = {
                imagePath:
                    'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
                gridSize: 30,
                zoomOnClick: false,
                maxZoom: 8,
                minimumClusterSize: 2,
            }
            markerClusterer = new MarkerClusterer({
                map,
                algorithmOptions: clusterOptions,
            })

            const updateResultsButton = document.getElementById(
                'updateResultsButton'
            )
            if (updateResultsButton) {
                const handleClick = () => {
                    setIsButtonDisabledPlaces(true) // Deshabilita el botón
                    performSearch() // Llama a la función performSearch

                    setTimeout(() => {
                        setIsButtonDisabledPlaces(false) // Habilita el botón después de 5 segundos
                    }, 2000) // 5000 milisegundos = 5 segundos
                }

                updateResultsButton.addEventListener('click', handleClick)
            }
            if (userMarkers.length > 0) {
                userMarkers.map((marker: any) => {
                    const location = {
                        lat: marker.location.lat,
                        lng: marker.location.lng,
                    }
                    const iconUrl = getIcon(marker.markerType)

                    const markers = new google.maps.Marker({
                        position: location,
                        map: mapRef.current,
                        animation: window.google.maps.Animation.DROP, // Agregar la animación de "drop"
                        icon: {
                            url: iconUrl?.url,
                            scaledSize: new google.maps.Size(40, 40),
                        },
                    })
                    markers.setMap(map)
                    markerClusterer?.addMarker(markers) // Agregar el marcador al clúster

                    markers.addListener('click', () => {
                        console.log(marker)
                        setModalUserMarker(true)
                        setDataMarkerUser(marker)
                    })
                })
            }

            await getMyPosition()

            setLoading(false)
        }
    }

    function performSearch() {
        const center = map.getCenter()
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

    function markerPlaceGoogle(place: google.maps.places.PlaceResult) {
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

        const icon = {
            url: iconUrl,
            scaledSize: new google.maps.Size(26, 26),
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
                markerPlaceGoogle(place)
            }
        }
    }

    // Efecto que se ejecuta cuando se carga el API de Google Maps y se establece el centro del mapa.
    useEffect(() => {
        initMap()
        if (!confirmedMarkers) {
            getMarkersUser()
        }
    }, [isLoaded, confirmedMarkers])

    useEffect(() => {
        if (modalUserMarker) {
            console.log('modalUserMarker', modalUserMarker)
            fetchMarkerUser()
        }
    }, [modalUserMarker])

    // // Efecto que se ejecuta cuando cambia el filtro para filtrar los marcadores.
    // useEffect(() => {
    //     filterMarkers(currentFilter)
    // }, [currentFilter])

    // Efecto que se ejecuta cuando cambian los marcadores para actualizar el cluster de marcadores.
    useEffect(() => {
        if (markerClusterer) {
            markerClusterer.clearMarkers()
            markerClusterer.addMarkers(markers)
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
    if (loading && userMarkers.length === 0) {
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
                <AccountMenu />
                <MapContainer id="map" />

                <ModalCrearMarcador
                    onClose={handleCloseModal} // Cierra el modal
                    isOpen={addingMarker}
                    positionMarkerUser={positionMarkerUser}
                    direction={direccion}
                    markerType={tipoLugar}
                    description={descripcion}
                    pictures={fotos}
                />

                <ModalUserMarkers
                    isOpen={modalUserMarker}
                    creator={markerCreator?.name}
                    direction={
                        dataMarkerUser.direction.charAt(0).toUpperCase() +
                        dataMarkerUser.direction.slice(1)
                    }
                    markerType={
                        dataMarkerUser.markerType.charAt(0).toUpperCase() +
                        dataMarkerUser.markerType.slice(1)
                    }
                    description={
                        dataMarkerUser.description.charAt(0).toUpperCase() +
                        dataMarkerUser.description.slice(1)
                    }
                    pictures={dataMarkerUser.picture}
                    onClose={() => setModalUserMarker(false)}
                />

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
                        numberRating={place?.user_ratings_total}
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
                        title="Añadir Marcador"
                        style={{
                            position: 'fixed',
                            ...ButtonStyleConfirmarLugar,
                        }}
                        variant="contained"
                        onClick={handlerConfirmation}
                    />
                    <ButtonComp
                        key="cancelarButton"
                        title="Cancelar Marcador"
                        style={{
                            position: 'fixed',
                            ...ButtonStyleCancelarLugar,
                        }}
                        variant="outlined"
                        onClick={handleCloseLugar}
                    />
                </>
            )}
            <FloatAddMarkerButton
                disabled={isButtonDisabled}
                onClick={openAddMarkerMode}
            />
            <ButtonComp
                title="Buscar por esta zona"
                id="updateResultsButton"
                style={{
                    display: isButtonDisabled ? 'none' : 'flex',
                    opacity: isButtonDisabledPlaces ? 0 : 1,
                    position: 'fixed',
                    ...ButtonStyleBuscarLugares,
                }}
                icon={<SearchIcon style={{ color: 'black', marginRight: 1 }} />}
                variant="contained"
                disabled={isButtonDisabledPlaces}
            />
        </MainContainer>
    )
}

export default GoogleMapComp
