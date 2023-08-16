'use client'

import { FC, useCallback, useEffect, useState, memo, use } from 'react'
import SimpleBottomNavigation from '@/components/BottomNav'
import { MarkerClusterer } from '@googlemaps/markerclusterer'
import CircularIndeterminate from '@/components/Loader'
import { ToastContainer } from 'react-toastify'
import { useLogicMaps } from './logic'
import ButtonComp from '@/components/Button'
import CustomizedSwitches from '@/components/MuiSwitch'
import AddCommentIcon from '@mui/icons-material/AddComment'
import MarkerUserIcon from '../../assets/location.png'
import hiddenMarker from '../../assets/hostage.png'
import customMarkerIconShop from '../../assets/tienda.png'
import customMarkerIconPlace from '../../assets/destino.png'
import FloatAddMarkerButton from '@/components/FloatAddMarkerButton'
import BasicModal, { PlaceReview } from '@/components/ModalPlaces'
import SimpleSlider from '@/components/Carousel/page'
import CircularColor from '@/components/CircularColor'
import SearchIcon from '@mui/icons-material/Search'
import 'react-toastify/dist/ReactToastify.css'
import ReviewsComp from '@/components/Reviews'
import ModalCrearMarcador from '@/components/ModalAddMarker'
import ModalUserMarkers from '@/components/ModalMarkersUser'
import AccountMenu from '@/components/Menu'
import FilterButton from '@/components/FilterButton'
import { MarkerType, UserMarker } from './type'
import Link from 'next/link'
import CommentModal from '@/components/ModalComments'
import { Avatar, IconButton } from '@mui/material'
import {
    ButtonStyleBuscarLugares,
    ButtonStyleCancelarLugar,
    ButtonStyleConfirmarLugar,
    CustomizedSwitchesStyles,
    IconMarker,
    LikesLabel,
    MainContainer,
    MapContainer,
    ReviewsContainer,
    stylesMaps,
} from './style'

// Declara una variable llamada markerClusterer para agrupar los marcadores.
let markerClusterer: MarkerClusterer | null = null

