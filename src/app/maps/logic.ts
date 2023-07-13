import { useRef, useState } from 'react'
import { defaultStylesMaps, stylesMaps } from './style'
import { shopsListID } from '../feed/data'
import { useJsApiLoader } from '@react-google-maps/api'
import { toast } from 'react-toastify'
import { Style, UserMarker } from './type'

export const useLogicMaps = () => {

    const addUserMarker = async (userMark: UserMarker) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/markers/marker', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
                body: JSON.stringify(userMark),
            });
            console.log('Respuesta:', response);
            if (response.ok) {
                const data = await response.json();
                console.log('Objeto enviado correctamente:', data);
            } else {
                throw new Error('Error en la respuesta del servidor');
            }
        } catch (error) {
            console.error('Error al enviar el objeto:', error);
        }
    }

    // Carga el API de Google Maps utilizando el hook useJsApiLoader.
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.API_KEY || '',
    })

    // Define los estados del componente.
    const [positionMarkerUser, setpositionMarkerUser] = useState<
    | google.maps.LatLngLiteral
    | {
        lat: number | undefined
        lng: number | undefined
    }
    >()
    const [loading, setLoading] = useState<boolean>(true)
    const [center] = useState<google.maps.LatLngLiteral>({
        lat: 40.463667 || undefined,
        lng: -3.74922 || undefined,
    })
    // Define los estados del componente.
    const mapRef = useRef<google.maps.Map>()
    const [addingMarker, setAddingMarker] = useState(false)
    const [currentLocationMarker, setCurrentLocationMarker] =
        useState<google.maps.Marker | null>(null)
    const [style, setStyle] = useState<Array<Style>>([])
    const [styledMap, setStyledMap] = useState(true)
    const [floatMarker, setFloatMarker] = useState(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const [direccion, setDireccion] = useState('Mi casa')
    const [tipoLugar, setTipoLugar] = useState('store')
    const [descripcion, setDescripcion] = useState(
        'Esto es la prueba de las pruebas de las repruebas'
    )
    const [fotos, setFotos] = useState('')
    console.log(positionMarkerUser)
    console.log(fotos)

    const selectMapStyle = () => {
        if (typeof window !== 'undefined' && mapRef.current) {
            mapRef.current.setOptions({
                styles: styledMap ? defaultStylesMaps : stylesMaps,
            })
            setStyledMap(!styledMap)
        }
    }

    const notifySucces = () => {
        toast.success('Ubicación cargada correctamente', {
            position: toast.POSITION.TOP_LEFT,
            toastId: 'success1',
        })
    }

    const notifyMarker = () => {
        toast.success('Marcador añadido correctamente', {
            position: toast.POSITION.TOP_LEFT,
            toastId: 'marker1',
        })
    }

    // Función para abrir el modo de "Añadir a marcadores"

    const openAddMarkerMode = () => {
        if (mapRef.current) {
            setIsButtonDisabled(true) // Deshabilita el botón
            setFloatMarker(true)
        }
    }

    const addMarkerDraggable = async (map: google.maps.Map) => {
        const centerLatLng = map.getCenter()
        const position = {
            lat: centerLatLng?.lat(),
            lng: centerLatLng?.lng(),
        }

        console.log('Position:', position)

        if (position.lat !== undefined && position.lng !== undefined) {
            setpositionMarkerUser(position)
        }
    }

    // Función para confirmar el marcador
    const confirmMarker = async (
        location:
        | google.maps.LatLngLiteral
        | { lat: number | undefined; lng: number | undefined }
        | undefined,
        direction: string,
        markerType: string,
        description: string,
        picture: string
    ) => {
        const latLng: google.maps.LatLngLiteral = {
            lat: location?.lat || 0,
            lng: location?.lng || 0,
        };

        const nuevoMarcador = {
            direction,
            markerType,
            description,
            picture,
            location: latLng,

        };

        console.log(nuevoMarcador);
        setAddingMarker(false);
        setIsButtonDisabled(false);
        setFloatMarker(false);
        notifyMarker();
        await addUserMarker(nuevoMarcador);
    };


    const handlerConfirmation = () => {
        setFloatMarker(false)
        setAddingMarker(true)
        if (mapRef.current && isLoaded) {
            addMarkerDraggable(mapRef.current)
        }
    }

    return {
        notifySucces,
        styledMap,
        selectMapStyle,
        mapRef,
        shopsListID,
        notifyMarker,
        confirmMarker,
        openAddMarkerMode,
        currentLocationMarker,
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
        setDireccion,
        tipoLugar,
        setTipoLugar,
        descripcion,
        setDescripcion,
        fotos,
        setFotos,
        setAddingMarker,
    }
}
