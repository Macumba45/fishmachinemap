import { useCallback, useState } from 'react'
import { UserMarker } from '../maps/type'
import { getAuthenticatedToken } from '@/lib/storage/storage'
import { BlaBlaFish } from '../blablafish/type'
import { StoreData } from '../store/type'
import { ProfileProps, userLikesProps } from './type'
import { useRouter } from 'next/navigation'

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
    const [stores, setStores] = useState<StoreData[]>([])
    const [picture, setPicture] = useState<string>('')
    const [markerVisibility, setMarkerVisibility] = useState<{
        [key: string]: boolean
    }>({})
    const noMarkers = userMarkers.length === 0
    const [width, setWidth] = useState<number>(0)
    const router = useRouter()
    const [openModal, setOpenModal] = useState(false)
    const [selectedImage, setSelectedImage] = useState('')
    const [selectedMarkerId, setSelectedMarkerId] = useState(null) // Estado para almacenar el ID del marcador seleccionado
    const [openModalComments, setOpenModalComments] = useState(false)
    const [activeView, setActiveView] = useState('capturas')
    const fotosMarkers = userMarkers.filter(item => item.markerType === 'fotos')
    const dynamicTitle = `FishGram - ${user?.name}`

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
            return data
        } catch (error: any) {
            console.error('Error al subir la imagen:', error.message)
        }
    }, [])

    const handleVisibilityToggle = useCallback(
        async (markerId: string) => {
            try {
                // Lógica para actualizar la visibilidad del marcador en el servidor
                await updateMarkerVisible(markerId)

                // Actualiza el estado local para reflejar la nueva visibilidad
                setMarkerVisibility(prevState => ({
                    ...prevState,
                    [markerId]: !prevState[markerId],
                }))
            } catch (error: any) {
                console.error(
                    'Error al actualizar la visibilidad del marcador:',
                    error.message
                )
            }
        },
        [setMarkerVisibility, updateMarkerVisible]
    )

    const getBase64FromUrl = async (url: string) => {
        const data = await fetch(url)
        const blob = await data.blob()
        return new Promise<string>(resolve => {
            const reader = new FileReader()
            reader.readAsDataURL(blob)
            reader.onloadend = () => {
                const base64data = reader.result as string
                resolve(base64data)
            }
        })
    }

    const handleFotosChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = event.target.files
        if (files && files.length > 0) {
            const file = files[0]

            // Reducir el tamaño de la imagen antes de convertirla a Base64
            const resizedFile = await resizeImage(file, {
                maxWidth: 1024,
                maxHeight: 1024,
            })

            const fileUrl = URL.createObjectURL(resizedFile)
            const base64Data = await getBase64FromUrl(fileUrl)
            setPicture(base64Data) // Guarda la imagen en formato Base64 en el estado
            uploadProfilePicture(base64Data)
        }
    }

    const resizeImage = (
        file: File,
        options: { maxWidth: number; maxHeight: number }
    ) => {
        return new Promise<File>(resolve => {
            const img = new Image()
            img.src = URL.createObjectURL(file)

            img.onload = () => {
                const { width, height } = img
                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d')
                canvas.width = options.maxWidth
                canvas.height = options.maxHeight

                const scaleFactor = Math.min(
                    options.maxWidth / width,
                    options.maxHeight / height
                )
                canvas.width = width * scaleFactor
                canvas.height = height * scaleFactor

                ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)
                canvas.toBlob(resizedBlob => {
                    if (resizedBlob) {
                        const resizedFile = new File([resizedBlob], file.name, {
                            type: file.type,
                        })
                        resolve(resizedFile)
                    } else {
                        resolve(file)
                    }
                }, file.type)
            }
        })
    }

    const goToMarkerUserLocation = useCallback(
        (location: { lat: number; lng: number } | undefined) => {
            if (location) {
                const baseUrl =
                    'https://www.google.com/maps/search/?api=1&query='
                const encodedCoordinates = encodeURIComponent(
                    `${location.lat},${location.lng}`
                )
                window.open(baseUrl + encodedCoordinates)
            }
        },
        []
    )

    const goToMaps = useCallback(() => {
        window.location.href = '/maps'
    }, [])
    const handleViewChange = useCallback((view: any) => {
        setActiveView(view)
    }, [])

    const handleOpenModal = useCallback((item: any) => {
        setSelectedImage(item.picture)
        setSelectedMarkerId(item.id)
        setOpenModal(true)
    }, [])

    const handleCloseModal = useCallback(() => {
        setOpenModal(false)
    }, [])

    const handleOpenModalComments = useCallback(() => {
        setOpenModalComments(true)
    }, [])

    const handleCloseModalComments = useCallback(() => {
        setOpenModalComments(false)
    }, [])

    // Función de utilidad para formatear la fecha
    function formatDate(date: Date) {
        return date.toLocaleDateString('es-ES', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
        })
    }

    // Función para capitalizar la primera letra
    function capitalizeFirstLetter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

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
        router,
        openModal,
        setOpenModal,
        selectedImage,
        setSelectedImage,
        selectedMarkerId,
        setSelectedMarkerId,
        openModalComments,
        setOpenModalComments,
        activeView,
        setActiveView,
        fotosMarkers,
        handleViewChange,
        handleOpenModal,
        handleCloseModal,
        handleOpenModalComments,
        handleCloseModalComments,
        goToMaps,
        handleVisibilityToggle,
        dynamicTitle,
        goToMarkerUserLocation,
        handleFotosChange,
        formatDate,
        capitalizeFirstLetter,
    }
}
