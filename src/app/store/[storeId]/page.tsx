'use client'

import { FC, memo, useEffect, useState } from 'react'
import { useLogicStore } from '../logic'
import {
    ContainerButton,
    ContainerDescription,
    ContainerPrice,
    ContainerTitle,
    Description,
    MainContainer,
    Picture,
    PictureContainer,
    Price,
    Title,
} from './style'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { Button } from '@mui/material'
import CircularIndeterminate from '@/components/Loader'

interface Props {
    params: {
        storeId: string
    }
}

const Page: FC<Props> = ({ params }) => {
    const { getProductId, storeId, phone } = useLogicStore()
    const [loading, setLoading] = useState(false)

    const handleWhatsAppClick = () => {
        // Construir el enlace de WhatsApp con el número de teléfono
        const phoneNumber = phone.replace(/\D/g, '') // Eliminar todos los caracteres que no sean dígitos del número de teléfono
        const whatsAppLink = `https://api.whatsapp.com/send?phone=${phoneNumber}`
        const message = 'Hola, me interesa tu prodcuto.'
        const encodedMessage = encodeURIComponent(message)
        const finalWhatsAppLink = `${whatsAppLink}&text=${encodedMessage}`

        // Abrir el enlace de WhatsApp en una nueva ventana o pestaña
        window.open(finalWhatsAppLink)
    }

    useEffect(() => {
        setLoading(true)
        getProductId(params.storeId)
        setLoading(false)
    }, [])

    if (loading) {
        <CircularIndeterminate />
    }

    return (
        <MainContainer>
            <PictureContainer>
                <Picture src={storeId?.picture} alt="" />
            </PictureContainer>
            <ContainerTitle>
                <Title>{storeId?.title}</Title>
            </ContainerTitle>
            <ContainerDescription>
                <Description>{storeId?.description}</Description>
            </ContainerDescription>
            <ContainerPrice>
                <Price>{storeId?.price}€</Price>
            </ContainerPrice>
            <ContainerButton>
                <Button
                    onClick={() => handleWhatsAppClick()}
                    variant="contained"
                    style={{
                        color: 'white',
                        backgroundColor: '#49007a',
                        width: '100%',
                        borderRadius: '0px',
                        height: '3rem',
                    }}
                >
                    Contactar
                    <WhatsAppIcon sx={{ marginLeft: '0.5rem' }} />
                </Button>
            </ContainerButton>
        </MainContainer>
    )
}

export default memo(Page)
