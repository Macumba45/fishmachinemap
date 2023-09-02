import styled from 'styled-components'
import { Style } from './type'

export const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    object-fit: cover;
    background-size: cover;
`

export const MapContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    border: none;
`

export const ContainerFilter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const FilterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 60px; /* ajusta la altura según tus necesidades */
`

export const ReviewsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    font-family: ${({ theme }) => theme.fonts.roboto};
    font-size: 1.8rem;
    font-weight: 200;
`

export const IconMarker = styled.img`
    width: 32px;
    height: 32px;
`

export const LikesLabel = styled.div`
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    font-family: 'Roboto', sans-serif;
    margin-left: 0.5rem;
`
export const BadgeContainer = styled.div`
    display: flex;
    position: fixed;
    top: 30px;
    right: 30px;
    z-index: 1;
`

export const ButtonStyleConfirmarLugar = {
    top: '85%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '200px',
    backgroundColor: '#ffffff',
    color: '#000000',
}
export const ButtonStyleCancelarLugar = {
    top: '6%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '200px',
    color: 'white',
    borderColor: 'white',
}

export const ButtonStyleBuscarLugares = {
    top: '40px',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#ffffff',
    color: '#000000',
    height: '2rem',
}

export const CustomizedSwitchesLocationStyles = {
    marginLeft: '0px',
    right: '0px',
    bottom: '200px',
}

export const CustomizedSwitchesStyles = {
    marginLeft: '0px',
    right: '0',
    display: 'flex',
}

export const stylesMaps: Style[] = [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
    },
    {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#263c3f' }],
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#6b9a76' }],
    },
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#38414e' }],
    },
    {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#212a37' }],
    },
    {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9ca5b3' }],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#746855' }],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#1f2835' }],
    },
    {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#f3d19c' }],
    },
    {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{ color: '#2f3948' }],
    },
    {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#17263c' }],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#515c6d' }],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#17263c' }],
    },
    {
        featureType: 'poi.business',
        stylers: [{ visibility: 'off' }],
    },
    {
        featureType: 'poi.government',
        stylers: [{ visibility: 'off' }],
    },
    {
        featureType: 'poi.school',
        stylers: [{ visibility: 'off' }],
    },
    {
        featureType: 'poi.medical',
        stylers: [{ visibility: 'off' }],
    },
    {
        featureType: 'poi.attraction',
        stylers: [{ visibility: 'off' }],
    },
    {
        featureType: 'poi.place_of_worship',
        stylers: [{ visibility: 'off' }],
    },
    {
        featureType: 'poi.sports_complex',
        stylers: [{ visibility: 'off' }],
    },
    {
        featureType: 'transit',
        stylers: [{ visibility: 'off' }],
    },
    {
        featureType: 'transit.station',
        stylers: [{ visibility: 'off' }],
    },
    {
        featureType: 'poi.park',
        stylers: [{ visibility: 'off' }],
    },

    {
        featureType: 'road',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
    },
    {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ visibility: 'on' }],
    },
]

export const defaultStylesMaps: Style[] = [
    {
        featureType: 'poi.business',
        stylers: [{ visibility: 'off' }],
    },
    {
        featureType: 'poi.government',
        stylers: [{ visibility: 'off' }],
    },
    {
        featureType: 'poi.school',
        stylers: [{ visibility: 'off' }],
    },
    {
        featureType: 'poi.medical',
        stylers: [{ visibility: 'off' }],
    },
    {
        featureType: 'poi.attraction',
        stylers: [{ visibility: 'off' }],
    },
    {
        featureType: 'poi.place_of_worship',
        stylers: [{ visibility: 'off' }],
    },
    {
        featureType: 'poi.sports_complex',
        stylers: [{ visibility: 'off' }],
    },
    {
        featureType: 'transit',
        stylers: [{ visibility: 'off' }],
    },
    {
        featureType: 'transit.station',
        stylers: [{ visibility: 'off' }],
    },
    {
        featureType: 'poi.park',
        stylers: [{ visibility: 'off' }],
    },
    {
        featureType: 'road',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
    },
    {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ visibility: 'on' }],
    },
]
