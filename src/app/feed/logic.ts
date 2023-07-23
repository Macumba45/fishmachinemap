import { useState } from 'react'
import { useLogicMaps } from '../maps/logic'

export const feedUseLogic = () => {
    const [fotosMarkers, setFotosMarkers] = useState<any[]>([])

    const getMarkersUser = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch('/api/markers/getMarkers', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
            })
            if (response.ok) {
                const data = await response.json()
                // Filtrar los marcadores que tengan markerType igual a "capturas"
                const capturasMarkers = data.markers.filter(
                    (marker: any) => marker.markerType === 'fotos'
                )
                setFotosMarkers(capturasMarkers)
            } else {
                throw new Error('Error en la respuesta del servidor')
            }
        } catch (error) {
            console.error('Error al enviar el objeto:', error)
        }
    }

    return {
        getMarkersUser,
        fotosMarkers,
    }
}
