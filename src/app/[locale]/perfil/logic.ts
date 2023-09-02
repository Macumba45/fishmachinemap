import { useCallback, useState } from 'react'
import { UserMarker } from '../maps/type'
import { getAuthenticatedToken } from '@/lib/storage/storage'
import { BlaBlaFish } from '../blablafish/type'
import { Store } from '../store/type'
import { ProfileProps, userLikesProps } from './type'

export const useLogicUser = () => {
    const [user, setUser] = useState<ProfileProps | null>(null)
    const [userMarkers, setUserMarkers] = useState<UserMarker[]>([])
    const [userLikes, setUserLikes] = useState<userLikesProps[]>([])
    const [toBeDeletedMarkers, setToBeDeletedMarkers] = useState<{
        [key: string]: boolean
    }>({})
    const [toBeDeletedBlaBlaFish, setToBeDeletedBlaBlaFish] = useState<{
        [key: string]: boolean
    }>({})
    const [toBeDeletedStores, setToBeDeletedStores] = useState<{
        [key: string]: boolean
    }>({})
    const [blablaFish, setBlaBlaFish] = useState<BlaBlaFish[]>([])
    const [stores, setStores] = useState<Store[]>([])
    const [picture, setPicture] = useState<string>('')
    const [markerVisibility, setMarkerVisibility] = useState<{
        [key: string]: boolean
    }>({})
    const noMarkers = userMarkers.length === 0

    const [width, setWidth] = useState<number>(0)

    const getUser = useCallback(async () => {
        try {
            if (typeof window !== 'undefined') {
                const token = getAuthenticatedToken()
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Agregar el token al header 'Authorization'
                }
                const response = await fetch('/api/user/userData', {
                    method: 'GET',
                    headers,
                })
                const data = await response.json()
                setBlaBlaFish(data.user.blaBlaFish)
                setUser(data.user)
                setUserMarkers(data.user.markers)
                setUserLikes(data.user.Likes)
                setStores(data.user.stores)

                // Set marker visibility state
                const visibilityState: Record<string, any> = {}
                data.user.markers.forEach((marker: any) => {
                    visibilityState[marker.id as string] = marker.visible
                })
                setMarkerVisibility(visibilityState)

                return response
            }
        } catch (error: any) {
            console.error('Error al obtener el usuario:', error.message)
        }
    }, [])

    const deleteUserMarkers = useCallback(async (markerId: string) => {
        try {
            const token = getAuthenticatedToken()
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Agregar el token al header 'Authorization'
            }
            const response = await fetch(
                `/api/user/deleteMarkers?id=${markerId}`,
                {
                    method: 'DELETE',
                    headers,
                }
            )
            setToBeDeletedMarkers(prevState => ({
                ...prevState,
                [markerId]: false,
            }))
            await response.json()
            return response
        } catch (error: any) {
            console.error('Error al eliminar el marcador:', error.message)
        }
    }, [])

    const updateMarkerVisible = useCallback(async (markerId: string) => {
        try {
            const token = getAuthenticatedToken()
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Agregar el token al header 'Authorization'
            }
            const response = await fetch(
                `/api/markers/visibleMarker?id=${markerId}`,
                {
                    method: 'PUT',
                    headers,
                }
            )
            await response.json()
            return response
        } catch (error: any) {
            console.error('Error al actualizar el marcador:', error.message)
        }
    }, [])

    const deleteBlaBlaFish = useCallback(async (blaBlaFishId: string) => {
        try {
            const token = getAuthenticatedToken()
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Agregar el token al header 'Authorization'
            }
            const response = await fetch(
                `/api/blablafish/deleteBlaBlaFish?id=${blaBlaFishId}`,
                {
                    method: 'DELETE',
                    headers,
                }
            )
            setToBeDeletedBlaBlaFish(prevState => ({
                ...prevState,
                [blaBlaFishId]: false,
            }))
            await response.json()
            return response
        } catch (error: any) {
            console.error('Error al eliminar el viaje:', error.message)
        }
    }, [])

    const deleteStore = useCallback(async (storeId: string) => {
        try {
            const token = getAuthenticatedToken()
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Agregar el token al header 'Authorization'
            }
            const response = await fetch(
                `/api/store/deleteStore?id=${storeId}`,
                {
                    method: 'DELETE',
                    headers,
                }
            )
            setToBeDeletedStores(prevState => ({
                ...prevState,
                [storeId]: false,
            }))
            await response.json()
            return response
        } catch (error: any) {
            console.error('Error al eliminar la tienda:', error.message)
        }
    }, [])

    const uploadProfilePicture = useCallback(async (picture: string) => {
        try {
            const token = getAuthenticatedToken()
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Agregar el token al header 'Authorization'
            }

            const response = await fetch('/api/user/uploadProfilePic', {
                method: 'POST',
                headers,
                body: JSON.stringify({ picture }),
            })
            const data = await response.json()
            return response
        } catch (error: any) {
            console.error('Error al subir la imagen:', error.message)
        }
    }, [])

    return {
        user,
        userMarkers,
        getUser,
        deleteUserMarkers,
        setToBeDeletedMarkers,
        toBeDeletedMarkers,
        noMarkers,
        width,
        setWidth,
        blablaFish,
        updateMarkerVisible,
        markerVisibility,
        setMarkerVisibility,
        deleteBlaBlaFish,
        toBeDeletedBlaBlaFish,
        setToBeDeletedBlaBlaFish,
        stores,
        userLikes,
        toBeDeletedStores,
        setToBeDeletedStores,
        deleteStore,
        uploadProfilePicture,
        picture,
        setPicture,
    }
}
