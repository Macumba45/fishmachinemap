'use client'

import { FC, memo, use, useEffect } from 'react'
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
import { Button } from '@mui/material'
import { init } from 'next/dist/compiled/@vercel/og/satori'
import { type } from 'os'

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
    // This example requires the Places library. Include the libraries=places
    // parameter when you first load the API. For example:
    // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

    let map: google.maps.Map
    let service: google.maps.places.PlacesService

    function initMap() {
        // ...

        var sydney = { lat: 37.392529, lng: -5.994072 }
        var otro = {
            lat: 43.263012,
            lng: -2.935781,
        }

        map = new google.maps.Map(
            document.getElementById('map') as HTMLElement,
            { center: sydney, zoom: 10 }
        )

        service = new google.maps.places.PlacesService(map)

        performSearch()

        const updateResultsButton = document.getElementById(
            'updateResultsButton'
        )
        if (updateResultsButton) {
            updateResultsButton.addEventListener('click', performSearch)
        }
    }

    function createMarker(place: google.maps.places.PlaceResult) {
        const infoWindowContent = `
            <div>
                <h3>${place.name}</h3>
                <p>Latitud: ${place.geometry!.location}</p>
                <p>Longitud: ${place.geometry!.location}</p>

            </div>
        `

        const infoWindow = new google.maps.InfoWindow({
            content: infoWindowContent,
            position: place.geometry!.location,
        })

        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry!.location,
            title: place.name,
        })

        marker.addListener('click', () => {
            infoWindow.open({
                anchor: marker,
                map,
            })
        })

        google.maps.event.addListener(marker, 'click', function () {
            // Acción al hacer clic en el marcador
        })

        // Guardar solo la información necesaria del marcador
        const markerData = {
            position: place.geometry!.location,
            title: place.name,
        }
    }

    function performSearch() {
        const center = map.getCenter()

        const request = {
            location: center,
            radius: 100,
            query: 'Tienda de Pesca',
            // locationBias: {
            //     radius: 100,
            // },
            // type: ['']
        }

        service.textSearch(request, callback)
    }

    function callback(
        results: google.maps.places.PlaceResult[] | null,
        status: google.maps.places.PlacesServiceStatus,
        pagination: google.maps.places.PlaceSearchPagination | null
    ) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            clearMarkers()
            for (const place of results!) {
                createMarker(place)

                console.log(place)
            }
        }
    }

    function clearMarkers() {
        // Implementa la lógica para eliminar los marcadores existentes en el mapa
    }

    // ...

    useEffect(() => {
        initMap()
    }, [])
    return (
        <MainContainer>
            <MapContainer id="map" />
            <Button
                sx={{ zIndex: '999999', position: 'absolute' }}
                id="updateResultsButton"
            >
                Actulizar resukltados
            </Button>
            {/* Resto de tu código */}
        </MainContainer>
    )
}

export default memo(GoogleMapComp)
