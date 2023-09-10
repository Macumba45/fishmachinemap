import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, CardActionArea, CardActions, IconButton } from '@mui/material'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { CardContainer, Spanbold } from './style'
import { Phone, WhatsApp, WhatshotRounded } from '@mui/icons-material'
import { FC } from 'react'

interface Props {
    title: string
    description: string
    price: string
    city: string
    country: string
    picture: string
    category: string
    whatsapp: string
    onClick?: () => void
}

const MultiActionAreaCard: FC<Props> = ({
    title,
    description,
    price,
    city,
    country,
    picture,
    category,
    whatsapp,
    onClick,
}) => {
    const handleWhatsAppClick = () => {
        // Construir el enlace de WhatsApp con el número de teléfono
        const phoneNumber = whatsapp.replace(/\D/g, '') // Eliminar todos los caracteres que no sean dígitos del número de teléfono
        const whatsAppLink = `https://api.whatsapp.com/send?phone=${phoneNumber}`
        const message = `Hola, esoty interesado en la experiencia ${title} en ${city}.`
        const encodedMessage = encodeURIComponent(message)
        const finalWhatsAppLink = `${whatsAppLink}&text=${encodedMessage}`

        // Abrir el enlace de WhatsApp en una nueva ventana o pestaña
        window.open(finalWhatsAppLink)
    }

    return (
        <Card sx={{ maxWidth: 345, margin: 2, minWidth: 310 }}>
            <CardMedia
                component="img"
                height="140"
                image="https://upload.wikimedia.org/wikipedia/commons/d/d5/Recreational-fishing-colombia.jpg"
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {description}
                </Typography>
                <Typography
                    sx={{ mt: 2 }}
                    variant="body2"
                    color="text.secondary"
                >
                    <Spanbold>Precio:</Spanbold> {price} €
                </Typography>
                <Typography
                    sx={{ mt: 2 }}
                    variant="body2"
                    color="text.secondary"
                >
                    <Spanbold>Ciudad:</Spanbold> {city}
                </Typography>
                <Typography
                    sx={{ mt: 2 }}
                    variant="body2"
                    color="text.secondary"
                >
                    <Spanbold>Teléfono:</Spanbold> +34 666 666 666
                </Typography>
                <Typography
                    sx={{
                        mt: 2,
                        display: 'flex',
                        alignItems: 'center',
                        color: '#49007a',
                    }}
                    variant="body2"
                    color="text.primary"
                ></Typography>
            </CardContent>
            <CardActions
                sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
                <Button
                    sx={{ color: 'white', backgroundColor: '#49007a', ml: 1 }}
                    size="small"
                    color="primary"
                >
                    + Info
                </Button>
                <IconButton
                    onClick={handleWhatsAppClick}
                    sx={{
                        fontSize: '1rem',
                        color: '#49007a',
                        backgroundColor: '#25D366',
                        borderRadius: '30px',
                        mr: 2,
                        mb: 1,
                        '&:hover': {
                            backgroundColor: '#1a8642', // Cambiar color del hover
                        },
                    }}
                >
                    <WhatsAppIcon sx={{ color: 'white' }} />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default MultiActionAreaCard
