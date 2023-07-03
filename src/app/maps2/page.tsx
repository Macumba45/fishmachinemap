'use client'

import { FC } from "react";
import { MapContainer, stylesMaps } from "./style";

const GoogleMapComp: FC = () => {

    // Inicializar el mapa

    function initMap() {
        let map: google.maps.Map

        // Crear un objeto de mapa
        if (typeof window !== 'undefined' && window.google) {

            map = new window.google.maps.Map(document.getElementById('map') as HTMLElement, {
                center: { lat: 37.3709254, lng: -5.972684150000009 }, // Coordenadas de centro del mapa
                zoom: 13, // Nivel de zoom inicial
                styles: stylesMaps, // Estilos personalizados (los que mencionaste anteriormente)
            });

            // Realizar una solicitud de búsqueda a través de la API Places
            const request = {
                query: 'tiendas de pesca', // Término de búsqueda
                fields: ['name', 'geometry'], // Campos que se desean obtener para cada resultado
            };

            const service = new google.maps.places.PlacesService(map);
            console.log(service)

            service.textSearch(request, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    // Recorrer los resultados y crear marcadores en el mapa
                    for (let i = 0; i < results!.length; i++) {
                        createMarker(results![i]);
                    }
                }
            });
        }

        // Crear un marcador en el mapa para cada resultado de búsqueda
        function createMarker(place: any) {
            const marker = new google.maps.Marker({
                map,
                position: place.geometry.location,
                title: place.name,
            });
            return marker
        }
    }


    initMap()

    return (

        <MapContainer id="map" />




    )
}

export default GoogleMapComp
