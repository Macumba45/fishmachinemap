import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import Typography from '@mui/material/Typography'
import { FC } from 'react'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { IconButton } from '@mui/material'

interface Props {
    id?: string
    date?: string
    departureCity: string
    arrivalCity: string
    departureTime: string
    returnTime: string
    description: string
    price: string
    phone: string
}

const CardBlaBlaFish: FC<Props> = ({
    id,
    departureCity,
    arrivalCity,
    departureTime,
    returnTime,
    description,
    price,
    phone,
    date,
}) => {
    const handleWhatsAppClick = () => {
        // Construir el enlace de WhatsApp con el número de teléfono
        const phoneNumber = phone.replace(/\D/g, '') // Eliminar todos los caracteres que no sean dígitos del número de teléfono
        const whatsAppLink = `https://api.whatsapp.com/send?phone=${phoneNumber}`
        const message = `Hola, me gustaría reservar una plaza para el viaje de ${departureCity} a ${arrivalCity} el día ${date}.`
        const encodedMessage = encodeURIComponent(message)
        const finalWhatsAppLink = `${whatsAppLink}&text=${encodedMessage}`

        // Abrir el enlace de WhatsApp en una nueva ventana o pestaña
        window.open(finalWhatsAppLink)
    }

    return (
        <Card
            key={id}
            sx={{
                maxWidth: 500,
                minWidth: 300,
                maxHeight: 600,
                borderRadius: 0,
                marginBottom: '2rem',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            }}
        >
            <CardMedia
                component="img"
                alt="green iguana"
                height="180"
                image="https://www.a-alvarez.com/img/ybc_blog/post/surfcasting-lanzar-mas.jpg"
            />
            <CardContent>
                <Typography
                    sx={{ display: 'flex', alignItems: 'center' }}
                    gutterBottom
                    variant="h5"
                    component="div"
                >
                    {departureCity}{' '}
                    <ArrowRightAltIcon
                        sx={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}
                    />{' '}
                    {arrivalCity}
                </Typography>
                <Typography
                    fontSize="0.8rem"
                    marginBottom="0.5rem"
                    gutterBottom
                    variant="h6"
                    component="div"
                >
                    Fecha: {date}
                </Typography>
                <Typography
                    fontSize="0.8rem"
                    marginBottom="0.5rem"
                    gutterBottom
                    variant="h6"
                    component="div"
                >
                    Salida: {departureTime}
                </Typography>
                <Typography
                    fontSize="0.8rem"
                    marginBottom="0.5rem"
                    gutterBottom
                    variant="h6"
                    component="div"
                >
                    Vuelta: {returnTime}
                </Typography>
                <Typography
                    fontSize="0.8rem"
                    marginBottom="0.5rem"
                    gutterBottom
                    variant="h6"
                    component="div"
                >
                    Precio: {price}€
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <IconButton
                sx={{
                    backgroundColor: '#25D366',
                    marginLeft: '1rem',
                    borderRadius: '30px',
                    marginBottom: '2rem',
                }}
            >
                <WhatsAppIcon
                    onClick={handleWhatsAppClick}
                    sx={{ color: 'white' }}
                />
            </IconButton>
        </Card>
    )
}

export default CardBlaBlaFish
