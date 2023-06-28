'use client'

import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api'

import { FC, memo, useEffect, useState } from 'react'
import CircularIndeterminate from '@/components/Loader'
import { MainContainer, center, containerStyle, options } from './style'
import SimpleBottomNavigation from '@/components/BottomNav'
import customMarkerIcon from '../../assets/icons8-worms-24.png'
import BasicModal from '@/components/Modal'
import { markersWithId } from './data'
import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

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
        googleMapsApiKey: 'AIzaSyDw2bVFpPABnpSh7xogUBucTML69T4U9rY',
    })

    type ModalStates = { [key: number]: boolean }
    const [currentLocation, setCurrentLocation] =
        useState<google.maps.LatLngLiteral | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [modalStates, setModalStates] = useState<ModalStates>({})

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
                        {markersWithId.map(marker => (
                            <div key={marker.id}>
                                <MarkerF
                                    position={marker}
                                    icon={customMarkerIcon.src}
                                    onClick={() => handleModalOpen(marker.id)}
                                />

                                {modalStates[marker.id] && (
                                    <div>
                                        <BasicModal
                                            label={marker.label}
                                            direction={marker.address}
                                            onClose={() =>
                                                handleModalClose(marker.id)
                                            }
                                        >
                                            <div>
                                                <IconButton
                                                    aria-label="Close"
                                                    onClick={() =>
                                                        handleModalClose(
                                                            marker.id
                                                        )
                                                    }
                                                    sx={{
                                                        position: 'absolute',
                                                        top: '10px',
                                                        right: '10px',
                                                        zIndex: 9999999,
                                                    }}
                                                >
                                                    <CloseIcon />
                                                </IconButton>
                                                {/* Contenido del modal */}
                                            </div>
                                        </BasicModal>
                                    </div>
                                )}
                            </div>
                        ))}
                    </GoogleMap>
                )}
                <SimpleBottomNavigation />
            </MainContainer>
        </>
    )
}

export default memo(GoogleMapComp)
