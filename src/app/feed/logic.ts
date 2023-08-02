import { getAuthenticatedToken } from '@/lib/storage/storage'
import { useCallback, useState } from 'react'
import { UserMarker } from '../maps/type'

export const feedUseLogic = () => {
    const [fotosMarkers, setFotosMarkers] = useState<any[]>([])
    const [likedMarkers, setLikedMarkers] = useState<Record<string, boolean>>(
        {}
    )
    const [loading, setLoading] = useState<boolean>(true)
    const [dataFeedUser, setDataFeedUser] = useState<any>({})
    const [userMarkers, setUserMarkers] = useState<UserMarker[]>([])
    const [blablaFish, setBlaBlaFish] = useState<UserMarker[]>([])

    const getMarkersUser = useCallback(async () => {
        const token = getAuthenticatedToken()
        const userId = token ? JSON.parse(atob(token.split('.')[1])).userId : ''

        try {
            const token = getAuthenticatedToken()
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Agregar el token al header 'Authorization'
            }
            const response = await fetch('/api/markers/getMarkers', {
                method: 'GET',
                headers,
            })
            if (response.ok) {
                const data = await response.json()
                // Filtrar los marcadores que tengan markerType igual a "capturas"
                const capturasMarkers = data.markers.filter(
                    (marker: any) => marker.markerType === 'fotos'
                )
                setFotosMarkers(capturasMarkers)

                // Verificar los "likes" para cada marcador y actualizar el estado de los "likes"
                const likedMarkerStates: Record<string, boolean> = {}
                capturasMarkers.forEach((marker: any) => {
                    const isLiked = marker.likes.some(
                        (like: any) => like.userId === userId
                    )
                    likedMarkerStates[marker.id] = isLiked
                })
                setLikedMarkers(likedMarkerStates)
                setLoading(false)
            } else {
                throw new Error('Error en la respuesta del servidor')
            }
        } catch (error) {
            console.error('Error al enviar el objeto:', error)
        }
    }, [])

    const fetchLikesMarkers = useCallback(
        async (markerId: string, userId: string) => {
            try {
                const token = getAuthenticatedToken()
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Agregar el token al header 'Authorization'
                }
                const response = await fetch('/api/feed/toogleLike', {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({
                        markerId: markerId,
                    }),
                })
                const data = await response.json()
                // Verificar si el usuario ha dado like al marcador
                const isLiked = data.isLiked // Accede directamente a la propiedad isLiked de data
                // Actualizar el estado del corazón para este marcador individualmente
                setLikedMarkers(prevState => ({
                    ...prevState,
                    [markerId]: isLiked,
                }))
                getMarkersUser()
                return data.marker
            } catch (error: any) {
                console.error('Error al obtener los marcadores:', error.message)
            }
        },
        [getMarkersUser, setLikedMarkers]
    )

    const userInfoFeed = async (userId: string) => {
        try {
            const token = getAuthenticatedToken()
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Agregar el token al header 'Authorization'
            }
            const response = await fetch(
                `/api/feed/userFeed?userId=${userId}`,
                {
                    method: 'GET',
                    headers,
                }
            )
            if (response.ok) {
                const data = await response.json()
                setDataFeedUser(data.user)
                setUserMarkers(data.user.markers)
                setBlaBlaFish(data.user.blaBlaFish)
                return data
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
        fetchLikesMarkers,
        likedMarkers,
        loading,
        userInfoFeed,
        dataFeedUser,
        userMarkers,
        blablaFish,
    }
}
