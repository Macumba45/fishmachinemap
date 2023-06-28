'use client'

import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api'
import { FC, memo, useEffect, useState } from 'react'
import CircularIndeterminate from '@/components/Loader'
import SimpleBottomNavigation from '@/components/BottomNav'
import customMarkerIcon from '../../assets/icons8-worms-24.png'
import customMarkerIconShop from '../../assets/icons8-shop-50.png'
import BasicModal from '@/components/Modal'
import { totalArray } from './data'
import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { MainContainer, center, containerStyle, options } from './style'
import FilterComponent from '@/components/FilterShop'


let isGoogleMapsLoaded = false

function loadGoogleMapsAPI() {
    if (!isGoogleMapsLoaded) {
        // Cargar la API de Google Maps aquí
        isGoogleMapsLoaded = true
    }
}

const GoogleMapComp: FC = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.API_KEY || ''
    })

    type ModalStates = { [key: number]: boolean }
    const [currentLocation, setCurrentLocation] =
        useState<google.maps.LatLngLiteral | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [modalStates, setModalStates] = useState<ModalStates>({})
    const [currentFilter, setCurrentFilter] = useState('all');
    const [filteredMarkers, setFilteredMarkers] = useState(totalArray);


    const TOP = 3

    const mapOptions = {
        ...options,
        zoomControlOptions: {
            position: TOP,
        },
    }

    const handleModalOpen = (id: number) => {
        setModalStates(prevModalStates => ({
            ...prevModalStates,
            [id]: !prevModalStates[id], // Invierte el estado actual del modal
        }))
    }

    const handleModalClose = (id: number) => {
        setModalStates(prevModalStates => ({
            ...prevModalStates,
            [id]: false,
        }))
    }

    useEffect(() => {
        filterMarkers(currentFilter);
    }, [currentFilter]);

    const filterMarkers = (filter: any) => {
        if (filter === 'all') {
            setFilteredMarkers(totalArray);
        } else if (filter === 'shop') {
            setFilteredMarkers(totalArray.filter((marker) => marker.shop === 'shop'));
        } else if (filter === 'worm') {
            setFilteredMarkers(totalArray.filter((marker) => marker.shop !== 'shop'));
        }
    };

    const handleFilterChange = (newFilter: any) => {
        setCurrentFilter(newFilter);
    };

    useEffect(() => {
        loadGoogleMapsAPI()

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords
                    setCurrentLocation({ lat: latitude, lng: longitude })
                    setLoading(false)
                },
                error => {
                    console.error('Error getting current location:', error)
                    setLoading(false)
                }
            )
        } else {
            console.error('Geolocation is not supported by this browser.')
            setLoading(false)
        }
    }, [])

    if (loading) {
        return (
            <div>
                <CircularIndeterminate />
            </div>
        )
    }

    return (
        <>
            <MainContainer>
                {isLoaded && (
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={currentLocation || center}
                        zoom={6}
                        options={mapOptions}
                    >
                        {filteredMarkers.map(marker => (
                            <div key={marker.id}>
                                <MarkerF
                                    position={marker}
                                    icon={
                                        marker.shop === 'shop'
                                            ? customMarkerIconShop.src
                                            : customMarkerIcon.src
                                    }
                                    onClick={() => handleModalOpen(marker.id)}
                                />

                                {modalStates[marker.id] && (
                                    <div>
                                        <BasicModal
                                            label={marker.label}
                                            direction={marker.address}
                                            onClose={() => handleModalClose(marker.id)}
                                        >
                                            <div>
                                                <IconButton
                                                    aria-label="Close"
                                                    onClick={() => handleModalClose(marker.id)}
                                                    sx={{
                                                        position: 'absolute',
                                                        top: '10px',
                                                        right: '10px',
                                                        zIndex: 9999999,
                                                    }}
                                                >
                                                    <CloseIcon />
                                                </IconButton>
                                            </div>
                                        </BasicModal>
                                    </div>
                                )}
                            </div>
                        ))}
                    </GoogleMap>
                )}

                <FilterComponent onChange={handleFilterChange} />
                <SimpleBottomNavigation />
            </MainContainer>
        </>
    );
}

export default memo(GoogleMapComp)
