import { getAuthenticatedToken } from '@/lib/storage/storage'
import { useCallback, useState } from 'react'
import { Comments, UserMarker } from '../maps/type'
import { Store } from '../store/type'
import { BlaBlaFish } from '../blablafish/type'

export const feedUseLogic = () => {
    const [fotosMarkers, setFotosMarkers] = useState<any[]>([])
    const [likedMarkers, setLikedMarkers] = useState<Record<string, boolean>>(
        {}
    )
    const [loading, setLoading] = useState<boolean>(true)
    const [dataFeedUser, setDataFeedUser] = useState<any>({})
    const [userMarkers, setUserMarkers] = useState<UserMarker[]>([])
    const [blablaFish, setBlaBlaFish] = useState<BlaBlaFish[]>([])
    const [userStores, setUserStores] = useState<Store[]>([])
    const [allComents, setAllComents] = useState<Comments[]>([])

    const getMarkersUser = useCallback(async () => {
        try {
            const token = getAuthenticatedToken()
            const userId = token
                ? JSON.parse(atob(token.split('.')[1])).userId
                : ''

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }

            const response = await fetch('/api/markers/getMarkers', {
                method: 'GET',
                headers,
            })

            if (response.ok) {
                const data = await response.json()

                const capturasMarkers = data.markers.filter(
                    (marker: any) => marker.markerType === 'fotos'
                )
                setFotosMarkers(data.markers)

                const likedMarkerStates = data.markers.reduce(
                    (states: any, marker: any) => {
                        const isLiked = marker.likes.some(
                            (like: any) => like.userId === userId
                        )
                        states[marker.id] = isLiked
                        return states
                    },
                    {}
                )
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
                setUserStores(data.user.stores)
                return data
            } else {
                throw new Error('Error en la respuesta del servidor')
            }
        } catch (error) {
            console.error('Error al enviar el objeto:', error)
        }
    }

    const getUserInfo = useCallback(async () => {
        try {
            const token = getAuthenticatedToken()
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Agregar el token al header 'Authorization'
            }
            if (!token) return setDataFeedUser(null)
            const response = await fetch('/api/user/userData', {
                method: 'GET',
                headers,
            })
            if (response.ok) {
                const data = await response.json()
                setDataFeedUser(data.user)
            } else {
                throw new Error('Error en la respuesta del servidor')
            }
        } catch (error) {
            console.error('Error al enviar el objeto:', error)
        }
    }, [])

    const addComment = async (comment: string, markerId: string) => {
        try {
            const token = getAuthenticatedToken()
            const userId = token
                ? JSON.parse(atob(token.split('.')[1])).userId
                : ''
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Agregar el token al header 'Authorization'
            }
            const response = await fetch('/api/markers/addComment', {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    comment: comment,
                    userId: userId,
                    markerId: markerId,
                }),
            })
            const data = await response.json()
            return data
        } catch (error: any) {
            console.error('Error al obtener los marcadores:', error.message)
        }
    }

    const getAllComments = useCallback(async (markerId: string) => {
        try {
            const token = getAuthenticatedToken()
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Agregar el token al header 'Authorization'
            }
            const response = await fetch(
                `/api/markers/getComments?markerId=${markerId}`,
                {
                    method: 'GET',
                    headers,
                }
            )
            if (response.ok) {
                const data = await response.json()
                setAllComents(data.comments)
                return data
            } else {
                throw new Error('Error en la respuesta del servidor')
            }
        } catch (error) {
            console.error('Error al enviar el objeto:', error)
        }
    }, [])

    const deleteCommentUser = async (commentId: string) => {
        try {
            const token = getAuthenticatedToken()
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Agregar el token al header 'Authorization'
            }
            const response = await fetch(
                `/api/markers/deleteComment?commentId=${commentId}`,
                {
                    method: 'DELETE',
                    headers,
                }
            )
            if (response.ok) {
                const data = await response.json()
                getAllComments(data.deletedComment.markerId)
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
        userStores,
        addComment,
        getAllComments,
        allComents,
        deleteCommentUser,
        getUserInfo,
    }
}