// Declara un componente de React llamado GoogleMapComp.
const GoogleMapComp: FC = () => {
    const {
        styledMap,
        selectMapStyle,
        mapRef,
        openAddMarkerMode,
        setCurrentLocationMarker,
        addingMarker,
        isButtonDisabled,
        style,
        setStyle,
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
        getAllMarkersUser,
        isButtonDisabledPlaces,
        setIsButtonDisabledPlaces,
        getIcon,
        modalUserMarker,
        setModalUserMarker,
        setDataMarkerUser,
        dataMarkerUser,
        loadingLocation,
        setLoadingLocation,
        isSmallScreen,
        currentUser,
        filteredMarkers,
        setFilteredMarkers,
        openModalComments,
        handleOpenModalComments,
        handleCloseModalComments,
        likedMarkers,
        fetchLikesMarkers,
        setLikedMarkers,
    } = useLogicMaps()

    // Crea una referencia mutable para almacenar el mapa de Google Maps.
    const markers: google.maps.Marker[] = []
    let map: google.maps.Map
    let service: google.maps.places.PlacesService

    const [selectedMarkers, setSelectedMarkers] = useState<
    google.maps.Marker[]
    >([])

    const [locationUser, setLocationUser] =
        useState<google.maps.LatLngLiteral>()

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
        if (typeof window !== 'undefined' && confirmedMarkers) {
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

            renderMarkers(userMarkers) // Renderiza los marcadores en el mapa

            const updateResultsButton = document.getElementById(
                'updateResultsButton'
            )
            if (updateResultsButton) {
                const handleClick = () => {
                    setIsButtonDisabledPlaces(true) // Deshabilita el botón
                    performSearch() // Llama a la función performSearch
                    getAllMarkersUser()
                    setTimeout(() => {
                        setIsButtonDisabledPlaces(false) // Habilita el botón después de 5 segundos
                    }, 2000) // 5000 milisegundos = 5 segundos
                }

                updateResultsButton.addEventListener('click', handleClick)
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
        if (place.types?.includes('store' || 'establishment')) {
            iconUrl = customMarkerIconShop.src
        } else if (
            place.types?.includes('natural_feature' || 'point_of_interest')
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
            position: place.geometry?.location,
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

    // Renderiza los marcadores en el mapa.
    const renderMarkers = (markers: UserMarker[]) => {
        // Elimina los marcadores actuales del clusterer
        if (markerClusterer) markerClusterer.clearMarkers()

        markers.forEach((marker: any) => {
            const location = {
                lat: marker.location.lat,
                lng: marker.location.lng,
            }
            const iconUrl = getIcon(marker.markerType)
            const iconUrlHidden = hiddenMarker.src

            // Si el marcador pertenece al usuario actual y está oculto
            if (marker.userId === currentUser?.id && !marker.visible) {
                const infoWindow = new google.maps.InfoWindow({
                    content: 'Oculto',
                    ariaLabel: 'Oculto',
                })

                const markers = new google.maps.Marker({
                    position: location,
                    map: mapRef.current,
                    animation: window.google.maps.Animation.DROP,
                    icon: {
                        url: iconUrlHidden, // Usa el ícono para los marcadores ocultos
                        scaledSize: new google.maps.Size(22, 22),
                    },
                })
                markers.setMap(map)
                markerClusterer?.addMarker(markers)

                markers.addListener('click', () => {
                    setModalUserMarker(true)
                    setDataMarkerUser(marker)
                    setLocationUser(location)
                })
                infoWindow.open(mapRef.current, markers)
                // Cerrar el InfoWindow automáticamente después de 5 segundos
                setTimeout(() => {
                    infoWindow.close()
                }, 5000)
            }
            // Si el marcador es visible
            else if (marker.visible) {
                const markers = new google.maps.Marker({
                    position: location,
                    map: mapRef.current,
                    animation: window.google.maps.Animation.DROP,
                    icon: {
                        url: iconUrl?.url,
                        scaledSize: new google.maps.Size(40, 40),
                    },
                })
                markers.setMap(map)
                markerClusterer?.addMarker(markers)

                markers.addListener('click', () => {
                    setModalUserMarker(true)
                    setDataMarkerUser(marker)
                    setLocationUser(location)
                })
            }
        })
    }

    // Función para filtrar los marcadores según el tipo de filtro.
    const filterMarkers = (filter: MarkerType) => {
        let filteredMarkerInstances: UserMarker[] = []

        if (filter === MarkerType.ALL) {
            filteredMarkerInstances = [...userMarkers]
        } else {
            filteredMarkerInstances = userMarkers.filter(
                (marker: any) => marker.markerType === filter
            )
        }

        setFilteredMarkers(filteredMarkerInstances)
    }

    // Maneja el cambio de filtro.
    const handleFilterChange = (newFilter: MarkerType) => {
        filterMarkers(newFilter) // Aplica el filtro y actualiza la lista de marcadores filtrados
    }

    // Función para obtener el ícono del marcador según el tipo de marcador.
    const goToMarkerUserLocation = useCallback(
        (location: { lat: number; lng: number } | undefined) => {
            if (location) {
                const baseUrl =
                    'https://www.google.com/maps/search/?api=1&query='
                const encodedCoordinates = encodeURIComponent(
                    `${location.lat},${location.lng}`
                )
                window.open(baseUrl + encodedCoordinates)
            }
        },
        []
    )

    const handleToogleLikeModal = async () => {
        // Perform like/unlike action here
        await fetchLikesMarkers(
            dataMarkerUser?.id as string,
            currentUser?.id as string
        )
        // Actualizar el estado del corazón en tiempo real
        setLikedMarkers(prevState => ({
            ...prevState,
            [dataMarkerUser.id as string]:
                !prevState[dataMarkerUser.id as string],
        }))
    }
    // Efecto que se ejecuta cuando se carga el API de Google Maps y se establece el centro del mapa.
    useEffect(() => {
        initMap()
        if (!confirmedMarkers) {
            getAllMarkersUser()
        }
    }, [confirmedMarkers])

    useEffect(() => {
        if (mapRef.current) {
            renderMarkers(filteredMarkers)
        }
    }, [filteredMarkers])

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

    useEffect(() => {
        // Agrega la regla de estilo para el InfoWindow
        const styleElement = document.createElement('style')
        styleElement.textContent =
            '.gm-style iframe + div { border:none!important; }'
        document.head.appendChild(styleElement)

        // ... tu lógica para inicializar el mapa aquí ...
    }, [])

    // cambia la posición del switch dependiendo del tamaño de la pantalla
    let bottomPosition
    if (typeof window !== 'undefined') {
        if (window.innerWidth < 600) {
            bottomPosition = '150px'
        } else {
            bottomPosition = '160px'
        }
    }

    // Renderiza el componente.
    if (loading && userMarkers.length === 0) {
        return (
            <>
                <CircularIndeterminate />
                <SimpleBottomNavigation />
            </>
        )
    }

    return (
        <MainContainer>
            <>
                <AccountMenu />
                <FilterButton onChange={handleFilterChange} />
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
                <>
                    <ModalUserMarkers
                        isOpen={modalUserMarker}
                        creator={dataMarkerUser?.user?.name}
                        icon={
                            <Avatar
                                src={dataMarkerUser.user?.picture}
                                sx={{
                                    width: 25,
                                    height: 25,
                                    marginTop: '0rem',
                                }}
                            />
                        }
                        link={
                            <Link
                                style={{
                                    textDecorationColor: '#49007a',
                                    color: '#49007a',
                                }}
                                href={`/feed/${dataMarkerUser?.user?.id}`}
                            >
                                {dataMarkerUser?.user?.name}
                            </Link>
                        }
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
                        pictures={dataMarkerUser.picture as string}
                        onClose={() => setModalUserMarker(false)}
                        onClick={() => {
                            if (
                                locationUser &&
                                locationUser?.lat !== undefined &&
                                locationUser?.lng !== undefined
                            ) {
                                const location: google.maps.LatLngLiteral = {
                                    lat: locationUser?.lat,
                                    lng: locationUser?.lng,
                                }
                                goToMarkerUserLocation(location)
                            } else {
                                // Aquí puedes manejar el caso donde `selectedMarker` no tiene valores válidos
                                console.error(
                                    'No se encontró una ubicación válida en el marcador seleccionado.'
                                )
                            }
                        }}
                        isLiked={likedMarkers[dataMarkerUser.id as string]} // Accede al valor correspondiente al marcador actual
                        onClickLike={handleToogleLikeModal}
                        likes={dataMarkerUser?.likes?.length}
                        icon2={
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <IconButton
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: 0,
                                    }}
                                    onClick={handleOpenModalComments}
                                >
                                    <AddCommentIcon
                                        sx={{
                                            color: '#49007a',
                                            cursor: 'pointer',
                                        }}
                                    />
                                </IconButton>
                                <LikesLabel>
                                    {dataMarkerUser.comments?.length}{' '}
                                    Comentarios
                                </LikesLabel>
                            </div>
                        }
                    />
                    <CommentModal
                        open={openModalComments}
                        id={dataMarkerUser.id as string}
                        onClose={handleCloseModalComments}
                    />
                </>
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
                title={isSmallScreen ? 'Buscar' : 'Buscar por esta zona'} // Cambia el título si la pantalla es pequeña
                id="updateResultsButton"
                style={{
                    display: isButtonDisabled ? 'none' : 'flex',
                    opacity: isButtonDisabledPlaces ? 0 : 1,
                    position: 'fixed',
                    width: isSmallScreen ? '100px' : '235px', // Cambia el título si la pantalla es pequeña
                    top: '40px',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: '#ffffff',
                    color: '#000000',
                    height: '2rem',
                }}
                icon={<SearchIcon style={{ color: 'black', marginRight: 1 }} />}
                variant="contained"
                disabled={isButtonDisabledPlaces}
            />
        </MainContainer>
    )
}

export default memo(GoogleMapComp)
