"use client";

import { useJsApiLoader } from '@react-google-maps/api';
import { FC, memo, useEffect, useRef, useState } from 'react';
import SimpleBottomNavigation from '@/components/BottomNav';
import { MainContainer, center } from './style';
import FilterComponent from '@/components/FilterComponet';
import { totalArray } from './data';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import BasicModal from '@/components/Modal';
import CircularIndeterminate from '@/components/Loader';
import customMarkerIcon from '../../assets/icons8-worms-24.png'
import customMarkerIconShop from '../../assets/icons8-shop-50.png'

let markerClusterer: MarkerClusterer | null = null;

const GoogleMapComp: FC = () => {

    enum MarkerType {
        SHOP = 'shop',
        WORM = 'worm',
        ALL = 'all'
    }
    let map: google.maps.Map;
    console.log(markerClusterer)
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.API_KEY || '',
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [currentFilter, setCurrentFilter] = useState(MarkerType.ALL);
    const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
    console.log(markers)
    const [selectedMarker, setSelectedMarker] = useState<
        {
            id: number;
            shop: string;
            lat: number;
            lng: number;
            label: string;
            address: string;
        } | null
    >(null);

    const createMarker = (markerData: any) => {
        const icon =
            markerData.shop === 'shop' ? customMarkerIconShop.src : customMarkerIcon.src
        const marker = new google.maps.Marker({
            position: { lat: markerData.lat, lng: markerData.lng },
            clickable: true,
            cursor: 'pointer',
            opacity: 1,
            icon: {
                url: icon,
                scaledSize: new google.maps.Size(32, 32),
            },
            map,
        });

        marker.addListener('click', () => {
            handleMarkerClick(markerData);
        });

        return marker;
    };



    const filterMarkers = (filter: MarkerType) => {
        let filteredMarkerInstances: google.maps.Marker[] = [];

        if (filter === MarkerType.ALL) {
            filteredMarkerInstances = totalArray.map(createMarker);
        } else if (filter === MarkerType.SHOP) {
            filteredMarkerInstances = totalArray
                .filter((marker) => marker.shop === 'shop')
                .map(createMarker);
        } else if (filter === MarkerType.WORM) {
            filteredMarkerInstances = totalArray
                .filter((marker) => marker.shop !== 'shop')
                .map(createMarker);
        }

        setMarkers(filteredMarkerInstances);
    };


    const handleFilterChange = (newFilter: MarkerType) => {
        setCurrentFilter(newFilter);
    };

    const handleMarkerClick = (marker: any) => {
        setSelectedMarker(marker);
    };

    const closeModal = () => {
        setSelectedMarker(null);
    };

    useEffect(() => {
        if (isLoaded) {
            map = new window.google.maps.Map(
                document.getElementById('map') as HTMLElement,
                {
                    center: center,
                    zoom: 6,
                    minZoom: 6,
                    zoomControl: true,
                    zoomControlOptions: {
                        position: google.maps.ControlPosition.RIGHT_TOP,
                    },
                    disableDefaultUI: true,
                    streetViewControl: false,
                }
            );

            markerClusterer = new MarkerClusterer({ map, markers })
            console.log(markerClusterer)

        }
        setLoading(false);
    }, [isLoaded]);

    useEffect(() => {
        filterMarkers(currentFilter);
    }, [currentFilter]);


    useEffect(() => {
        if (markerClusterer) {
            console.log(markerClusterer)
            markerClusterer.clearMarkers();
            markerClusterer.addMarkers(markers);
            console.log(markers)
        }
    }, [markers]);



    if (loading) {
        return (
            <div>
                <CircularIndeterminate />
            </div>
        );
    }

    return (
        <MainContainer>
            <div style={{ width: '100%', height: '100vh' }} id="map" />
            {selectedMarker && (
                <BasicModal
                    key={selectedMarker.id}
                    label={selectedMarker.label}
                    direction={selectedMarker.address} isOpenProp={true} onClose={closeModal}>
                </BasicModal>
            )}
            <FilterComponent onChange={handleFilterChange} />
            <SimpleBottomNavigation />
        </MainContainer>
    );
};

export default memo(GoogleMapComp);

