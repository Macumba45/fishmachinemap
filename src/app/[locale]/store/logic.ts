import { useCallback, useState } from 'react'
import { getAuthenticatedToken } from '../../../lib/storage/storage'
import { StoreData } from './type'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'

export const useLogicStore = () => {
    const [title, setTitle] = useState('')
    const [picture, setPicture] = useState<string>('')
    const [description, setDescription] = useState('')
    const [phone, setPhone] = useState('')
    const [price, setPrice] = useState('')
    const [open, setOpen] = useState(false)
    const [store, setStore] = useState<StoreData[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [storeId, setStoreId] = useState<StoreData>()
    const [dataStoreUser, setDataStoreUser] = useState<any>({})
    const [category, setCategory] = useState<string>('')
    const [isLogged, setIsLogged] = useState(false)
    const [filteredData, setFilteredData] = useState<StoreData[]>(store)
    const [selectedCategory, setSelectedCategory] = useState<string>('Todos') // Establecer el valor predeterminado como "Todos"
    const dynamicTitle = 'FishGram - Store'
    const locale = useLocale() // Obtén el idioma actual utilizando useLocale
    const router = useRouter()

    const postStore = async (store: StoreData) => {
        try {
            const token = getAuthenticatedToken()
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Agregar el token al header 'Authorization'
            }
            const response = await fetch('/api/store/postStore', {
                method: 'POST',
                headers,
                body: JSON.stringify(store),
            })
            const data = await response.json()
            return data
        } catch (error: any) {
            console.error('Error al añadir tienda', error.message)
        }
    }

    const fetchStore = async () => {
        try {
            setLoading(true)
            const token = getAuthenticatedToken()
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Agregar el token al header 'Authorization'
            }
            const response = await fetch('/api/store/getStore', {
                method: 'GET',
                headers,
            })
            const data = await response.json()
            setStore(data.storeData)
            setLoading(false)
            return data
        } catch (error: any) {
            console.error('Error al obtener tiendas', error.message)
        }
    }

    const getProductId = async (id: string) => {
        try {
            setLoading(true)
            const token = getAuthenticatedToken()
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Agregar el token al header 'Authorization'
            }
            const response = await fetch(`/api/store/getStoreId?id=${id}`, {
                method: 'GET',
                headers,
            })
            const data = await response.json()
            setStoreId(data)
            setLoading(false)
            return data
        } catch (error: any) {
            console.error('Error al obtener tiendas', error.message)
        }
    }

    const getUserInfo = useCallback(async () => {
        try {
            const token = getAuthenticatedToken()
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Agregar el token al header 'Authorization'
            }
            if (!token) return setDataStoreUser(null)
            const response = await fetch('/api/user/userData', {
                method: 'GET',
                headers,
            })
            if (response.ok) {
                const data = await response.json()
                setDataStoreUser(data.user)
            } else {
                throw new Error('Error en la respuesta del servidor')
            }
        } catch (error) {
            console.error('Error al enviar el objeto:', error)
        }
    }, [])

    const filterByCategory = (selectedCategory: string) => {
        if (selectedCategory === 'Todos') {
            setSelectedCategory('Todos') // Update the selected category
            setFilteredData(store) // Si el valor seleccionado es "all", entonces mostrar todos los datos
            return
        }
        setSelectedCategory(selectedCategory) // Update the selected category
        const filteredData = store.filter(
            (item: any) => item.category === selectedCategory
        )
        setFilteredData(filteredData)
    }

    const goToLogin = () => {
        router.push(`/${locale}/auth/login`)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    return {
        title,
        setTitle,
        picture,
        setPicture,
        description,
        setDescription,
        phone,
        setPhone,
        price,
        setPrice,
        open,
        setOpen,
        postStore,
        store,
        fetchStore,
        loading,
        getProductId,
        storeId,
        dataStoreUser,
        getUserInfo,
        category,
        setCategory,
        isLogged,
        setIsLogged,
        filteredData,
        setFilteredData,
        selectedCategory,
        setSelectedCategory,
        locale,
        router,
        goToLogin,
        handleClose,
        handleOpen,
        dynamicTitle,
        filterByCategory,
    }
}
