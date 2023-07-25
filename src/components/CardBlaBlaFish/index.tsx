import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import Typography from '@mui/material/Typography'
import { FC } from 'react'

interface Props {
    id?: string
    departureCity: string
    arrivalCity: string
    departureTime: string
    returnTime: string
    description: string
    price: string
    phone: string
    createdAt?: string
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
    createdAt,
}) => {
    const handleWhatsAppClick = () => {
        // Construir el enlace de WhatsApp con el número de teléfono
        const phoneNumber = phone.replace(/\D/g, '') // Eliminar todos los caracteres que no sean dígitos del número de teléfono
        const whatsAppLink = `https://api.whatsapp.com/send?phone=${phoneNumber}`

        // Abrir el enlace de WhatsApp en una nueva ventana o pestaña
        window.open(whatsAppLink, '_blank')
    }

    return (
        <Card
            key={id}
            sx={{
                maxWidth: 500,
                minWidth: 300,
                maxHeight: 500,
                borderRadius: 0,
                marginBottom: '2rem',
            }}
        >
            <CardMedia
                component="img"
                alt="green iguana"
                height="180"
                image="https://www.a-alvarez.com/img/ybc_blog/post/surfcasting-lanzar-mas.jpg"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Desde {departureCity} a {arrivalCity}
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
            <CardActions
                sx={{
                    backgroundColor: '#25D366',
                    width: '100px',
                    marginLeft: '1rem',
                    borderRadius: '30px',
                    marginBottom: '2rem',
                }}
            >
                <WhatsAppIcon sx={{ color: 'white' }} />
                <Button
                    onClick={handleWhatsAppClick}
                    sx={{ color: 'white' }}
                    size="small"
                >
                    WhatsApp
                </Button>
            </CardActions>
        </Card>
    )
}

export default CardBlaBlaFish
