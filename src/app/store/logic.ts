import { useState } from 'react'
import { getAuthenticatedToken } from '../../lib/storage/storage'
import { Store } from './type'

export const useLogicStore = () => {
    const [title, setTitle] = useState('')
    const [picture, setPicture] = useState<string>('')
    const [description, setDescription] = useState('')
    const [phone, setPhone] = useState('')
    const [price, setPrice] = useState('')
    const [open, setOpen] = useState(false)
    const [store, setStore] = useState<Store[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [storeId, setStoreId] = useState<Store>()

    const postStore = async (store: Store) => {
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
    }
}
